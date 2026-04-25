# Furina de Fontaine Roleplay Skill

> 一个面向 Claude Code、GitHub Copilot Skill 与自定义 AI 运行时的芙宁娜·德·枫丹角色扮演资源包。项目将角色系统提示词、结构化知识库、OOC 行为规则、本地记忆机制与 Claude Code 斜杠命令整理为可复用组件，用于构建更稳定、更有连续感的芙宁娜互动体验。

![芙宁娜头像](assets/IMG_1877.jpg)

---

## 项目概览

本仓库不是传统可执行应用，而是一套围绕芙宁娜角色扮演设计的提示词工程与知识库方案。它聚合了角色身份、语气风格、剧情资料、战斗机制、人物关系、记忆存档和会话反思规则，既可以作为 Claude Code 的原生斜杠命令使用，也可以拆分接入其他 AI 客户端、RAG 流程或自定义角色运行时。

项目重点不只是“让模型像芙宁娜说话”，而是让角色在长期互动中保持人设一致、知道何时收放戏剧感、能根据记忆调整亲密度和情绪状态，并在不出戏的前提下遵守内容安全与 OOC 边界。

当前项目分为两条使用路径：

| 路径 | 适合场景 | 入口 |
|------|----------|------|
| Claude Code 斜杠命令 | 想在 Claude Code 中直接使用 `/furina`，并用本地 JSON 保存记忆 | `claudecode/` |
| 通用 Prompt / Skill 资源 | 想把角色设定、知识库、记忆规则接入其他 AI 客户端或自定义运行时 | `src/`、`furina_resource/`、`config/` |

---

## 主要能力

- 完整芙宁娜人格设定：覆盖神位卸任后的身份、傲娇外壳、戏剧化表达与真实内核。
- 结构化知识库：按基础资料、性格、剧情时间线、战斗机制、语气风格、人物关系、台词与 FAQ 拆分。
- OOC 行为约束：包含身份坚守、内容安全、原著一致性、角色尊严与社交感知规则。
- 记忆系统：支持亲密度、上次对话、灵魂状态、关键记忆条目与记忆压缩规则。
- Claude Code 原生命令：提供 `/furina`、`/furina-save`、`/furina-reflect`、`/furina-compress` 四个命令文件。
- 向后兼容手动存档：仍可在对话开头注入 `[记忆存档]...[/记忆存档]` 区块。

---

## 项目结构

```text
furina/
├── assets/
│   └── IMG_1877.jpg
├── claudecode/
│   ├── commands/
│   │   ├── furina-compress.md
│   │   ├── furina.md
│   │   ├── furina-save.md
│   │   └── furina-reflect.md
│   ├── memory/
│   │   ├── furina-memory.json
│   │   └── template.md
│   └── README.md
├── config/
│   ├── manifest.json
│   └── settings.json
├── furina_resource/
│   ├── 00_index.md
│   ├── 01_profile.md
│   ├── 02_personality.md
│   ├── 03_story_timeline.md
│   ├── 04_combat_mechanics.md
│   ├── 05_voice_style.md
│   ├── 06_relationships.md
│   ├── 07_quotes.md
│   ├── 08_faq.md
│   └── 09_voice_lines.md
├── src/
│   ├── memory/
│   │   ├── compression.md
│   │   └── memory_format.md
│   ├── prompt/
│   │   ├── reflection.md
│   │   ├── system.md
│   │   └── user.md
│   └── rules/
│       └── ooc_rules.md
├── SETUP_GUIDE.md
├── README.md
└── LICENSE
```

---

## 快速开始：Claude Code

### macOS / Linux

```bash
mkdir -p ~/.claude/commands
cp claudecode/commands/furina.md ~/.claude/commands/
cp claudecode/commands/furina-save.md ~/.claude/commands/
cp claudecode/commands/furina-reflect.md ~/.claude/commands/
cp claudecode/commands/furina-compress.md ~/.claude/commands/
cp claudecode/memory/furina-memory.json ~/.claude/furina-memory.json
```

