#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CASES_PATH = path.join(ROOT, "eval", "furina_voice_cases.md");

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const part = argv[i];
    if (!part.startsWith("--")) {
      args._.push(part);
      continue;
    }
    const key = part.slice(2);
    const next = argv[i + 1];
    if (next && !next.startsWith("--")) {
      args[key] = next;
      i += 1;
    } else {
      args[key] = true;
    }
  }
  return args;
}

function usage() {
  return `Furina voice eval helper

Usage:
  node scripts/furina-eval.mjs list
  node scripts/furina-eval.mjs prompt --case 3
  node scripts/furina-eval.mjs prompt --all
  node scripts/furina-eval.mjs json

This helper parses eval/furina_voice_cases.md and prints stable manual-eval prompts.
It does not call a model or send data to any external service.
`;
}

function readCases() {
  const raw = fs.readFileSync(CASES_PATH, "utf8");
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^\|\s*\d+\s*\|/.test(line))
    .map((line) => line.slice(1, -1).split("|").map((cell) => cell.trim()))
    .map(([id, input, expected, avoid]) => ({
      id: Number(id),
      input,
      expected,
      avoid
    }));
}

function selectCases(cases, args) {
  if (args.all) return cases;
  if (!args.case) return cases.slice(0, 1);
  const id = Number(args.case);
  const match = cases.find((item) => item.id === id);
  if (!match) throw new Error(`Unknown case: ${args.case}`);
  return [match];
}

function printList(cases) {
  for (const item of cases) {
    console.log(`${item.id}. ${item.input}`);
    console.log(`   expected: ${item.expected}`);
    console.log(`   avoid: ${item.avoid}`);
  }
}

function printPrompt(cases) {
  for (const item of cases) {
    console.log(`## Case ${item.id}`);
    console.log("");
    console.log("Use `src/prompt/runtime_lite.md` plus the shared resource guidance from:");
    console.log("- `furina_resource/02_personality.md`");
    console.log("- `furina_resource/05_voice_style.md`");
    console.log("- `src/rules/ooc_rules.md`");
    console.log("");
    console.log("User input:");
    console.log(item.input);
    console.log("");
    console.log("Expected:");
    console.log(item.expected);
    console.log("");
    console.log("Avoid:");
    console.log(item.avoid);
    console.log("");
    console.log("Score 0-3 using `eval/furina_voice_cases.md`.");
    console.log("");
  }
}

try {
  const args = parseArgs(process.argv.slice(2));
  const command = args._[0] || "list";
  const cases = readCases();

  if (command === "help" || args.help || args.h) {
    console.log(usage());
  } else if (command === "list") {
    printList(cases);
  } else if (command === "json") {
    console.log(JSON.stringify({ cases }, null, 2));
  } else if (command === "prompt") {
    printPrompt(selectCases(cases, args));
  } else {
    throw new Error(`Unknown command: ${command}`);
  }
} catch (error) {
  console.error(`furina-eval failed: ${error.message}`);
  process.exitCode = 1;
}
