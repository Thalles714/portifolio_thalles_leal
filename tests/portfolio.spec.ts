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
  await expect(page.locator("[data-project-cover]")).toHaveCount(5);
  await expect(page.locator(".contact-channel--github")).toHaveAttribute("href", /github\.com/);
  await expect(page.locator(".contact-channel--linkedin")).toHaveAttribute("href", /linkedin\.com/);
});

test("has no critical accessibility violations", async ({ page }) => {
  await page.goto("/");
  const report = await new AxeBuilder({ page }).analyze();
  const critical = report.violations.filter((violation) => ["critical", "serious"].includes(violation.impact || ""));
  expect(critical).toEqual([]);
});
