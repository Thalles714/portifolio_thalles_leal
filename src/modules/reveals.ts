export type RevealController = {
  refresh: (reducedMotion: boolean) => void;
  destroy: () => void;
};

/** Owns one-time viewport reveals without exposing observer details to callers. */
export function createReveals(root: HTMLElement): RevealController {
  let observer: IntersectionObserver | null = null;

  function destroy(): void {
    observer?.disconnect();
    observer = null;
  }

  function refresh(reducedMotion: boolean): void {
    destroy();
    const elements = document.querySelectorAll<HTMLElement>(".reveal");

    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("motion-ready");
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        (entry.target as HTMLElement).classList.add("is-visible");
        observer?.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

    elements.forEach((element) => observer?.observe(element));
  }

  return { refresh, destroy };
}
