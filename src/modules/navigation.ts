type Labels = { openMenu: string; closeMenu: string };

/** Keeps the accessible menu behaviour behind one small interface. */
export function createNavigation(getLabels: () => Labels, motionQuery: MediaQueryList) {
  const toggle = document.querySelector<HTMLButtonElement>("#menu-toggle");
  const panel = document.querySelector<HTMLElement>("#menu-panel");
  const body = document.body;
  if (!toggle || !panel) return null;

  let open = false;
  let lastFocused: Element | null = null;

  const focusable = () => Array.from(panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
  const refresh = () => toggle.setAttribute("aria-label", open ? getLabels().closeMenu : getLabels().openMenu);

  const setOpen = (next: boolean, restoreFocus = true) => {
    if (next === open) return;
    open = next;
    toggle.setAttribute("aria-expanded", String(open));
    panel.classList.toggle("is-open", open);
    panel.setAttribute("aria-hidden", String(!open));
    body.classList.toggle("menu-open", open);
    refresh();

    if (open) {
      lastFocused = document.activeElement;
      panel.removeAttribute("inert");
      window.setTimeout(() => focusable()[0]?.focus(), motionQuery.matches ? 0 : 170);
    } else {
      panel.setAttribute("inert", "");
      if (restoreFocus && lastFocused instanceof HTMLElement) lastFocused.focus();
    }
  };

  const onToggle = () => setOpen(!open);
  const onPointerDown = (event: PointerEvent) => {
    if (open && !panel.contains(event.target as Node) && !toggle.contains(event.target as Node)) setOpen(false);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (!open) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setOpen(false);
      return;
    }
    if (event.key !== "Tab") return;
    const items = focusable();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  const onMenuLink = (event: Event) => {
    const link = event.currentTarget as HTMLAnchorElement;
    const target = document.querySelector<HTMLElement>(link.getAttribute("href") || "");
    setOpen(false, false);
    if (target) window.setTimeout(() => target.focus({ preventScroll: true }), motionQuery.matches ? 0 : 620);
  };

  toggle.addEventListener("click", onToggle);
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeyDown);
  const links = Array.from(panel.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
  links.forEach((link) => link.addEventListener("click", onMenuLink));
  refresh();

  return {
    refresh,
    destroy() {
      toggle.removeEventListener("click", onToggle);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      links.forEach((link) => link.removeEventListener("click", onMenuLink));
    }
  };
}
