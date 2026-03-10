---
title: "第二大腦"
description: "建立如同傳訊息般簡單的第二大腦，隨時擷取想法、書籤和閱讀筆記，自動組織和連結知識。"
category: "研究與學習"
difficulty: 1
tags:
  - 第二大腦
  - 知識管理
  - 筆記
integrations: []
featured: true
---

# 第二大腦

你會產生想法、發現有趣的連結、聽說要讀的書——但你從來沒有一個好的系統來擷取它們。Notion 變得複雜，Apple Notes 變成了一個擁有 10,000 條未讀筆記的墳場。你需要的是像給朋友傳簡訊一樣簡單的東西。

這個工作流將 OpenClaw 變成一個透過簡訊互動的記憶擷取系統，背後有一個可隨時瀏覽的自訂可搜尋介面。

## 功能介紹

- 透過 Telegram、iMessage 或 Discord 向你的 OpenClaw 發送任何內容——「提醒我讀一本關於本地 LLM 的書」——它會立即記住
- OpenClaw 內建的記憶系統會永久儲存你告訴它的一切
- 自訂的 Next.js 儀表板讓你可以搜尋每一條記憶、對話和筆記
- 全域搜尋（Cmd+K）涵蓋所有記憶、文件和任務
- 無需資料夾、無需標籤、無需複雜的組織——只需輸入和搜尋

## 痛點

每個筆記應用程式最終都會變成負擔。你停止使用它，因為組織的摩擦比遺忘的摩擦更高。關鍵洞察是：**擷取應該像傳簡訊一樣簡單，檢索應該像搜尋一樣簡單**。

## 所需技能

- Telegram、iMessage 或 Discord 整合（用於基於文字的擷取）
- Next.js（OpenClaw 會為你建構——無需撰寫程式碼）

## 設定方法

1. 確保你的 OpenClaw 已連線到你偏好的訊息平台（Telegram、Discord 等）。

2. 立即開始使用——只需向你的機器人發送任何你想記住的內容：

以下是一些記憶擷取的示例：

```text
Hey, remind me to read "Designing Data-Intensive Applications"
Save this link: https://example.com/interesting-article
Remember: John recommended the restaurant on 5th street
```

3. 透過提示 OpenClaw 建構可搜尋的介面：

以下提示詞讓智能體為你建構一個完整的第二大腦 Web 應用程式：

```text
I want to build a second brain system where I can review all our notes,
conversations, and memories. Please build that out with Next.js.

Include:
- A searchable list of all memories and conversations
- Global search (Cmd+K) across everything
- Ability to filter by date and type
- Clean, minimal UI
```

4. OpenClaw 會為你建構並部署整個 Next.js 應用程式。存取它提供的 URL，你就擁有了自己的第二大腦儀表板。

5. 從現在開始，每當你想到什麼——在路上、在會議中、睡前——只需給你的機器人發訊息。需要查找什麼的時候再回到儀表板。

## 關鍵洞察

- 力量在於**零摩擦擷取**。你不需要開啟應用程式、選擇資料夾或新增標籤。只需發訊息。
- OpenClaw 的記憶系統是累積的——它記住你*曾經*告訴它的一切，使其隨時間變得更加強大。
- 你可以從手機給機器人發訊息，它會在你的電腦上建構東西。介面就是對話本身。

## 參考來源

靈感來自 [Alex Finn 關於改變生活的 OpenClaw 用例的影片](https://www.youtube.com/watch?v=41_TNGDDnfQ)。

## 相關連結

- [OpenClaw 記憶系統](https://github.com/openclaw/openclaw)
- [打造第二大腦（Tiago Forte）](https://www.buildingasecondbrain.com/)

---

