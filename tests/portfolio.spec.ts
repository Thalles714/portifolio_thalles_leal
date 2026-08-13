import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("loads the portfolio with its main landmark and title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Thalles Leal/);
  await expect(page.locator("main#main-content")).toBeVisible();
  await expect(page.locator("h1")).toBeVisible();
});

test("menu opens, closes with Escape and keeps navigation available", async ({ page }) => {
  await page.goto("/");
  const menu = page.locator("#menu-toggle");
  await expect(page.locator("html")).toHaveAttribute("data-navigation-ready", "true");
  await menu.click();
  await expect(page.locator("#menu-panel")).toHaveClass(/is-open/);
  await page.keyboard.press("Escape");
  await expect(page.locator("#menu-panel")).not.toHaveClass(/is-open/);
});

test("language switch updates the document language", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-navigation-ready", "true");
  await page.locator("#menu-toggle").click();
  await page.locator("[data-language-toggle]").click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
});

test("project navigator and contact links are available", async ({ page }) => {
  await page.goto("/");
  await page.locator("#project-navigator").scrollIntoViewIfNeeded();
  await expect(page.locator("[data-project-cover]")).toHaveCount(4);
  await expect(page.locator(".contact-channel--github")).toHaveAttribute("href", /github\.com/);
  await expect(page.locator(".contact-channel--linkedin")).toHaveAttribute("href", /linkedin\.com/);
});

test("orbital planet stays hidden through the profile-to-signal handoff", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-navigation-ready", "true");

  await page.evaluate(() => {
    const signal = document.querySelector<HTMLElement>("#signal");
    if (!signal) throw new Error("Signal section is missing");
    window.scrollTo(0, signal.offsetTop - window.innerHeight * 0.7);
  });
  await page.waitForTimeout(900);

  const orbitalOpacity = await page.locator("#orbital-rig").evaluate((element) =>
    Number.parseFloat(window.getComputedStyle(element).opacity)
  );
  const transitionGap = await page.evaluate(() => {
    const stage = document.querySelector<HTMLElement>(".profile-prologue-stage");
    const signal = document.querySelector<HTMLElement>("#signal");
    if (!stage || !signal) throw new Error("Profile handoff elements are missing");
    return signal.getBoundingClientRect().top - stage.getBoundingClientRect().bottom;
  });

  expect(orbitalOpacity).toBeLessThanOrEqual(0.08);
  expect(transitionGap).toBeLessThanOrEqual(1);
});

test("final sections define a restrained dynamic orbital path", async ({ page }) => {
  await page.goto("/");
  const states = await page.locator("#experience, #availability, #contact, #footer").evaluateAll((sections) =>
    sections.map((section) => {
      const element = section as HTMLElement;
      return {
        x: Number(element.dataset.sceneX),
        y: Number(element.dataset.sceneY),
        scale: Number(element.dataset.sceneScale),
        opacity: Number(element.dataset.sceneOpacity),
        rotation: Number(element.dataset.sceneRotation),
        rings: Number(element.dataset.sceneRings)
      };
    })
  );

  expect(new Set(states.map(({ x, y, scale, rotation }) => `${x}|${y}|${scale}|${rotation}`)).size).toBe(4);
  expect(new Set(states.map(({ opacity }) => opacity)).size).toBe(1);
  expect(new Set(states.map(({ rings }) => rings)).size).toBe(1);
  expect(Math.max(...states.map(({ scale }) => scale)) - Math.min(...states.map(({ scale }) => scale))).toBeLessThanOrEqual(0.18);
});

test("final content sections share one continuous background mask", async ({ page }) => {
  await page.goto("/");
  const masks = await page.locator("#experience, #availability, #contact").evaluateAll((sections) =>
    sections.map((section) => {
      const style = window.getComputedStyle(section, "::before");
      return `${style.backgroundColor}|${style.backgroundImage}`;
    })
  );

  expect(new Set(masks).size).toBe(1);
  expect(masks[0]).toContain("rgba(5, 5, 6");
  expect(masks[0]).toContain("none");
});

