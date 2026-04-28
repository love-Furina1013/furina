# Furina Roleplay Project

本仓库提供 Claude Code 原生 project skills、旧式斜杠命令兼容模板、Codex Skill、共享记忆运行时和 `furina_resource/` 结构化资料库。

## 常用 Skill / 命令

| 命令 | 用途 |
|------|------|
| `/furina` | 开始或继续芙宁娜角色扮演 |
| `/furina-save` | 手动保存关键记忆 |
| `/furina-reflect` | 从对话记录提取结构化记忆 JSON |
| `/furina-compress` | 压缩和整理记忆条目 |

## 安装检查

```bash
node scripts/setup.mjs --claude
node scripts/setup.mjs --check --claude
```

本仓库已包含 `.claude/skills/`，在项目中打开 Claude Code 时可直接发现 `/furina` 等原生 skills。如需把原生 skills 安装到个人 Claude Code 目录：

```bash
node scripts/setup.mjs --claude
```

旧式 commands 默认不安装；确实需要兼容旧入口时运行 `node scripts/setup.mjs --claude --legacy-commands`。

## 维护原则

- `furina_resource/` 是所有平台共用的唯一角色资料源。
- 外部原神 wiki 只用于补查资料库未覆盖的内容；默认在线 BWIKI 可直接 `search` / `read`，本地 GenshinStory 只是可选缓存。
- Claude Code skills / commands 保留 `$ARGUMENTS`，让用户在斜杠命令后的文本能进入提示词。
- 记忆读写优先使用 `scripts/furina-memory.mjs`，再回退到 `~/.claude/furina-memory.mjs`。
