import puppeteer from 'puppeteer-core';

const executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const browser = await puppeteer.launch({ executablePath, headless: true, args: ['--no-sandbox', '--disable-gpu'] });
const page = await browser.newPage();

async function checkViewport(width, height, name) {
  await page.setViewport({ width, height, deviceScaleFactor: 1, isMobile: width < 700 });
  await page.goto('http://localhost:5173/?smoke=' + name, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: `.omx/artifacts/${name}.png`, fullPage: false });
  const metrics = await page.evaluate(() => ({
    width: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
    text: document.body.innerText,
  }));
  if (metrics.scrollWidth > width + 2 || metrics.bodyScrollWidth > width + 2) {
    throw new Error(`${name} has horizontal overflow: viewport=${width}, doc=${metrics.scrollWidth}, body=${metrics.bodyScrollWidth}`);
  }
  return metrics;
}

const mobile = await checkViewport(390, 1100, 'second-brain-puppeteer-mobile');
const desktop = await checkViewport(1440, 1200, 'second-brain-puppeteer-desktop');

const startText = await page.$eval('body', el => el.textContent || '');
if (!startText.includes('Second Brain makes AGI-masked support needs visible')) throw new Error('Landing thesis missing');

await page.click('button.primary-action');
await page.waitForSelector('#persona-title');
await page.click('button.primary-action');
await page.waitForSelector('#consent-title');
await page.click('button.primary-action');
await page.waitForSelector('#companion-title');
for (let i = 0; i < 5; i += 1) {
  await page.click('button.primary-action');
}
await page.waitForSelector('#memory-title');
const memoryText = await page.$eval('body', el => el.textContent || '');
if (!memoryText.includes('Episodic store') || !memoryText.includes('Semantic store') || !memoryText.includes('Procedural store') || !memoryText.includes('Working memory')) throw new Error('Memory architecture stores missing');
await page.click('button.primary-action');
await page.waitForSelector('#dashboard-title');
const dashboardText = await page.$eval('body', el => el.textContent || '');
for (const expected of [
  'AGI may be masking functional change',
  'Validation readiness',
  'Somchai',
  'Araya',
]) {
  if (!dashboardText.includes(expected)) throw new Error(`Missing expected dashboard text: ${expected}`);
}
await page.click('button[role="tab"]:nth-of-type(2)');
const somchai = await page.$eval('body', el => el.textContent || '');
if (!somchai.includes('Social-cue') || !somchai.includes('Financial judgment')) throw new Error('Somchai variant missing social/financial signals');
await page.click('button[role="tab"]:nth-of-type(3)');
const araya = await page.$eval('body', el => el.textContent || '');
if (!araya.includes('Autonomous vs AGI-assisted') || !araya.includes('Monthly accounting')) throw new Error('Araya variant missing communication/finance signals');

console.log(JSON.stringify({ ok: true, mobile: { width: mobile.width, scrollWidth: mobile.scrollWidth }, desktop: { width: desktop.width, scrollWidth: desktop.scrollWidth } }, null, 2));
await browser.close();
