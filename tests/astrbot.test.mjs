import { strict as assert } from "node:assert";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import {
  buildAngelMemoryNotes,
  buildAstrbotConfigExample,
  buildAstrbotPersona,
  generateAstrbotPack
} from "../scripts/furina-astrbot.mjs";

describe("buildAstrbotPersona", () => {
  it("includes AstrBot plugin collaboration rules", () => {
    const persona = buildAstrbotPersona();

    assert.match(persona, /Angel Heart/);
    assert.match(persona, /core_memory_recall/);
    assert.match(persona, /recall_long_term_memory/);
    assert.match(persona, /四状态|4状态/);
    assert.match(persona, /芙宁娜/);
  });

  it("keeps Furina memory boundaries explicit", () => {
    const persona = buildAstrbotPersona();

    assert.match(persona, /普通寒暄不主动翻旧账/);
    assert.match(persona, /每轮最多.*1 条/);
    assert.match(persona, /不要.*完整记忆库/);
  });
});

describe("buildAngelMemoryNotes", () => {
  it("exports short cards suitable for Angel Memory knowledge base", () => {
    const notes = buildAngelMemoryNotes();
    const cardLines = notes.split(/\r?\n/).filter((line) => line && !line.startsWith("#"));

    assert.ok(cardLines.length >= 8);
    for (const line of cardLines) {
      assert.ok(line.length <= 120, `card is too long: ${line}`);
    }
  });
});

describe("buildAstrbotConfigExample", () => {
  it("maps the Furina persona to an isolated memory scope", () => {
    const config = JSON.parse(buildAstrbotConfigExample());

    assert.equal(config.angel_memory.conversation_scope_map["芙宁娜"], "furina");
    assert.equal(config.livingmemory.persona_isolation, true);
    assert.equal(config.angel_heart.persona_name, "芙宁娜");
  });
});

describe("generateAstrbotPack", () => {
  it("writes a complete AstrBot adapter pack", () => {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), "furina-astrbot-"));

    generateAstrbotPack(outDir);

    assert.ok(fs.existsSync(path.join(outDir, "persona", "furina-astrbot-persona.md")));
    assert.ok(fs.existsSync(path.join(outDir, "angel_memory", "furina_notes.md")));
    assert.ok(fs.existsSync(path.join(outDir, "angel_memory", "furina_core_memories.json")));
    assert.ok(fs.existsSync(path.join(outDir, "configs", "astrbot_plugins.example.json")));
    assert.ok(fs.existsSync(path.join(outDir, "README.md")));
  });
});
