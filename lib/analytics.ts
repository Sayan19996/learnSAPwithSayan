import fs from "fs";
import path from "path";

type Event = { type: string; [k: string]: any };

const counts: Record<string, number> = {};
const DATA_FILE = path.resolve(process.cwd(), "data", "analytics.log");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export function recordEvent(type: string, event: Event) {
  counts[type] = (counts[type] || 0) + 1;
  try {
    ensureDataDir();
    const line = JSON.stringify({ type, event, ts: Date.now() }) + "\n";
    fs.appendFileSync(DATA_FILE, line, { encoding: "utf8" });
  } catch (e) {
    // ignore file write errors on serverless
  }
}

export function getCounts(filterType?: string) {
  if (filterType) return { [filterType]: counts[filterType] || 0 };
  return counts;
}
