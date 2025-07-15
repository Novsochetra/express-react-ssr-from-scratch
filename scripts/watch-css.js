import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { isDev } from "../server/helper.js";

const __dirname = path.resolve();
const CLIENT_DIR = path.join(__dirname, "client");
const CLIENT_OUT_DIR = path.join(__dirname, "client");

function getCssFileNamesRecursively(dir) {
  let results = [];

  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    if (file.isDirectory()) {
      results = results.concat(getCssFileNamesRecursively(fullPath));
    } else if (file.isFile() && path.extname(file.name) === ".css") {
      results.push(fullPath); // just file name without ext
    }
  }

  return results;
}

function scanCssFiles() {
  const files = getCssFileNamesRecursively(CLIENT_DIR);
  console.log(`\n📂 Watching Tailwind CSS files:`);
  const cssFilesOnly =
    files.filter(
      (file) =>
        path.extname(file) === ".css" &&
        !path.basename(file)?.includes(".out.css")
    ) || [];

  cssFilesOnly.forEach((file, index) =>
    watchFile(file, index, cssFilesOnly.length)
  );

  console.log(`\n`);
}

const processes = new Map();

function watchFile(file, index, totalFiles) {
  if (processes.has(file)) return; // already watching

  const inputPath = file;
  const outputPath = path.join(
    path.dirname(file),
    `${path.parse(file).name}.out.css`
  );

  const isLast = index === totalFiles - 1;
  const prefix = isLast ? "└─" : "├─";

  console.log(`${prefix} ${inputPath?.replace(__dirname, "")}`);

  const baseScript = [
    "tailwindcss",
    "-i",
    inputPath,
    "-o",
    outputPath,
    "--minify",
  ];

  if (isDev) {
    baseScript.push("--watch");
  }

  const proc = spawn("npx", baseScript);

  processes.set(file, proc);

  proc.on("exit", () => {
    processes.delete(file);
  });
}

scanCssFiles();
