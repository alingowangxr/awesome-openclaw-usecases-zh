---
title: "會議紀要與待辦事項自動化"
description: "自動將會議錄音轉換為結構化會議紀要和待辦事項，支援飛書妙記 騰訊會議 釘釘等國內平台。"
category: "生產力"
difficulty: 2
tags:
  - 會議紀要
  - 待辦事項
  - 轉錄
integrations:
  - 飛書妙記
featured: true
---

# 會議紀要與待辦事項自動化

> 含國內適配：飛書妙記 / 騰訊會議 / 釘釘

剛開完一場 45 分鐘的團隊會議，你需要寫會議紀要、提取行動項，然後分別錄入 Jira、Linear 或待辦清單——全靠手動。等你處理完，下一場會議已經開始了。如果在轉錄文字落地的那一刻，你的智能體就自動搞定這一切呢？

這個用例把任何會議轉錄文字變成結構化紀要，並自動在專案管理工具中建立對應的任務。

## 痛點

會議紀要枯燥卻重要。大多數人要麼跳過不寫（然後丟失上下文），要麼花 20 多分鐘手寫。行動項經常被遺忘——因為它們只存在某人腦子裡，或者埋在聊天記錄的某個角落。這個智能體消除了「我們討論過了」和「已記錄、已分配」之間的斷層。

## 它能做什麼

| 功能 | 說明 |
|------|------|
| **監聽轉錄來源** | 支援 Otter.ai 匯出、Google Meet 轉錄、Zoom 錄製摘要，或直接貼上到對話中 |
| **提取關鍵資訊** | 識別決策事項、討論話題、行動項及其負責人和截止日期 |
| **自動建立任務** | 在 Jira、Linear、Todoist 或 Notion 中建立任務，分配給正確的人，附帶會議上下文 |
| **發布紀要摘要** | 將摘要推送到 Slack 或 Discord，讓整個團隊留存記錄 |
| **追蹤提醒** | 可選：在截止日期前透過定時提醒催辦負責人 |

## 所需技能

- 專案管理平台整合：Jira、Linear、Todoist 或 Notion（用於任務建立）
- 團隊溝通工具整合：Slack 或 Discord（用於發布摘要）
- 檔案系統存取（用於讀取轉錄檔案）
- 定時任務 / cron（用於追蹤提醒）
- 可選：Otter.ai、Fireflies.ai 或 Google Meet API（用於自動取得轉錄文字）

## 如何設定

### 1. 選擇轉錄來源

最簡單的方式是直接把轉錄文字貼上到對話中。如果需要自動化，可以設定資料夾監控或 API 整合。

### 2. 基礎用法：貼上轉錄並產生紀要

```text
I just finished a meeting. Here's the transcript:

[paste transcript or point to file]

Please:
1. Write a concise summary (max 5 bullet points) covering key decisions and topics.
2. Extract ALL action items. For each one, identify:
   - What needs to be done
   - Who is responsible (match names to my team)
   - Deadline (if mentioned, otherwise mark as "TBD")
3. Create a Jira ticket for each action item, assigned to the right person.
4. Post the full summary to #meeting-notes in Slack.
```

### 3. 進階：資料夾自動監控

設定一個自動化管道，定期掃描轉錄檔案並處理：

```text
Set up a recurring task: every 30 minutes, check ~/meeting-transcripts/ for
new .txt or .vtt files. When you find one:

1. Parse the transcript into a structured summary with action items.
2. Create tasks in Linear for each action item.
3. Post the summary to #team-updates in Slack.
4. Move the processed file to ~/meeting-transcripts/processed/.

For each action item with a deadline, set a reminder to ping the assignee
in Slack one day before it's due.
```

### 4. 自訂輸出格式

```text
When writing meeting summaries, always use this structure:
- **Date & Attendees** at the top
- **Key Decisions** — numbered list of what was decided
- **Action Items** — table with columns: Task, Owner, Deadline, Status
- **Open Questions** — anything unresolved that needs follow-up
```

## 關鍵洞察

- 真正的價值不在於紀要本身，而在於**自動建立任務**。不轉化為可追蹤任務的會議紀要只是形式主義
- 可以搭配 [Todoist 任務管理器](todoist-task-manager.md) 用例，獲得對智能體建立的任務的完整視覺化
- Zoom 或 Google Meet 的 VTT/SRT 字幕檔案是很好的輸入——它們包含時間戳，幫助智能體將發言歸屬到具體的人
- 先從最簡單的開始（貼上轉錄、取得摘要），驗證輸出品質後再逐步自動化。不要在驗證效果之前就過度設計管道

## 中國用戶適配

國內企業的會議場景和工具生態與海外有很大不同。以下是針對國內環境的適配方案。

### 國內會議痛點

據統計，國內企業因會議效率低下造成的損失平均占年度營收的 11%，其中會議紀要處理不當是主要誘因之一。常見痛點包括：

- **會議太多**：員工被迫參加大量不必要的會議，紀要負擔沉重
- **紀要與執行脫節**：紀要寫了沒人看，行動項分散在聊天群裡無人跟進
- **轉寫工具碎片化**：飛書妙記、騰訊會議智慧紀要、釘釘 AI 聽記各有各的封閉生態，紀要資料難以跨平台流轉

### 轉錄來源替代方案

