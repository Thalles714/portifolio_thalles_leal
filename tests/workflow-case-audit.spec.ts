import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const storyPath = "/projects/workflow/";

async function openStory(page: Page, hash = "") {
  await page.goto(`${storyPath}${hash}`);
  await expect(page.locator("html")).toHaveAttribute("data-story-ready", "true");
}

test("renders eleven independent horizontal chapters without vertical page scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openStory(page);

  await expect(page.locator("[data-chapter]")).toHaveCount(11);
  await expect(page.locator("[data-story-target]")).toHaveCount(11);
  await expect(page.locator("img")).toHaveCount(0);
  await expect(page.locator(".dotted-surface")).toHaveCount(0);

  const geometry = await page.evaluate(() => {
    const deck = document.querySelector<HTMLElement>("[data-story-deck]");
    const chapters = [...document.querySelectorAll<HTMLElement>("[data-chapter]")];
    return {
      bodyOverflow: getComputedStyle(document.body).overflow,
      deckWidth: deck?.clientWidth ?? 0,
      deckHeight: deck?.clientHeight ?? 0,
      deckScrollWidth: deck?.scrollWidth ?? 0,
      deckScrollHeight: deck?.scrollHeight ?? 0,
      chapters: chapters.map((chapter) => ({
        width: chapter.clientWidth,
        height: chapter.clientHeight,
        horizontalOverflow: chapter.scrollWidth - chapter.clientWidth,
        verticalOverflow: chapter.scrollHeight - chapter.clientHeight,
      })),
    };
  });

  expect(geometry.bodyOverflow).toBe("hidden");
  expect(geometry.deckWidth).toBe(390);
  expect(geometry.deckHeight).toBe(844);
  expect(geometry.deckScrollWidth).toBe(390 * 11);
  expect(geometry.deckScrollHeight).toBe(844);
  geometry.chapters.forEach((chapter) => {
    expect(chapter).toEqual({ width: 390, height: 844, horizontalOverflow: 0, verticalOverflow: 0 });
  });
});

test("keeps every mobile composition above the fixed story dock", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openStory(page);

  const measurements = await page.evaluate(() => {
    const dockTop = document.querySelector<HTMLElement>(".story-dock")!.getBoundingClientRect().top;
    return [...document.querySelectorAll<HTMLElement>("[data-chapter]")].map((chapter) => {
      const content = [...chapter.querySelector<HTMLElement>(".chapter-shell")!.children]
        .map((element) => (element as HTMLElement).getBoundingClientRect().bottom);
      return { id: chapter.id, contentBottom: Math.max(...content), dockTop };
    });
  });

  measurements.forEach(({ contentBottom, dockTop }) => expect(contentBottom).toBeLessThan(dockTop - 20));
});

test("keeps every chapter readable across short desktop viewports", async ({ page }) => {
  await openStory(page);

  const viewports = [
    { width: 1024, height: 600 },
    { width: 1280, height: 600 },
    // A 1366x768 monitor commonly leaves about 594px after browser chrome.
    { width: 1366, height: 594 },
    { width: 1366, height: 768 },
    { width: 1440, height: 700 },
  ];

  const assertCurrentLayout = async (viewport: { width: number; height: number }, language: string) => {
    await page.setViewportSize(viewport);
    const measurements = await page.evaluate(() => {
      const dockTop = document.querySelector<HTMLElement>(".story-dock")!.getBoundingClientRect().top;
      const topbarBottom = document.querySelector<HTMLElement>(".story-topbar")!.getBoundingClientRect().bottom;
      return [...document.querySelectorAll<HTMLElement>("[data-chapter]")].map((chapter) => {
        const shell = chapter.querySelector<HTMLElement>(".chapter-shell")!;
        const content = [...shell.children].map((element) => (element as HTMLElement).getBoundingClientRect());
        return {
          id: chapter.id,
          contentTop: Math.min(...content.map((rect) => rect.top)),
          contentBottom: Math.max(...content.map((rect) => rect.bottom)),
          dockTop,
          topbarBottom,
        };
      });
    });

    measurements.forEach(({ id, contentTop, contentBottom, dockTop, topbarBottom }) => {
      const context = `${id} at ${viewport.width}x${viewport.height} (${language})`;
      expect.soft(contentTop, `${context} should clear the top bar`).toBeGreaterThanOrEqual(topbarBottom + 12);
      expect.soft(contentBottom, `${context} should clear the story dock`).toBeLessThanOrEqual(dockTop - 20);
    });
  };

  for (const viewport of viewports) await assertCurrentLayout(viewport, "initial language");

  await page.locator("[data-menu-toggle]").click();
  await page.locator("[data-language-toggle]").click();
  await page.keyboard.press("Escape");
  await assertCurrentLayout({ width: 1366, height: 594 }, "alternate language");
});

