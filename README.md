# Furina de Fontaine Roleplay Skill

> 一个面向 Claude Code、Codex Skill、GitHub Copilot Skill 与自定义 AI 运行时的芙宁娜·德·枫丹角色扮演资源包。项目将角色系统提示词、结构化知识库、OOC 行为规则、认知记忆机制与 Claude Code 斜杠命令整理为可复用组件，用于构建更稳定、更懂分寸、更有长期连续感的芙宁娜互动体验。

![芙宁娜头像](assets/IMG_1877.jpg)

---

## 项目概览

本仓库不是传统可执行应用，而是一套围绕芙宁娜角色扮演设计的提示词工程与知识库方案。它聚合了角色身份、语气风格、剧情资料、战斗机制、人物关系、认知记忆协议和会话反思规则，既可以作为 Claude Code 的原生斜杠命令使用，也可以拆分接入其他 AI 客户端、RAG 流程或自定义角色运行时。

项目重点不只是“让模型像芙宁娜说话”，而是让角色在长期互动中保持人设一致、知道何时收放戏剧感、能主动回忆真正相关的内容，并通过亲密度、灵魂能量、睡眠巩固和四状态交互控制回复分寸，在不出戏的前提下遵守内容安全与 OOC 边界。

当前项目分为三条使用路径：

| 路径 | 适合场景 | 入口 |
|------|----------|------|
| Claude Code 斜杠命令 | 想在 Claude Code 中直接使用 `/furina`，并用本地 JSON 保存记忆 | `claudecode/` |
| Codex Skill | 想让 Codex 按需读取芙宁娜设定、知识库、OOC 规则和记忆规范 | `codex/skills/furina-roleplay/` |
| 通用 Prompt / Skill 资源 | 想把角色设定、知识库、记忆规则接入其他 AI 客户端或自定义运行时 | `src/`、`furina_resource/`、`config/` |

---

## 主要能力

- 完整芙宁娜人格设定：覆盖神位卸任后的身份、傲娇外壳、戏剧化表达与真实内核。
- 结构化知识库：按基础资料、性格、剧情时间线、战斗机制、语气风格、人物关系、台词与 FAQ 拆分。
- OOC 行为约束：包含身份坚守、内容安全、原著一致性、角色尊严与社交感知规则。
- 认知记忆系统：支持 2.0 存档、亲密度、四状态交互、灵魂能量、主动回忆、睡眠巩固与弱记忆衰减。
- Claude Code 原生命令：提供 `/furina`、`/furina-save`、`/furina-reflect`、`/furina-compress` 四个命令文件。
- Codex Skill 兼容：提供标准 `SKILL.md`、`references/` 和 `agents/openai.yaml`，可复制到 `~/.codex/skills` 使用。
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
├── codex/
│   └── skills/
│       └── furina-roleplay/
│           ├── SKILL.md
│           ├── agents/
│           │   └── openai.yaml
│           ├── assets/
│           │   └── IMG_1877.jpg
│           └── references/
│               ├── furina_resource/
│               ├── memory/
│               ├── prompt/
│               └── rules/
├── config/
│   ├── manifest.json
│   └── settings.json
├── eval/
│   └── furina_voice_cases.md
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
│   │   ├── cognitive_memory.md
│   │   ├── compression.md
│   │   └── memory_format.md
│   ├── prompt/
│   │   ├── reflection.md
│   │   ├── runtime_lite.md
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

## 快速开始：Codex Skill

将 Skill 目录复制到 Codex 的本地技能目录：

```powershell
New-Item -ItemType Directory -Force "$HOME\.codex\skills"
Copy-Item .\codex\skills\furina-roleplay "$HOME\.codex\skills\" -Recurse -Force
```

之后在 Codex 中提出与芙宁娜角色扮演、提示词维护、知识库问答或记忆整理相关的请求时，Codex 会根据 `SKILL.md` 按需读取 `references/` 下的设定、规则与知识库。

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

## 认知记忆系统

Claude Code 版本默认使用本地文件保存认知记忆：

```text
~/.claude/furina-memory.json
```

初始格式（`version: "2.0"`）：

