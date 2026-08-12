type TimelineLike = KillableMotion & {
  to: (target: unknown, vars: Record<string, unknown>) => TimelineLike;
  fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>, position?: number) => TimelineLike;
};

type GsapLike = {
  timeline: (config?: Record<string, unknown>) => TimelineLike;
  to: (target: object, vars: Record<string, unknown>) => KillableMotion;
  fromTo: (target: unknown, fromVars: Record<string, unknown>, toVars: Record<string, unknown>) => KillableMotion;
  set: (target: unknown, vars: Record<string, unknown>) => void;
  registerPlugin: (...plugins: unknown[]) => void;
};

type KillableMotion = { kill: () => void; scrollTrigger?: { kill: () => void } };

export type SignalMotionController = {
  refresh: (reducedMotion: boolean) => void;
  destroy: () => void;
};

/** Keeps all signal-section timing behind a two-method interface. */
export function createSignalMotion(section: HTMLElement, gsap: GsapLike | undefined, scrollTrigger: unknown): SignalMotionController {
  let motions: KillableMotion[] = [];

  function clear(): void {
    motions.forEach((motion) => {
      motion.scrollTrigger?.kill();
      motion.kill();
    });
    motions = [];
  }

  function refresh(reducedMotion: boolean): void {
    clear();

    const numberTrack = section.querySelector<HTMLElement>(".signal-number__track");
    const projectsCard = section.querySelector<HTMLElement>(".signal-card--projects");
    const coverageCard = section.querySelector<HTMLElement>(".signal-card--coverage");
    const coverageBars = section.querySelectorAll<HTMLElement>(".signal-chart__bar span");
    const flowCard = section.querySelector<HTMLElement>(".signal-card--flow");
    const flowItems = section.querySelectorAll<HTMLElement>(".signal-flow li");

    if (reducedMotion || !gsap || !scrollTrigger) {
      section.classList.add("is-signal-active");
      if (numberTrack) numberTrack.style.transform = "translate3d(0, -83.333333%, 0)";
      flowCard?.classList.add("is-flow-active");
      section.querySelectorAll<HTMLElement>(".signal-chart__bar span, .signal-year, .signal-stack li")
        .forEach((element) => {
          element.style.removeProperty("transform");
          element.style.removeProperty("opacity");
        });
      return;
    }

    gsap.registerPlugin(scrollTrigger);
    section.classList.remove("is-signal-active");
    flowCard?.classList.remove("is-flow-active");

    if (numberTrack && projectsCard) {
      gsap.set(numberTrack, { yPercent: 0 });
      const timeline = gsap.timeline({ scrollTrigger: { trigger: projectsCard, start: "top 84%", once: true } });
      for (let step = 1; step <= 5; step += 1) {
        timeline.to(numberTrack, { yPercent: -(step * 100 / 6), duration: 0.115, ease: "power2.inOut" });
      }
      motions.push(timeline);
    }

    if (coverageCard && coverageBars.length) {
      motions.push(gsap.fromTo(coverageBars, { scaleX: 0 }, {
        scaleX: 1, duration: 0.9, stagger: 0.075, ease: "power3.out",
        scrollTrigger: { trigger: coverageCard, start: "top 82%", once: true }
      }));
    }

    if (flowCard && flowItems.length) {
      motions.push(gsap.fromTo(flowItems, { y: 8, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.42, stagger: 0.055, ease: "power3.out",
        scrollTrigger: { trigger: flowCard, start: "top 84%", once: true, onEnter: () => flowCard.classList.add("is-flow-active") }
      }));
    }

    const supportingTimeline = gsap.timeline({
      defaults: { ease: "power3.out" },
      scrollTrigger: { trigger: section, start: "top 68%", once: true, onEnter: () => section.classList.add("is-signal-active") }
    });
    supportingTimeline
      .fromTo(section.querySelectorAll(".signal-year"), { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.14)
      .fromTo(section.querySelectorAll(".signal-stack li"), { y: 7, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.035 }, 0.2);
    motions.push(supportingTimeline);
  }

  return { refresh, destroy: clear };
}
