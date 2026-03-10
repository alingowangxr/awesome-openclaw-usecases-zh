---
title: "收件匣整理"
description: "自動整理堆積的電子報訂閱郵件，讓收件匣保持清爽，只保留真正重要的郵件。"
category: "生產力"
difficulty: 1
tags:
  - 郵件管理
  - 收件匣
  - 自動化
integrations:
  - Gmail
featured: false
---

# 收件匣整理

電子報訂閱郵件（newsletter）會迅速占滿收件匣。它們經常堆積如山，根本沒有被開啟過。

## 所需技能
[Gmail OAuth 設定](https://clawhub.ai/kai-jar/gmail-oauth)。

## 如何設定
1. [可選] 為 OpenClaw 專門建立一個新的 Gmail 帳號。
2. [可選] 取消主信箱中所有電子報訂閱，改用 OpenClaw 信箱訂閱。
3. 安裝技能並確保其正常運作。
4. 指示 OpenClaw：

以下提示詞讓 OpenClaw 每天自動整理電子報摘要：

```txt
I want you to run a cron job everyday at 8 p.m. to read all the newsletter emails of the past 24 hours and give me a digest of the most important bits along with links to read more. Then ask for my feedback on whether you picked good bits, and update your memory based on my preferences for better digests in the future jobs.
```

該提示詞要求 OpenClaw 設定一個定時任務（cron job），每天晚上 8 點讀取過去 24 小時內的所有電子報訂閱郵件，提供最重要內容的摘要和閱讀連結，然後根據你的回饋更新記憶，以便未來產生更好的摘要。

---

