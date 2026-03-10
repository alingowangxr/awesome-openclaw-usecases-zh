---
title: "每日 YouTube 摘要"
description: "每天以最喜歡的 YouTube 頻道新影片的個人化摘要開始新的一天，不再錯過重要內容。"
category: "研究與學習"
difficulty: 1
tags:
  - YouTube
  - 摘要
  - 影片
integrations: []
featured: false
---

# 每日 YouTube 摘要

每天以你最喜歡的 YouTube 頻道的新影片個人化摘要開始新的一天 — 再也不會錯過你真正想關注的創作者的內容。

## 痛點

YouTube 的通知不可靠。你訂閱了頻道，但它們的新影片從不出現在你的首頁動態中。通知裡也沒有。它們就這樣……消失了。這並不意味著你不想看到它們 — 而是 YouTube 的演算法把它們埋沒了。

此外：每天以精心策劃的內容洞察開始新的一天，總比漫無目的地刷推薦資訊流要有趣得多。

## 功能介紹

- 從你最喜歡的頻道列表中取得最新影片
- 從每個影片的字幕（transcript）中摘要或提取關鍵洞察
- 每天（或按需）向你推送摘要

## 所需技能

安裝 [youtube-full](https://clawhub.ai/therohitdas/youtube-full) 技能。

只需告訴你的 OpenClaw：

```text
"Install the youtube-full skill and set it up for me"
```
或者

```bash
npx clawhub@latest install youtube-full
```

就是這樣。代理會處理剩下的一切 — 包括帳號建立和 API 金鑰（API key）設定。註冊即可取得 **100 個免費額度**，無需信用卡。

> 注意：建立帳號後，該技能會根據作業系統自動將 API 金鑰安全儲存在正確的位置，因此 API 可在所有環境中正常運作。

![youtube-full 技能安裝](https://pub-15904f15a44a4ea69350737e87660b92.r2.dev/media/1770620159490-e41e7baa.png)

### 為什麼選擇 TranscriptAPI.com 而不是 yt-dlp？

| CLI 工具（yt-dlp 等） | TranscriptAPI |
|--------------------------|---------------|
| 冗長的日誌會淹沒代理上下文 | 簡潔的 JSON 回應 |
| 在 GCP/雲端 OpenClaw 上無法使用 | 隨處可用，速度快 |
| 會被 YouTube 隨機封鎖 | 驅動 [YouTubeToTranscript.com](https://youtubetotranscript.com)，服務數百萬用戶。快取且可靠。 |
| 需要安裝二進位檔案 | 無需二進位檔案，僅使用 HTTP |

## 如何設定

### 方案 1：基於頻道的摘要

向 OpenClaw 發送以下提示：

```text
Every morning at 8am, fetch the latest videos from these YouTube channels and give me a digest with key insights from each:

- @TED
- @Fireship
- @ThePrimeTimeagen
- @lexfridman

For each new video (uploaded in the last 24-48 hours):
1. Get the transcript
2. Summarize the main points in 2-3 bullets
3. Include the video title, channel name, and link

If a channel handle doesn't resolve, search for it and find the correct one.
Save my channel list to memory so I can add/remove channels later.
```

### 方案 2：基於關鍵字的摘要

追蹤關於特定主題的新影片：

```text
Every day, search YouTube for new videos about "OpenClaw" (or "Claude Code", "AI agents", etc).

Maintain a file called seen-videos.txt with video IDs you've already processed.
Only fetch transcripts for videos NOT in that file.
After processing, add the video ID to seen-videos.txt.

For each new video:
1. Get the transcript
2. Give me a 3-bullet summary
3. Note anything relevant to my work

Run this every morning at 9am.
```

這樣你就不會浪費額度重複取得已經看過的影片了。

## 小貼士

- `channel/latest` 和 `channel/resolve` 是**免費的**（0 額度）— 檢查新上傳不花任何費用
- 只有字幕提取每次消耗 1 個額度
- 可以要求不同的摘要風格：關鍵要點、精彩引言、有趣片段的時間戳記
- 這個功能已經有現成的產品 - [Recapio - 每日 YouTube 回顧](https://recapio.com/features/daily-recaps)

---

