---
title: "播客製作流水線"
description: "自動化播客從錄音到發布的完整流程，支援小宇宙 喜馬拉雅 B站 小紅書宣發。"
category: "創意與構建"
difficulty: 3
tags:
  - 播客
  - 內容創作
  - 自動化
integrations:
  - 小宇宙
  - 喜馬拉雅
featured: false
---

# 播客製作流水線

> 含國內適配：小宇宙 / 喜馬拉雅 / B站 / 小紅書宣發

你有一堆播客選題，甚至已經列好了待錄清單。但在嘉賓調研、大綱撰寫、開場白起草、節目筆記整理、社群媒體宣發之間，製作開銷消耗了你所有的創作熱情。如果你只需要給出一個話題，就能拿回一整套可發布的製作包呢？

這個用例把多個智能體串聯起來，處理從選題到發布的完整播客製作流程。

## 痛點

獨立播客主播和小團隊在製作上花的時間遠多於錄製本身。嘉賓調研動輒數小時，節目筆記總是被拖延，社群媒體宣發更是第一個被砍掉的環節。真正有創造力的部分——對話本身——可能只佔總工作量的 30%。這個智能體幫你處理剩下的 70%。

## 它能做什麼

- **節目調研** — 給出話題或嘉賓名字，自動整理背景資料、談話要點和建議問題
- **大綱與腳本** — 生成結構化的節目大綱，包括開場白腳本、段落過渡和結束語
- **節目筆記** — 錄製完成後，將轉錄稿處理成帶時間戳的節目筆記，附上提到的所有連結
- **社群媒體素材包** — 為 X、LinkedIn 和 Instagram 生成包含節目亮點和金句的宣發貼文
- **節目描述** — 撰寫針對 Spotify、Apple Podcasts 和 YouTube 最佳化的 SEO 節目描述

## 所需技能

- 網路搜尋 / 調研技能（用於嘉賓調研和話題深度研究）
- 檔案系統存取（用於讀取轉錄稿和寫入輸出檔案）
- Slack、Discord 或 Telegram 整合（用於交付成品）
- 可選：`sessions_spawn`（用於並行執行調研和寫作智能體）
- 可選：RSS feed 技能（用於監控競品播客）

## 如何設定

1. 錄製前——生成調研資料和節目大綱：

```text
I'm recording a podcast episode about [TOPIC]. My guest is [NAME].

Please:
1. Research the guest — their background, recent work, hot takes, and
   anything controversial or interesting they've said publicly.
2. Research the topic — key trends, recent news, common misconceptions,
   and what the audience likely already knows vs. what would surprise them.
3. Generate an episode outline:
   - Cold open hook (1-2 sentences to grab attention)
   - Intro script (30 seconds, casual tone)
   - 5-7 interview questions, ordered from easy/rapport-building to deep/provocative
   - 2-3 "back pocket" questions in case the conversation stalls
   - Closing segment with call-to-action

Save everything to ~/podcast/episodes/[episode-number]/prep/
```

2. 錄製後——生成節目筆記和宣發素材：

```text
Here's the transcript for Episode [NUMBER]: [paste or point to file]

Please:
1. Write timestamped show notes — every major topic shift gets a timestamp
   and one-line summary. Include links to anything mentioned (tools, books,
   articles, people).
2. Write an episode description (max 200 words) optimized for podcast
   search. Include 3-5 relevant keywords naturally.
3. Create social media posts:
   - X/Twitter: 3 tweets — one pull quote, one key insight, one question
     to spark discussion. Each under 280 chars.
   - LinkedIn: 1 post, professional tone, 100-150 words.
   - Instagram caption: 1 post with emoji, casual tone, include relevant hashtags.
4. Extract a "highlights" list — the 3 most interesting/surprising moments
   with timestamps.

Save everything to ~/podcast/episodes/[episode-number]/publish/
```

3. 可選——競品播客監控：

```text
Monitor these podcast RSS feeds daily:
- [feed URL 1]
- [feed URL 2]

When a new episode drops that covers a topic relevant to my podcast,
send me a Telegram message with:
- Episode title and link
- One-sentence summary
- Whether this is something I should respond to or cover from my angle
```

## 關鍵洞察

