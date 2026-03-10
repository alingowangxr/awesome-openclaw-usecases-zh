---
title: "健康與症狀追蹤器"
description: "識別食物敏感性和健康規律，透過提醒記錄症狀並自動分析長期趨勢。"
category: "生產力"
difficulty: 1
tags:
  - 健康管理
  - 症狀追蹤
  - 食物敏感
integrations: []
featured: false
---

# 健康與症狀追蹤器

識別食物敏感性需要長期持續記錄，但這種記錄非常繁瑣難以維持。你需要提醒來記錄，也需要分析來發現規律。

這個工作流自動追蹤食物和症狀：

- 在專用的 Telegram 話題中發送你的飲食和症狀資訊，OpenClaw 會自動記錄所有內容並附帶時間戳記
- 每天 3 次提醒（早上、中午、晚上）提示你記錄餐食
- 隨著時間推移，分析規律以識別潛在的觸發因素

## 所需技能

- 定時任務（cron job）用於提醒
- Telegram 話題用於記錄
- 檔案儲存（markdown 日誌檔案）

## 如何設定

1. 在 Telegram 中建立一個名為 "health-tracker"（或類似名稱）的話題。
2. 建立日誌檔案：`~/clawd/memory/health-log.md`
3. 指示 OpenClaw：

以下提示詞設定食物和症狀的自動追蹤與週度分析：

```text
When I message in the "health-tracker" topic:
1. Parse the message for food items and symptoms
2. Log to ~/clawd/memory/health-log.md with timestamp
3. Confirm what was logged

Set up 3 daily reminders:
- 8 AM: "Log your breakfast"
- 1 PM: "Log your lunch"
- 7 PM: "Log your dinner and any symptoms"

Every Sunday, analyze the past week's log and identify patterns:
- Which foods correlate with symptoms?
- Are there time-of-day patterns?
- Any clear triggers?

Post the analysis to the health-tracker topic.
```

4. 可選：為 OpenClaw 新增一個記憶檔案，用於追蹤已知的觸發因素，並隨著規律的出現不斷更新。

---

