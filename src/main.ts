import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { mountSkillIcons } from "./modules/skill-icons";

declare global {
  interface Window {
    gsap: typeof gsap;
    ScrollTrigger: typeof ScrollTrigger;
  }
}

/**
 * Single application seam while the legacy implementation is extracted into
 * focused modules. Callers only need this bootstrap entry.
 */
async function bootstrapPortfolio(): Promise<void> {
  gsap.registerPlugin(ScrollTrigger);
  window.gsap = gsap;
  window.ScrollTrigger = ScrollTrigger;

  mountSkillIcons();

  await import("../assets/js/main.js");
  await import("../assets/js/dotted-surface.js");
}

void bootstrapPortfolio();
