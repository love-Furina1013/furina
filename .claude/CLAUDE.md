# Furina Roleplay — Claude Code 项目配置

## 可用命令

本仓库提供以下 Claude Code 斜杠命令：

| 命令 | 说明 |
|------|------|
| `/furina` | 开始/继续与芙宁娜的角色扮演对话，自动加载记忆 |
| `/furina-save` | 手动保存当前会话认知记忆 |
| `/furina-reflect` | 从对话记录中提取结构化记忆 JSON（高级用法） |
| `/furina-compress` | 压缩和整理积累的记忆条目 |

## 快速开始

```bash
# 安装全局命令（推荐，所有项目可用）
node scripts/setup.mjs --claude

# 或仅安装到当前项目
node scripts/setup.mjs --claude --project-claude

# 验证安装
node scripts/setup.mjs --check --claude
```

## 记忆文件

角色记忆存储在 `~/.claude/furina-memory.json`，包含亲密度、灵魂状态、核心记忆等。

## 目录结构

```
claudecode/
├── commands/          # Claude Code 斜杠命令 SKILL.md
│   ├── furina.md
│   ├── furina-save.md
│   ├── furina-reflect.md
│   └── furina-compress.md
├── memory/            # 记忆模板和文档
└── README.md          # 安装与使用指南
```

## 注意事项

- 首次使用 `/furina` 时会自动创建记忆文件
- 命令使用 Node.js 共享记忆运行时 (`scripts/furina-memory.mjs`) 处理记忆读写
- 本配置适用于 Claude Code CLI
