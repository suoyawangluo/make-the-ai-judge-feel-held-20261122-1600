import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One slow, concrete text for the relaxation judge: an evening at rest.
// The calm comes from the scene itself — a boiled kettle gone quiet,
// rain in no hurry, a chair that holds weight without asking anything
// of it — and the last line leaves the reader with nothing required.
const ENTRY =
  "The kettle has boiled and gone quiet again. " +
  "Rain finds the window in no hurry. " +
  "Somewhere a clock ticks once, then lets the silence have the rest. " +
  "The chair holds your weight without asking anything of it. " +
  "Evening keeps the light low. Nothing else is required of you now.";

const outDir = "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// Output check: read it back and verify the gate (1-280 Unicode code
// points, not only whitespace) before declaring success.
const written = readFileSync(outPath, "utf8");
const codePoints = [...written].length;
if (codePoints < 1 || codePoints > 280) {
  throw new Error(`entry.txt is ${codePoints} code points, outside 1-280`);
}
if (written.trim().length === 0) {
  throw new Error("entry.txt is whitespace-only");
}
const digest = createHash("sha256").update(written, "utf8").digest("hex");
console.log(`wrote ${outPath} (${codePoints} code points, sha256 ${digest})`);