test("project navigator responds to card clicks and horizontal dragging", async ({ page }, testInfo) => {
  await page.goto("/");
  const navigator = page.locator("#project-navigator");
  await navigator.scrollIntoViewIfNeeded();

  const workflow = page.locator('[data-project-id="workflow"]');
  const nitido = page.locator('[data-project-id="nitido"]');
  await expect(workflow).toHaveAttribute("aria-current", "true");
  await nitido.click();
  await expect(nitido).toHaveAttribute("aria-current", "true");
  await expect(page.locator("[data-project-active-title]")).toHaveText("Nítido");

  // Playwright's mouse API does not emulate the touch gesture path used on mobile.
  // Selection remains covered on every device; physical dragging is verified on desktop.
  if (testInfo.project.name === "mobile") return;

  await expect.poll(async () => nitido.evaluate((card) => {
    const cardRect = card.getBoundingClientRect();
    const viewportRect = card.closest(".project-coverflow__viewport")?.getBoundingClientRect();
    if (!viewportRect) return Number.POSITIVE_INFINITY;
    return Math.abs((cardRect.left + cardRect.width / 2) - (viewportRect.left + viewportRect.width / 2));
  })).toBeLessThan(6);

  const box = await nitido.boundingBox();
  if (!box) throw new Error("Selected project card is not visible");
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 180, box.y + box.height / 2, { steps: 8 });
  await page.mouse.up();

  await expect(page.locator('[data-project-id="voe"]')).toHaveAttribute("aria-current", "true");
  await expect(page).toHaveURL(/\/$/);
});

test("project cards only open after they have reached the center", async ({ page }) => {
  await page.goto("/");
  const navigator = page.locator("#project-navigator");
  await navigator.scrollIntoViewIfNeeded();
  const nitido = page.locator('[data-project-id="nitido"]');

  await page.evaluate(() => {
    const card = document.querySelector<HTMLAnchorElement>('[data-project-id="nitido"]');
    if (!card) throw new Error("Nítido project card is missing");
    card.click();
    card.click();
  });

  await expect(page).toHaveURL(/\/$/);
  await expect(nitido).toHaveAttribute("aria-current", "true");
  await expect.poll(async () => nitido.evaluate((card) => {
    const cardRect = card.getBoundingClientRect();
    const viewportRect = card.closest(".project-coverflow__viewport")?.getBoundingClientRect();
    if (!viewportRect) return Number.POSITIVE_INFINITY;
    return Math.abs((cardRect.left + cardRect.width / 2) - (viewportRect.left + viewportRect.width / 2));
  })).toBeLessThan(6);

  await nitido.click();
  await expect(page).toHaveURL(/\/projects\/nitido\/$/);
});

test("project navigator loops with controls", async ({ page }) => {
  await page.goto("/");
  const navigator = page.locator("#project-navigator");
  await navigator.scrollIntoViewIfNeeded();

  const workflow = page.locator('[data-project-id="workflow"]');
  const solar = page.locator('[data-project-id="solar"]');
  const previous = page.locator("[data-project-previous]");
  const next = page.locator("[data-project-next]");

  await expect(previous).toBeEnabled();
  await previous.click();
  await expect(solar).toHaveAttribute("aria-current", "true");
  await next.click();
  await expect(workflow).toHaveAttribute("aria-current", "true");

});

test("featured projects have focused case-study pages", async ({ page }) => {
  await page.goto("/projects/workflow/");
  await expect(page).toHaveTitle(/Workflow/);
  await expect(page.locator("h1")).toContainText("Workflow");
  await expect(page.getByRole("link", { name: /Open live project/i })).toHaveAttribute("href", /workflow-app/);

  await page.goto("/projects/nitido/");
  await expect(page).toHaveTitle(/Nítido/);
  await expect(page.locator("h1")).toContainText("Nítido");
  await expect(page.getByRole("link", { name: /Open live project/i })).toHaveAttribute("href", /nitido/);
});

test("has no critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  const report = await new AxeBuilder({ page }).analyze();
  const critical = report.violations.filter((violation) => ["critical", "serious"].includes(violation.impact || ""));
  expect(critical).toEqual([]);
});
