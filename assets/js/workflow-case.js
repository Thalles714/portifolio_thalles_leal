import nextIcon from "simple-icons/icons/nextdotjs.svg?raw";
import reactIcon from "simple-icons/icons/react.svg?raw";
import typescriptIcon from "simple-icons/icons/typescript.svg?raw";
import supabaseIcon from "simple-icons/icons/supabase.svg?raw";
import postgresIcon from "simple-icons/icons/postgresql.svg?raw";
import zodIcon from "simple-icons/icons/zod.svg?raw";
import vitestIcon from "simple-icons/icons/vitest.svg?raw";
import actionsIcon from "simple-icons/icons/githubactions.svg?raw";
import vercelIcon from "simple-icons/icons/vercel.svg?raw";

const page = document.querySelector(".workflow-story-page");
const root = document.documentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const technologyIcons = {
  nextdotjs: nextIcon,
  react: reactIcon,
  typescript: typescriptIcon,
  supabase: supabaseIcon,
  postgresql: postgresIcon,
  zod: zodIcon,
  vitest: vitestIcon,
  githubactions: actionsIcon,
  vercel: vercelIcon,
};

const meta = {
  pt: {
    title: "Workflow — a história de um SaaS para pequenas agências | Thalles Leal",
    description: "Como eu transformei o ruído operacional de pequenas agências em um SaaS de decisões explicáveis, seguro e multi-tenant.",
    openMenu: "Abrir menu de navegação",
    closeMenu: "Fechar menu de navegação",
    chapter: "Capítulo",
    of: "de",
    goTo: "Ir para",
    next: "Próximo",
    complete: "História concluída",
  },
  en: {
    title: "Workflow — the story of an operations SaaS | Thalles Leal",
    description: "How I turned the operational noise of small agencies into an explainable, secure multi-tenant decision system.",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    chapter: "Chapter",
    of: "of",
    goTo: "Go to",
    next: "Next",
    complete: "Story complete",
  },
};

function getStoredLanguage() {
  try {
    return window.localStorage.getItem("portfolio-language");
  } catch {
    return null;
  }
}

let currentLanguage = getStoredLanguage();
if (currentLanguage !== "pt" && currentLanguage !== "en") {
  currentLanguage = navigator.language?.toLowerCase().startsWith("pt") ? "pt" : "en";
}

let navigationController = null;
let currentIndex = 0;

function deterministicOrder(index, length) {
  return (index * 7 + Math.floor(index / 3) * 3) % Math.max(1, length);
}

function buildKineticLabels() {
  document.querySelectorAll(".kinetic-label").forEach((label) => {
    const text = label.textContent || "";
    label.textContent = "";
    Array.from(text).forEach((character, index) => {
      const cell = document.createElement("span");
      const top = document.createElement("span");
      const bottom = document.createElement("span");
      cell.className = `char-cell${character === " " ? " char-space" : ""}`;
      cell.style.setProperty("--char-order", deterministicOrder(index, text.length));
      top.className = "char-glyph";
      bottom.className = "char-glyph";
      top.textContent = character === " " ? "\u00a0" : character;
      bottom.textContent = character === " " ? "\u00a0" : character;
      bottom.setAttribute("aria-hidden", "true");
      cell.append(top, bottom);
      label.appendChild(cell);
    });
    label.setAttribute("aria-label", text);
  });
}

function applyLanguage(language) {
  currentLanguage = language === "en" ? "en" : "pt";
  root.lang = currentLanguage === "pt" ? "pt-BR" : "en";
  root.dataset.lang = currentLanguage;
  document.title = meta[currentLanguage].title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", meta[currentLanguage].description);

  document.querySelectorAll("[data-copy]").forEach((element) => {
    const copy = element.dataset[currentLanguage];
    if (copy !== undefined) element.textContent = copy;
  });

  document.querySelectorAll("[data-aria-pt][data-aria-en]").forEach((element) => {
    const label = element.dataset[`aria${currentLanguage === "pt" ? "Pt" : "En"}`];
    if (label) element.setAttribute("aria-label", label);
  });

  buildKineticLabels();
  refreshInteractiveCopy();
  navigationController?.refresh();
  updateStoryUI(currentIndex, false);
  if (liveRegion) liveRegion.textContent = "";
}

