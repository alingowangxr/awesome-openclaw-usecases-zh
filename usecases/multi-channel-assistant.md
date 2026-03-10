---
title: "多渠道個人助手"
description: "建立統一介面連線所有工具，在多個應用程式間無縫管理任務、日程、訊息和工作追蹤。"
category: "生產力"
difficulty: 2
tags:
  - 多渠道
  - 個人助手
  - 整合
integrations: []
featured: false
---

# 多渠道個人助手

在多個應用程式間切換來管理任務、安排日程、發送訊息和追蹤工作令人精疲力竭。你需要一個統一的介面來連線所有工具。

這個工作流將所有功能整合到一個 AI 助手中：

- Telegram 作為主要互動介面，透過話題路由（不同話題對應影片創意、CRM、收入、設定等）
- Slack 整合用於團隊協作（任務分配、知識庫儲存、影片創意觸發）
- Google Workspace：透過聊天建立行事曆事件、管理郵件、上傳到 Drive
- Todoist 用於快速任務捕獲
- Asana 用於專案管理
- 自動提醒：垃圾清運日、每週公司通訊等

## 所需技能

- `gog` CLI（Google Workspace）
- Slack 整合（bot + user tokens）
- Todoist API 或技能
- Asana API 或技能
- 設定了多個話題的 Telegram 頻道

## 如何設定

1. 為不同場景設定 Telegram 話題：
   - `config` — 機器人設定和除錯
   - `updates` — 狀態和通知
   - `video-ideas` — 內容管道
   - `personal-crm` — 聯絡人管理
   - `earnings` — 財務追蹤
   - `knowledge-base` — RAG（檢索增強生成）資料匯入和查詢

2. 透過 OpenClaw 設定連線所有工具：
   - Google OAuth（Gmail、Calendar、Drive）
   - Slack（app + user tokens）
   - Todoist API 令牌
   - Asana API 令牌

3. 指示 OpenClaw：

以下提示詞設定多渠道路由和自動提醒：

```text
You are my multi-channel assistant. Route requests based on context:

Telegram topics:
- "config" → system settings, debugging
- "updates" → daily summaries, reminders, calendar
- "video-ideas" → content pipeline and research
- "personal-crm" → contact queries and meeting prep
- "earnings" → financial tracking
- "knowledge-base" → save and search content

When I ask you to:
- "Add [task] to my todo" → use Todoist
- "Create a card for [topic]" → use Asana Video Pipeline project
- "Schedule [event]" → use gog calendar
- "Email [person] about [topic]" → draft email via gog gmail
- "Upload [file] to Drive" → use gog drive

Set up automated reminders:
- Monday 6 PM: "Trash day tomorrow"
- Friday 3 PM: "Time to write the weekly company update"
```

4. 逐一測試每個整合，然後測試跨工作流互動（例如，將 Slack 連結儲存到知識庫，然後在影片研究卡中使用它）。

---

