# 芙宁娜 · 角色扮演 Skill

> 基于 GitHub Copilot 开发的**芙宁娜（Furina de Fontaine）**角色扮演 Skill，包含完整的人格设定、行为准则与角色知识库。

![芙宁娜头像](assets/IMG_1877.jpg)

---

## 🌊 角色简介

**芙宁娜·德·枫丹**（Furina de Fontaine）是米哈游研发的游戏《原神》及其衍生作品中的登场角色。她曾以"水神"的身份长期活跃于枫丹，以庭主之名统治枫丹长达五百年。魔神任务第四章真相揭露：她其实是真正的水神**芙卡洛斯**（纯水精灵）所分离出的**人类分身**，以一己之力独自扮演神明五百年，承载了枫丹预言的全部重压。预言完成、神位卸任后，她以真正的凡人身份重新开始生活，并在传说任务「水的女儿」中获得属于自己的水元素神之眼。

她以戏剧感、大明星气场与傲娇性格著称——表面张扬高调、爱面子、嘴硬，内心深处却藏着五百年的孤独、胆小与反差感。神位卸任后，她更加真实坦率，骨子里的戏剧性与傲娇劲儿依旧如影随形。

本 Skill 旨在还原芙宁娜丰富的角色层次（涵盖剧情前后两种状态），带来沉浸式的角色扮演体验。

---

## 📁 项目结构

```
furina/
├── assets/
│   └── IMG_1877.jpg            # 角色头像
├── furina_resource/            # 芙宁娜结构化知识库（AI 按需调用）
│   ├── 00_index.md             # 索引与使用说明
│   ├── 01_profile.md           # 基础资料
│   ├── 02_personality.md       # 性格与表达习惯
│   ├── 03_story_timeline.md    # 剧情时间线
│   ├── 04_combat_mechanics.md  # 技能与战斗机制
│   ├── 05_voice_style.md       # 语气风格与生成规则
│   ├── 06_relationships.md     # 人物关系
│   ├── 07_quotes.md            # 高频台词
│   ├── 08_faq.md               # 常见问题答案
│   └── 09_voice_lines.md       # 语音台词整理
├── src/
│   ├── prompt/
│   │   ├── system.md         # 核心系统提示词（人格 & 行为准则）
│   │   └── user.md           # 常用用户指令模板
│   └── rules/
│       └── ooc_rules.md      # 防出戏 & 内容安全规则
├── config/
│   ├── settings.json         # 模型参数（Temperature, Top-p 等）
│   └── manifest.json         # Skill 元数据声明（ID、版本、名称）
├── README.md                 # 使用说明文档
└── LICENSE                   # MIT 授权协议
```

---

## ✨ 功能特性

- 🎭 **完整人格系统**：傲娇外壳 × 敏感内核，涵盖 arc 前后两种状态
- ⚖️ **枫丹审判风格**：戏剧化的语言风格与审判庭氛围
- 📖 **角色知识库**：原著剧情、人物关系网络、标志性台词库
- 🛡️ **完善的 OOC 规则**：防止出戏、内容安全过滤、角色尊严保护
- 🎵 **多场景支持**：日常闲聊、审判情景、情感探讨、戏剧创作

---

## 🚀 快速开始

### 基础对话

在支持 Copilot Skill 的平台上加载本 Skill 后，直接与芙宁娜对话：

```
你好，芙宁娜。
```

更多指令模板请参考 [`src/prompt/user.md`](src/prompt/user.md)。

### 退出角色扮演

发送以下指令可暂时退出角色扮演模式：

```
[退出扮演]
```

---

## ⚙️ 配置说明

### 模型参数（`config/settings.json`）

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `temperature` | 0.85 | 控制回复创意性，较高值使对话更富戏剧感 |
| `top_p` | 0.95 | Nucleus sampling，保证词汇多样性 |
| `top_k` | 50 | 限制候选词范围，避免低概率词干扰 |
| `max_tokens` | 1024 | 单次回复最大 token 数 |
| `frequency_penalty` | 0.3 | 抑制短语重复 |
| `presence_penalty` | 0.4 | 鼓励引入新词汇和话题 |
| `stop_sequences` | `["[退出扮演]", "[exit roleplay]"]` | 触发后立即结束角色扮演模式 |

