import puppeteer from "puppeteer";

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const delay = 200;

async function login() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: ["--start-maximized"],
  });
  const page = (await browser.pages())[0];

  // 登录用户
  await page.goto("http://10.10.30.204:9000/#/login");

  const un = '.login-main input[placeholder="请输入账号"]';
  const pw = '.login-main input[placeholder="请输入密码"]';
  const bt = ".login-main button";
  await page.waitForSelector(un);

  await sleep(2000);

  const $username = await page.$(un);
  await $username?.type("admin", { delay });

  const $password = await page.$(pw);
  await $password?.type("1112111", { delay });

  await sleep(1000);

  const $button = await page.$(bt);
  await $button?.click();

  const response = await page.waitForResponse("http://10.10.30.204:9000/api/user/userLogin");
  const data = await response.json();

  if (data?.code !== 2000) {
    page.evaluate((data) => {
      window.alert(`登录失败：${data?.msg}`);
    }, data);
  }

  await sleep(1000);

  // 制作文本素材
  await page.goto("http://10.10.30.204:9000/#/material/upload");

  await page.waitForSelector('button[label="material.textProduction"]');
  const $textBtn = await page.$('button[label="material.textProduction"]');
  await $textBtn?.click();

  await page.waitForSelector('input[placeholder="请输入文本名称"]');
  const $textName = await page.$('input[placeholder="请输入文本名称"]');
  await $textName?.type("测试123", { delay });

  await page.mouse.click(723, 314);
  await sleep(1000);
  await page.mouse.click(695, 353);

  const $textContent = await page.$('textarea[placeholder="请输入文本内容"]');
  await $textContent?.type("测试123", { delay });

  const $textDescription = await page.$('textarea[placeholder="请输入素材描述"]');
  await $textDescription?.type("测试123", { delay });

  await sleep(1000);
  page.click('.bh-form-dialog:not([style*="display: none"]) .el-button');

  page.on("response", (event) => {
    console.log(event);
  });
}

login();
