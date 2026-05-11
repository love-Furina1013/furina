# Furina de Fontaine — AstrBot 适配包

芙宁娜·德·枫丹角色扮演资源包，本分支专注于 **AstrBot 平台适配**。

提供 AstrBot Skill 定义、Persona 系统提示词、Angel Memory 知识卡、LivingMemory 长期记忆策略和插件配置参考，配合 `furina_resource/` 结构化知识库实现稳定的角色扮演体验。

![芙宁娜头像](assets/IMG_1877.jpg)

## 当前分支说明

> **此分支：`feat/astrbot-adapter`（AstrBot 适配专用）**
>
> 本分支专注于将芙宁娜 skill 适配到 AstrBot 平台。如需 Claude Code / Codex 版本，请切换到 `main` 分支。

| 项目 | 本分支（`feat/astrbot-adapter`） | `main` 分支 |
|------|------|------|
| 核心用途 | AstrBot Skills + Persona + 知识库适配 | Claude Code Skill / Codex Skill |
| 新增内容 | `astrbot/` 适配包、`scripts/furina-astrbot.mjs`、`tests/astrbot.test.mjs` | — |
| 适用场景 | 已安装 Angel Heart / Angel Memory / LivingMemory 的 AstrBot v4.24.2+ | 安装简单，可选本地缓存 |

## 依赖插件

- [astrbot_plugin_angel_heart](https://github.com/kawayiYokami/astrbot_plugin_angel_heart)
- [astrbot_plugin_angel_memory](https://github.com/kawayiYokami/astrbot_plugin_angel_memory)
- [astrbot_plugin_livingmemory](https://github.com/lxfight-s-Astrbot-Plugins/astrbot_plugin_livingmemory)

## 快速开始

生成或刷新适配包（需要 Node.js 18+）：

```powershell
node .\scripts\furina-astrbot.mjs generate --out astrbot
node .\scripts\furina-astrbot.mjs check --out astrbot
```

完整部署步骤见 [astrbot/README.md](astrbot/README.md)，包含：插件安装顺序、Gemini Embedding 配置与 Bug 修复、知识库上传、三个插件的配置参考、Skill ZIP 上传和 Persona 创建。

## 适配包内容

| 文件 | 用途 |
|------|------|
| `astrbot/skills/furina/SKILL.md` | AstrBot Skill 定义（含角色人设、崩坏梯度、工具调用规则） |
| `astrbot/persona/furina-astrbot-persona.md` | 复制到 AstrBot"芙宁娜" Persona 的系统提示词 |
| `astrbot/angel_memory/furina_notes.md` | Angel Memory 短知识卡 |
| `astrbot/angel_memory/furina_core_memories.json` | 可通过 Angel Memory Debug Tool 导入的核心记忆 |
| `astrbot/configs/astrbot_plugins.example.json` | Angel Heart / Angel Memory / LivingMemory 配置参考 |
| `astrbot/main.py` / `metadata.yaml` | 可选原生插件入口（高级用法） |

## 插件职责分工

| 组件 | 负责内容 |
|------|----------|
| Angel Heart | 群聊回复时机、四状态机（不在场/被呼唤/混脸熟/观测中） |
| Angel Memory | 角色核心记忆、短知识卡、灵魂状态系统 |
| LivingMemory | 长期会话历史、用户事实、图谱记忆 |
| AstrBot 知识库 | `furina_resource/` 结构化资料，按需 RAG 检索 |
| Skill（本包） | 角色扮演指令、工具调用规则、崩坏梯度表 |
| Persona（本包） | 系统角色定义、反应公式、安全边界 |

## 常用命令

| 命令 | 用途 |
|------|------|
| `node .\scripts\furina-astrbot.mjs generate --out astrbot` | 生成 AstrBot 适配包 |
| `node .\scripts\furina-astrbot.mjs check --out astrbot` | 检查适配包文件完整性 |
| `node .\scripts\furina-wiki.mjs sources` | 检查外部原神 wiki 来源 |
| `node .\scripts\furina-wiki.mjs search "芙宁娜"` | 检索外部原神 wiki |
| `node .\scripts\furina-explore.mjs --task "芙宁娜 传说任务"` | 并行探索外部 wiki 证据 |

## 知识库

`furina_resource/` 是所有平台共用的唯一角色资料源，AstrBot 部署时需上传以下文件到 AstrBot 知识库：

| 文件 | 内容 |
|------|------|
| `01_profile.md` | 基础资料 |
| `02_personality.md` | 性格、人设、表达习惯 |
| `03_story_timeline.md` | 剧情时间线 |
| `04_combat_mechanics.md` | 技能与战斗机制 |
| `06_relationships.md` | 人物关系 |
| `07_quotes.md` | 高频台词与破绽句式 |
| `09_voice_lines.md` | 语音台词整理 |
| `10_moegirl_supplement.md` | 萌娘百科补充、创作要点与二创边界 |

> `05_voice_style.md` 已内联到 SKILL.md 和 Persona，不上传知识库。

## 外部原神 Wiki

`scripts/furina-wiki.mjs` 用于按需查询芙宁娜资料库未覆盖的外部原神内容，优先查询本地 genshinstory-cache，不可用时自动回退在线 BWIKI：

```powershell
node .\scripts\furina-wiki.mjs search "芙宁娜 那维莱特" --top 5
node .\scripts\furina-wiki.mjs brief "芙宁娜 传说任务"
```

可选安装本地缓存加速：

```bash
git clone https://github.com/Furinelle/genshinstory-cache ../genshinstory-cache
```

## 资料来源与声明

- `furina_resource/` 的角色资料整理自萌娘百科条目：[芙宁娜·德·枫丹](https://zh.moegirl.org.cn/芙宁娜·德·枫丹)。使用与再分发时请遵守原站著作权声明与页面历史署名要求。
- 认知记忆系统参考了 [astrbot_plugin_angel_memory](https://github.com/kawayiYokami/astrbot_plugin_angel_memory) 与 [astrbot_plugin_angel_heart](https://github.com/kawayiYokami/astrbot_plugin_angel_heart) 的部分设计思路，并改写为本仓库的轻量 Prompt / Skill 资源形态。
- 本项目为同人创作与提示词工程实践。芙宁娜、《原神》及相关角色版权归 miHoYo / HoYoverse 所有。

## License

[MIT License](LICENSE)