| 原版工具 | 國內替代 | 說明 |
|---------|---------|------|
| Otter.ai / Fireflies.ai | **飛書妙記** | 支援 19 種語言，準確率 98%，可匯出飛書文件/TXT/SRT 格式 |
| Google Meet 轉錄 | **騰訊會議智慧紀要** | 提供 REST API 取得轉寫段落和紀要摘要（需商業版/企業版） |
| Zoom 錄製摘要 | **釘釘 AI 聽記** | 支援 72 種語言轉寫，可一鍵同步待辦到釘釘待辦 |
| 直接貼上 | **任何工具匯出後貼上** | 最通用的方式，不依賴特定平台 |

### 任務建立替代方案

| 原版工具 | 國內替代 | OpenClaw 技能 |
|---------|---------|---------------|
| Jira / Linear | **飛書專案（Meego）** | 透過 [feishu-doc](https://playbooks.com/skills/openclaw/openclaw/feishu-doc) 寫入飛書文件，或使用飛書專案 API |
| Todoist | **滴答清單** | [ticktick-api-skill](https://playbooks.com/skills/openclaw/skills/ticktick-api-skill) |
| Notion | **飛書文件 / 釘釘文件** | [feishu-doc](https://playbooks.com/skills/openclaw/openclaw/feishu-doc) |
| Slack / Discord | **飛書群聊 / 釘釘群聊** | 透過飛書/釘釘渠道外掛程式直接發送 |

### 飛書用戶方案（推薦）

飛書生態內可以實現最完整的閉環：會議錄製 -> 妙記轉寫 -> OpenClaw 處理 -> 飛書文件 + 任務。

**前置條件**：已完成 [飛書 AI 助手](cn-feishu-ai-assistant.md) 的基礎接入。

**安裝飛書相關技能**：

```bash
npx playbooks add skill openclaw/openclaw --skill feishu-doc
npx playbooks add skill openclaw/skills --skill feishu-calendar-tool
```

**使用方式**：會議結束後，從飛書妙記匯出轉寫文字（TXT 或飛書文件格式），然後在飛書中發送給 OpenClaw 機器人：

```text
這是今天下午產品評審會的轉錄文字：
[貼上妙記匯出的文字]

請：
1. 整理成結構化會議紀要（決策事項 + 行動項 + 待確認事項）
2. 把紀要寫入飛書文件，放到「會議紀要」資料夾
3. 每個行動項標注負責人和截止日期
4. 把紀要摘要發到產品組群聊
```

### 騰訊會議用戶方案

騰訊會議開放平台提供了錄製轉寫 API（商業版/企業版），可透過 API 自動取得會議紀要：

- 查詢錄製轉寫段落資訊：`GET /v1/records/{record_file_id}/transcripts`
- 查詢智慧紀要：`GET /v1/smart/minutes/{record_file_id}`

取得到轉寫文字後，可透過 OpenClaw 進一步結構化處理並分發到對應的任務管理工具。

### 釘釘用戶方案

釘釘 AI 聽記支援將會議錄音自動轉寫，並可一鍵同步待辦到釘釘待辦。2025 年底升級後支援圖文紀要和 72 種語言。

**前置條件**：已完成 [釘釘 AI 助手](cn-dingtalk-ai-assistant.md) 的基礎接入。

**使用方式**：會議結束後，從釘釘 AI 聽記匯出紀要文字，發送給 OpenClaw 釘釘機器人進行進一步處理和任務分發。

### 實用建議

- **先用最簡單的方式驗證**：不管用什麼會議工具，先手動複製轉寫文字貼上給 OpenClaw，確認輸出品質滿意後再考慮自動化
- **飛書妙記 + OpenClaw 是目前最順暢的組合**：飛書妙記匯出格式規範，OpenClaw 飛書技能生態最成熟
- **跨平台場景**：如果團隊同時使用多個會議工具，統一匯出為 TXT 後交給 OpenClaw 處理，用同一套範本輸出
- **安全提醒**：會議轉錄可能包含敏感商業資訊，請確保 OpenClaw 執行在安全的環境中，不要將轉錄文字發送到不受信任的第三方服務

> **安全提示**：騰訊會議 API 憑證和飛書應用程式密鑰屬於敏感資訊，請透過環境變數或 `.env` 檔案設定，確保 `.env` 已加入 `.gitignore`。

## 相關連結

- [Otter.ai](https://otter.ai/)
- [Jira REST API](https://developer.atlassian.com/cloud/jira/platform/rest/v3/)
- [Linear API](https://developers.linear.app/)
- [Slack API](https://api.slack.com/)
- [飛書妙記](https://www.feishu.cn/product/minutes) — 飛書官方會議轉寫工具
- [騰訊會議開放平台](https://meeting.tencent.com/open-api.html) — 騰訊會議 API 文件
- [釘釘 AI 聽記](https://www.dingtalk.com/markets/dingtalk-ai) — 釘釘會議轉寫功能
- [feishu-doc 技能 - ClawHub](https://playbooks.com/skills/openclaw/openclaw/feishu-doc)
- [ticktick-api-skill 技能 - ClawHub](https://playbooks.com/skills/openclaw/skills/ticktick-api-skill)
- [feishu-calendar-tool 技能 - ClawHub](https://playbooks.com/skills/openclaw/skills/feishu-calendar-tool)
