/**
 * Capture every registered screen for visual QA.
 * Usage: node scripts/screenshot-audit.mjs [baseUrl]
 */
import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, "../.screenshots");
const BASE = process.argv[2] || "http://127.0.0.1:5194";

const SCREENS = [
  "home", "map", "menu", "jobsList", "jobEvent", "jobEventTickets",
  "jobDetails", "jobExecution", "truckInventory", "inventoryItem",
  "warehouseStock", "myRequests", "jobInventory", "locateInventory",
  "itemDetail", "fieldAssetDetail", "installConsume",
  "ticketsList", "ticketDetail", "createTicket",
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto(BASE, { waitUntil: "networkidle" });

for (const id of SCREENS) {
  await page.selectOption(".st-screen-select", id);
  await page.waitForTimeout(350);
  const phone = page.locator(".st-phone");
  await phone.screenshot({ path: path.join(OUT, `${id}.png`) });
  console.log(`✓ ${id}`);
}

await browser.close();
console.log(`\nSaved ${SCREENS.length} screenshots to ${OUT}`);
