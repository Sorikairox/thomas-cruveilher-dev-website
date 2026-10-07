// Background network graph: drifting nodes, edges between close neighbours.
// Loaded lazily so three.js never blocks the content.

import * as THREE from "three";

const NODES = 90;
const BOUNDS = 60;
const LINK_DIST = 16;
const SPEED = 0.04;

function themeColor(): THREE.Color {
	const fg = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim();
	return new THREE.Color(fg || "#111");
}

function dotTexture(): THREE.Texture {
	const size = 64;
	const c = document.createElement("canvas");
	c.width = c.height = size;
	const ctx = c.getContext("2d")!;
	ctx.fillStyle = "#fff";
	ctx.beginPath();
	ctx.arc(size / 2, size / 2, size / 2 - 1, 0, Math.PI * 2);
	ctx.fill();
	return new THREE.CanvasTexture(c);
}

export function startGraph(canvas: HTMLCanvasElement): () => void {
	const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
	const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

	const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(60, 1, 1, 400);
	camera.position.z = 95;

	const group = new THREE.Group();
	scene.add(group);

	const positions = new Float32Array(NODES * 3);
	const velocities = new Float32Array(NODES * 3);
	for (let i = 0; i < NODES * 3; i++) {
		positions[i] = (Math.random() * 2 - 1) * BOUNDS;
		velocities[i] = (Math.random() * 2 - 1) * SPEED;
	}

	const pointGeom = new THREE.BufferGeometry();
	pointGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
	const pointMat = new THREE.PointsMaterial({
		size: 1.6,
		map: dotTexture(),
		transparent: true,
		opacity: 0.35,
		depthWrite: false,
	});
	group.add(new THREE.Points(pointGeom, pointMat));

	// Worst case: every pair linked. Draw range trims it each frame.
	const maxSegments = (NODES * (NODES - 1)) / 2;
	const linePos = new Float32Array(maxSegments * 6);
	const lineAlpha = new Float32Array(maxSegments * 2);
	const lineGeom = new THREE.BufferGeometry();
	lineGeom.setAttribute("position", new THREE.BufferAttribute(linePos, 3).setUsage(THREE.DynamicDrawUsage));
	lineGeom.setAttribute("alpha", new THREE.BufferAttribute(lineAlpha, 1).setUsage(THREE.DynamicDrawUsage));
	const lineMat = new THREE.ShaderMaterial({
		transparent: true,
		depthWrite: false,
		uniforms: { color: { value: new THREE.Color() }, opacity: { value: 0.22 } },
		vertexShader: `
			attribute float alpha;
			varying float vAlpha;
			void main() {
				vAlpha = alpha;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}`,
		fragmentShader: `
			uniform vec3 color;
			uniform float opacity;
			varying float vAlpha;
			void main() { gl_FragColor = vec4(color, vAlpha * opacity); }`,
	});
	group.add(new THREE.LineSegments(lineGeom, lineMat));

	const applyTheme = () => {
		const c = themeColor();
		pointMat.color.copy(c);
		lineMat.uniforms.color.value.copy(c);
	};
	applyTheme();

	const resize = () => {
		const w = window.innerWidth;
		const h = window.innerHeight;
		renderer.setSize(w, h, false);
		camera.aspect = w / h;
		camera.updateProjectionMatrix();
	};
	resize();

	const step = () => {
		for (let i = 0; i < NODES * 3; i++) {
			positions[i] += velocities[i];
			if (Math.abs(positions[i]) > BOUNDS) velocities[i] = -velocities[i];
		}
		pointGeom.attributes.position.needsUpdate = true;

		let seg = 0;
		for (let a = 0; a < NODES; a++) {
			for (let b = a + 1; b < NODES; b++) {
				const dx = positions[a * 3] - positions[b * 3];
				const dy = positions[a * 3 + 1] - positions[b * 3 + 1];
				const dz = positions[a * 3 + 2] - positions[b * 3 + 2];
				const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
				if (d > LINK_DIST) continue;
				const alpha = 1 - d / LINK_DIST;
				linePos.set(positions.subarray(a * 3, a * 3 + 3), seg * 6);
				linePos.set(positions.subarray(b * 3, b * 3 + 3), seg * 6 + 3);
				lineAlpha[seg * 2] = alpha;
				lineAlpha[seg * 2 + 1] = alpha;
				seg++;
			}
		}
		lineGeom.setDrawRange(0, seg * 2);
		lineGeom.attributes.position.needsUpdate = true;
		lineGeom.attributes.alpha.needsUpdate = true;
	};

	let frame = 0;
	const loop = () => {
		step();
		group.rotation.y += 0.0008;
		group.rotation.x += 0.0003;
		renderer.render(scene, camera);
		frame = requestAnimationFrame(loop);
	};

	const start = () => {
		cancelAnimationFrame(frame);
		if (reducedMotion.matches || document.hidden) {
			step();
			renderer.render(scene, camera);
			return;
		}
		frame = requestAnimationFrame(loop);
	};
	start();

	const onTheme = () => {
		applyTheme();
		renderer.render(scene, camera);
	};
	const onResize = () => {
		resize();
		renderer.render(scene, camera);
	};
	window.addEventListener("resize", onResize);
	document.addEventListener("visibilitychange", start);
	reducedMotion.addEventListener("change", start);
	darkScheme.addEventListener("change", onTheme);

	return () => {
		cancelAnimationFrame(frame);
		window.removeEventListener("resize", onResize);
		document.removeEventListener("visibilitychange", start);
		reducedMotion.removeEventListener("change", start);
		darkScheme.removeEventListener("change", onTheme);
		pointGeom.dispose();
		pointMat.map?.dispose();
		pointMat.dispose();
		lineGeom.dispose();
		lineMat.dispose();
		renderer.dispose();
	};
}
