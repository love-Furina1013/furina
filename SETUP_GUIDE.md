# AstrBot 部署手册

本手册针对 `feat/astrbot-adapter` 分支，仅覆盖 AstrBot 平台的部署与排障。Claude Code / Codex 版本请切换到 `main` 分支并查阅该分支的 SETUP_GUIDE.md。

完整部署流程的权威参考是 [astrbot/README.md](astrbot/README.md)，本文件为补充性快速索引。

---

## 1. 环境要求

- AstrBot v4.24.2+，Docker 部署
- 已安装三个插件（安装顺序不能颠倒）：
  1. `astrbot_plugin_angel_heart`
  2. `astrbot_plugin_angel_memory`（依赖 angel_heart）
  3. `astrbot_plugin_livingmemory`
- Node.js 18+（用于本地生成适配包）

## 2. 生成适配包

```powershell
node .\scripts\furina-astrbot.mjs generate --out astrbot
node .\scripts\furina-astrbot.mjs check --out astrbot
```

`main.py`、`metadata.yaml`、`_conf_schema.json`、`skills/` 是静态文件，`generate` 不会覆盖它们；`persona/` 和 `angel_memory/` 会从 `src/prompt/` 重新生成。

## 3. 安装后配置

### 安装 tantivy

```bash
docker exec astrbot pip install tantivy
docker restart astrbot
```

### 配置 Embedding 提供商

Dashboard → 模型提供商 → 新增，推荐 Gemini Embedding（免费）：

| 字段 | 值 |
|------|----|
| 类型 | Gemini Embedding |
| ID | `gemini_embedding` |
| 模型名称 | `gemini-embedding-2` |
| 向量维度 | `768` |

> ⚠️ **已知 Bug**：AstrBot v4.24.2 的 Gemini Embedding 批量接口与 `gemini-embedding-2` 不兼容，需手动修复 `get_embeddings` 方法改为逐条请求。
> 详见 [astrbot/README.md](astrbot/README.md) 和 [issue #8150](https://github.com/AstrBotDevs/AstrBot/issues/8150)。

### 创建知识库

Dashboard → 知识库 → 创建，名称 `furina resource`，上传 `furina_resource/` 下以下文件：

```
01_profile.md  02_personality.md  03_story_timeline.md  04_combat_mechanics.md
06_relationships.md  07_quotes.md  09_voice_lines.md  10_moegirl_supplement.md
```

不上传 `05_voice_style.md`（已内联到 Skill 和 Persona）。

### 配置三个插件

参考 `astrbot/configs/astrbot_plugins.example.json`，关键字段：

**Angel Heart：**

| 字段 | 推荐值 |
|------|--------|
| `analyzer_model` | `deepseek/deepseek-v4-flash` |
| `alias` | `芙宁娜\|Furina\|水神` |
| `strip_markdown_enabled` | `false` |

**Angel Memory：**

| 字段 | 推荐值 |
|------|--------|
| `conversation_scope_map` | `{"furina-roleplay": "furina_default"}` |
| `enable_soul_system.enabled` | `true` |
| `enable_soul_system.expression_desire_mid` | `0.6` |

**LivingMemory：**

| 字段 | 推荐值 |
|------|--------|
| `recall_engine.injection_method` | `system_prompt` |
| `filtering_settings.use_persona_filtering` | `true` |
| `filtering_settings.use_session_filtering` | `false` |

配置完毕后重启 AstrBot。

### 上传 Skill 并创建 Persona

1. 将 `astrbot/skills/furina/SKILL.md` 打包为 ZIP，Dashboard → Skills → 上传。
2. Dashboard → 人格设定 → 新建，名称 `芙宁娜`，System Prompt 粘贴 `astrbot/persona/furina-astrbot-persona.md` 全部内容，Skills 选 `furina-roleplay`。
3. Dashboard → 机器人 → 默认人格，切换为 `芙宁娜`。

可选：通过 Angel Memory Debug Tool 导入 `astrbot/angel_memory/furina_core_memories.json` 预置核心记忆。

## 4. 使用验证

在对话框中输入：

```
芙宁娜，你好。
```

或在群聊中 @ 机器人。

正常情况下应触发角色扮演回复；如果无响应，检查 Angel Heart 插件日志确认 `alias` 匹配。

## 5. 常见问题

### 知识库文档上传后不显示

通常是 Gemini Embedding batch API Bug 导致向量化失败。修复 `gemini_embedding_source.py` 后重新上传文档。详见 [astrbot/README.md](astrbot/README.md#第二步配置-embedding-提供商)。

### AngelMemory 启动报 tantivy 错误

```bash
docker exec astrbot pip install tantivy
docker restart astrbot
```

### 记忆 scope 混用了其他 persona 的内容

确认 Angel Memory 的 `conversation_scope_map` 配置为：

```json
{"furina-roleplay": "furina_default"}
```

### LivingMemory 注入与 Angel Heart 冲突

确认 LivingMemory 的 `injection_method` 设为 `system_prompt`，避免与 Angel Heart 的上下文重写互相覆盖。

## 6. 刷新适配包

修改 `src/prompt/` 或 `furina_resource/` 后重新生成：

```powershell
node .\scripts\furina-astrbot.mjs generate --out astrbot
node .\scripts\furina-astrbot.mjs check --out astrbot
```

重新上传 Skill ZIP 和 Persona 系统提示词后重启 AstrBot 生效。
