import { projects } from "../data/projects";

export type ProjectCoverflowController = { refresh: (reducedMotion: boolean) => void; destroy: () => void };

/** Accessible five-project coverflow; cards link directly to live work today and can later point to case-study URLs. */
export function createProjectCoverflow(root: HTMLElement): ProjectCoverflowController | null {
  const viewport = root.querySelector<HTMLElement>(".project-coverflow__viewport");
  const cards = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-project-cover]"));
  const countLabel = root.querySelector<HTMLElement>(".project-coverflow__count");
  const pagination = root.querySelector<HTMLElement>(".project-coverflow__pagination");
  if (!viewport || !cards.length || !countLabel || !pagination) return null;
  cards.forEach((card, index) => {
    const project = projects[index];
    if (!project) return;
    card.href = project.liveUrl;
    card.dataset.projectId = project.id;
    const indexLabel = card.querySelector<HTMLElement>(".project-coverflow__index");
    if (indexLabel) indexLabel.textContent = String(project.order).padStart(2, "0");
  });
  const activeCountLabel: HTMLElement = countLabel;
  const activePagination: HTMLElement = pagination;

  let selected = 0;
  let reduced = false;
  let dragging = false;
  let startX = 0;
  let startIndex = 0;
  const buttons: HTMLButtonElement[] = [];

  function wrap(index: number): number { return (index + cards.length) % cards.length; }
  function distance(index: number): number {
    let value = index - selected;
    if (value > cards.length / 2) value -= cards.length;
    if (value < -cards.length / 2) value += cards.length;
    return value;
  }
  function paint(): void {
    cards.forEach((card, index) => {
      const offset = distance(index);
      const abs = Math.abs(offset);
      card.classList.toggle("is-selected", index === selected);
      card.setAttribute("aria-current", index === selected ? "true" : "false");
      card.style.zIndex = String(20 - abs);
      card.style.opacity = String(abs > 2 ? 0 : 1 - abs * 0.22);
      card.style.transform = reduced
        ? `translateX(calc(-50% + ${offset * 112}%))`
        : `translateX(calc(-50% + ${offset * 68}%)) translateZ(${-abs * 150}px) rotateY(${-offset * 30}deg)`;
    });
    activeCountLabel.textContent = `${String(selected + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    buttons.forEach((button, index) => button.setAttribute("aria-current", index === selected ? "true" : "false"));
  }
  function select(index: number): void { selected = wrap(index); paint(); }

  cards.forEach((card, index) => card.addEventListener("click", (event) => {
    if (dragging || index !== selected) { event.preventDefault(); select(index); }
  }));
  root.querySelector("[data-project-previous]")?.addEventListener("click", () => select(selected - 1));
  root.querySelector("[data-project-next]")?.addEventListener("click", () => select(selected + 1));
  cards.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `Go to project ${index + 1}`);
    button.addEventListener("click", () => select(index));
    activePagination.appendChild(button);
    buttons.push(button);
  });

  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { event.preventDefault(); select(selected - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); select(selected + 1); }
  });
  viewport.addEventListener("pointerdown", (event) => {
    viewport.setPointerCapture(event.pointerId); startX = event.clientX; startIndex = selected; dragging = false;
  });
  viewport.addEventListener("pointermove", (event) => {
    if (!viewport.hasPointerCapture(event.pointerId)) return;
    if (Math.abs(event.clientX - startX) > 12) dragging = true;
  });
  viewport.addEventListener("pointerup", (event) => {
    if (!viewport.hasPointerCapture(event.pointerId)) return;
    const delta = event.clientX - startX;
    viewport.releasePointerCapture(event.pointerId);
    if (Math.abs(delta) > 34) select(startIndex + (delta < 0 ? 1 : -1));
    window.setTimeout(() => { dragging = false; }, 0);
  });

  paint();
  return { refresh: (value) => { reduced = value; paint(); }, destroy: () => { activePagination.replaceChildren(); } };
}
