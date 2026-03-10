---
title: "自訂早間簡報"
description: "讓 OpenClaw 每天在預定時間發送完全自訂的早間簡報，涵蓋新聞、任務、創意和主動建議。"
category: "生產力"
difficulty: 1
tags:
  - 早間簡報
  - 自動化
  - 每日任務
integrations: []
featured: true
---

# 自訂早間簡報

你每天醒來後的前 30 分鐘都在追趕資訊——刷新聞、查日曆、檢查待辦事項、試圖弄清今天什麼最重要。如果這一切都已經完成，以一條簡訊的形式等著你呢？

這個工作流讓 OpenClaw 每天在預定時間向你發送一份完全自訂的早間簡報，涵蓋新聞、任務、創意和主動建議。

## 功能介紹

- 每天在固定時間（例如上午 8:00）向 Telegram、Discord 或 iMessage 發送結構化的早間報告
- 透過瀏覽網頁研究與你興趣相關的隔夜新聞
- 審查你的待辦清單並呈現當天的任務
- 在你睡覺時產生創意產出（完整的腳本、郵件草稿、商業提案——不僅僅是想法）
- 推薦 AI 當天可以自主完成的任務來幫助你

## 痛點

你把最高效的早晨時間花在了解情況上。與此同時，你的 AI 智慧型代理整晚都在閒置。早間簡報將閒置的夜間時間變成高效的準備時間——你醒來時工作已經完成。

## 所需技能

- Telegram、Discord 或 iMessage 整合
- Todoist / Apple Reminders / Asana 整合（你使用的任務管理工具）
- [x-research-v2](https://clawhub.ai) 用於社群媒體趨勢研究（可選）

## 設定方法

1. 將 OpenClaw 連線到你的訊息平台和任務管理器。

2. 給 OpenClaw 設定提示詞：

以下提示詞讓智慧型代理每天早上自動產生並發送自訂的早間簡報：

```text
I want to set up a regular morning brief. Every morning at 8:00 AM,
send me a report through Telegram.

I want this report to include:
1. News stories relevant to my interests (AI, startups, tech)
2. Ideas for content I can create today
3. Tasks I need to complete today (pull from my to-do list)
4. Recommendations for tasks you can complete for me today

For the content ideas, write full draft scripts/outlines — not just titles.
```

3. OpenClaw 會自動安排定時任務。第二天早上檢查你的訊息來驗證它是否正常運作。

4. 隨時間自訂——只需給你的機器人發訊息：

以下是一些自訂簡報內容的範例指令：

```text
Add weather forecast to my morning brief.
Stop including general news, focus only on AI.
Include a motivational quote each morning.
```

5. 如果你想不出要包含什麼內容，不必勉強——只需說：

以下提示詞讓智慧型代理自主決定簡報中最有用的內容：

```text
I want this report to include things relevant to me.
Think of what would be most helpful to put in this report.
```

## 關鍵洞察

- AI 推薦任務部分是最強大的功能——它讓智慧型代理主動思考如何幫助你，而不是等待指令。
- 你可以透過發訊息來自訂簡報。說「在我的早間簡報中加入股票價格」，它就會更新。
- 完整草稿（而不僅僅是想法）是節省時間的關鍵。醒來就看到腳本，而不是建議。
- 無論你從事什麼行業——包含任務、新聞和主動建議的早間簡報都是普遍有用的。

## 中國用戶適配

如果你使用飛書或釘釘，只需要把推送通道和新聞源替換一下，其他邏輯完全一樣。

### 推送通道替換

把提示詞中的 Telegram / Discord 替換為你實際使用的 IM：

```text
I want to set up a regular morning brief. Every morning at 8:00 AM,
send me a report through Feishu.
```

前提是你已經配好了對應的 IM 通道（參考 [飛書 AI 助手](cn-feishu-ai-assistant.md) 或 [釘釘 AI 助手](cn-dingtalk-ai-assistant.md)）。

### 中文新聞源推薦

把英文新聞源換成中文源，讓簡報更貼合國內資訊環境：

```text
我想設定一個每日早間簡報。每天早上 8:00 透過飛書發給我。

內容包括：
1. 與我相關的隔夜新聞（關注 AI、創業、科技方向，優先看 36kr、少數派、知乎熱榜）
2. 今天需要完成的任務（從我的待辦清單中拉取）
3. 你建議今天可以幫我自動完成的事情

對於內容創意部分，直接寫完整草稿，不要只列標題。
```

> **提示**：抓取 36kr、少數派等中文網站需要 OpenClaw 具備網頁瀏覽或搜尋能力。如果你的 agent 無法存取這些網站，請確認已安裝瀏覽器技能或網頁搜尋技能。

### 定時任務（cron）設定

OpenClaw 支援用自然語言建立定時任務：

```text
幫我建立一個定時任務：每個工作日早上 7:30（比原版 8:00 提前，適配國內上班時間），產生早間簡報並發到飛書。
時區設為 Asia/Shanghai。
```

也可以用命令列精確控制：

```bash
openclaw cron add \
  --name "morning-brief-cn" \
  --cron "30 7 * * 1-5" \
  --tz "Asia/Shanghai" \
  --session isolated \
  --message "產生今日早間簡報並發送到飛書" \
  --announce \
  --channel feishu
```

## 參考來源

靈感來自 [Alex Finn 關於改變生活的 OpenClaw 用例的影片](https://www.youtube.com/watch?v=41_TNGDDnfQ)。
