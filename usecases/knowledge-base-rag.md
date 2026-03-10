---
title: "個人知識庫（RAG）"
description: "建立個人知識庫，將閱讀的文章、推文和影片資訊結構化儲存，隨時語義搜尋查詢。"
category: "研究與學習"
difficulty: 2
tags:
  - RAG
  - 知識管理
  - 語義搜尋
integrations: []
featured: true
---

# 個人知識庫（RAG）

你整天都在閱讀文章、推文和觀看影片，但總是找不到上週看到的那個東西。書籤越積越多，最終變得毫無用處。

這個工作流從你儲存的所有內容中建構一個可搜尋的知識庫：

- 將任何 URL 放入 Telegram 或 Slack，系統自動擷取內容（文章、推文、YouTube 字幕、PDF）
- 對你儲存的所有內容進行語義搜尋：搜尋「我儲存了哪些關於 agent memory 的內容？」會回傳帶來源的排序結果
- 可以與其他工作流聯動——例如，影片創意流水線在建構調研卡片時會查詢知識庫中的相關已儲存內容

## 所需技能

- [knowledge-base](https://clawhub.ai) 技能（或使用 embedding（向量嵌入）自建 RAG（檢索增強生成）系統）
- `web_fetch`（內建）
- 用於內容擷取的 Telegram 話題或 Slack 頻道

## 如何設定

1. 從 ClawdHub 安裝 knowledge-base 技能。
2. 建立一個名為 "knowledge-base" 的 Telegram 話題（或使用 Slack 頻道）。
3. 向 OpenClaw 發送以下提示詞：
```text
When I drop a URL in the "knowledge-base" topic:
1. Fetch the content (article, tweet, YouTube transcript, PDF)
2. Ingest it into the knowledge base with metadata (title, URL, date, type)
3. Reply with confirmation: what was ingested and chunk count

When I ask a question in this topic:
1. Search the knowledge base semantically
2. Return top results with sources and relevant excerpts
3. If no good matches, tell me

Also: when other workflows need research (e.g., video ideas, meeting prep), automatically query the knowledge base for relevant saved content.
```

4. 測試一下：放入幾個 URL，然後提問，例如「我有哪些關於 LLM memory 的內容？」

---

