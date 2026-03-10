---
title: "專案狀態管理系統：替代看板的事件驅動方案"
description: "建立事件驅動的專案狀態管理系統，自動追蹤狀態變更原因，解決傳統看板需要手動更新的問題。"
category: "生產力"
difficulty: 3
tags:
  - 專案管理
  - 看板
  - 事件驅動
integrations: []
featured: false
---

# 專案狀態管理系統：替代看板的事件驅動方案

傳統看板（Kanban）是靜態的，需要手動更新。你會忘記移動卡片，在不同會話之間遺失上下文，而且無法追蹤狀態變更背後的「原因」。專案在缺乏清晰可見性的情況下逐漸偏離軌道。

這個工作流用事件驅動（event-driven）系統替代看板，自動追蹤專案狀態：

- 將專案狀態儲存在資料庫中，保留完整歷史記錄
- 擷取上下文：決策、阻塞項、下一步計劃、關鍵洞察
- 事件驅動更新：「剛完成 X，被 Y 阻塞」-> 自動狀態轉換
- 自然語言查詢：「[專案]的狀態是什麼？」、「我們為什麼在[功能]上轉向了？」
- 每日站會摘要：昨天做了什麼，今天計劃什麼，什麼被阻塞了
- Git 整合：將提交記錄連結到專案事件，實現可追溯性

## 痛點

看板容易過時。你把時間浪費在更新卡片上，而不是做實際工作。上下文會遺失——三個月後，你已經想不起當初為什麼做了一個關鍵決策。程式碼變更和專案進展之間沒有自動關聯。

## 功能介紹

你不再需要拖動卡片，而是直接和助手對話：「完成了認證流程，開始做儀表板。」系統會記錄事件、更新專案狀態並保留上下文。當你問「儀表板進展如何？」時，它會給你完整的故事：什麼已完成、下一步是什麼、什麼在阻塞你，以及原因。

Git 提交記錄會被自動掃描並關聯到專案。你的每日站會摘要會自動生成。

## 所需技能

- `postgres` 或 SQLite 用於專案狀態資料庫
- `github`（gh CLI）用於提交記錄追蹤
- Discord 或 Telegram 用於更新和查詢
- 定時任務（cron job）用於每日摘要
- 子智能體（sub-agent）用於並行專案分析

## 設定方法

1. 設定專案狀態資料庫：
```sql
-- 專案表
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE,
  status TEXT, -- 例如 "active"（進行中）、"blocked"（阻塞）、"completed"（已完成）
  current_phase TEXT,
  last_update TIMESTAMPTZ DEFAULT NOW()
);

-- 事件表
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  event_type TEXT, -- 例如 "progress"（進展）、"blocker"（阻塞）、"decision"（決策）、"pivot"（轉向）
  description TEXT,
  context TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 阻塞項表
CREATE TABLE blockers (
  id SERIAL PRIMARY KEY,
  project_id INTEGER REFERENCES projects(id),
  blocker_text TEXT,
  status TEXT DEFAULT 'open', -- "open"（未解決）、"resolved"（已解決）
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);
```

2. 建立一個用於專案更新的 Discord 頻道（例如 #project-state）。

3. 給 OpenClaw 設定提示詞：

以下提示詞告訴智能體如何根據你的對話自動管理專案狀態：

```text
You are my project state manager. Instead of Kanban, I'll tell you what I'm working on conversationally.

When I say things like:
- "Finished [task]" → log a "progress" event, update project state
- "Blocked on [issue]" → create a blocker entry, update project status to "blocked"
- "Starting [new task]" → log a "progress" event, update current phase
- "Decided to [decision]" → log a "decision" event with full context
- "Pivoting to [new approach]" → log a "pivot" event with reasoning

When I ask:
- "What's the status of [project]?" → fetch latest events, blockers, and current phase
- "Why did we decide [X]?" → search events for decision context
- "What's blocking us?" → list all open blockers across projects

Every morning at 9 AM, run a cron job to:
1. Scan git commits from the past 24 hours (via gh CLI)
2. Link commits to projects based on branch names or commit messages
3. Post a daily standup summary to Discord #project-state:
   - What happened yesterday (events + commits)
   - What's planned today (based on current phase and recent conversations)
   - What's blocked (open blockers)

When I'm planning a sprint, spawn a sub-agent to analyze each project's state and suggest priorities.
```

4. 整合到你的工作流中：只需自然地和助手聊你正在做的事情，系統會自動擷取一切。

## 相關連結

- [事件溯源模式（Event Sourcing Pattern）](https://martinfowler.com/eaaDev/EventSourcing.html)
- [為什麼看板不適合獨立開發者](https://blog.nuclino.com/why-kanban-doesnt-work-for-me)

---