function installTechnologyIcons() {
  document.querySelectorAll("[data-tech-icon]").forEach((container) => {
    const svg = technologyIcons[container.dataset.techIcon];
    if (!svg) return;
    container.innerHTML = svg
      .replace(/<title>.*?<\/title>/, "")
      .replace('<svg role="img"', '<svg aria-hidden="true" focusable="false"');
  });
}

const deck = document.querySelector("[data-story-deck]");
const chapters = Array.from(document.querySelectorAll("[data-chapter]"));
const railButtons = Array.from(document.querySelectorAll("[data-story-target]"));
const previousButton = document.querySelector("[data-story-prev]");
const nextButton = document.querySelector("[data-story-next]");
const currentNumber = document.querySelector("[data-current-number]");
const currentLabel = document.querySelector("[data-current-label]");
const activeTitle = document.querySelector("[data-active-title]");
const liveRegion = document.querySelector("[data-story-live]");
const nextLabel = document.querySelector("[data-next-label]");

function chapterTitle(index) {
  const title = chapters[index]?.querySelector(".chapter-title");
  if (!title) return "Workflow";
  return Array.from(title.children)
    .map((part) => part.textContent?.trim())
    .filter(Boolean)
    .join(" ");
}

function chapterShortLabel(index) {
  return chapters[index]?.dataset[currentLanguage === "pt" ? "navPt" : "navEn"] || String(index + 1);
}

function updateStoryUI(index, announce = false) {
  if (!chapters.length) return;
  currentIndex = Math.max(0, Math.min(chapters.length - 1, index));
  chapters.forEach((chapter, chapterIndex) => {
    const active = chapterIndex === currentIndex;
    chapter.classList.toggle("is-active", active);
    chapter.setAttribute("aria-hidden", String(!active));
    if (active) chapter.removeAttribute("inert");
    else chapter.setAttribute("inert", "");
  });
  railButtons.forEach((button, buttonIndex) => {
    button.classList.toggle("is-past", buttonIndex < currentIndex);
    if (buttonIndex === currentIndex) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
    button.setAttribute("aria-label", `${meta[currentLanguage].goTo}: ${chapterShortLabel(buttonIndex)}`);
  });
  if (currentNumber) currentNumber.textContent = String(currentIndex + 1).padStart(2, "0");
  if (currentLabel) currentLabel.textContent = chapterShortLabel(currentIndex);
  if (activeTitle) activeTitle.textContent = chapterTitle(currentIndex);
  if (previousButton) previousButton.disabled = currentIndex === 0;
  if (nextButton) nextButton.disabled = currentIndex === chapters.length - 1;
  if (nextLabel) nextLabel.textContent = currentIndex === chapters.length - 1 ? meta[currentLanguage].complete : meta[currentLanguage].next;
  if (announce && liveRegion) {
    liveRegion.textContent = `${meta[currentLanguage].chapter} ${currentIndex + 1} ${meta[currentLanguage].of} ${chapters.length}: ${chapterTitle(currentIndex)}`;
  }
}

let animationFrame = 0;
let isAnimating = false;
let scrollFrame = 0;
let scrollCommitTimer = 0;

function cancelStoryAnimation() {
  if (animationFrame) cancelAnimationFrame(animationFrame);
  animationFrame = 0;
  isAnimating = false;
  deck?.classList.remove("is-settling");
}

function setHistory(index, mode) {
  const id = chapters[index]?.id;
  if (!id) return;
  const url = `${window.location.pathname}${window.location.search}#${id}`;
  if (mode === "push" && window.location.hash !== `#${id}`) history.pushState({ workflowChapter: id }, "", url);
  else if (mode === "replace") history.replaceState({ workflowChapter: id }, "", url);
  try {
    window.sessionStorage.setItem("workflow-chapter", id);
  } catch {
    // Navigation still works when storage is unavailable.
  }
}

function finishNavigation(index, historyMode, announce) {
  updateStoryUI(index, announce);
  setHistory(index, historyMode);
}