test("supports direct navigation, keyboard navigation and browser history", async ({ page }) => {
  await openStory(page, "#construcao");
  await expect(page.locator('[data-story-target="construcao"]')).toHaveAttribute("aria-current", "step");
  await expect(page).toHaveURL(/#construcao$/);

  await page.locator("[data-story-deck]").press("ArrowRight");
  await expect(page).toHaveURL(/#protecao$/);
  await expect(page.locator('[data-story-target="protecao"]')).toHaveAttribute("aria-current", "step");

  await page.goBack();
  await expect(page).toHaveURL(/#construcao$/);
  await expect(page.locator('[data-story-target="construcao"]')).toHaveAttribute("aria-current", "step");

  await page.goForward();
  await expect(page).toHaveURL(/#protecao$/);
});

test("updates progress, boundaries and the contextual final state", async ({ page }) => {
  await openStory(page);
  const previous = page.locator("[data-story-prev]");
  const next = page.locator("[data-story-next]");
  await expect(previous).toBeDisabled();
  await expect(next).toBeEnabled();

  await page.locator('[data-story-target="convite"]').click();
  await expect(page).toHaveURL(/#convite$/);
  await expect(next).toBeDisabled();
  await expect(page.locator("[data-current-number]")).toHaveText("11");
  await expect(page.locator('[data-story-target="convite"]')).toHaveAttribute("aria-current", "step");
});

test("advances only one chapter per pointer drag", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await openStory(page);

  await page.mouse.move(820, 610);
  await page.mouse.down();
  await page.mouse.move(650, 610, { steps: 2 });
  await page.mouse.move(390, 610, { steps: 3 });
  await page.mouse.up();

  await expect(page).toHaveURL(/#origem$/);
  await expect(page.locator('[data-story-target="origem"]')).toHaveAttribute("aria-current", "step");
});

test("preserves the home menu and switches the complete story language", async ({ page }) => {
  await openStory(page, "#experiencia");
  const initialLanguage = await page.locator("html").getAttribute("lang");

  await page.locator("[data-menu-toggle]").click();
  await expect(page.locator("#menu-panel")).toHaveClass(/is-open/);
  await expect(page.locator("[data-language-toggle]")).toBeVisible();
  await page.locator("[data-language-toggle]").click();

  if (initialLanguage === "pt-BR") {
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("#experience-title")).toContainText("I turned signal");
    await expect(page.locator('[data-product-panel="action"]')).toContainText("Validate the legal copy with the client");
  } else {
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
    await expect(page.locator("#experience-title")).toContainText("Eu transformei sinal");
    await expect(page.locator('[data-product-panel="action"]')).toContainText("Validar o texto jurídico com o cliente");
  }

  await page.keyboard.press("Escape");
  await expect(page.locator("#menu-panel")).not.toHaveClass(/is-open/);
});

test("uses official technology symbols and honest evidence", async ({ page }) => {
  await openStory(page, "#construcao");
  await expect(page.locator(".tech-bench li")).toHaveCount(9);
  await expect(page.locator(".tech-bench [data-tech-icon] svg")).toHaveCount(9);
  await expect(page.locator(".tech-bench")).toContainText("PostgreSQL");
  await expect(page.locator(".tech-bench")).toContainText("GitHub Actions");

  await page.locator('[data-story-target="protecao"]').click();
  await expect(page.locator(".quality-proof")).toContainText("Playwright + CI + build");
  await expect(page.locator(".quality-proof")).toContainText("cross-tenant + IDOR");
});

test("turns the repetitive chapters into distinct interactive instruments", async ({ page }) => {
  await openStory(page, "#origem");
  const noiseSources = page.locator("[data-noise-source]");
  await noiseSources.nth(0).click();
  await noiseSources.nth(1).click();
  await expect(page.locator("[data-noise-count]")).toHaveText("2 / 4");

  await page.locator('[data-story-target="ideia"]').click();
  await expect(page.locator("[data-focus-range]")).toHaveCount(0);
  await page.locator("[data-idea-toggle]").click();
  await expect(page.locator("[data-idea-focus]")).toHaveClass(/is-resolved/);

  await page.locator('[data-story-target="modelo"]').click();
  await page.locator("[data-domain-node]").last().click();
  await expect(page.locator("[data-domain-title]")).toHaveText(/Tarefa|Task/);

  await page.locator('[data-story-target="experiencia"]').click();
  await page.locator('[data-product-step="action"]').click();
  await expect(page.locator('[data-product-panel="action"]')).toBeVisible();
  await expect(page.locator('[data-product-panel="exception"]')).toBeHidden();

  await page.locator('[data-story-target="decisoes"]').click();
  await page.locator("[data-decision-choice]").nth(2).click();
  await expect(page.locator("[data-decision-title]")).toHaveText(/Regras|Rules/);
});

test("keeps the decision desk size stable when switching choices", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("portfolio-language", "pt"));
  await page.setViewportSize({ width: 1534, height: 768 });
  await openStory(page, "#decisoes");
  await page.waitForTimeout(800);
  const desk = page.locator("[data-decision-desk]");
  const choices = page.locator("[data-decision-choice]");
  const baseline = await desk.boundingBox();
  expect(baseline).not.toBeNull();

  for (let index = 0; index < await choices.count(); index += 1) {
    await choices.nth(index).click();
    const current = await desk.boundingBox();
    expect(current).not.toBeNull();
    expect(Math.abs(current!.height - baseline!.height)).toBeLessThan(0.5);
    expect(Math.abs(current!.y - baseline!.y)).toBeLessThan(0.5);
  }
});

test("simulates a protected request and lets the reader reorder the final chapters", async ({ page }) => {
  await openStory(page, "#protecao");
  await page.locator("[data-security-run]").click();
  await expect(page.locator("[data-security-output]")).toContainText(/bloqueado|blocked/, { timeout: 2_000 });
  await expect(page.locator("[data-security-lab]")).toHaveClass(/is-blocked/);

  await page.locator('[data-story-target="aprendizados"]').click();
  await page.locator('[data-lesson-principle="security"]').click();
  await expect(page.locator('[data-lesson-principle="security"]')).toHaveAttribute("aria-selected", "true");
  await expect(page.locator('[data-lesson-principle="security"] p')).toContainText(/multi-tenant/i);
  await expect(page.locator(".lesson-core, .lesson-vectors")).toHaveCount(0);

  await page.locator('[data-story-target="futuro"]').click();
  await page.locator("[data-future-step]").nth(2).click();
  await expect(page.locator("[data-future-step]").nth(2)).toHaveAttribute("aria-pressed", "true");
});

test("expands each learning as a stable typographic rail", async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await openStory(page, "#aprendizados");
  const principles = page.locator("[data-lesson-principle]");
  await expect(principles).toHaveCount(4);
  await expect(page.locator(".lesson-core, .lesson-vectors")).toHaveCount(0);

  const firstWidth = (await principles.first().boundingBox())!.width;
  const collapsedWidth = (await principles.nth(1).boundingBox())!.width;
  expect(firstWidth).toBeGreaterThan(collapsedWidth * 2);

  await principles.nth(3).click();
  await expect(principles.nth(3)).toHaveAttribute("aria-selected", "true");
  await expect(principles.nth(3).locator("p")).toBeVisible();
  expect((await principles.nth(3).boundingBox())!.width).toBeGreaterThan(collapsedWidth * 2);
});

test("keeps numbered internal topics only where sequence carries meaning", async ({ page }) => {
  await openStory(page, "#modelo");
  await expect(page.locator(".domain-map [data-domain-node] > b")).toHaveCount(5);
  await expect(page.locator(".domain-map [data-domain-node] > span").first()).not.toContainText(/^\s*\d/);

  await page.locator('[data-story-target="experiencia"]').click();
  await expect(page.locator(".product-steps b")).toHaveCount(3);

  await page.locator('[data-story-target="decisoes"]').click();
  await expect(page.locator(".decision-switches button > span")).toHaveCount(0);
  await page.locator('[data-story-target="protecao"]').click();
  await expect(page.locator(".trust-pipeline li > span")).toHaveCount(0);
  await page.locator('[data-story-target="aprendizados"]').click();
  await expect(page.locator("[data-lesson-card]")).toHaveCount(0);
});

test("uses a distinct black SVG icon for every domain entity", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("portfolio-language", "pt"));
  await openStory(page, "#modelo");

  const icons = page.locator(".domain-map svg.domain-symbol");
  await expect(icons).toHaveCount(5);
  await expect(icons.first()).toHaveCSS("color", "rgb(16, 18, 22)");
  await expect(page.locator('[data-domain-kind="deliverable"] .domain-symbol')).toHaveCSS("color", "rgb(16, 18, 22)");

  const drawings = await icons.evaluateAll((items) => items.map((icon) => icon.innerHTML));
  expect(new Set(drawings).size).toBe(5);
  await expect(page.locator('[data-domain-kind="deliverable"]')).toContainText("Entrega");
  await expect(page.locator('[data-domain-kind="deliverable"]')).not.toContainText("Entregável");
});

