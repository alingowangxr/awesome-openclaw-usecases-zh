---
title: "家庭日曆彙整與家務助手"
description: "統一管理多個家庭日曆，協調家務任務和購物清單，消除跨平台資訊碎片化。"
category: "生產力"
difficulty: 2
tags:
  - 家庭管理
  - 日曆
  - 家務
integrations:
  - Google Calendar
featured: false
---

# 家庭日曆彙整與家務助手

現代家庭需要同時管理五個甚至更多日曆——工作、個人、共享家庭、孩子學校、課外活動——分布在不同平台和格式中。重要事件會因為沒有統一視圖而被遺漏。與此同時，家務協調（購物清單、儲藏室庫存、預約安排）透過零散的簡訊進行，很容易被淹沒。

這個用例將 OpenClaw 變成一個始終在線的家庭協調員：彙整日曆產生早間簡報、監控訊息中的可操作事項，以及透過共享聊天介面管理家務後勤。

## 痛點

- **日曆碎片化**：工作日曆有安全限制，無法共享。學校日曆以 PDF 或手寫網頁的形式送達。夏令營時間表在郵件裡。每天早上手動檢查每個日曆是不可持續的——而且「跨日曆複製事件確實管用，直到我忘了，然後就有事情漏掉了。」
- **家務協調開銷**：「家裡還有多少牛奶？」需要親自檢查冰箱，然後檢查地下室儲藏間，然後回覆簡訊。這樣的事情每週購物時都要重複多次。
- **錯過預約**：預約確認以簡訊形式到達，然後就擱在那裡沒人處理——沒有日曆事件，沒有路程時間緩衝，沒有提醒。

## 功能介紹

- **早間簡報**：將所有家庭日曆彙整成每日摘要，透過你偏好的管道發送
- **環境訊息監控**：監視 iMessage/簡訊對話，在偵測到預約時自動建立日曆事件（牙醫確認、會面計畫等）
- **路程時間緩衝**：在偵測到的預約前後新增交通時間段
- **家庭庫存管理**：維護儲藏室/冰箱物品的即時庫存清單，任何一方都可以隨時隨地查詢
- **購物協調**：跨食譜去重食材，追蹤庫存不足的物品，產生購物清單
- **照片輸入**：拍一張學校日曆或冷凍櫃內容的照片，智慧型代理會將其處理為結構化資料

## 所需技能

- 日曆 API 存取（Google Calendar、透過 `ical` 存取 Apple Calendar）
- `imessage` 技能用於訊息監控（僅限 macOS）
- Telegram 或 Slack 用於共享家庭聊天介面
- 檔案系統存取用於庫存追蹤
- 相機/照片處理用於實體日曆的 OCR（光學字元辨識）

## 設定方法

### 1. 日曆彙整

設定 OpenClaw 從所有家庭日曆源拉取資料：

以下提示詞讓智慧型代理每天早上彙整所有日曆源並產生簡報：

```text
## Calendar Sources

On morning briefing (8:00 AM):

1. Fetch my Google Work Calendar (read-only OAuth)
2. Fetch shared Family Google Calendar
3. Fetch partner's calendar (shared view)
4. Check ~/Documents/school-calendars/ for any new PDFs → OCR and extract events
5. Check recent emails for calendar attachments or event invitations

Compile into a single briefing:
- Today's events (all calendars, color-coded by source)
- Upcoming 3-day lookahead for conflicts
- Any new events added since yesterday
- Weather context for outdoor events

Deliver via Telegram/Slack family channel.
```

### 2. 環境訊息監控

這是關鍵差異化功能——智慧型代理在後台被動監視，在識別到可操作內容時採取行動：

以下提示詞設定智慧型代理定期檢查訊息並自動建立日曆事件：