function animateToChapter(index, { velocity = 0, historyMode = "push", announce = true } = {}) {
  if (!deck || !chapters.length) return;
  const targetIndex = Math.max(0, Math.min(chapters.length - 1, index));
  const target = targetIndex * deck.clientWidth;
  cancelStoryAnimation();

  if (reducedMotion.matches || Math.abs(deck.scrollLeft - target) < 1) {
    deck.scrollLeft = target;
    finishNavigation(targetIndex, historyMode, announce);
    return;
  }

  isAnimating = true;
  deck.classList.add("is-settling");
  let position = deck.scrollLeft;
  let speed = velocity * 1000;
  let previousTime = performance.now();
  const stiffness = 175;
  const damping = 25;

  const tick = (now) => {
    const delta = Math.min(0.032, Math.max(0.001, (now - previousTime) / 1000));
    previousTime = now;
    const displacement = position - target;
    const acceleration = -stiffness * displacement - damping * speed;
    speed += acceleration * delta;
    position += speed * delta;
    deck.scrollLeft = position;

    if (Math.abs(position - target) < 0.65 && Math.abs(speed) < 8) {
      deck.scrollLeft = target;
      isAnimating = false;
      animationFrame = 0;
      deck.classList.remove("is-settling");
      finishNavigation(targetIndex, historyMode, announce);
      return;
    }
    animationFrame = requestAnimationFrame(tick);
  };

  animationFrame = requestAnimationFrame(tick);
}

function nearestChapter() {
  if (!deck?.clientWidth) return 0;
  return Math.max(0, Math.min(chapters.length - 1, Math.round(deck.scrollLeft / deck.clientWidth)));
}

function scheduleScrollUpdate() {
  if (!deck || scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = 0;
    updateStoryUI(nearestChapter(), false);
  });
  window.clearTimeout(scrollCommitTimer);
  scrollCommitTimer = window.setTimeout(() => {
    if (!isAnimating && !deck.classList.contains("is-dragging")) {
      const index = nearestChapter();
      updateStoryUI(index, true);
      setHistory(index, "push");
    }
  }, 180);
}

function indexFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return chapters.findIndex((chapter) => chapter.id === id);
}

function restoreChapter() {
  let index = indexFromHash();
  if (index < 0) {
    try {
      const stored = window.sessionStorage.getItem("workflow-chapter");
      index = chapters.findIndex((chapter) => chapter.id === stored);
    } catch {
      index = -1;
    }
  }
  if (index < 0) index = 0;
  currentIndex = index;
  if (deck) deck.scrollLeft = index * deck.clientWidth;
  updateStoryUI(index, false);
  setHistory(index, "replace");
}

function onHistoryNavigation() {
  const index = indexFromHash();
  if (index >= 0 && index !== currentIndex) animateToChapter(index, { historyMode: "none", announce: true });
}

function installStoryNavigation() {
  if (!deck || !chapters.length) return;
  chapters.forEach((chapter) => chapter.setAttribute("tabindex", "-1"));
  railButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = chapters.findIndex((chapter) => chapter.id === button.dataset.storyTarget);
      if (index >= 0) animateToChapter(index);
    });
  });
  previousButton?.addEventListener("click", () => animateToChapter(currentIndex - 1));
  nextButton?.addEventListener("click", () => animateToChapter(currentIndex + 1));

  document.addEventListener("keydown", (event) => {
    if (document.body.classList.contains("menu-open")) return;
    if (event.target instanceof HTMLElement && event.target.closest("input, textarea, select, [contenteditable='true']")) return;
    let target = null;
    if (event.key === "ArrowLeft") target = currentIndex - 1;
    if (event.key === "ArrowRight") target = currentIndex + 1;
    if (event.key === "Home") target = 0;
    if (event.key === "End") target = chapters.length - 1;
    if (target === null) return;
    event.preventDefault();
    animateToChapter(target);
  });

  let pointerId = null;
  let pointerStart = 0;
  let scrollStart = 0;
  let pointerChapter = 0;
  let dragging = false;
  let samples = [];

  deck.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    if (event.target instanceof Element && event.target.closest("a, button, input, textarea, select")) return;
    cancelStoryAnimation();
    pointerId = event.pointerId;
    pointerStart = event.clientX;
    scrollStart = deck.scrollLeft;
    pointerChapter = currentIndex;
    dragging = false;
    samples = [{ x: event.clientX, time: performance.now() }];
    deck.setPointerCapture(pointerId);
  });

  deck.addEventListener("pointermove", (event) => {
    if (event.pointerId !== pointerId) return;
    const distance = event.clientX - pointerStart;
    if (!dragging && Math.abs(distance) < 10) return;
    dragging = true;
    deck.classList.add("is-dragging");
    deck.scrollLeft = scrollStart - distance;
    const now = performance.now();
    samples.push({ x: event.clientX, time: now });
    samples = samples.filter((sample) => now - sample.time <= 120);
  });

  const releasePointer = (event) => {
    if (event.pointerId !== pointerId) return;
    if (deck.hasPointerCapture(pointerId)) deck.releasePointerCapture(pointerId);
    pointerId = null;
    deck.classList.remove("is-dragging");
    if (!dragging) return;
    const first = samples[0];
    const last = samples[samples.length - 1];
    const elapsed = Math.max(1, last.time - first.time);
    const contentVelocity = -(last.x - first.x) / elapsed;
    const displacement = deck.scrollLeft - scrollStart;
    const hasIntent = Math.abs(displacement) > deck.clientWidth * 0.12 || Math.abs(contentVelocity) > 0.25;
    const direction = Math.sign(Math.abs(contentVelocity) > 0.25 ? contentVelocity : displacement);
    const target = hasIntent ? pointerChapter + direction : pointerChapter;
    const limitedVelocity = Math.max(-2.2, Math.min(2.2, contentVelocity));
    animateToChapter(target, { velocity: limitedVelocity, historyMode: "push", announce: true });
  };

  deck.addEventListener("pointerup", releasePointer);
  deck.addEventListener("pointercancel", releasePointer);
  deck.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
  window.addEventListener("popstate", onHistoryNavigation);
  window.addEventListener("hashchange", onHistoryNavigation);
  window.addEventListener("resize", () => {
    cancelStoryAnimation();
    deck.scrollLeft = currentIndex * deck.clientWidth;
  }, { passive: true });

  document.querySelector(".skip-link")?.addEventListener("click", (event) => {
    event.preventDefault();
    animateToChapter(0, { historyMode: "push", announce: true });
    deck.focus({ preventScroll: true });
  });
}

