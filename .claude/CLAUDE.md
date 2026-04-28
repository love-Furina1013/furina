# Furina Roleplay Project

本仓库提供 Claude Code 斜杠命令、Codex Skill、共享记忆运行时和 `furina_resource/` 结构化资料库。

## 常用命令

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

如只想让命令在当前仓库生效：

```bash
node scripts/setup.mjs --claude --project-claude
```

## 维护原则

- `furina_resource/` 是所有平台共用的唯一角色资料源。
- 外部原神 wiki 只用于补查资料库未覆盖的内容；默认在线 BWIKI 可直接 `search` / `read`，本地 GenshinStory 只是可选缓存。
- Claude Code 命令保留 `$ARGUMENTS`，让用户在斜杠命令后的文本能进入提示词。
- 记忆读写优先使用 `scripts/furina-memory.mjs`，再回退到 `~/.claude/furina-memory.mjs`。
