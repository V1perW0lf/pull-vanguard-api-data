import express from "express";
import puppeteer from "puppeteer-core";

const app = express();

app.get("/price", async (_, res) => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ],
    headless: true
  });

  const page = await browser.newPage();
  await page.goto(
    "https://workplace.vanguard.com/investments/product-details/fund/1685",
    { waitUntil: "networkidle2" }
  );

  const price = await page.$eval(
    'span[data-rpa-tag-id="pp-cp-nav-price"]',
    el => el.textContent.trim()
  );

  await browser.close();
  res.send(price);
});

app.listen(3000);
