---
title: "多源科技新聞摘要"
description: "自動聚合、評分並推送來自 109+ 個來源的科技新聞，涵蓋 RSS、X、GitHub 和網頁搜尋。"
category: "研究與學習"
difficulty: 2
tags:
  - 科技新聞
  - RSS
  - 摘要
integrations: []
featured: false
---

# 多源科技新聞摘要

自動聚合、評分並推送來自 109+ 個來源的科技新聞，涵蓋 RSS、Twitter/X、GitHub 發布和網頁搜尋 — 全部透過自然語言管理。

## 痛點

想要緊跟 AI、開源和前沿科技動態，需要每天檢視數十個 RSS 訂閱源（feed）、Twitter 帳號、GitHub 倉庫和新聞網站。手動策劃非常耗時，而大多數現有工具要麼缺乏品質過濾，要麼需要複雜的設定。

## 功能介紹

一個按計畫執行的四層資料管道（data pipeline）：

1. **RSS 訂閱源**（46 個來源）— OpenAI、Hacker News、MIT Technology Review 等。
2. **Twitter/X 意見領袖（KOL）**（44 個帳號）— @karpathy、@sama、@VitalikButerin 等。
3. **GitHub 發布**（19 個倉庫）— vLLM、LangChain、Ollama、Dify 等。
4. **網頁搜尋**（4 個主題搜尋）— 透過 Brave Search API。

所有文章被合併、按標題相似度去重，並進行品質評分（優先來源 +3，多來源 +5，時效性 +2，互動量 +1）。最終摘要推送到 Discord、電子郵件或 Telegram。

該框架完全可自訂 — 30 秒內即可新增你自己的 RSS 訂閱源、Twitter 帳號、GitHub 倉庫或搜尋查詢。

## 提示詞

**安裝並設定每日摘要：**
```text
Install tech-news-digest from ClawHub. Set up a daily tech digest at 9am to Discord #tech-news channel. Also send it to my email at myemail@example.com.
```

**新增自訂來源：**
```text
Add these to my tech digest sources:
- RSS: https://my-company-blog.com/feed
- Twitter: @myFavResearcher
- GitHub: my-org/my-framework
```

**按需產生：**
```text
Generate a tech digest for the past 24 hours and send it here.
```

## 所需技能

- [tech-news-digest](https://clawhub.ai/skills/tech-news-digest) — 透過 `clawhub install tech-news-digest` 安裝
- [gog](https://clawhub.ai/skills/gog)（可選）— 用於透過 Gmail 發送郵件

## 環境變數（可選）

- `X_BEARER_TOKEN` — Twitter/X API 持有者令牌（bearer token），用於監控意見領袖
- `BRAVE_API_KEY` — Brave Search API 金鑰，用於網頁搜尋層
- `GITHUB_TOKEN` — GitHub 令牌，用於更高的 API 速率限制

## 相關連結

- [GitHub 倉庫](https://github.com/draco-agent/tech-news-digest)
- [ClawHub 頁面](https://clawhub.ai/skills/tech-news-digest)

---