function copyFrom(element, key) {
  const suffix = currentLanguage === "pt" ? "Pt" : "En";
  return element?.dataset[`${key}${suffix}`] || "";
}

function animateContent(element) {
  if (!element || reducedMotion.matches || typeof element.animate !== "function") return;
  element.animate(
    [
      { opacity: 0.35, transform: "translateY(7px)", filter: "blur(2px)" },
      { opacity: 1, transform: "translateY(0)", filter: "blur(0)" },
    ],
    { duration: 240, easing: "cubic-bezier(.23,1,.32,1)" },
  );
}

function selectDomain(button, animate = true) {
  const explorer = button?.closest("[data-domain-explorer]");
  if (!explorer) return;
  const nodes = Array.from(explorer.querySelectorAll("[data-domain-node]"));
  nodes.forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
  const title = explorer.querySelector("[data-domain-title]");
  const body = explorer.querySelector("[data-domain-body]");
  if (title) title.textContent = copyFrom(button, "title");
  if (body) body.textContent = copyFrom(button, "body");
  explorer.style.setProperty("--domain-step", String(nodes.indexOf(button)));
  if (animate) animateContent(explorer.querySelector(".domain-inspector"));
}

function selectDecision(button, animate = true) {
  const desk = button?.closest("[data-decision-desk]");
  if (!desk) return;
  const choices = Array.from(desk.querySelectorAll("[data-decision-choice]"));
  choices.forEach((choice) => {
    const active = choice === button;
    choice.setAttribute("aria-selected", String(active));
    choice.tabIndex = active ? 0 : -1;
  });
  const title = desk.querySelector("[data-decision-title]");
  const body = desk.querySelector("[data-decision-body]");
  const proof = desk.querySelector("[data-decision-proof]");
  if (title) title.textContent = copyFrom(button, "title");
  if (body) body.textContent = copyFrom(button, "body");
  if (proof) proof.textContent = copyFrom(button, "proof");
  desk.style.setProperty("--decision-index", String(choices.indexOf(button)));
  const core = desk.querySelector(".decision-core");
  if (animate && core) {
    core.classList.remove("is-confirming");
    void core.offsetWidth;
    core.classList.add("is-confirming");
    window.setTimeout(() => core.classList.remove("is-confirming"), 560);
    animateContent(core);
  }
}

function selectLesson(button, animate = true) {
  const blueprint = button?.closest("[data-lesson-blueprint]");
  if (!blueprint) return;
  const principles = Array.from(blueprint.querySelectorAll("[data-lesson-principle]"));
  principles.forEach((principle) => {
    const active = principle === button;
    principle.setAttribute("aria-selected", String(active));
    principle.tabIndex = active ? 0 : -1;
  });
  blueprint.dataset.activeLesson = button.dataset.lessonPrinciple || "domain";
  if (animate) animateContent(button.querySelector("p"));
}

