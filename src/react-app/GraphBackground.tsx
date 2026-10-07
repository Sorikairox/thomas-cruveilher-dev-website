import { useEffect, useRef } from "react";

export function GraphBackground() {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		let stop: (() => void) | undefined;
		let cancelled = false;
		import("./graph")
			.then(({ startGraph }) => {
				if (!cancelled && ref.current) stop = startGraph(ref.current);
			})
			.catch(() => {
				// No WebGL, no background. The content is what matters.
			});
		return () => {
			cancelled = true;
			stop?.();
		};
	}, []);

	return <canvas ref={ref} className="graph-bg" aria-hidden="true" />;
}
