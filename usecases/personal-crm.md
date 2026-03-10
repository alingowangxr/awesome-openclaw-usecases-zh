---
title: "個人 CRM 與自動聯絡人發現"
description: "自動記錄你見過的人、見面時間和討論內容，確保重要的跟進事項不再被遺漏。"
category: "生產力"
difficulty: 2
tags:
  - CRM
  - 聯絡人管理
  - 關係追蹤
integrations: []
featured: false
---

# 個人 CRM（客戶關係管理）與自動聯絡人發現

手動記錄你見過的人、見面時間以及討論內容幾乎不可能。重要的跟進事項不知不覺就被遺漏，在重要會議前你也忘記了相關背景。

這個工作流自動構建和維護個人 CRM：

- 每日定時任務（cron job）掃描郵件和行事曆，發現新聯絡人和互動記錄
- 將聯絡人儲存在結構化資料庫中，附帶關係上下文
- 自然語言查詢：「我對 [某人] 了解多少？」、「誰需要跟進？」、「我上次和 [某人] 交流是什麼時候？」
- 每日會議準備簡報：在當天會議前，透過 CRM 和郵件歷史研究外部與會者，並提供簡報

## 所需技能

- `gog` CLI（用於 Gmail 和 Google Calendar）
- 自訂 CRM 資料庫（SQLite 或類似方案），或使用 [crm-query](https://clawhub.ai) 技能（如果可用）
- Telegram 話題用於 CRM 查詢

## 如何設定

1. 建立 CRM 資料庫：
```sql
CREATE TABLE contacts (
  id INTEGER PRIMARY KEY,
  name TEXT,
  email TEXT,
  first_seen TEXT,
  last_contact TEXT,
  interaction_count INTEGER,
  notes TEXT
);
```
2. 在 Telegram 中設定一個名為 "personal-crm" 的話題用於查詢。
3. 指示 OpenClaw：

以下提示詞設定自動聯絡人發現和每日會議簡報：

```text
Run a daily cron job at 6 AM to:
1. Scan my Gmail and Calendar for the past 24 hours
2. Extract new contacts and update existing ones
3. Log interactions (meetings, emails) with timestamps and context

Also, every morning at 7 AM:
1. Check my calendar for today's meetings
2. For each external attendee, search my CRM and email history
3. Deliver a briefing to Telegram with: who they are, when we last spoke, what we discussed, and any follow-up items

When I ask about a contact in the personal-crm topic, search the database and give me everything you know.
```

---