### 上下文窗口（`config/settings.json` → `context_window`）

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `max_history_turns` | 20 | 保留最近对话轮次数 |

### 安全设置（`config/settings.json` → `safety`）

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `content_filter` | `true` | 开启内容安全过滤 |
| `filter_level` | `strict` | 过滤级别：严格模式 |
| `ooc_detection` | `true` | 开启出戏（OOC）检测 |

### Skill 元数据（`config/manifest.json`）

包含 Skill 的 ID、版本号、名称、能力声明等信息，详见 [`config/manifest.json`](config/manifest.json)。

---

## 📚 文件说明

| 文件 | 说明 |
|------|------|
| [`src/prompt/system.md`](src/prompt/system.md) | 核心人格设定，包含角色身份、性格特质、语言风格与行为准则 |
| [`src/prompt/user.md`](src/prompt/user.md) | 分场景的用户指令模板 |
| [`src/rules/ooc_rules.md`](src/rules/ooc_rules.md) | 完整的防出戏与内容安全规则体系 |

### 📂 furina_resource 知识库

`furina_resource/` 目录是专为 AI 按需检索而设计的结构化知识库。AI 在回答剧情、台词、战斗机制等问题时，可根据 [`furina_resource/00_index.md`](furina_resource/00_index.md) 的索引说明，按需读取对应文件。

| 文件 | 说明 |
|------|------|
| [`furina_resource/00_index.md`](furina_resource/00_index.md) | 索引与使用建议 |
| [`furina_resource/01_profile.md`](furina_resource/01_profile.md) | 基础资料（全名、生日、种族、命之座等） |
| [`furina_resource/02_personality.md`](furina_resource/02_personality.md) | 性格、人设与表达习惯 |
| [`furina_resource/03_story_timeline.md`](furina_resource/03_story_timeline.md) | 剧情时间线 |
| [`furina_resource/04_combat_mechanics.md`](furina_resource/04_combat_mechanics.md) | 技能与战斗机制 |
| [`furina_resource/05_voice_style.md`](furina_resource/05_voice_style.md) | 语气风格与生成规则 |
| [`furina_resource/06_relationships.md`](furina_resource/06_relationships.md) | 人物关系 |
| [`furina_resource/07_quotes.md`](furina_resource/07_quotes.md) | 高频台词与适合引用的句子 |
| [`furina_resource/08_faq.md`](furina_resource/08_faq.md) | 常见问题答案 |
| [`furina_resource/09_voice_lines.md`](furina_resource/09_voice_lines.md) | 语音台词整理 |

---

## 🎮 角色信息

| 属性 | 内容 |
|------|------|
| 全名 | 芙宁娜·德·枫丹 (Furina de Fontaine) |
| 元素（神之眼） | 水 (Hydro)（传说任务后自行获得） |
| 武器 | 单手剑 |
| 所在地区 | 枫丹 (Fontaine) |
| 命之座 | 司颂座 |
| 生日 | 10月13日 |
| 真实身份 | 纯水精灵芙卡洛斯分离出的人类分身 |
| 始基力 | 圣俗杂座（初始为荒） |
| 前职位 | 枫丹审判庭庭主（神位已卸任） |
| 个人状态 | 神格消逝；以凡人身份生活，持有水元素神之眼 |

---

## 🤝 贡献

欢迎通过 Issue 或 Pull Request 贡献更多台词、改善人格设定或修正原著偏差。

---

## 📋 更新日志

| 版本 | 更新内容 |
|------|----------|
| v1.1.0 | 补充战斗机制知识库（`furina_resource/04_combat_mechanics.md`）：涵盖元素战技、元素爆发、气氛值机制、命之座概要；更新角色设定以准确反映卸任后凡人身份。 |
| v1.0.0 | 初始版本：完整芙宁娜人格设定、行为规则、角色知识库。 |

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

> ⚠️ 本项目为同人创作，芙宁娜角色版权归 © miHoYo / HoYoverse 所有。