### Windows PowerShell

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\commands"
Copy-Item .\claudecode\commands\furina.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\commands\furina-save.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\commands\furina-reflect.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\commands\furina-compress.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\memory\furina-memory.json "$HOME\.claude\furina-memory.json"
```

然后在 Claude Code 中使用：

```text
/furina 你好，芙宁娜。
```

更多步骤见 [SETUP_GUIDE.md](SETUP_GUIDE.md) 与 [claudecode/README.md](claudecode/README.md)。

---

## Claude Code 命令

| 命令 | 用途 |
|------|------|
| `/furina` | 主对话命令，加载角色设定、行为规则与本地记忆 |
| `/furina-save` | 手动触发记忆保存，适合在重要对话后使用 |
| `/furina-reflect` | 从长对话中提取记忆 JSON，适合高级手动整理 |
| `/furina-compress` | 将累积记忆压缩成更精炼的核心条目 |

`src/memory/compression.md` 是通用运行时可复用的压缩提示词；Claude Code 版本已经封装为 `claudecode/commands/furina-compress.md`。

---

## 记忆系统

Claude Code 版本默认使用本地文件保存记忆：

```text
~/.claude/furina-memory.json
```

初始格式：

```json
{
  "intimacy": 0,
  "last_chat": "",
  "soul_state": "calm",
  "memories": []
}
```

字段说明：

| 字段 | 说明 |
|------|------|
| `intimacy` | 亲密度，范围 0 到 10，影响芙宁娜的真诚程度与傲娇强度 |
| `last_chat` | 最近一次对话日期 |
| `soul_state` | 情绪快照，可选 `low`、`calm`、`active`、`excited` |
| `memories` | 关键记忆数组，建议最多保留 10 条 |

通用提示词运行时也可使用手动注入格式，详见 [src/memory/memory_format.md](src/memory/memory_format.md)。

---

## 核心文件说明

| 文件 | 说明 |
|------|------|
| [src/prompt/system.md](src/prompt/system.md) | 核心角色系统提示词 |
| [src/prompt/user.md](src/prompt/user.md) | 常用用户指令模板 |
| [src/prompt/reflection.md](src/prompt/reflection.md) | 对话后记忆提取提示词 |
| [src/rules/ooc_rules.md](src/rules/ooc_rules.md) | 防出戏与内容安全规则 |
| [src/memory/memory_format.md](src/memory/memory_format.md) | 手动记忆注入格式规范 |
| [src/memory/compression.md](src/memory/compression.md) | 记忆压缩提示词 |
| [furina_resource/00_index.md](furina_resource/00_index.md) | 角色知识库索引 |
| [claudecode/README.md](claudecode/README.md) | Claude Code 版本说明 |

---

## 知识库索引

`furina_resource/` 是按需检索的结构化知识库：

| 文件 | 内容 |
|------|------|
| `01_profile.md` | 基础资料 |
| `02_personality.md` | 性格、人设、表达习惯 |
| `03_story_timeline.md` | 剧情时间线 |
| `04_combat_mechanics.md` | 技能与战斗机制 |
| `05_voice_style.md` | 语气风格与生成规则 |
| `06_relationships.md` | 人物关系 |
| `07_quotes.md` | 高频台词 |
| `08_faq.md` | 常见问题答案 |
| `09_voice_lines.md` | 语音台词整理 |

---

## 角色设定摘要

| 属性 | 内容 |
|------|------|
| 全名 | 芙宁娜·德·枫丹 (Furina de Fontaine) |
| 作品 | 《原神》 |
| 地区 | 枫丹 |
| 元素 | 水元素 |
| 武器 | 单手剑 |
| 命之座 | 司颂座 |
| 生日 | 10 月 13 日 |
| 当前身份 | 神位卸任后的普通枫丹市民，仍保留强烈舞台感与审判气质 |

---

## 贡献

欢迎通过 Issue 或 Pull Request 补充台词、修正设定、改进提示词结构或扩展 Claude Code 命令。提交前建议先检查：

- 是否与原作设定冲突
- 是否破坏角色语气一致性
- 是否改变记忆文件格式
- 是否引入未记录的新命令或安装步骤

---

## 许可证与声明

本项目使用 [MIT License](LICENSE)。

本项目为同人创作与提示词工程实践。芙宁娜、《原神》及相关角色版权归 miHoYo / HoYoverse 所有。
