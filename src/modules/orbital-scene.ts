type State = { x: number; y: number; scale: number; opacity: number; rotation: number; rings: number };
type Stop = { point: number; state: State };
export type OrbitalSceneController = { start: () => void; refresh: () => void; destroy: () => void };

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const mix = (from: number, to: number, amount: number) => from + (to - from) * amount;
const smoothstep = (value: number) => value * value * (3 - 2 * value);

/** Owns every detail of the fixed orbital layer: scroll interpolation, pointer drift and reduced-motion fallback. */
export function createOrbitalScene(): OrbitalSceneController | null {
  const rig = document.querySelector<HTMLElement>("#orbital-rig") as HTMLElement;
  const planet = document.querySelector<HTMLElement>("#planet-core") as HTMLElement;
  const rings = document.querySelector<HTMLElement>("#orbit-group") as HTMLElement;
  const coordinate = document.querySelector<HTMLElement>(".planet-coordinate") as HTMLElement;
  const hero = document.querySelector<HTMLElement>("#home") as HTMLElement;
  if (!rig || !planet || !rings || !coordinate || !hero) return null;

  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pointerMedia = window.matchMedia("(hover: hover) and (pointer: fine)");
  const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]:not([hidden])"));
  let stops: Stop[] = [];
  let scrollY = window.scrollY, width = window.innerWidth, height = window.innerHeight;
  let cursor = scrollY + height * 0.5, velocity = 0, frame = 0, lastTime = 0, ready = false;
  let exitStart = 0, exitEnd = 1;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

  function state(node: HTMLElement): State { return { x: Number(node.dataset.sceneX || 0), y: Number(node.dataset.sceneY || 0), scale: Number(node.dataset.sceneScale || 1), opacity: Number(node.dataset.sceneOpacity || 1), rotation: Number(node.dataset.sceneRotation || 0), rings: Number(node.dataset.sceneRings || 0.6) }; }
  function measure(): void {
    width = window.innerWidth; height = window.innerHeight;
    stops = nodes.flatMap((node) => {
      const rect = node.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return [];
      return [{ point: rect.top + window.scrollY + rect.height * 0.5, state: state(node) }];
    }).sort((a, b) => a.point - b.point);
    const rect = hero.getBoundingClientRect(); const top = rect.top + window.scrollY;
    exitStart = top + rect.height * 0.58; exitEnd = top + rect.height * 0.94;
  }
  function sample(position: number): State {
    if (!stops.length || position <= stops[0].point) return stops[0]?.state || { x: 0, y: 0, scale: 1, opacity: 1, rotation: 0, rings: 0.8 };
    const last = stops[stops.length - 1]; if (position >= last.point) return last.state;
    for (let index = 0; index < stops.length - 1; index += 1) {
      const from = stops[index], to = stops[index + 1];
      if (position < from.point || position > to.point) continue;
      const progress = smoothstep(clamp((position - from.point) / (to.point - from.point), 0, 1));
      return { x: mix(from.state.x, to.state.x, progress), y: mix(from.state.y, to.state.y, progress), scale: mix(from.state.scale, to.state.scale, progress), opacity: mix(from.state.opacity, to.state.opacity, progress), rotation: mix(from.state.rotation, to.state.rotation, progress), rings: mix(from.state.rings, to.state.rings, progress) };
    }
    return last.state;
  }
  function render(time: number): void {
    const delta = lastTime ? clamp((time - lastTime) / 1000, 1 / 240, 0.05) : 1 / 60;
    const target = scrollY + height * 0.5;
    if (!ready || motion.matches) { cursor = target; velocity = 0; ready = true; }
    else { const response = width <= 800 ? 0.28 : 0.36; const omega = 4.6 / response; const displacement = cursor - target; const decay = Math.exp(-omega * delta); cursor = target + (displacement * (1 + omega * delta) + velocity * delta) * decay; velocity = (velocity * (1 - omega * delta) - displacement * omega * omega * delta) * decay; }
    const current = sample(cursor), mobile = width <= 800, visualScroll = cursor - height * 0.5;
    const exit = smoothstep(clamp((visualScroll - exitStart) / Math.max(1, exitEnd - exitStart), 0, 1));
    coordinate.style.opacity = String(1 - exit); coordinate.style.transform = motion.matches ? "none" : `translate3d(${(exit * 18).toFixed(2)}px,${(exit * -5).toFixed(2)}px,0)`;
    if (motion.matches) { rig.style.transform = `translate3d(-50%, -50%, 0) scale(${mobile ? 0.74 : 0.82})`; rig.style.opacity = String(Math.min(current.opacity, mobile ? 0.34 : 0.46)); rings.style.opacity = String(Math.min(current.rings, 0.45)); rings.style.transform = "rotateX(5deg) rotateY(-7deg)"; planet.style.transform = "translateZ(1px)"; return; }
    const blend = 1 - Math.exp(-7.5 * delta); pointer.x += (pointer.tx - pointer.x) * blend; pointer.y += (pointer.ty - pointer.y) * blend;
    const x = current.x * width * 0.01 * (mobile ? 0.34 : 1) + pointer.x, y = current.y * height * 0.01 * (mobile ? 0.45 : 1) + pointer.y;
    const momentum = clamp(velocity / Math.max(1, height * 2.35), -1, 1), scale = (mobile ? mix(0.82, current.scale, 0.42) : current.scale) * (1 + Math.abs(momentum) * (mobile ? 0.004 : 0.01));
    rig.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0) scale(${scale.toFixed(4)}) rotateX(${(momentum * -1.2).toFixed(3)}deg) rotateY(${(momentum * 1.8).toFixed(3)}deg) rotateZ(${(current.rotation * (mobile ? 0.42 : 1) + momentum * (mobile ? 0.7 : 1.8)).toFixed(3)}deg)`;
    rig.style.opacity = String(current.opacity); rings.style.opacity = String(current.rings); rings.style.transform = `rotateX(${(5 + momentum * 2.2).toFixed(3)}deg) rotateY(${(-7 + momentum * 3.4).toFixed(3)}deg) rotateZ(${(visualScroll * 0.0035).toFixed(3)}deg)`; planet.style.transform = `translateZ(1px) rotate(${(visualScroll * 0.048 + time * 0.0003).toFixed(3)}deg)`;
  }
  function tick(time: number): void { render(time); lastTime = time; frame = window.requestAnimationFrame(tick); }
  function start(): void { if (!frame && !document.hidden) frame = window.requestAnimationFrame(tick); }
  function stop(): void { if (frame) window.cancelAnimationFrame(frame); frame = 0; }
  function onScroll(): void { scrollY = window.scrollY; }
  function onPointer(event: PointerEvent): void { if (!pointerMedia.matches || motion.matches) return; pointer.tx = (event.clientX / width - 0.5) * 10; pointer.ty = (event.clientY / height - 0.5) * 7; }
  function clearPointer(): void { pointer.tx = 0; pointer.ty = 0; }
  function refresh(): void { ready = false; lastTime = 0; measure(); scrollY = window.scrollY; render(0); }
  function onMotion(): void { refresh(); }
  measure();
  window.addEventListener("scroll", onScroll, { passive: true }); window.addEventListener("resize", refresh, { passive: true }); window.addEventListener("pointermove", onPointer, { passive: true }); document.documentElement.addEventListener("pointerleave", clearPointer, { passive: true }); document.addEventListener("visibilitychange", () => document.hidden ? stop() : start()); motion.addEventListener?.("change", onMotion);
  return { start, refresh, destroy: () => { stop(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", refresh); window.removeEventListener("pointermove", onPointer); document.documentElement.removeEventListener("pointerleave", clearPointer); motion.removeEventListener?.("change", onMotion); } };
}
