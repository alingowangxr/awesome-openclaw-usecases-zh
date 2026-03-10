---
title: "多智能體內容工廠"
description: "在 Discord 中建立多智能體內容工廠，不同智能體分別負責調研、寫作和視覺素材。"
category: "創意與構建"
difficulty: 3
tags:
  - 多智能體
  - 內容創作
  - Discord
integrations:
  - Discord
featured: true
---

# 多智能體內容工廠

你是一名內容創作者，需要在多個平台上兼顧調研、寫作和設計。每一個步驟——尋找熱門話題、撰寫腳本、生成縮圖——都要耗費數小時。如果一個由專業智能體（agent）組成的團隊能在一夜之間處理這一切呢？

這個工作流程在 Discord 內建立一個多智能體（multi-agent）內容工廠，不同的智能體在專屬頻道中分別負責調研、寫作和視覺素材。

## 功能概述

- **調研智能體**每天早上掃描熱門故事、競品內容和社群媒體，找到最佳內容機會
- **寫作智能體**選取最佳創意，撰寫完整的腳本、推文串或電子報草稿
- **縮圖智能體**為內容生成 AI 縮圖或封面圖片
- 每個智能體在自己的 Discord 頻道中工作，保持一切有條理且可審閱
- 按計畫自動執行（例如每天早上 8 點），讓你醒來就看到完成的內容

## 痛點

內容創作有三個階段——調研、寫作和設計——大多數創作者都在手動完成這三個階段。即使使用 AI 寫作工具，你仍然需要逐一提示它們。這個系統將智能體鏈接成一條管線，一個智能體的輸出作為下一個的輸入，完全無需人工介入。

## 所需技能

- Discord 整合，設定多個頻道
- `sessions_spawn` / `sessions_send`，用於多智能體編排
- [x-research-v2](https://clawhub.ai) 或類似工具，用於社群媒體調研
- 本地圖像生成（如 Nano Banana）或圖像生成 API
- [knowledge-base](https://clawhub.ai) 技能（可選，用於 RAG 驅動的調研）

## 如何設定

1. 設定一個 Discord 伺服器（或者讓 OpenClaw 幫你設定——只需說「幫我建一個 Discord」）。

2. 為每個智能體建立頻道：
   - `#research` — 熱門話題和內容機會
   - `#scripts` — 撰寫的草稿和大綱
   - `#thumbnails` — 生成的圖片和封面

3. 提示 OpenClaw：

```text
I want you to build me a content factory inside of Discord.
Set up channels for different agents:

1. Research Agent (#research): Every morning at 8 AM, research top trending
   stories, competitor content, and what's performing well on social media
   in my niche. Post the top 5 content opportunities with sources.

2. Writing Agent (#scripts): Take the best idea from the research agent
   and write a full script/thread/newsletter draft. Post it in #scripts.

3. Thumbnail Agent (#thumbnails): Generate AI thumbnails or cover images
   for the content. Post them in #thumbnails.

Have all their work organized in different channels.
Run this pipeline automatically every morning.
```

4. 根據你的平台進行自訂：

提示 OpenClaw：

```text
I focus on X/Twitter threads, not YouTube. Change the writing agent
to produce tweet threads instead of video scripts.
```

## 關鍵洞察

- 核心在於**鏈式智能體**——調研驅動寫作，寫作驅動縮圖。你無需逐步單獨提示。
- Discord 頻道讓你可以輕鬆地分別審閱每個智能體的工作，並提供回饋，如「腳本太長了」或「多關注 AI 新聞」。
- 你可以將此模式適配到任何內容格式：推文、電子報、LinkedIn 貼文、播客大綱、部落格文章。
- 使用本地模型進行圖像生成（如在 Mac Studio 上執行 Nano Banana）可以降低成本並取得更多控制權。

## 靈感來源

受 [Alex Finn 關於改變生活的 OpenClaw 用例影片](https://www.youtube.com/watch?v=41_TNGDDnfQ)啟發。

## 相關連結

- [OpenClaw 子智能體文件](https://github.com/openclaw/openclaw)
- [Discord Bot 設定指南](https://discord.com/developers/docs)

---

