# 芙宁娜 × Claude Code —— 安装与使用指南

将芙宁娜的完整角色扮演 Skill 适配为 Claude Code 原生斜杠命令，包含完整人格设定、行为准则、角色知识库、持久记忆系统与社交感知能力。

---

## 文件说明

```
claudecode/
├── commands/
│   ├── furina.md          # 主命令：完整芙宁娜人格 + 记忆系统 + 社交感知
│   └── furina-reflect.md  # 反思命令：会话后自动提取记忆（更新存档用）
├── memory/
│   └── template.md        # 记忆存档模板（填写后粘贴到命令参数中）
└── README.md              # 本文件
```

---

## 安装方式

### 方式一：项目级（仅当前项目生效）

将 `commands/` 文件夹复制到你的项目根目录下的 `.claude/` 文件夹中：

```bash
# 在你的项目根目录执行
mkdir -p .claude/commands
cp path/to/claudecode/commands/furina.md ~/.claude/commands/
cp path/to/claudecode/commands/furina-reflect.md .claude/commands/
```

或直接把整个 `commands/` 目录放到项目的 `.claude/` 下：

```
your-project/
└── .claude/
    └── commands/
        ├── furina.md
        └── furina-reflect.md
```

### 方式二：用户级（对你的所有项目生效）

```bash
mkdir -p ~/.claude/commands
cp path/to/claudecode/commands/furina.md ~/.claude/commands/
cp path/to/claudecode/commands/furina-reflect.md ~/.claude/commands/
```

---

## 使用方法

### 1. 初次对话（无存档）

在 Claude Code 中直接输入：

```
/furina 你好，芙宁娜。
```

芙宁娜会以亲密度 0（陌生人）的态度接待你。

---

### 2. 携带记忆存档对话

参考 `memory/template.md`，在命令参数最前面粘贴记忆存档区块：

```
/furina [记忆存档]
亲密度: 6/10
上次对话: 2025-03-10
灵魂状态: active
关键记忆:
- M001: 用户昵称是小溪，喜欢甜点和枫丹歌剧
- M002: 用户曾问过芙宁娜关于预言的感受
[/记忆存档]

芙宁娜，我又来了！
```

---

### 3. 特殊交互指令

| 指令 | 效果 |
|------|------|
| `[退出扮演]` 或 `[exit roleplay]` | 暂时以正常模式回答，可随时重新进入角色 |
| `[悄悄话] 芙宁娜，现在没有别人……` | 切换到更真实、更脆弱的芙宁娜（幕后模式） |

---

### 4. 会话后更新记忆（`/furina-reflect`）

每次聊天结束后，运行反思命令提取本次对话的关键记忆：

```
/furina-reflect [旧记忆列表，格式：M001: 内容 | M002: 内容]

（把完整对话记录粘贴在这里）
```

命令会输出 JSON：

```json
{
  "intimacy_delta": 1,
  "soul_state": 2,
  "new_memories": [
    {"id": "M003", "type": "user", "content": "用户喜欢枫丹歌剧"},
    {"id": "M004", "type": "emotion", "content": "用户对芙宁娜表达喜爱"}
  ],
  "obsolete_ids": []
}
```

按以下规则更新你的存档文件：

| JSON 字段 | 更新操作 |
|-----------|----------|
| `intimacy_delta` | 累加到亲密度（上下限 0–10）|
| `soul_state` | 0→low, 1→calm, 2→active, 3→excited |
| `new_memories` | 追加到关键记忆列表 |
| `obsolete_ids` | 删除对应 ID 的旧记忆条目 |

> 💡 建议将存档保存为文本文件（如 `furina-memory.txt`），每次对话前复制粘贴即可。

---

## 功能清单

| 功能 | 状态 |
|------|------|
| 完整芙宁娜人格设定 | ✅ |
| 语气风格指南 | ✅ |
| 角色知识库（剧情/人物关系/台词）| ✅ |
| 行为准则 & OOC 规则（内容安全 + 身份坚守 + 角色尊严）| ✅ |
| 持久记忆系统（存档注入 + 会话内追踪）| ✅ |
| 灵魂进化（亲密度 + 情绪状态动态调整）| ✅ |
| 社交感知（回应时机 + 分量控制）| ✅ |
| 会话后反思 & 记忆提取命令 | ✅ |

---

## 与原版 GitHub Copilot Skill 的关系

本 Claude Code 版本是对原版 Skill（`src/` 目录）的完整移植与适配：

- **主命令 `furina.md`**：融合了 `src/prompt/system.md`、`src/rules/ooc_rules.md`、`src/memory/memory_format.md` 以及 `furina_resource/` 中的关键知识库
- **反思命令 `furina-reflect.md`**：对应 `src/prompt/reflection.md` 的功能
- **记忆格式**：与 `src/memory/memory_format.md` 完全兼容，存档可在两个平台间通用

---

## 许可证

MIT License — 与原始仓库相同。