```json
{
  "version": "2.0",
  "scope": "default",
  "intimacy": 0,
  "last_chat": "",
  "interaction_state": "not_present",
  "soul_state": "calm",
  "soul_energy": {
    "recall_depth": 35,
    "impression_depth": 35,
    "expression_desire": 45,
    "creativity": 55
  },
  "profile": {
    "preferred_name": "",
    "boundaries": [],
    "style_preferences": []
  },
  "memories": [],
  "notes": [],
  "reflection_queue": [],
  "sleep": {
    "last_consolidated": "",
    "pending_count": 0
  }
}
```

字段说明：

| 字段 | 说明 |
|------|------|
| `intimacy` | 亲密度，范围 0 到 10，影响芙宁娜的真诚程度与傲娇强度 |
| `last_chat` | 最近一次对话日期 |
| `interaction_state` | 四状态交互：`not_present`、`summoned`、`getting_familiar`、`observation` |
| `soul_state` | 情绪快照，可选 `low`、`calm`、`active`、`excited` |
| `soul_energy` | 回忆深度、印象深度、表达欲和创造力四个能量槽 |
| `profile` | 用户称呼、边界和互动偏好 |
| `memories` | 带 `priority`、`strength`、`confidence`、`tags` 的核心记忆 |
| `notes` | 较长背景笔记 |
| `reflection_queue` | 后续学习或跟进主题 |
| `sleep` | 睡眠巩固状态，用于清理重复与弱记忆 |

运行时会在普通寒暄中保持克制，不频繁翻旧账；当用户提到“上次/以前/你还记得”或当前话题强相关时，才自然主动回忆。通用提示词运行时也可使用手动注入格式，详见 [src/memory/memory_format.md](src/memory/memory_format.md)；完整认知机制见 [src/memory/cognitive_memory.md](src/memory/cognitive_memory.md)。

---

## 核心文件说明

| 文件 | 说明 |
|------|------|
| [src/prompt/system.md](src/prompt/system.md) | 核心角色系统提示词 |
| [src/prompt/runtime_lite.md](src/prompt/runtime_lite.md) | 普通角色扮演的低 token 运行提示词 |
| [src/prompt/user.md](src/prompt/user.md) | 常用用户指令模板 |
| [src/prompt/reflection.md](src/prompt/reflection.md) | 对话后记忆提取提示词 |
| [src/rules/ooc_rules.md](src/rules/ooc_rules.md) | 防出戏与内容安全规则 |
| [src/memory/cognitive_memory.md](src/memory/cognitive_memory.md) | 三层认知、四状态交互、主动回忆与睡眠巩固机制 |
| [src/memory/memory_format.md](src/memory/memory_format.md) | 手动记忆注入格式规范 |
| [src/memory/compression.md](src/memory/compression.md) | 记忆压缩提示词 |
| [furina_resource/00_index.md](furina_resource/00_index.md) | 角色知识库索引 |
| [eval/furina_voice_cases.md](eval/furina_voice_cases.md) | 芙宁娜语气人工验收用例 |
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
- 是否改变记忆文件格式或 2.0 认知协议
- 是否引入未记录的新命令或安装步骤

---

## 资料来源与致谢

- `furina_resource/` 下的角色资料整理自萌娘百科条目：[芙宁娜·德·枫丹](https://zh.moegirl.org.cn/芙宁娜·德·枫丹)。萌娘百科中文文本通常依据 **CC BY-NC-SA 3.0 CN（署名-非商业性使用-相同方式共享 3.0 中国大陆）** 提供，使用与再分发时请遵守原站著作权声明与页面历史署名要求。
- 认知记忆系统的设计灵感来自 [astrbot_plugin_angel_memory](https://github.com/kawayiYokami/astrbot_plugin_angel_memory) 与 [astrbot_plugin_angel_heart](https://github.com/kawayiYokami/astrbot_plugin_angel_heart)：本项目参考了三层认知、主动回忆、灵魂能量、睡眠巩固、四状态交互和低成本回复决策等思路，并改写为本仓库的轻量 Prompt / Skill 资源形态。

---

## 许可证与声明

本项目使用 [MIT License](LICENSE)。

本项目为同人创作与提示词工程实践。芙宁娜、《原神》及相关角色版权归 miHoYo / HoYoverse 所有。项目代码、提示词结构与仓库组织按 MIT License 提供；来自第三方资料源的文本内容仍受其原始许可与版权声明约束。
