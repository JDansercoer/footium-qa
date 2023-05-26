import { test, expect } from "@playwright/test";

test("clicking on get started links to the correct Medium article", async ({ page, context }) => {
  await page.goto('https://footium.club/')
  await expect(page.getByText('Get Started')).toBeVisible()
  await page.getByText('Get Started').click()
  // waitForLoadState() does not work in this case
  await page.waitForTimeout(2000) 
  let pages = await context.pages()
  expect(await pages[1].title()).toContain('How to get started with Footium. For anyone that has been following… | by Sam | Footium | Footium | Medium')
})

test("checks that all the necessary investors (funds, DAOs and angels) are present on the page", async ({ page }) => {
  await page.goto('https://footium.club/')
  await expect(page.getByText('Backed VC')).toBeVisible()
  await expect(page.getByText('Animoca Brands')).toBeVisible()
  await expect(page.getByText('Stride VC')).toBeVisible()
  await expect(page.getByText('Entreé Capital')).toBeVisible()
  await expect(page.getByText('Concept Ventures')).toBeVisible()
  await expect(page.getByText('IVC')).toBeVisible()
  await expect(page.getByText('Encode Club')).toBeVisible()
  await expect(page.getByText('Merit Circle')).toBeVisible()
  await expect(page.getByText('BlackPool')).toBeVisible()
  await expect(page.getByText('BAYZ')).toBeVisible()
  await expect(page.getByText('Yield Guild Games SEA')).toBeVisible()
})

test("clicking PLAY button in the top right corner redirect you to /footium.club/game", async ({ page }) => {
  await page.goto('https://footium.club/')
  await page.locator('[class="chakra-button css-1723hur"]').click()
  // waitForLoadState() does not work in this case
  await page.waitForTimeout(2000) 
  await expect(page.getByText('Welcome to Footium')).toBeVisible()
})

// not checking logos as they are dynamic, teams change position throughout the season
test("check that the Competition table shows 12 clubs", async ({ page }) => {
  await page.goto('https://footium.club/game')
  await expect(page.getByText('Welcome to Footium')).toBeVisible()
  const list = page.locator('[class="h-16 relative w-full CompetitionTable_row__4EqBo"]')
  await expect(list).toHaveCount(12)
})