- **錄製前調研**是最大的價值所在。帶著深度嘉賓調研走進錄音室，對話品質會有質的飛躍——這不是後期能彌補的。
- 帶時間戳的**節目筆記**是提升聽眾留存的利器。大多數播客主播因為嫌麻煩而跳過這一步，但智能體讓它變得毫不費力。
- **社群媒體素材包**節省的是最多的*持續性*時間。每期都需要宣發，結構完全一樣——這正是自動化的完美場景。
- 與[多智能體內容工廠](content-factory.md)搭配使用效果更佳，可以將播客內容轉化為部落格文章、Newsletter 或影片片段。

## 中國用戶適配

國內播客生態與海外有顯著差異，以下是針對中國播客創作者的適配建議。

### 平台替代方案

| 海外平台 | 國內替代 | 說明 |
|---------|---------|------|
| Spotify for Podcasters | 小宇宙 | 國內最活躍的純播客平台，支援 RSS 訂閱和託管，有完善的創作者後台 |
| Apple Podcasts | 喜馬拉雅 | 用戶體量最大的音頻平台，需單獨上傳（不支援純 RSS 導入） |
| YouTube (播客影片化) | 網易雲音樂播客 / B 站 | 網易雲支援 RSS 導入；B 站適合影片播客 |
| Anchor | 荔枝 FM / 蜻蜓 FM | 可作為補充分發渠道 |
| Slack/Discord | 飛書 / 釘釘 / 微信 | 用於接收智能體交付的製作包 |

### 分發策略

國內播客分發分為兩類：

- **RSS 分發**（小宇宙、Apple Podcasts、網易雲音樂等泛用型客戶端）：生成一條 RSS 連結，提交到各平台即可自動同步
- **手動上傳**（喜馬拉雅、荔枝 FM 等）：需要單獨上傳音頻檔案和節目資訊，可以讓智能體準備好各平台所需的元資料（標題、描述、標籤），減少重複勞動

建議使用 Firstory 等託管平台自動生成 RSS，再手動補充需要單獨上傳的平台。

### 製作工具適配

- **轉錄**：錄製完成後可使用 [Whisper](https://github.com/openai/whisper) 進行本地轉錄，也可使用訊飛聽見、飛書妙記等國內服務，中文識別準確率更高
- **剪輯**：小宇宙提供「小宇宙 Studio」線上剪輯工具，與主播後台深度整合；也可使用 Adobe Audition、達芬奇等專業工具
- **封面和視覺素材**：搭配 AI 圖像生成工具製作每期封面，保持品牌一致性

### 社群媒體宣發適配

錄製後的宣發提示詞建議替換為國內平台：

```text
Here's the transcript for Episode [NUMBER]: [paste or point to file]

Please:
1. Write timestamped show notes (same as original).
2. Write an episode description (max 200 words) with 3-5 keywords,
   optimized for 小宇宙 and 喜馬拉雅 search.
3. Create social media posts:
   - 小紅書: 1 post, conversational tone, include 5-8 hashtags,
     highlight the most relatable listener moment.
   - 微信公眾號: 1 article draft, 800-1200 words, deeper recap
     of episode themes with key quotes.
   - 微博: 2 posts — one pull quote with guest photo prompt,
     one question to spark discussion. Each under 140 chars.
4. Extract a "highlights" list — the 3 most interesting moments
   with timestamps, formatted for short video clips (抖音/視頻號).

Save everything to ~/podcast/episodes/[episode-number]/publish/
```

### 競品監控適配

將 RSS 監控目標替換為你關注的國內播客。小宇宙上的播客大多提供 RSS 連結，可以在節目頁面找到。

### 國內創作者特別提醒

- **中文播客製作週期長**：據 CPA 中文播客社群統計，2024 年中文播客創作者平均每期淨工作時長達 12.9 小時，其中剪輯平均耗時 4.5 小時。這意味著從調研、節目筆記到宣發的自動化可以顯著降低非核心工作負擔
- **兼職創作者居多**：近八成播客從業者為兼職狀態，製作時間碎片化。用智能體自動化流水線工作，可以把有限的時間集中在內容本身
- **影片播客趨勢**：2026 年影片播客正從「補充形態」變為「主流形態」。考慮在流水線中加入短影片切片（抖音/視頻號）的自動化環節

## 相關連結

- [Podcast RSS Feed Spec (Apple)](https://podcasters.apple.com/support/823-podcast-requirements)
- [Spotify for Podcasters](https://podcasters.spotify.com/)
- [Whisper (OpenAI)](https://github.com/openai/whisper) — 本地轉錄生成
- [小宇宙主播入駐](https://podcaster.xiaoyuzhoufm.com/)
- [喜馬拉雅創作中心](https://zhubo.ximalaya.com/)

---