```text
## Message Monitoring (HEARTBEAT.md)

Every 15 minutes:
1. Check new iMessages across all conversations
2. Detect appointment-like patterns:
   - "Your appointment is confirmed for..."
   - "Can we meet on [date] at [time]?"
   - "Practice moved to Saturday at 3pm"
3. When detected:
   - Create calendar event with details
   - Add 30-minute driving buffer before AND after
   - Send confirmation to family Telegram: "Created: Dentist appointment, Tue 2pm. Added drive time 1:30-2:00 and 3:00-3:30."
   - If relevant to partner, add invite
4. Detect promise/commitment patterns:
   - "I'll send that over by Friday"
   - "Let's do dinner next week"
   → Create calendar hold or reminder
```

### 3. 家庭庫存管理

以下提示詞設定智慧型代理管理家庭庫存，支援照片、文字和收據等多種輸入方式：

```text
## Pantry Tracking

Maintain ~/household/inventory.json with:
- Item name, quantity, location (fridge/pantry/basement)
- Last updated timestamp
- Low-stock threshold

Update methods:
- Photo: User sends photo of fridge/pantry → vision model extracts items
- Text: "We're out of eggs" / "Bought 2 gallons of milk"
- Receipt: Photo of grocery receipt → update inventory

Query: Either partner can ask via Telegram:
- "Do we have butter?" → Check inventory, respond with location and quantity
- "What's running low?" → List items below threshold
- "Generate grocery list" → Compile low-stock items + any recipe ingredients needed
```

## 關鍵洞察

- **被動優於主動**：最大的突破在於智慧型代理無需被要求就能行動。偵測簡訊中的預約並自動建立帶路程緩衝的日曆事件——「我沒有讓它這樣做。它就是知道這是我想要的。」
- **Mac Mini 是最佳載體**：這個用例特別適合在家用 Mac Mini 上執行——iMessage 整合、Apple Calendar 和始終在線的可用性
- **從唯讀開始**：先從日曆讀取和訊息監控開始，然後再啟用寫入操作（建立事件、發送訊息）
- **共享 Telegram 頻道**：讓雙方都能看到智慧型代理在做什麼——建立信任並盡早發現錯誤
- **照片輸入被低估了**：拍一張學校日曆 PDF 或冷凍櫃內容的照片比打字快得多——而且視覺模型處理得很好

## 靈感來源

這個用例結合了多個社群模式：

- **日曆彙整**：由 HN 用戶 `angiolillo` 在一次 [Hacker News 討論](https://news.ycombinator.com/item?id=46872465)中描述，他詳細說明了每天早上分別檢查工作、個人、家庭和孩子學校日曆的痛苦。
- **環境訊息監控**：由 [Sparkry AI](https://sparkryai.substack.com/p/24-hours-with-openclaw-the-ai-setup) 記錄——當妻子收到一條牙科預約簡訊時，OpenClaw 自動建立了帶 30 分鐘路程緩衝的日曆事件，無需被要求。在 [OpenClaw Showcase](https://openclaw.ai/showcase) 上也得到了驗證，`@theaaron` 稱基於聊天的日曆管理是「我體驗過的最好的 LLM 用途之一」。
- **家務協調**：Brandon Wang 的 [Clawdbot "Linguini"](https://brandon.wang/2026/clawdbot) 執行在家用 Mac Mini 上——處理簡訊跟進、從照片建立日曆事件、追蹤 Airbnb 價格、處理冷凍櫃庫存照片，以及透過 iMessage 和 Slack 協調家務後勤。
- **儲藏室追蹤**：多位 HN 用戶討論了維護家庭庫存的價值（和挑戰），`dns_snek` 指出：「我5秒鐘前放東西的地方都會忘記……這對我來說確實是個大問題，因為我會讓東西過期。」

## 相關連結

- [OpenClaw iMessage 技能](https://github.com/openclaw/openclaw)
- [Google Calendar API](https://developers.google.com/calendar)
- [Apple Calendar (EventKit)](https://developer.apple.com/documentation/eventkit)
- [OpenClaw Showcase — 日曆相關評價](https://openclaw.ai/showcase)

---

