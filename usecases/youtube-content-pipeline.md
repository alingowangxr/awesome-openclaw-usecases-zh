---
title: "YouTube 內容管線"
description: "自動在網路和 X/Twitter 上尋找新鮮影片創意，追蹤已涵蓋的內容，保持日更創作領先趨勢。"
category: "社群媒體"
difficulty: 2
tags:
  - YouTube
  - 內容創作
  - 創意
integrations: []
featured: false
---

# YouTube 內容管線

作為一名日更的 YouTube 創作者，在網路和 X/Twitter 上尋找新鮮、及時的影片創意非常耗時。追蹤已經涵蓋過的內容可以避免重複，並幫助你保持領先趨勢。

這個工作流自動化了整個內容搜集和調研管線：

- 每小時定時任務（cron job）掃描突發 AI 新聞（網路 + X/Twitter），並將影片創意推送到 Telegram
- 維護一個 90 天的影片目錄，包含播放量和主題分析，避免重複涵蓋話題
- 將所有創意儲存在 SQLite 資料庫中，並使用向量嵌入（vector embeddings）進行語義去重（這樣你永遠不會收到重複的創意推薦）
- 當你在 Slack 中分享一個連結時，OpenClaw 會調研該話題、在 X 上搜尋相關貼文、查詢你的知識庫，並在 Asana 中建立一個包含完整大綱的任務卡

## 所需技能

- `web_search`（內建）
- [x-research-v2](https://clawhub.ai) 或自訂 X/Twitter 搜尋技能
- [knowledge-base](https://clawhub.ai) 技能，用於 RAG（檢索增強生成）
- Asana 整合（或 Todoist）
- `gog` CLI，用於 YouTube Analytics 資料
- Telegram 話題，用於接收創意推送

## 如何設定

1. 在 Telegram 中設定一個影片創意話題，並在 OpenClaw 中設定。
2. 安裝 knowledge-base 技能和 x-research 技能。
3. 建立用於創意追蹤的 SQLite 資料庫：

```sql
CREATE TABLE pitches (
  id INTEGER PRIMARY KEY,
  timestamp TEXT,
  topic TEXT,
  embedding BLOB,
  sources TEXT
);
```

4. 提示 OpenClaw：

```text
Run an hourly cron job to:
1. Search web and X/Twitter for breaking AI news
2. Check against my 90-day YouTube catalog (fetch from YouTube Analytics via gog)
3. Check semantic similarity against all past pitches in the database
4. If novel, pitch the idea to my Telegram "video ideas" topic with sources

Also: when I share a link in Slack #ai_trends, automatically:
1. Research the topic
2. Search X for related posts
3. Query my knowledge base
4. Create an Asana card in Video Pipeline with a full outline
```

---