function updateFocusLab(lab, animate = false) {
  const range = lab?.querySelector("[data-focus-range]");
  const output = lab?.querySelector("[data-focus-output]");
  if (!range || !output) return;
  const value = Number(range.value);
  lab.style.setProperty("--focus", String(value / 100));
  const labels = currentLanguage === "pt"
    ? ["atividade", "filtrando", "uma decisão"]
    : ["activity", "filtering", "one decision"];
  output.textContent = value < 34 ? labels[0] : value < 72 ? labels[1] : labels[2];
  lab.classList.toggle("is-focused", value >= 72);
  if (animate && value >= 72) {
    lab.classList.remove("is-focused");
    void lab.offsetWidth;
    lab.classList.add("is-focused");
  }
}

function refreshInteractiveCopy() {
  const activeDomain = document.querySelector("[data-domain-node][aria-pressed='true']");
  if (activeDomain) selectDomain(activeDomain, false);
  const activeDecision = document.querySelector("[data-decision-choice][aria-selected='true']");
  if (activeDecision) selectDecision(activeDecision, false);
  const activeLesson = document.querySelector("[data-lesson-principle][aria-selected='true']");
  if (activeLesson) selectLesson(activeLesson, false);
  document.querySelectorAll("[data-focus-lab]").forEach((lab) => updateFocusLab(lab));
  const blockedLab = document.querySelector("[data-security-lab].is-blocked");
  const output = blockedLab?.querySelector("[data-security-output]");
  if (output) output.textContent = currentLanguage === "pt"
    ? "Acesso bloqueado: escopo do workspace + RLS."
    : "Access blocked: workspace scope + RLS.";
}

function installTabKeys(container, selector, activate) {
  container?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const tabs = Array.from(container.querySelectorAll(selector));
    const index = tabs.indexOf(document.activeElement);
    if (index < 0) return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const next = tabs[(index + direction + tabs.length) % tabs.length];
    activate(next);
    next.focus();
  });
}

