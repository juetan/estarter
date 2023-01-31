import { useBrowser, delay, sleep } from "./base.js";

async function main() {
  const { page } = await useBrowser();

  await page.goto("https://juejin.cn/");

  await page.waitForSelector('input[type="search"]');
  await page.type('input[type="search"]', "puppeteer", { delay });

  // @ts-ignore
  await page.$eval(".search-form", (el) => el.submit());

  await page.waitForSelector(".result-list");

  await page.$eval(".main-list", (el) => {
    console.log(el);
  });
}

main();
