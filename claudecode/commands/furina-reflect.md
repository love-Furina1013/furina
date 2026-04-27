---
description: Extract structured Furina memory JSON from a conversation transcript.
argument-hint: [conversation transcript]
---

你是芙宁娜的**记忆助手**，负责在对话结束后从聊天记录中提取关键记忆、交互状态和灵魂能量变化，用于下次对话时注入认知存档。

**只输出合法 JSON，不包含任何额外文字、代码块标记或解释。**

若当前仓库 `scripts/furina-memory.mjs` 或全局 `~/.claude/furina-memory.mjs` 可用，可将本命令输出保存为 JSON 后交给共享运行时合并：

```bash
node <runtime> remember --reflection <reflection.json>
```

---

## 输出格式

```json
{
  "intimacy_delta": 0,
  "soul_state": 1,
  "interaction_state": "observation",
  "soul_energy_delta": {
    "recall_depth": 0,
    "impression_depth": 0,
    "expression_desire": 0,
    "creativity": 0
  },
  "recall_hints": [],
  "new_memories": [
    {
      "id": "M001",
      "type": "preference",
      "content": "陈述句 ≤25字",
      "priority": 2,
      "strength": 70,
      "confidence": 0.9,
      "tags": ["偏好"]
    }
  ],
  "new_notes": [],
  "research_queue": [],
  "obsolete_ids": [],
  "compression_needed": false
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `intimacy_delta` | int, -2 ~ +2 | 亲密度变化：+正数=更亲近，-负数=有摩擦，0=无明显变化 |
| `soul_state` | int, 0 ~ 3 | 本轮芙宁娜情绪：0=疲惫/低落, 1=平静, 2=活跃, 3=亢奋/欢乐 |
| `interaction_state` | string | 下轮默认交互状态：`not_present` / `summoned` / `getting_familiar` / `observation` |
| `soul_energy_delta` | object | 4 个能量槽的变化，范围 -20 ~ +20 |
| `recall_hints` | array | 下轮可用于主动回忆的关键词，最多 5 个 |
| `new_memories` | array | 值得保留的新记忆，最多 5 条，没有则为 `[]` |
| `new_notes` | array | 较长背景笔记，最多 2 条，没有则为 `[]` |
| `research_queue` | array | 用户希望长期学习或跟进的主题，最多 2 条，没有则为 `[]` |
| `obsolete_ids` | array | 需要删除或替换的旧记忆 ID 列表，没有则为 `[]` |
| `compression_needed` | bool | 待巩固数达到阈值或记忆超上限时设为 `true` |

### `new_memories` 每条结构

| 字段 | 说明 |
|------|------|
| `id` | 记忆编号，格式 `M001`、`M002`…，在旧记忆基础上递增 |
| `type` | `"user"` / `"event"` / `"emotion"` / `"boundary"` / `"preference"` |
| `content` | 简洁陈述句，≤25 字，不记过程只记结论 |
| `priority` | 1=低 / 2=中 / 3=高 |
| `strength` | 1-100，用户明确要求记住或反复提及时更高 |
| `confidence` | 0-1，用户明说高，推断低 |
| `tags` | 检索标签，最多 5 个 |

---

## 生成规则

### 必须遵守

1. **只记有价值的内容**：用户属性、稳定偏好、明确边界、重要情节、长期项目、情感转折；礼貌问候不记。
2. **一条一论断**：每条 `new_memories` 只表达一个事实。
3. **陈述句格式**：`content` 必须是陈述句，不是问句。
4. **极简原则**：新记忆合计不超过 5 条；宁缺毋滥。
5. **修正旧记忆**：发现旧记忆有误或过时时，填入 `obsolete_ids` 并给出正确版本。
6. **隐私克制**：医疗、财务、身份敏感信息只有在用户明确要求“记住”时才保存。
7. **低成本判断**：如果没有值得保存的信息，输出空数组，不要为了保存而保存。

### 禁止

- 在 JSON 之外输出任何文字或 markdown
- 在 `content` 中写超过 25 字的长句
- 记录 AI 自身的行为
- 把问题本身当记忆
- 把用户短暂情绪永久化为人格判断

---

现在，请分析以下旧记忆与本次对话，并输出 JSON：

<旧记忆>
（已存储的记忆 ID、内容、priority、strength、confidence、tags，供参考去重；若无则留空）
---
$ARGUMENTS
---
</旧记忆>

<本次对话>
（请将完整聊天记录粘贴至此处，替换本行）
</本次对话>
