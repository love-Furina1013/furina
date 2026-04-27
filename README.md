# Furina de Fontaine Roleplay Skill

面向 Claude Code、Codex Skill 和自定义 AI 运行时的芙宁娜·德·枫丹角色扮演资源包。

它提供角色提示词、结构化知识库、OOC 规则、长期记忆格式、共享记忆运行时，以及 Claude Code 斜杠命令。目标是让芙宁娜的回复更稳定、更像本人，并且在长期互动中能保留合适的连续感。

![芙宁娜头像](assets/IMG_1877.jpg)

## 你可以用它做什么

| 场景 | 用法 |
|------|------|
| Claude Code 角色扮演 | 安装后使用 `/furina 你好，芙宁娜。` |
| Codex Skill | 让 Codex 按需读取芙宁娜设定、共享知识库、记忆规则和 OOC 规则 |
| 资料库 / RAG | 直接使用 `furina_resource/` 中的结构化 Markdown |
| 自定义角色运行时 | 组合 `src/prompt/`、`src/rules/`、`src/memory/` 和 `scripts/furina-memory.mjs` |

## 快速开始

需要 Node.js。确认命令可用：

```powershell
node --version
```

在仓库根目录运行：

```powershell
node .\scripts\setup.mjs
node .\scripts\setup.mjs --check
```

安装器会自动完成：

- 安装 Claude Code 命令到 `~/.claude/commands`
- 安装 Codex Skill 到 `~/.codex/skills/furina-roleplay`
- 写入 Codex Skill 的轻量路径上下文，指向本仓库 `furina_resource/`
- 安装共享记忆运行时到 `~/.claude/furina-memory.mjs`
- 初始化 `~/.claude/furina-memory.json`

已有记忆文件不会被覆盖。

安装完成后，在 Claude Code 中测试：

```text
/furina 你好，芙宁娜。
```

在 Codex 中，直接提出与芙宁娜角色扮演、知识库问答、提示词维护或记忆整理相关的请求即可。

## 交给 AI 代理安装

你可以把下面这段直接交给 Claude Code 或 Codex：

```text
请在当前仓库根目录运行 `node scripts/setup.mjs`，然后运行 `node scripts/setup.mjs --check`。如果已有记忆文件，不要覆盖；如果命令失败，只说明缺少的依赖或权限。
```

更多安装选项和排障见 [SETUP_GUIDE.md](SETUP_GUIDE.md)。

## 常用命令

| 命令 | 用途 |
|------|------|
| `node .\scripts\setup.mjs` | 安装 Claude Code + Codex Skill + 记忆运行时 |
| `node .\scripts\setup.mjs --check` | 检查完整安装 |
| `node .\scripts\setup.mjs --claude` | 只安装 Claude Code 入口 |
| `node .\scripts\setup.mjs --codex` | 只安装 Codex Skill |
| `node .\scripts\setup.mjs --project-claude` | 把 Claude 命令安装到当前项目 `.claude/commands` |
| `node .\scripts\setup.mjs --dry-run` | 预览安装动作，不写文件 |

Claude Code 安装后可用：

| 命令 | 用途 |
|------|------|
| `/furina` | 主对话命令 |
| `/furina-save` | 手动保存关键记忆 |
| `/furina-reflect` | 从长对话中提取记忆 JSON |
| `/furina-compress` | 压缩重复或零散的记忆 |

## 记忆系统

默认记忆文件：

```text
~/.claude/furina-memory.json
```

共享记忆运行时：

```text
scripts/furina-memory.mjs
```

常用操作：

```powershell
node .\scripts\furina-memory.mjs init
node .\scripts\furina-memory.mjs status
node .\scripts\furina-memory.mjs inject --query "你好，芙宁娜"
node .\scripts\furina-memory.mjs remember --text "[📌 记忆: 用户喜欢枫丹歌剧]"
node .\scripts\furina-memory.mjs compress
```

记忆格式采用 `version: "2.0"`，包含亲密度、交互状态、灵魂状态、核心记忆、背景笔记和睡眠巩固状态。完整字段说明见 [src/memory/memory_format.md](src/memory/memory_format.md) 与 [src/memory/cognitive_memory.md](src/memory/cognitive_memory.md)。

## 目录说明

| 路径 | 内容 |
|------|------|
| `.claude/CLAUDE.md` | Claude Code 项目级说明，列出可用斜杠命令与维护原则 |
| `claudecode/commands/` | Claude Code 斜杠命令 |
| `codex/skills/furina-roleplay/` | 可安装的轻量 Codex Skill，不内置资料库镜像 |
| `furina_resource/` | 芙宁娜结构化知识库，所有平台共用的唯一资料源 |
| `src/prompt/` | 角色系统提示词、轻量运行提示词、反思提示词 |
| `src/rules/` | OOC、安全、角色一致性规则 |
| `src/memory/` | 记忆格式、认知记忆机制、压缩规则 |
| `scripts/setup.mjs` | 一键安装器 |
| `scripts/furina-memory.mjs` | 共享记忆运行时 |
| `eval/furina_voice_cases.md` | 语气验收用例 |
| `config/manifest.json` | 项目元数据 |

## 知识库索引

| 文件 | 内容 |
|------|------|
| `00_index.md` | 资料库索引 |
| `01_profile.md` | 基础资料 |
| `02_personality.md` | 性格、人设、表达习惯 |
| `03_story_timeline.md` | 剧情时间线 |
| `04_combat_mechanics.md` | 技能与战斗机制 |
| `05_voice_style.md` | 语气风格与生成规则 |
| `06_relationships.md` | 人物关系 |
| `07_quotes.md` | 高频台词 |
| `08_faq.md` | 常见问题答案 |
| `09_voice_lines.md` | 语音台词整理 |
| `10_moegirl_supplement.md` | 萌娘百科补充、创作要点与二创边界 |

## 维护建议

- 改角色设定：只更新根目录 `furina_resource/`；Codex Skill 通过安装器写入的路径上下文引用它，不维护镜像副本。
- 改角色口吻：优先更新 `furina_resource/05_voice_style.md` 和 `eval/furina_voice_cases.md`。
- 改 Claude Code 行为：更新 `claudecode/commands/`。
- 改 Codex Skill 触发或路由：更新 `codex/skills/furina-roleplay/SKILL.md`。
- 改安装流程：更新 `scripts/setup.mjs` 和 [SETUP_GUIDE.md](SETUP_GUIDE.md)。

## 资料来源与声明

- `furina_resource/` 的角色资料整理自萌娘百科条目：[芙宁娜·德·枫丹](https://zh.moegirl.org.cn/芙宁娜·德·枫丹)。使用与再分发时请遵守原站著作权声明与页面历史署名要求。
- 认知记忆系统参考了 [astrbot_plugin_angel_memory](https://github.com/kawayiYokami/astrbot_plugin_angel_memory) 与 [astrbot_plugin_angel_heart](https://github.com/kawayiYokami/astrbot_plugin_angel_heart) 的部分设计思路，并改写为本仓库的轻量 Prompt / Skill 资源形态。
- 本项目为同人创作与提示词工程实践。芙宁娜、《原神》及相关角色版权归 miHoYo / HoYoverse 所有。

## License

[MIT License](LICENSE)
