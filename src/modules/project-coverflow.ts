import { projects } from "../data/projects";

export type ProjectCoverflowController = {
  refresh: (reducedMotion: boolean) => void;
  destroy: () => void;
};

/** Accessible, interruptible project coverflow with circular navigation and direct pointer tracking. */
export function createProjectCoverflow(root: HTMLElement): ProjectCoverflowController | null {
  const viewport = root.querySelector<HTMLElement>(".project-coverflow__viewport")!;
  const cards = Array.from(root.querySelectorAll<HTMLAnchorElement>("[data-project-cover]"));
  const pagination = root.querySelector<HTMLElement>(".project-coverflow__pagination")!;
  const activeTitle = root.querySelector<HTMLElement>("[data-project-active-title]")!;
  const activeCategory = root.querySelector<HTMLElement>("[data-project-active-category]")!;
  const activeFormat = root.querySelector<HTMLElement>("[data-project-active-format]")!;
  const activeFocus = root.querySelector<HTMLElement>("[data-project-active-focus]")!;
  const activeRoute = root.querySelector<HTMLElement>("[data-project-active-route]")!;
  const activeOpen = root.querySelector<HTMLAnchorElement>("[data-project-open]")!;

  if (!viewport || !cards.length || !pagination ||
    !activeTitle || !activeCategory || !activeFormat || !activeFocus || !activeRoute || !activeOpen) return null;

  cards.forEach((card, index) => {
    const project = projects[index];
    if (!project) return;
    card.href = project.caseStudyUrl || project.liveUrl;
    card.dataset.projectId = project.id;
    card.draggable = false;
    const image = card.querySelector<HTMLImageElement>("img");
    if (image) image.draggable = false;
    if (project.caseStudyUrl) card.removeAttribute("target");
    else card.target = "_blank";
    const indexLabel = card.querySelector<HTMLElement>(".project-coverflow__index");
    if (indexLabel) indexLabel.textContent = String(project.order).padStart(2, "0");
  });

  let selected = 0;
  let position = 0;
  let targetPosition = 0;
  let positionVelocity = 0;
  let reduced = false;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let dragOriginX = 0;
  let dragOriginPosition = 0;
  let dragStartTargetPosition = 0;
  let lastX = 0;
  let lastMoveAt = 0;
  let suppressClickUntil = 0;
  let activePointerId: number | null = null;
  let animationFrame = 0;
  let lastFrameAt = 0;
  const buttons: HTMLButtonElement[] = [];

  const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
  const wrapIndex = (value: number) => ((Math.round(value) % cards.length) + cards.length) % cards.length;
  const isPortuguese = () => document.documentElement.lang.toLowerCase().startsWith("pt");
  const cardWidth = () => cards[0]?.getBoundingClientRect().width || 200;
  const cardSpacing = () => cardWidth() * (window.innerWidth <= 800 ? 0.9 : 0.98);

  function visualDistance(index: number, presentation: number): number {
    const nearestCycle = Math.round((presentation - index) / cards.length);
    return index + nearestCycle * cards.length - presentation;
  }

  function nearestLoopPosition(index: number, reference = position): number {
    const wrapped = wrapIndex(index);
    return wrapped + Math.round((reference - wrapped) / cards.length) * cards.length;
  }

  function updateSelectionDetails(): void {
    const project = projects[selected];
    const card = cards[selected];
    if (!project || !card) return;
    const [format, focus = project.category] = project.category.split(" / ");
    const hasCaseStudy = Boolean(project.caseStudyUrl);

    activeTitle.textContent = project.title;
    activeCategory.textContent = project.category;
    activeFormat.textContent = format;
    activeFocus.textContent = focus;
    activeRoute.textContent = isPortuguese()
      ? (hasCaseStudy ? "Estudo de caso" : "Projeto publicado")
      : (hasCaseStudy ? "Case study" : "Live project");
    activeOpen.href = project.caseStudyUrl || project.liveUrl;
    if (hasCaseStudy) {
      activeOpen.removeAttribute("target");
      activeOpen.removeAttribute("rel");
    } else {
      activeOpen.target = "_blank";
      activeOpen.rel = "noopener noreferrer";
    }
  }

  function syncSelected(index: number): void {
    const wrapped = wrapIndex(index);
    if (wrapped === selected) return;
    selected = wrapped;
    updateSelectionDetails();
  }

  function paint(): void {
    const spacing = cardSpacing();
    const mobile = window.innerWidth <= 800;
    const edge = cards.length / 2;

    if (dragging) syncSelected(Math.round(position));

    cards.forEach((card, index) => {
      const offset = visualDistance(index, position);
      const abs = Math.abs(offset);
      const centered = index === selected && abs < 0.035 && !dragging;
      const x = offset * spacing;
      const y = reduced ? 0 : Math.min(38, abs * (mobile ? 11 : 15));
      const rotation = reduced ? 0 : -offset * (mobile ? 7 : 11);
      const scale = reduced ? 1 : Math.max(0.74, 1 - abs * (mobile ? 0.09 : 0.105));
      const edgeOpacity = clamp((edge - abs) / 0.45, 0, 1);
      const opacity = Math.max(0.34, 1 - abs * 0.18) * edgeOpacity;

      card.classList.toggle("is-selected", centered);
      card.setAttribute("aria-current", index === selected ? "true" : "false");
      card.tabIndex = index === selected ? 0 : -1;
      card.style.zIndex = String(30 - Math.round(abs * 4));
      card.style.opacity = String(opacity);
      card.style.pointerEvents = opacity < 0.08 ? "none" : "auto";
      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), ${y.toFixed(2)}px, 0) rotateY(${rotation.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
    });

    buttons.forEach((button, index) => button.setAttribute("aria-current", index === selected ? "true" : "false"));
  }

  function stopAnimation(): void {
    if (animationFrame) window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
    lastFrameAt = 0;
  }

  function animate(time: number): void {
    animationFrame = 0;
    const delta = lastFrameAt ? clamp((time - lastFrameAt) / 1000, 1 / 240, 0.05) : 1 / 60;
    lastFrameAt = time;

    if (reduced) {
      position = targetPosition;
      positionVelocity = 0;
      lastFrameAt = 0;
      paint();
      return;
    }

    const response = 0.34;
    const omega = 4.6 / response;
    const displacement = position - targetPosition;
    const decay = Math.exp(-omega * delta);
    position = targetPosition + (displacement * (1 + omega * delta) + positionVelocity * delta) * decay;
    positionVelocity = (positionVelocity * (1 - omega * delta) - displacement * omega * omega * delta) * decay;

    if (Math.abs(position - targetPosition) < 0.0015 && Math.abs(positionVelocity) < 0.012) {
      position = targetPosition;
      positionVelocity = 0;
      lastFrameAt = 0;
      paint();
      return;
    }

    paint();
    animationFrame = window.requestAnimationFrame(animate);
  }

  function startAnimation(): void {
    if (reduced) {
      position = targetPosition;
      positionVelocity = 0;
      paint();
      return;
    }
    if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
  }

  function target(value: number): void {
    targetPosition = Math.round(value);
    syncSelected(targetPosition);
    dragging = false;
    root.classList.remove("is-dragging");
    paint();
    startAnimation();
  }

  function selectIndex(index: number): void {
    target(nearestLoopPosition(index));
  }

  function moveBy(steps: number): void {
    target(Math.round(targetPosition) + steps);
  }

  function isCardCentered(index: number): boolean {
    if (index !== selected || dragging) return false;
    const cardRect = cards[index]?.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    if (!cardRect) return false;
    const distance = Math.abs((cardRect.left + cardRect.width / 2) - (viewportRect.left + viewportRect.width / 2));
    return distance <= Math.max(6, Math.min(12, cardRect.width * 0.045));
  }

  function onCardClick(event: MouseEvent, index: number): void {
    if (Date.now() < suppressClickUntil) {
      event.preventDefault();
      return;
    }
    if (!isCardCentered(index)) {
      event.preventDefault();
      selectIndex(index);
    }
  }

  const cardClickHandlers = cards.map((_, index) => (event: MouseEvent) => onCardClick(event, index));
  cardClickHandlers.forEach((handler, index) => cards[index].addEventListener("click", handler));

  cards.forEach((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.addEventListener("click", () => selectIndex(index));
    pagination.appendChild(button);
    buttons.push(button);
  });

  function updatePaginationLabels(): void {
    buttons.forEach((button, index) => {
      const project = projects[index];
      button.setAttribute("aria-label", isPortuguese()
        ? `Selecionar ${project?.title || `projeto ${index + 1}`}`
        : `Select ${project?.title || `project ${index + 1}`}`);
    });
    updateSelectionDetails();
  }

  function onViewportKeydown(event: KeyboardEvent): void {
    if (event.target !== viewport) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); moveBy(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); moveBy(1); }
    if (event.key === "Home") { event.preventDefault(); selectIndex(0); }
    if (event.key === "End") { event.preventDefault(); selectIndex(cards.length - 1); }
  }

  function onPointerDown(event: PointerEvent): void {
    if (event.button !== 0) return;
    activePointerId = event.pointerId;
    startX = event.clientX;
    startY = event.clientY;
    lastX = event.clientX;
    lastMoveAt = event.timeStamp;
    dragStartTargetPosition = Math.round(targetPosition);
    dragging = false;
  }

  function onPointerMove(event: PointerEvent): void {
    if (activePointerId !== event.pointerId) return;
    const totalX = event.clientX - startX;
    const totalY = event.clientY - startY;

    if (!dragging && Math.abs(totalX) > 8 && Math.abs(totalX) > Math.abs(totalY)) {
      dragging = true;
      stopAnimation();
      dragOriginX = event.clientX;
      dragOriginPosition = position;
      positionVelocity = 0;
      root.classList.add("is-dragging");
      viewport.setPointerCapture?.(event.pointerId);
    }
    if (!dragging) return;

    event.preventDefault();
    const elapsed = Math.max(1, event.timeStamp - lastMoveAt);
    const spacing = cardSpacing();
    const instantVelocity = -((event.clientX - lastX) / elapsed) / spacing * 1000;
    positionVelocity = positionVelocity * 0.28 + instantVelocity * 0.72;
    position = dragOriginPosition - (event.clientX - dragOriginX) / spacing;
    targetPosition = position;
    lastX = event.clientX;
    lastMoveAt = event.timeStamp;
    paint();
  }

  function finishPointer(event: PointerEvent): void {
    if (activePointerId !== event.pointerId && !dragging) return;
    activePointerId = null;
    if (viewport.hasPointerCapture?.(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (!dragging) return;

    const totalDelta = event.clientX - startX;
    if (event.timeStamp - lastMoveAt > 90) positionVelocity *= 0.2;
    const momentum = clamp(positionVelocity * 0.14, -0.65, 0.65);
    const spacing = cardSpacing();
    const draggedSteps = Math.max(1, Math.round(Math.abs(totalDelta) / spacing));
    const destination = Math.abs(totalDelta) > 26
      ? dragStartTargetPosition + (totalDelta < 0 ? draggedSteps : -draggedSteps)
      : Math.round(position + momentum);

    suppressClickUntil = Date.now() + 280;
    target(destination);
  }

  function cancelPointer(event: PointerEvent): void {
    if (activePointerId !== event.pointerId && !dragging) return;
    activePointerId = null;
    if (viewport.hasPointerCapture?.(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
    if (!dragging) return;
    positionVelocity = 0;
    target(Math.round(position));
  }

  function finishMouseDrag(event: MouseEvent): void {
    if (!dragging) return;
    finishPointer({
      pointerId: activePointerId ?? -1,
      clientX: event.clientX,
      timeStamp: event.timeStamp
    } as PointerEvent);
  }

  const onResize = () => paint();
  const languageObserver = new MutationObserver(updatePaginationLabels);
  languageObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  viewport.addEventListener("keydown", onViewportKeydown);
  viewport.addEventListener("pointerdown", onPointerDown);
  viewport.addEventListener("pointermove", onPointerMove, { passive: false });
  viewport.addEventListener("pointerup", finishPointer);
  viewport.addEventListener("pointercancel", cancelPointer);
  window.addEventListener("pointerup", finishPointer);
  window.addEventListener("pointercancel", cancelPointer);
  window.addEventListener("mouseup", finishMouseDrag);
  window.addEventListener("resize", onResize, { passive: true });

  root.classList.add("is-motion-managed");
  updatePaginationLabels();
  paint();

  return {
    refresh(value) {
      reduced = value;
      root.classList.toggle("is-reduced-motion", reduced);
      if (reduced) {
        stopAnimation();
        position = targetPosition;
        positionVelocity = 0;
      }
      paint();
    },
    destroy() {
      stopAnimation();
      languageObserver.disconnect();
      cardClickHandlers.forEach((handler, index) => cards[index].removeEventListener("click", handler));
      viewport.removeEventListener("keydown", onViewportKeydown);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", finishPointer);
      viewport.removeEventListener("pointercancel", cancelPointer);
      window.removeEventListener("pointerup", finishPointer);
      window.removeEventListener("pointercancel", cancelPointer);
      window.removeEventListener("mouseup", finishMouseDrag);
      window.removeEventListener("resize", onResize);
      root.classList.remove("is-motion-managed", "is-dragging", "is-reduced-motion");
      pagination.replaceChildren();
    }
  };
}