test("states the public demo limits without implying undocumented research", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("portfolio-language", "pt"));
  await openStory(page);

  await expect(page.locator(".demo-disclosure")).toContainText("Demo pública");
  await expect(page.locator(".demo-disclosure")).toContainText("Dados fictícios");
  await expect(page.locator(".demo-disclosure")).toContainText("Somente leitura");

  await page.locator('[data-story-target="origem"]').click();
  await expect(page.locator("#origem .chapter-lead")).toContainText("Eu parti de um cenário recorrente");
});

test("bridges the Workflow conclusion into the Nítido case in both languages", async ({ page }) => {
  await page.addInitScript(() => window.localStorage.setItem("portfolio-language", "pt"));
  await openStory(page, "#convite");

  const nextCase = page.locator(".next-case");
  await expect(nextCase).toHaveAttribute("href", "/projects/nitido/");
  await expect(page.locator("#closing-title")).toContainText("Eu levei a mesma clareza");
  await expect(page.locator("#convite .chapter-lead")).toContainText("No Nítido");
  await expect(nextCase).toContainText("Os dados ficam no dispositivo");

  await page.locator("[data-menu-toggle]").click();
  await page.locator("[data-language-toggle]").click();
  await expect(page.locator("#closing-title")).toContainText("I brought the same clarity");
  await expect(nextCase).toContainText("Data stays on-device");
});

