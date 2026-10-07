import { experiences, facts, profile, skills } from "./content";
import { GraphBackground } from "./GraphBackground";

function WipBanner() {
	return (
		<div className="wip" role="status">
			<div className="wip-inner">
				<span className="wip-title">WIP 🚧</span>
				<span className="wip-sub">This site is under construction. The content is real, the design isn't done.</span>
			</div>
		</div>
	);
}

function App() {
	return (
		<>
			<GraphBackground />
			<WipBanner />
			<main className="page">
				<header className="hero">
					<p className="motto">{profile.motto}</p>
					<h1>{profile.name}</h1>
					<p className="role">{profile.role}</p>
					<p className="muted">{profile.location}</p>
					<div className="pitch">
						{profile.pitch.map((line) => (
							<p key={line}>{line}</p>
						))}
					</div>
					<nav className="links">
						{profile.links.map((l) => (
							<a key={l.href} href={l.href} target="_blank" rel="noreferrer">
								{l.label}
							</a>
						))}
					</nav>
				</header>

				<section>
					<h2>Experience</h2>
					<ol className="xp">
						{experiences.map((xp) => (
							<li key={xp.company}>
								<div className="xp-head">
									<h3>{xp.company}</h3>
									<span className="muted">{xp.period}</span>
								</div>
								<p className="xp-titles">
									{xp.titles} <span className="muted">· {xp.where}</span>
								</p>
								<ul>
									{xp.points.map((p) => (
										<li key={p}>{p}</li>
									))}
								</ul>
							</li>
						))}
					</ol>
				</section>

				<section>
					<h2>Skills</h2>
					<dl className="skills">
						{skills.map((s) => (
							<div key={s.group}>
								<dt>{s.group}</dt>
								<dd>{s.items.join(" · ")}</dd>
							</div>
						))}
					</dl>
				</section>

				<section>
					<h2>Facts</h2>
					<ul className="facts">
						{facts.map((f) => (
							<li key={f}>{f}</li>
						))}
					</ul>
				</section>

				<footer className="muted">
					© {new Date().getFullYear()} {profile.name} · No tracking, no cookies, no bullshit.
				</footer>
			</main>
		</>
	);
}

export default App;
