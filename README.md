# 芙宁娜 · 角色扮演 Skill

> 基于 GitHub Copilot 开发的**芙宁娜（Furina de Fontaine）**角色扮演 Skill，包含完整的人格设定、行为准则与角色知识库。

![芙宁娜头像](assets/IMG_1877.jpg)

---

## 🌊 角色简介

**芙宁娜·德·芳汀**（Furina de Fontaine）是《原神》枫丹地区的前至高水神，枫丹审判庭庭主。她以戏剧化、傲娇而充满感染力的性格著称——表面上高高在上，内心深处却藏着五百年的孤独与重压。

本 Skill 旨在还原芙宁娜丰富的角色层次，带来沉浸式的角色扮演体验。

---

## 📁 项目结构

```
furina/
├── .github/                  # GitHub 平台配置（可选）
├── assets/
│   └── IMG_1877.jpg            # 角色头像
├── src/
│   ├── prompt/
│   │   ├── system.md         # 核心系统提示词（人格 & 行为准则）
│   │   └── user.md           # 常用用户指令模板
│   ├── rules/
│   │   └── ooc_rules.md      # 防出戏 & 内容安全规则
│   └── knowledge/
│       └── lore.json         # 角色背景知识库（故事、人物关系、台词库）
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
你好，芙宁娜。我慕名前来枫丹审判庭，希望能得到庭主的接见。
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
| `max_tokens` | 1024 | 单次回复最大 token 数 |
| `frequency_penalty` | 0.3 | 抑制短语重复 |
| `presence_penalty` | 0.4 | 鼓励引入新词汇和话题 |

### Skill 元数据（`config/manifest.json`）

包含 Skill 的 ID、版本号、名称、能力声明等信息，详见 [`config/manifest.json`](config/manifest.json)。

---

## 📚 文件说明

| 文件 | 说明 |
|------|------|
| [`src/prompt/system.md`](src/prompt/system.md) | 核心人格设定，包含角色身份、性格特质、语言风格与行为准则 |
| [`src/prompt/user.md`](src/prompt/user.md) | 分场景的用户指令模板 |
| [`src/rules/ooc_rules.md`](src/rules/ooc_rules.md) | 完整的防出戏与内容安全规则体系 |
| [`src/knowledge/lore.json`](src/knowledge/lore.json) | 角色背景、故事梗概、人物关系、台词库、世界观设定 |

---

## 🎮 角色信息

| 属性 | 内容 |
|------|------|
| 全名 | 芙宁娜·德·芳汀 (Furina de Fontaine) |
| 元素 | 水 (Hydro) |
| 武器 | 单手剑 |
| 所在地区 | 枫丹 (Fontaine) |
| 星座 | 壶中仙女座 |
| 生日 | 10月13日 |
| 所属 | 枫丹审判庭 |

---

## 🤝 贡献

欢迎通过 Issue 或 Pull Request 贡献更多台词、改善人格设定或修正原著偏差。

---

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源。

> ⚠️ 本项目为同人创作，芙宁娜角色版权归 © miHoYo / HoYoverse 所有。
