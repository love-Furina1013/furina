---
name: furina-compress
description: Compress and consolidate Furina shared memory entries. Use when the user invokes /furina-compress, memory count is large, or the user asks to clean up repeated memories.
argument-hint: [optional focus]
disable-model-invocation: true
allowed-tools: Read Bash(node scripts/furina-memory.mjs *)
---

# Furina Memory Compression

Prefer the shared runtime:

```bash
node scripts/furina-memory.mjs compress
```

If the repository runtime is unavailable, try `node ~/.claude/furina-memory.mjs compress`.

## Manual Fallback

If no runtime is available, read `~/.claude/furina-memory.json` and apply `src/memory/compression.md`.

Compression priorities:

- Preserve high-priority memories.
- Merge duplicates and near-duplicates.
- Remove low-value one-off details.
- Keep wording concise and stable.
- Report before/after counts and the most important retained themes.
