# Furina Scripts

`furina-memory.mjs` 是 Codex Skill 与 Claude Code 共享的轻量本地记忆运行时，用纯 Node.js 标准库实现，不需要安装依赖。

`furina-wiki.mjs` 是外部原神 wiki 查询工具，默认先查本仓库 `vendor/GenshinStory` 本地缓存；本地结果不足时，再自动回退到在线原神 BWIKI，用于补查 `furina_resource/` 未覆盖的剧情、任务、语音和角色逸闻。

`furina-wiki-index.mjs` 会为本地 GenshinStory Markdown 生成 `.cache/furina-wiki/` 分片索引；`furina-explore.mjs` 在索引和 wiki 读取能力之上提供最多 5 路并行探索。

`furina-eval.mjs` 是语气验收辅助脚本，用于解析 `eval/furina_voice_cases.md` 并生成稳定的人工评测提示；它不会调用模型或访问外部服务。

`setup.mjs` 是一键安装器，用来自动安装 Claude Code 原生 skills、Codex Skill、全局记忆运行时和初始记忆文件，并为 Codex 写入指向仓库 `furina_resource/` 的轻量路径上下文。旧式 Claude commands 只会在显式传入 `--legacy-commands` 时安装。

## 一键安装

```bash
node scripts/setup.mjs
node scripts/setup.mjs --check
```

常用选项：

```bash
node scripts/setup.mjs --claude
node scripts/setup.mjs --codex
node scripts/setup.mjs --project-claude
node scripts/setup.mjs --legacy-commands
node scripts/setup.mjs --check --claude
node scripts/setup.mjs --check --codex
node scripts/setup.mjs --dry-run
node scripts/furina-eval.mjs list
node scripts/furina-eval.mjs prompt --case 3
node scripts/furina-wiki.mjs sources
node scripts/furina-wiki-index.mjs build
node scripts/furina-wiki.mjs search "芙宁娜"
node scripts/furina-explore.mjs --task "芙宁娜 传说任务"
```

## 目标

- 让 Codex 和 Claude Code 都使用同一份 `version: "2.0"` 认知记忆 JSON。
- 让 Codex、Claude Code 和自定义运行时共用根目录 `furina_resource/`，避免在 skill 里维护知识库镜像。
- 在需要补查外部原神资料时，通过本地 wiki 索引检索返回少量片段，而不是把整套 wiki 塞进上下文。
- 为复杂剧情/关系问题提供受控并行探索：最多 5 个子任务，每个子任务 search/read 后回传 evidence/references。
- 提供 Angel Memory / Angel Heart 风格的基本能力：主动回忆、克制的主动投喂、记忆写入、睡眠巩固、弱记忆衰减、交互状态判断。
- 避免每次对话都把完整记忆塞进上下文，只注入与当前话题相关的 3-5 条。

## 默认路径

默认读写：

```text
~/.claude/furina-memory.json
```

也可以用环境变量或参数覆盖：

```powershell
$env:FURINA_MEMORY_PATH="C:\path\to\furina-memory.json"
node scripts/furina-memory.mjs status
```

```bash
node scripts/furina-memory.mjs status --path ./memory/furina-memory.json
```

## 常用命令

```bash
node scripts/furina-memory.mjs init
node scripts/furina-memory.mjs status
node scripts/furina-memory.mjs heart --text "芙宁娜，你还记得我喜欢什么吗？"
node scripts/furina-memory.mjs inject --query "甜点和歌剧"
node scripts/furina-memory.mjs remember --text "[📌 记忆: 用户喜欢枫丹歌剧]"
node scripts/furina-memory.mjs remember --reflection reflection.json
node scripts/furina-memory.mjs compress
```

## 推荐流程

1. 对话开始前：`inject --query "<用户消息>"`，把输出的 `[认知存档]` 放进上下文。
2. 回复前：`heart --text "<用户消息>"` 判断是否需要主动回应、召回或保存；高亲密度轻松场景可能返回 `recall_mode: "proactive"`，表示可顺带提 1 条旧记忆。
3. 回复后：如果模型输出了 `[📌 记忆: ...]`，用 `remember --text "<完整回复>"` 保存。
4. 会话结束后：用 `reflection.md` 生成 JSON，再 `remember --reflection reflection.json` 合并。
5. 记忆变多时：`compress` 执行睡眠巩固。

## Codex 使用建议

在 Codex 中执行角色扮演前，可先运行：

```bash
node scripts/furina-memory.mjs inject --query "用户本轮消息"
```

将输出的 `[认知存档]` 与 `src/prompt/runtime_lite.md` 一起作为上下文。对话结束后，如果需要长期保存，就把 `src/prompt/reflection.md` 的 JSON 输出传给：

```bash
node scripts/furina-memory.mjs remember --reflection reflection.json
```

这样 Codex 与 Claude Code 会共享同一套记忆文件和压缩规则。运行时会把旧版整数 `soul_state` 规范化为字符串，并把 `type=boundary` 默认视为高优先级记忆。

## 外部 Wiki 查询

直接查询：

```bash
node scripts/furina-wiki.mjs sources
node scripts/furina-wiki-index.mjs status
node scripts/furina-wiki-index.mjs build
node scripts/furina-wiki.mjs search "芙宁娜 那维莱特" --top 5 --build-index
node scripts/furina-wiki.mjs brief "芙宁娜 传说任务"
node scripts/furina-wiki.mjs read "芙宁娜" --line-range 1-80
```

固定使用本地缓存：

```powershell
node scripts/furina-wiki.mjs search "芙宁娜" --source genshin-story
```

本仓库默认指向 `vendor/GenshinStory`；如果要固定使用在线 BWIKI，可传入 `--source bwiki-online`。如果要改用其他 GenshinStory 路径，再设置 `GENSHIN_STORY_ROOT` 或传入 `--root` 覆盖。

并行探索：

```bash
node scripts/furina-explore.mjs --task "芙宁娜 传说任务" --task "芙宁娜 那维莱特" --top 3 --reads 2
```
