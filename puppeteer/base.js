import puppeteer from "puppeteer";

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
export const delay = 200;

export async function useBrowser(options = {}) {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: ["--start-maximized"],
    ...options,
  });
  const page = (await browser.pages())[0];

  return { browser, page };
}
