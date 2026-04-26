# 芙宁娜 Skill 从零配置指南

这份指南面向第一次使用本项目的用户，按最常见的 Claude Code 使用方式编写。若你只是想了解项目内容，可以先阅读 [README.md](README.md)。

---

## 目录

1. [准备工作](#一准备工作)
2. [获取项目](#二获取项目)
3. [安装到 Claude Code](#三安装到-claude-code)
4. [开始使用](#四开始使用)
5. [认知记忆系统](#五认知记忆系统)
6. [通用 Prompt 用法](#六通用-prompt-用法)
7. [常见问题](#七常见问题)
8. [检查清单](#八检查清单)

---

## 一、准备工作

### 1.1 你需要什么

| 项目 | 说明 |
|------|------|
| Git | 用于克隆或更新仓库 |
| Claude Code | 用于运行 `/furina` 等斜杠命令 |
| 一个终端 | macOS / Linux 使用 Shell，Windows 使用 PowerShell |

如果你只想把 `src/` 与 `furina_resource/` 接入自己的 AI 客户端，则不强制要求 Claude Code。

### 1.2 确认 Claude Code 命令目录

Claude Code 通常从以下目录读取用户级斜杠命令：

```text
~/.claude/commands
```

在 Windows PowerShell 中，`~` 或 `$HOME` 通常指向：

```text
C:\Users\<你的用户名>
```

---

## 二、获取项目

### 2.1 克隆仓库

```bash
git clone https://github.com/love-Furina1013/furina.git
cd furina
```

如果你已经下载了压缩包，解压后进入项目根目录即可。

### 2.2 确认文件完整

项目根目录应至少包含：

```text
README.md
SETUP_GUIDE.md
claudecode/
src/
furina_resource/
config/
assets/
```

Claude Code 版本的关键文件是：

```text
claudecode/commands/furina.md
claudecode/commands/furina-save.md
claudecode/commands/furina-reflect.md
claudecode/commands/furina-compress.md
claudecode/memory/furina-memory.json
```

---

## 三、安装到 Claude Code

### 3.1 macOS / Linux

在项目根目录执行：

```bash
mkdir -p ~/.claude/commands
cp claudecode/commands/furina.md ~/.claude/commands/
cp claudecode/commands/furina-save.md ~/.claude/commands/
cp claudecode/commands/furina-reflect.md ~/.claude/commands/
cp claudecode/commands/furina-compress.md ~/.claude/commands/
cp claudecode/memory/furina-memory.json ~/.claude/furina-memory.json
```

### 3.2 Windows PowerShell

在项目根目录执行：

```powershell
New-Item -ItemType Directory -Force "$HOME\.claude\commands"
Copy-Item .\claudecode\commands\furina.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\commands\furina-save.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\commands\furina-reflect.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\commands\furina-compress.md "$HOME\.claude\commands\"
Copy-Item .\claudecode\memory\furina-memory.json "$HOME\.claude\furina-memory.json"
```

### 3.3 项目级安装

如果你只想在当前项目中使用命令，可以复制到当前项目的 `.claude/commands/`：

```bash
mkdir -p .claude/commands
cp claudecode/commands/furina.md .claude/commands/
cp claudecode/commands/furina-save.md .claude/commands/
cp claudecode/commands/furina-reflect.md .claude/commands/
cp claudecode/commands/furina-compress.md .claude/commands/
```

项目级安装不会自动创建全局记忆文件。若仍想使用同一份全局记忆，请保留：

```text
~/.claude/furina-memory.json
```

---

## 四、开始使用

### 4.1 第一次对话

打开 Claude Code 后输入：

```text
/furina 你好，芙宁娜。
```

如果一切正常，芙宁娜会以角色身份回应。初次使用时，记忆文件为空，亲密度默认为 0。

### 4.2 常用命令

| 命令 | 用法 |
|------|------|
| `/furina 你好，芙宁娜。` | 开始普通角色对话 |
| `/furina-save 今天聊得很开心，请记住这次对话。` | 手动保存本次关键记忆 |
| `/furina-reflect <对话记录>` | 从长对话中提取记忆 JSON |
| `/furina-compress` | 压缩过多或重复的记忆条目 |

### 4.3 退出角色扮演

在 `/furina` 对话中可以使用：

```text
[退出扮演]
```

或：

```text
[exit roleplay]
```

这会让回复暂时切回正常说明模式。之后再次使用 `/furina ...` 即可重新进入角色。

---

## 五、认知记忆系统

### 5.1 记忆文件位置

Claude Code 版本使用这个文件保存记忆：

```text
~/.claude/furina-memory.json
```

初始内容（`version: "2.0"`）：

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

### 5.2 字段说明

| 字段 | 值 | 说明 |
|------|----|------|
| `intimacy` | 0 到 10 | 亲密度，影响芙宁娜的语气与真诚程度 |
| `last_chat` | `YYYY-MM-DD` | 上次对话日期 |
| `interaction_state` | `not_present` / `summoned` / `getting_familiar` / `observation` | 控制回应时机与分寸 |
| `soul_state` | `low` / `calm` / `active` / `excited` | 上次对话后的情绪快照 |
| `soul_energy` | 0 到 100 | 回忆深度、印象深度、表达欲与创造力 |
| `profile` | object | 用户称呼、边界和互动偏好 |
| `memories` | 数组 | 带 priority / strength / confidence / tags 的核心记忆 |
| `notes` | 数组 | 较长背景笔记 |
| `reflection_queue` | 数组 | 后续学习或跟进主题 |
| `sleep` | object | 睡眠巩固状态 |

### 5.3 手动保存

当你希望明确保存某段对话，可以使用：

```text
/furina-save 用户喜欢枫丹歌剧，也希望芙宁娜下次记得这个偏好。
```

### 5.4 手动编辑记忆

你可以直接编辑 `~/.claude/furina-memory.json`。建议遵守：

- `intimacy` 保持 0 到 10 的整数
- `soul_state` 只使用 `low`、`calm`、`active`、`excited`
- `interaction_state` 只使用 `not_present`、`summoned`、`getting_familiar`、`observation`
- `memories` 中每条内容尽量短，最好是一条明确事实，并补齐 `priority`、`strength`、`confidence`、`tags`
- 普通寒暄、一次性问题和未明确要求保存的敏感隐私不建议写入记忆

示例：

```json
{
  "version": "2.0",
  "intimacy": 4,
  "last_chat": "2026-04-26",
  "interaction_state": "observation",
  "soul_state": "active",
  "soul_energy": {
    "recall_depth": 40,
    "impression_depth": 40,
    "expression_desire": 45,
    "creativity": 55
  },
  "memories": [
    {
      "id": "M001",
      "type": "preference",
      "content": "用户喜欢枫丹歌剧",
      "priority": 2,
      "strength": 70,
      "confidence": 0.9,
      "tags": ["偏好", "歌剧"]
    }
  ],
  "notes": [],
  "reflection_queue": [],
  "sleep": {
    "last_consolidated": "",
    "pending_count": 1
  }
}
```

---

## 六、通用 Prompt 用法

如果你不使用 Claude Code，也可以把本仓库作为提示词与知识库资源使用。

### 6.1 推荐加载顺序

普通角色扮演优先使用轻量加载：

1. 读取 [src/prompt/runtime_lite.md](src/prompt/runtime_lite.md) 作为低 token 角色运行提示词。
2. 按问题类型从 [furina_resource/00_index.md](furina_resource/00_index.md) 选择对应知识文件。
3. 如需记忆，按 [src/memory/memory_format.md](src/memory/memory_format.md) 注入 `[认知存档]`。
4. 对话结束后，用 [src/prompt/reflection.md](src/prompt/reflection.md) 提取记忆更新。
5. 记忆过多时，用 [src/memory/compression.md](src/memory/compression.md) 压缩。

需要严格角色一致性、提示词维护或复杂边界审查时，再额外加载：

- [src/prompt/system.md](src/prompt/system.md)
- [src/rules/ooc_rules.md](src/rules/ooc_rules.md)

### 6.2 手动记忆注入示例

```text
[认知存档]
版本: 2.0
亲密度: 5/10
上次对话: 2026-04-26
交互状态: observation
灵魂状态: active
主动回忆:
- M001[中|70|0.90]: 用户喜欢枫丹歌剧 #偏好
边界与偏好:
- 普通寒暄时不要频繁翻旧账
[/认知存档]

你好，芙宁娜。
```

---

## 七、常见问题

### Q1：Claude Code 里没有 `/furina`

检查命令文件是否复制到了正确目录：

```text
~/.claude/commands/furina.md
```

复制完成后，重启当前 Claude Code 会话再试。

### Q2：记忆没有保存

检查是否存在：

```text
~/.claude/furina-memory.json
```

如果不存在，从项目中重新复制：

```bash
cp claudecode/memory/furina-memory.json ~/.claude/furina-memory.json
```

Windows PowerShell：

```powershell
Copy-Item .\claudecode\memory\furina-memory.json "$HOME\.claude\furina-memory.json"
```

### Q3：记忆文件格式坏了

把 `~/.claude/furina-memory.json` 改回项目中的空模板，或手动恢复为：

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

然后重新运行 `/furina`。

### Q4：回复不像芙宁娜

优先检查是否加载了主命令 `claudecode/commands/furina.md`。如果你在自定义运行时中使用，请确保至少加载：

- `src/prompt/runtime_lite.md`
- `furina_resource/02_personality.md`
- `furina_resource/05_voice_style.md`

若仍不稳定，可用 [eval/furina_voice_cases.md](eval/furina_voice_cases.md) 做人工验收；需要完整边界审查时再补充 `src/prompt/system.md` 与 `src/rules/ooc_rules.md`。

### Q5：什么时候使用 `/furina-compress`

当 `~/.claude/furina-memory.json` 中记忆条目变多、重复或零散时，可以运行：

```text
/furina-compress
```

它会读取当前记忆文件，压缩后写回。若记忆条数不足，命令会提示暂无需压缩。

---

## 八、检查清单

- [ ] 已获得项目文件
- [ ] 已复制 `furina.md`、`furina-save.md`、`furina-reflect.md`、`furina-compress.md`
- [ ] 已创建或复制 `~/.claude/furina-memory.json`
- [ ] 已在 Claude Code 中测试 `/furina 你好，芙宁娜。`
- [ ] 知道如何使用 `/furina-save`
- [ ] 知道 `[退出扮演]` 与 `[exit roleplay]` 的作用
- [ ] 若使用自定义运行时，已加载核心 prompt、OOC 规则和所需知识库

---

## 进一步阅读

- [README.md](README.md)：项目总览
- [claudecode/README.md](claudecode/README.md)：Claude Code 版本说明
- [src/memory/memory_format.md](src/memory/memory_format.md)：记忆格式规范
- [src/prompt/runtime_lite.md](src/prompt/runtime_lite.md)：低 token 角色运行提示词
- [eval/furina_voice_cases.md](eval/furina_voice_cases.md)：芙宁娜语气人工验收用例
- [furina_resource/00_index.md](furina_resource/00_index.md)：知识库索引
