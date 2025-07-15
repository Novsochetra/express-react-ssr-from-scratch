import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import { isDev } from "../server/helper.js";

const __dirname = path.resolve();
const CLIENT_DIR = path.join(__dirname, "client");
const CLIENT_OUT_DIR = path.join(__dirname, "client");
const args = process.argv.slice(2);
const modeArg = args.find((arg) => arg.startsWith("--mode="));
const mode = modeArg ? modeArg.split("=")[1] : "queue"; // default to 'queue'

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

async function scanCssFiles() {
  const files = getCssFileNamesRecursively(CLIENT_DIR);
  console.log(`\n📂 Watching Tailwind CSS files (${mode}):`);
  const cssFilesOnly =
    files.filter(
      (file) =>
        path.extname(file) === ".css" &&
        !path.basename(file)?.includes(".out.css")
    ) || [];

  for (let i = 0; i < cssFilesOnly.length; i++) {
    await watchFile(cssFilesOnly[i], i, cssFilesOnly.length);
  }

  console.log(`\n`);
}

const processes = new Map();

async function watchFile(file, index, totalFiles) {
  if (processes.has(file)) return; // already watching

  const inputPath = file;
  const outputPath = path.join(
    path.dirname(file),
    `${path.parse(file).name}.out.css`
  );

  const isLast = index === totalFiles - 1;
  const prefix = isLast ? "└─" : "├─";

  console.log(`${prefix} ${inputPath?.replace(__dirname, "")}`);
  if (mode === "concurrent") {
    await buildCssConcurrent(inputPath, outputPath);
  } else if (mode === "queue") {
    buildCssQueue(inputPath, outputPath);
  }
}

function buildCss(inputPath, outputPath) {
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

  return spawn("npx", baseScript);
}

function buildCssQueue(inputPath, outputPath) {
  return new Promise((resolve) => {
    const proc = buildCss(inputPath, outputPath);

    proc.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`❌ Build failed: ${inputPath}`));
      }
    });
  });
}

function buildCssConcurrent(inputPath, outputPath) {
  const proc = buildCss(inputPath, outputPath);

  proc.on("exit", () => {
    processes.delete(inputPath);
  });
}

scanCssFiles();