test("keeps CTA copy visible at rest and on hover", async ({ page }) => {
  await openStory(page);
  const primary = page.locator("#abertura .story-button--primary");
  await expect(primary).toBeVisible();
  await expect(primary).toContainText(/Explore demo|Explorar demo/);
  await primary.hover();
  await expect(primary).toContainText(/Explore demo|Explorar demo/);
});

test("honors reduced motion without hiding chapter content", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openStory(page, "#futuro");
  await expect(page.locator("#futuro")).toHaveClass(/is-active/);
  await expect(page.locator("#future-title")).toBeVisible();
  const transition = await page.locator("#futuro .chapter-title").evaluate((element) => getComputedStyle(element).transitionDuration);
  expect(["0s", "0.001s"]).toContain(transition);
});

test("has no serious accessibility violations in the opening and product chapters", async ({ page }) => {
  await openStory(page);
  let report = await new AxeBuilder({ page }).analyze();
  let serious = report.violations.filter((violation) => ["critical", "serious"].includes(violation.impact || ""));
  expect(serious).toEqual([]);

  await page.locator('[data-story-target="experiencia"]').click();
  report = await new AxeBuilder({ page }).analyze();
  serious = report.violations.filter((violation) => ["critical", "serious"].includes(violation.impact || ""));
  expect(serious).toEqual([]);
});
