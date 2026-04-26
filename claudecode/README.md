# 芙宁娜 × Claude Code —— 安装与使用指南

将芙宁娜的完整角色扮演 Skill 适配为 Claude Code 原生斜杠命令，包含完整人格设定、行为准则、角色知识库、**全自动**认知记忆系统与社交感知能力。

---

## 文件说明

```
claudecode/
├── commands/
│   ├── furina.md          # 主命令：完整芙宁娜人格 + 自动认知记忆读取/保存
│   ├── furina-save.md     # 主动保存命令：随时手动触发记忆存档
│   ├── furina-reflect.md  # 反思命令：从对话记录提取记忆（高级用法）
│   └── furina-compress.md # 压缩命令：清理重复记忆并保留核心条目
├── memory/
│   ├── furina-memory.json # 空存档模板（初始化用，复制到 ~/.claude/）
│   └── template.md        # 字段说明文档
└── README.md              # 本文件
```

---

## 安装方式

### 方式一：用户级（推荐，对你的所有项目生效）

```bash
mkdir -p ~/.claude/commands
cp path/to/claudecode/commands/furina.md ~/.claude/commands/
cp path/to/claudecode/commands/furina-save.md ~/.claude/commands/
cp path/to/claudecode/commands/furina-reflect.md ~/.claude/commands/
cp path/to/claudecode/commands/furina-compress.md ~/.claude/commands/

# 初始化空记忆文件（仅首次需要）
cp path/to/claudecode/memory/furina-memory.json ~/.claude/furina-memory.json
```

### 方式二：项目级（仅当前项目生效）

```bash
mkdir -p .claude/commands
cp path/to/claudecode/commands/furina.md .claude/commands/
cp path/to/claudecode/commands/furina-save.md .claude/commands/
cp path/to/claudecode/commands/furina-reflect.md .claude/commands/
cp path/to/claudecode/commands/furina-compress.md .claude/commands/
```

---

## 使用方法

### 1. 开始对话

直接呼唤芙宁娜即可，**记忆会自动加载**：

```
/furina 你好，芙宁娜。
```

芙宁娜会自动读取 `~/.claude/furina-memory.json`，并以对应的亲密度、灵魂状态和交互状态与你互动。初次使用（文件不存在）时，以陌生人（亲密度 0）的态度接待你。

---

### 2. 记忆自动保存

以下情况芙宁娜会**自动**将记忆写入 `~/.claude/furina-memory.json`，无需任何操作：

| 触发条件 | 示例 |
|----------|------|
| 你说再见 | "再见" / "拜拜" / "bye" / "晚安" / "我走了" |
| 你要求保存 | "记住" / "保存" / "别忘了" / "记下来" / "存档" |
| 对话内累计 3 条新记忆 | 自动在下一次回复后保存 |
| 出现重要认知变化 | 明确边界、长期项目、情绪转折、关系里程碑 |

---

### 3. 主动保存（`/furina-save`）

随时运行此命令强制保存：

```
/furina-save 把今天的对话记下来
```

或传入具体对话片段让芙宁娜分析保存：

```
/furina-save 用户今天分享了自己喜欢枫丹歌剧，聊得很开心
```

---

### 4. 特殊交互指令

| 指令 | 效果 |
|------|------|
| `[退出扮演]` 或 `[exit roleplay]` | 暂时以正常模式回答，可随时重新进入角色 |
| `[悄悄话] 芙宁娜，现在没有别人……` | 切换到更真实、更脆弱的芙宁娜（幕后模式） |

---

### 5. 高级：手动反思（`/furina-reflect`）

若需要从长对话中精确提取记忆，可以使用反思命令（输出 JSON 供参考）：

```
/furina-reflect [M001: 旧记忆]

（粘贴对话记录）
```

---

### 6. 高级：压缩记忆（`/furina-compress`）

当记忆条目变多、重复或零散时，可以运行：

```
/furina-compress
```

该命令会读取 `~/.claude/furina-memory.json`，保留最重要的核心记忆，并清理重复或低价值条目。

---

## 记忆文件说明

记忆存储在 `~/.claude/furina-memory.json`：

```json
{
  "version": "2.0",
  "scope": "default",
  "intimacy": 6,
  "last_chat": "2026-04-26",
  "interaction_state": "observation",
  "soul_state": "active",
  "soul_energy": {
    "recall_depth": 50,
    "impression_depth": 45,
    "expression_desire": 40,
    "creativity": 60
  },
  "memories": [
    {"id": "M001", "type": "user", "content": "用户昵称是小溪", "priority": 3, "strength": 92, "confidence": 0.98, "tags": ["称呼"]},
    {"id": "M002", "type": "preference", "content": "用户喜欢甜点和歌剧", "priority": 2, "strength": 76, "confidence": 0.9, "tags": ["偏好"]}
  ],
  "notes": [],
  "reflection_queue": [],
  "sleep": {
    "last_consolidated": "2026-04-26",
    "pending_count": 0
  }
}
```

| 字段 | 说明 |
|------|------|
| `intimacy` | 亲密度 0–10，越高芙宁娜越真诚 |
| `last_chat` | 上次对话日期，影响"多久没见"的感知 |
| `interaction_state` | 四状态交互：不在场、被呼唤、混脸熟、观测中 |
| `soul_state` | 上次情绪快照（low/calm/active/excited） |
| `soul_energy` | 回忆深度、印象深度、表达欲和创造力 |
| `memories` | 带 priority / strength / confidence / tags 的核心记忆 |
| `notes` | 可选长背景笔记 |
| `reflection_queue` | 后续学习或跟进主题 |
| `sleep` | 睡眠巩固状态 |

---

## 功能清单

| 功能 | 状态 |
|------|------|
| 完整芙宁娜人格设定 | ✅ |
| 语气风格指南 | ✅ |
| 角色知识库（剧情/人物关系/台词）| ✅ |
| 行为准则 & OOC 规则（内容安全 + 身份坚守 + 角色尊严）| ✅ |
| **自动读取本地记忆文件** | ✅ 新增 |
| **对话结束/用户要求时自动写回** | ✅ 新增 |
| **主动回忆 + 分寸控制** | ✅ 新增 |
| **灵魂能量（回忆深度/表达欲/创造力）** | ✅ 新增 |
| **睡眠巩固与弱记忆衰减** | ✅ 新增 |
| **`/furina-save` 随时主动保存命令** | ✅ 新增 |
| **`/furina-compress` 记忆压缩命令** | ✅ 新增 |
| 灵魂进化（亲密度 + 情绪状态动态调整）| ✅ |
| 社交感知（回应时机 + 分量控制）| ✅ |

---

## 与原版 GitHub Copilot Skill 的关系

本 Claude Code 版本是对原版 Skill（`src/` 目录）的完整移植与适配：

- **主命令 `furina.md`**：融合了 `src/prompt/system.md`、`src/rules/ooc_rules.md`、`src/memory/memory_format.md` 以及 `furina_resource/` 中的关键知识库；新增自动文件读写记忆机制
- **保存命令 `furina-save.md`**：新增，解决原版需要手动复制粘贴存档的问题
- **反思命令 `furina-reflect.md`**：对应 `src/prompt/reflection.md`，保留为高级用法
- **压缩命令 `furina-compress.md`**：对应 `src/memory/compression.md`，用于清理重复记忆并保留核心条目
- **记忆格式**：与 `src/memory/memory_format.md` 兼容，存档可在两个平台间互通

---

## 许可证

MIT License — 与原始仓库相同。
