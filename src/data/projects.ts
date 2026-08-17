export type Project = {
  id: "workflow" | "nitido" | "voe" | "solar";
  order: number;
  title: string;
  category: string;
  liveUrl: string;
  caseStudyUrl?: string;
};

/** Canonical registry for portfolio navigation and future case-study pages. */
export const projects: readonly Project[] = [
  { id: "workflow", order: 1, title: "Workflow", category: "SaaS / Operations", liveUrl: "https://workflow-app-lac.vercel.app", caseStudyUrl: "/projects/workflow/" },
  { id: "nitido", order: 2, title: "Nítido", category: "PWA / Local-first", liveUrl: "https://nitido.thallestleal.workers.dev", caseStudyUrl: "/projects/nitido/" },
  { id: "voe", order: 3, title: "Clínica Voe Alto", category: "Web / Healthcare", liveUrl: "https://clinicavoealto.com.br/" },
  { id: "solar", order: 4, title: "Good Sollar", category: "Web / Solar energy", liveUrl: "https://www.goodsollar.com.br/" }
];
