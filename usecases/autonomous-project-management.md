---
title: "使用子智能體進行自主專案管理"
description: "建立去中心化的專案管理模式，子智能體透過共享狀態檔案自主處理任務，無需中央排程器協調。"
category: "生產力"
difficulty: 3
tags:
  - sub-agent
  - 專案管理
  - 多智能體
integrations: []
featured: false
---

# 使用子智能體（Sub-agent）進行自主專案管理

管理包含多個並行工作流程的複雜專案令人精疲力竭。你不得不頻繁切換上下文、在不同工具間追蹤狀態，並手動協調任務交接。

本用例實現了一種去中心化的專案管理模式，其中子智能體（sub-agent）自主處理任務，透過共享狀態檔案而非中央排程器進行協調。

## 痛點

傳統的排程器模式會造成瓶頸——主智能體變成了「交通警察」。對於複雜專案（多倉庫重構、研究衝刺、內容管線），你需要能夠並行工作且無需持續監督的智能體。

## 功能概述

- **去中心化協調**：智能體透過共享的 `STATE.yaml` 檔案進行讀寫協調
- **並行執行**：多個子智能體同時處理獨立任務
- **無排程器開銷**：主會話保持精簡（CEO 模式——僅負責策略）
- **自文件化**：所有任務狀態持久化在版本控制檔案中

## 核心模式：STATE.yaml

每個專案維護一個 `STATE.yaml` 檔案作為唯一的事實來源：

```yaml
# STATE.yaml - 專案協調檔案
project: website-redesign
updated: 2026-02-10T14:30:00Z

tasks:
  - id: homepage-hero
    status: in_progress
    owner: pm-frontend
    started: 2026-02-10T12:00:00Z
    notes: "Working on responsive layout"

  - id: api-auth
    status: done
    owner: pm-backend
    completed: 2026-02-10T14:00:00Z
    output: "src/api/auth.ts"

  - id: content-migration
    status: blocked
    owner: pm-content
    blocked_by: api-auth
    notes: "Waiting for new endpoint schema"

next_actions:
  - "pm-content: Resume migration now that api-auth is done"
  - "pm-frontend: Review hero with design team"
```

## 運作原理

1. **主智能體接收任務** → 生成具有特定範圍的子智能體
2. **子智能體讀取 STATE.yaml** → 找到分配給自己的任務
3. **子智能體自主工作** → 更新 STATE.yaml 中的進度
4. **其他智能體輪詢 STATE.yaml** → 認領已解除阻塞的工作
5. **主智能體定期檢查** → 審查狀態，調整優先順序

## 所需技能

- `sessions_spawn` / `sessions_send` 用於子智能體管理
- 檔案系統存取以操作 STATE.yaml
- Git 用於狀態版本控制（可選但推薦）

## 設定：AGENTS.md 設定

```text
## PM 委派模式

主會話 = 僅作為協調者。所有執行交給子智能體。

工作流程：
1. 新任務到達
2. 檢查 PROJECT_REGISTRY.md 查找現有 PM
3. 如果 PM 存在 → sessions_send(label="pm-xxx", message="[task]")
4. 如果是新專案 → sessions_spawn(label="pm-xxx", task="[task]")
5. PM 執行任務，更新 STATE.yaml，匯報結果
6. 主智能體向使用者彙總

規則：
- 主會話：最多 0-2 次工具呼叫（僅 spawn/send）
- PM 擁有自己的 STATE.yaml 檔案
- PM 可以生成子子智能體處理並行子任務
- 所有狀態變更提交到 git
```

## 範例：生成一個 PM

以下是一個使用者請求和智能體回應的範例：

```text
User: "Refactor the auth module and update the docs"

Main agent:
1. Checks registry → no active pm-auth
2. Spawns: sessions_spawn(
     label="pm-auth-refactor",
     task="Refactor auth module, update docs. Track in STATE.yaml"
   )
3. Responds: "Spawned pm-auth-refactor. I'll report back when done."

PM subagent:
1. Creates STATE.yaml with task breakdown
2. Works through tasks, updating status
3. Commits changes
4. Reports completion to main
```

## 關鍵洞察

- **STATE.yaml 優於排程器**：基於檔案的協調比訊息傳遞更具擴展性
- **Git 作為稽核日誌**：提交 STATE.yaml 的變更以取得完整歷史記錄
- **標籤命名規範很重要**：使用 `pm-{project}-{scope}` 格式便於追蹤
- **精簡主會話**：主智能體做得越少，回應就越快

## 靈感來源

該模式受到 [Nicholas Carlini 的方法](https://nicholas.carlini.com/)啟發——讓智能體自我組織，而非微觀管理它們。

## 相關連結

- [OpenClaw 子智能體文件](https://github.com/openclaw/openclaw)
- [Anthropic：構建高效智能體](https://www.anthropic.com/research/building-effective-agents)

---

