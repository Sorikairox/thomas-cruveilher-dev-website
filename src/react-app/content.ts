// All site copy lives here. Edit this file, not the components.

export const profile = {
	name: "Thomas Cruveilher",
	role: "Co-Head of Engineering · Senior Software Engineer",
	location: "Tokyo, Japan",
	motto: "#NoBullShit",
	pitch: [
		"I build software and the teams that ship it.",
		"12+ years: freelance, CTO twice, founder, consultant, now co-running engineering at Cogent Labs.",
		"I care about short feedback loops, clean code, and people who can say “I don't know”.",
	],
	links: [
		{ label: "LinkedIn", href: "https://www.linkedin.com/in/thomascruveilher" },
		{ label: "GitHub", href: "https://github.com/sorikairox" },
		{ label: "Danet", href: "https://github.com/Savory/Danet" },
	],
};

export type Experience = {
	company: string;
	where: string;
	period: string;
	titles: string;
	points: string[];
};

export const experiences: Experience[] = [
	{
		company: "Cogent Labs",
		where: "Tokyo",
		period: "2024 — now",
		titles: "Lead Dev → Product Engineering Manager → Co-Head of Engineering",
		points: [
			"Grew the product team from 5 to 11 engineers.",
			"Release cycle: 2 months → 2 weeks. QA: 2 weeks → 3 days.",
			"Still writing code. 20% of my time, on purpose.",
		],
	},
	{
		company: "Abbeal · AXA Life Japan",
		where: "Tokyo",
		period: "2022 — 2024",
		titles: "Consultant, Full-Stack Engineer",
		points: [
			"Internal underwriting tool: TypeScript, Fastify, React, FP.",
			"Ran hands-on sessions on TDD, DI and hexagonal architecture.",
		],
	},
	{
		company: "Fyndl",
		where: "Remote",
		period: "2020 — 2022",
		titles: "President",
		points: [
			"Consulting company: Louis Vuitton, Octoplus, insurance SaaS.",
			"Open-source collaborative science app — 100k users in 2 weeks.",
		],
	},
	{
		company: "Nicecactus.gg",
		where: "Sophia-Antipolis",
		period: "2018 — 2020",
		titles: "Lead Dev → CTO → Tech Lead",
		points: [
			"Recruited a team and rebuilt the platform from scratch in 4 months.",
			"Microservices on AWS/Kubernetes. Hired my own successor as CTO.",
		],
	},
	{
		company: "Riskattitude",
		where: "Sophia-Antipolis",
		period: "2017 — 2018",
		titles: "CTO",
		points: ["Insurance SaaS, team management, and a VR risk-assessment app."],
	},
	{
		company: "Freelance",
		where: "Remote",
		period: "2014 — 2017",
		titles: "Developer",
		points: ["SaaS, intranets and e-commerce for whoever paid on time."],
	},
];

export const skills: { group: string; items: string[] }[] = [
	{
		group: "Engineering",
		items: ["TypeScript", "Node.js", "NestJS", "Deno", "React", "SQL / NoSQL", "Kafka / AMQP"],
	},
	{
		group: "Practices",
		items: ["TDD", "Clean / Hexagonal Architecture", "Modular monoliths", "CI/CD"],
	},
	{
		group: "Leadership",
		items: ["Hiring", "Career ladders", "Process (only when it removes friction)", "Mentoring"],
	},
];

export const facts: string[] = [
	"Creator of Danet, the most mature backend framework for Deno.",
	"Lived in France, South Korea, the USA. Now Japan.",
	"Master's from EPITECH and Keimyung University (game development).",
	"Favorite book: Apprenticeship Patterns — Hoover & Oshineye.",
];