function installStoryInteractions() {
  document.querySelectorAll("[data-thread-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = chapters.findIndex((chapter) => chapter.id === button.dataset.threadTarget);
      if (index >= 0) animateToChapter(index);
    });
  });

  document.querySelectorAll("[data-idea-focus]").forEach((focus) => {
    const button = focus.querySelector("[data-idea-toggle]");
    button?.addEventListener("click", () => {
      const resolved = !focus.classList.contains("is-resolved");
      focus.classList.toggle("is-resolved", resolved);
      button.setAttribute("aria-pressed", String(resolved));
    });
  });

  document.querySelectorAll("[data-noise-lab]").forEach((lab) => {
    const sources = Array.from(lab.querySelectorAll("[data-noise-source]"));
    const progress = lab.querySelector("[data-noise-progress]");
    const count = lab.querySelector("[data-noise-count]");
    const question = lab.querySelector(".noise-question");
    const update = () => {
      const quiet = sources.filter((source) => source.getAttribute("aria-pressed") === "true").length;
      if (progress) progress.style.transform = `scaleX(${quiet / sources.length})`;
      if (count) count.textContent = `${quiet} / ${sources.length}`;
      question?.classList.toggle("is-clear", quiet === sources.length);
    };
    sources.forEach((source) => source.addEventListener("click", () => {
      source.setAttribute("aria-pressed", String(source.getAttribute("aria-pressed") !== "true"));
      update();
    }));
    update();
  });

  document.querySelectorAll("[data-focus-lab]").forEach((lab) => {
    lab.querySelector("[data-focus-range]")?.addEventListener("input", () => updateFocusLab(lab, true));
    updateFocusLab(lab);
  });

  document.querySelectorAll("[data-domain-explorer]").forEach((explorer) => {
    explorer.querySelectorAll("[data-domain-node]").forEach((node) => node.addEventListener("click", () => selectDomain(node)));
    const active = explorer.querySelector("[data-domain-node][aria-pressed='true']");
    if (active) selectDomain(active, false);
  });

  document.querySelectorAll("[data-product-demo]").forEach((demo) => {
    const steps = Array.from(demo.querySelectorAll("[data-product-step]"));
    const select = (button) => {
      steps.forEach((step) => {
        const active = step === button;
        step.setAttribute("aria-selected", String(active));
        step.tabIndex = active ? 0 : -1;
      });
      demo.querySelectorAll("[data-product-panel]").forEach((panel) => {
        const active = panel.dataset.productPanel === button.dataset.productStep;
        panel.hidden = !active;
        if (active) animateContent(panel);
      });
    };
    steps.forEach((step) => step.addEventListener("click", () => select(step)));
    installTabKeys(demo.querySelector(".product-steps"), "[data-product-step]", select);
  });

  document.querySelectorAll("[data-decision-desk]").forEach((desk) => {
    const choices = Array.from(desk.querySelectorAll("[data-decision-choice]"));
    choices.forEach((choice) => choice.addEventListener("click", () => selectDecision(choice)));
    installTabKeys(desk.querySelector(".decision-switches"), "[data-decision-choice]", selectDecision);
    const active = desk.querySelector("[data-decision-choice][aria-selected='true']");
    if (active) selectDecision(active, false);
  });

  document.querySelectorAll("[data-tech-choice]").forEach((choice) => choice.addEventListener("click", () => {
    const choices = choice.closest(".tech-bench")?.querySelectorAll("[data-tech-choice]") || [];
    choices.forEach((item) => item.setAttribute("aria-pressed", String(item === choice)));
  }));

  document.querySelectorAll("[data-security-lab]").forEach((lab) => {
    const button = lab.querySelector("[data-security-run]");
    const output = lab.querySelector("[data-security-output]");
    const stages = Array.from(lab.querySelectorAll(".trust-pipeline li"));
    button?.addEventListener("click", () => {
      if (lab.classList.contains("is-running")) return;
      lab.classList.remove("is-blocked");
      lab.classList.add("is-running");
      stages.forEach((stage) => stage.classList.remove("is-checking"));
      if (output) output.textContent = currentLanguage === "pt" ? "Verificando sessão e escopo…" : "Checking session and scope…";
      const stepDuration = reducedMotion.matches ? 0 : 105;
      stages.forEach((stage, index) => window.setTimeout(() => stage.classList.add("is-checking"), stepDuration * index));
      window.setTimeout(() => {
        lab.classList.remove("is-running");
        lab.classList.add("is-blocked");
        stages.forEach((stage) => stage.classList.remove("is-checking"));
        if (output) output.textContent = currentLanguage === "pt"
          ? "Acesso bloqueado: escopo do workspace + RLS."
          : "Access blocked: workspace scope + RLS.";
      }, stepDuration * stages.length + (reducedMotion.matches ? 0 : 180));
    });
  });

  document.querySelectorAll("[data-lesson-blueprint]").forEach((blueprint) => {
    const principles = Array.from(blueprint.querySelectorAll("[data-lesson-principle]"));
    principles.forEach((principle) => principle.addEventListener("click", () => selectLesson(principle)));
    installTabKeys(blueprint.querySelector(".lesson-principles"), "[data-lesson-principle]", selectLesson);
    const active = blueprint.querySelector("[data-lesson-principle][aria-selected='true']");
    if (active) selectLesson(active, false);
  });

  document.querySelectorAll("[data-future-path]").forEach((path) => {
    const steps = Array.from(path.querySelectorAll("[data-future-step]"));
    steps.forEach((step, index) => step.addEventListener("click", () => {
      steps.forEach((item) => item.setAttribute("aria-pressed", String(item === step)));
      path.style.setProperty("--future-index", String(index));
    }));
  });

  document.querySelectorAll("[data-tilt-card]").forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      if (reducedMotion.matches || event.pointerType === "touch") return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      card.style.transform = `perspective(850px) rotateX(${-y * 5}deg) rotateY(${x * 7}deg)`;
    });
    card.addEventListener("pointerleave", () => { card.style.transform = ""; });
  });
}

if (page) {
  installTechnologyIcons();
  installStoryNavigation();
  installStoryInteractions();
  applyLanguage(currentLanguage);

  document.querySelectorAll("[data-language-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nextLanguage = currentLanguage === "pt" ? "en" : "pt";
      try {
        window.localStorage.setItem("portfolio-language", nextLanguage);
      } catch {
        // The language still changes when storage is unavailable.
      }
      applyLanguage(nextLanguage);
    });
  });

  import("../../src/modules/navigation").then(({ createNavigation }) => {
    navigationController = createNavigation(() => ({
      openMenu: meta[currentLanguage].openMenu,
      closeMenu: meta[currentLanguage].closeMenu,
    }), reducedMotion);
    navigationController?.refresh();
    root.dataset.navigationReady = "true";
  });

  requestAnimationFrame(() => {
    restoreChapter();
    root.dataset.storyReady = "true";
  });
}
