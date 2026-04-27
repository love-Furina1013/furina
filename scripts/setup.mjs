#!/usr/bin/env node
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const COMMANDS = ["furina.md", "furina-save.md", "furina-reflect.md", "furina-compress.md"];

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const part = argv[i];
    if (!part.startsWith("--")) {
      args._.push(part);
      continue;
    }
    const eq = part.indexOf("=");
    if (eq !== -1) {
      args[part.slice(2, eq)] = part.slice(eq + 1);
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

function help() {
  return `Furina setup

Usage:
  node scripts/setup.mjs                 Install Claude Code + Codex Skill + memory runtime
  node scripts/setup.mjs --claude        Install Claude Code commands only
  node scripts/setup.mjs --codex         Install Codex Skill only
  node scripts/setup.mjs --check         Check installed files
  node scripts/setup.mjs --check --claude
  node scripts/setup.mjs --check --codex

Options:
  --project-claude       Install Claude commands into this repo's .claude/commands
  --reset-memory         Replace the existing memory JSON with the empty template
  --dry-run              Print actions without writing files
  --claude-home <dir>    Override Claude home, defaults to CLAUDE_HOME or ~/.claude
  --codex-home <dir>     Override Codex home, defaults to CODEX_HOME or ~/.codex
  --memory-path <file>   Override memory JSON path
`;
}

function ensureSource(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing source: ${path.relative(ROOT, filePath)}`);
  }
}

function mkdir(dir, dryRun) {
  if (dryRun) return;
  fs.mkdirSync(dir, { recursive: true });
}

function copyFile(src, dst, label, dryRun) {
  ensureSource(src);
  if (dryRun) {
    console.log(`[dry-run] copy ${label}: ${src} -> ${dst}`);
    return;
  }
  mkdir(path.dirname(dst), false);
  fs.copyFileSync(src, dst);
  console.log(`installed ${label}: ${dst}`);
}

function copyDir(src, dst, label, dryRun) {
  ensureSource(src);
  if (dryRun) {
    console.log(`[dry-run] copy ${label}: ${src} -> ${dst}`);
    return;
  }
  mkdir(path.dirname(dst), false);
  fs.rmSync(dst, { recursive: true, force: true });
  fs.cpSync(src, dst, { recursive: true, force: true });
  console.log(`installed ${label}: ${dst}`);
}

function existsLabel(filePath) {
  return fs.existsSync(filePath) ? "ok" : "missing";
}

function installClaude(paths, dryRun) {
  mkdir(paths.claudeCommandsDir, dryRun);
  for (const name of COMMANDS) {
    copyFile(
      path.join(ROOT, "claudecode", "commands", name),
      path.join(paths.claudeCommandsDir, name),
      `Claude command ${name}`,
      dryRun
    );
  }
}

function installRuntime(paths, dryRun) {
  copyFile(
    path.join(ROOT, "scripts", "furina-memory.mjs"),
    paths.runtimePath,
    "shared memory runtime",
    dryRun
  );
}

function installMemory(paths, resetMemory, dryRun) {
  const source = path.join(ROOT, "claudecode", "memory", "furina-memory.json");
  ensureSource(source);
  if (fs.existsSync(paths.memoryPath) && !resetMemory) {
    console.log(`kept existing memory: ${paths.memoryPath}`);
    return;
  }
  copyFile(source, paths.memoryPath, resetMemory ? "reset memory JSON" : "memory JSON", dryRun);
}

function installCodex(paths, dryRun) {
  copyDir(
    path.join(ROOT, "codex", "skills", "furina-roleplay"),
    paths.codexSkillDir,
    "Codex skill furina-roleplay",
    dryRun
  );
}

function check(paths, targets) {
  const checks = [];
  if (targets.claude) {
    for (const name of COMMANDS) {
      checks.push([`Claude command ${name}`, path.join(paths.claudeCommandsDir, name)]);
    }
  }
  if (targets.runtime) {
    checks.push(["memory runtime", paths.runtimePath]);
  }
  if (targets.memory) {
    checks.push(["memory JSON", paths.memoryPath]);
  }
  if (targets.codex) {
    checks.push(["Codex skill", paths.codexSkillDir]);
    checks.push(["Codex SKILL.md", path.join(paths.codexSkillDir, "SKILL.md")]);
  }

  let ok = true;
  for (const [label, filePath] of checks) {
    const state = existsLabel(filePath);
    if (state !== "ok") ok = false;
    console.log(`${state.padEnd(7)} ${label}: ${filePath}`);
  }
  return ok;
}

const args = parseArgs(process.argv.slice(2));

if (args.help || args.h) {
  console.log(help());
  process.exit(0);
}

const claudeHome = path.resolve(String(args["claude-home"] || process.env.CLAUDE_HOME || path.join(os.homedir(), ".claude")));
const codexHome = path.resolve(String(args["codex-home"] || process.env.CODEX_HOME || path.join(os.homedir(), ".codex")));
const useProjectClaude = Boolean(args["project-claude"]);
const paths = {
  claudeCommandsDir: useProjectClaude ? path.join(ROOT, ".claude", "commands") : path.join(claudeHome, "commands"),
  runtimePath: path.join(claudeHome, "furina-memory.mjs"),
  memoryPath: path.resolve(String(args["memory-path"] || path.join(claudeHome, "furina-memory.json"))),
  codexSkillDir: path.join(codexHome, "skills", "furina-roleplay")
};

const dryRun = Boolean(args["dry-run"]);
const explicitTargets = Boolean(args.claude || args.codex || args.memory || args.runtime);
const installAll = !explicitTargets;
const wantsClaude = installAll || Boolean(args.claude);
const wantsCodex = installAll || Boolean(args.codex);
const wantsRuntime = installAll || wantsClaude || wantsCodex || Boolean(args.runtime);
const wantsMemory = installAll || wantsClaude || wantsCodex || Boolean(args.memory);
const targets = {
  claude: wantsClaude,
  codex: wantsCodex,
  runtime: wantsRuntime,
  memory: wantsMemory
};

try {
  if (args.check) {
    process.exit(check(paths, targets) ? 0 : 1);
  }

  if (wantsClaude) installClaude(paths, dryRun);
  if (wantsRuntime) installRuntime(paths, dryRun);
  if (wantsMemory) installMemory(paths, Boolean(args["reset-memory"]), dryRun);
  if (wantsCodex) installCodex(paths, dryRun);

  console.log("");
  check(paths, targets);
  console.log("");
  console.log("Next:");
  console.log("  Claude Code: /furina 你好，芙宁娜。");
  console.log("  Codex: ask for Furina roleplay or resource maintenance; the skill is installed.");
} catch (error) {
  console.error(`setup failed: ${error.message}`);
  process.exit(1);
}
