---
title: "開發前創意驗證器"
description: "在開始開發前驗證產品想法的市場可行性，支援百度指數 微信指數 V2EX 等國內資料源。"
category: "研究與學習"
difficulty: 2
tags:
  - 創意驗證
  - 市場調研
  - 產品
integrations: []
featured: false
---

# 開發前創意驗證器

> 含國內適配：百度指數 / 微信指數 / V2EX / 少數派

在 OpenClaw 動手寫程式碼之前，它會自動檢查你的創意是否已經存在——掃描 GitHub、Hacker News、npm、PyPI 和 Product Hunt 五大資料來源，根據競爭程度決定下一步行動。

## 功能介紹

- 在編寫任何程式碼之前，自動掃描 5 個真實資料來源（GitHub、Hacker News、npm、PyPI、Product Hunt）
- 回傳 `reality_signal` 競爭度評分（0-100），直觀顯示該領域的擁擠程度
- 展示頭部競品及其 Star 數和描述
- 當領域飽和時，自動建議差異化方向
- 作為開發前的「關卡」：高分 = 停下來討論，低分 = 直接開幹

## 痛點

你告訴智能體「幫我做一個 AI 程式碼審查工具」，它高高興興地寫了 6 個小時程式碼。然而 GitHub 上已有 143,000+ 個相關倉庫——排名第一的有 53,000 顆 Star。智能體從不檢查，因為你沒讓它查，它也不知道該查。你投入大量時間之後才發現競爭對手早已成熟。這個模式在每一個新專案中反覆上演。

## 所需技能

- [idea-reality-mcp](https://github.com/mnemox-ai/idea-reality-mcp) — 掃描真實資料來源並回傳競爭度評分的 MCP 伺服器

## 如何設定

1. 安裝 idea-reality-mcp：

```bash
uvx idea-reality-mcp
```

2. 在 OpenClaw 設定中新增 MCP 伺服器：

```json
{
  "mcpServers": {
    "idea-reality": {
      "command": "uvx",
      "args": ["idea-reality-mcp"]
    }
  }
}
```

3. 將以下指令新增到你的 OpenClaw 智能體設定中：

```text
Before starting any new project, feature, or tool, always run idea_check first.

Rules:
- If reality_signal > 70: STOP. Report the top 3 competitors with star counts.
  Ask me if I want to proceed, pivot, or abandon.
- If reality_signal 30-70: Show me the results and pivot_hints.
  Suggest a niche angle that existing projects don't cover.
- If reality_signal < 30: Proceed to build.
  Mention that the space is open.
- Always show the reality_signal score and top competitors before writing any code.
```

## 真實案例

**你：** 「幫我做一個 AI 程式碼審查的 CLI 工具」

OpenClaw 執行 `idea_check("AI code review tool")` 並回覆：

> **reality_signal: 90/100（非常高）**
>
> 頭部競品：
> 1. Gitea — 53,940 stars
> 2. reviewdog — 9,104 stars
> 3. Danger (Ruby) — 5,649 stars
>
> 該領域有 143,000+ 個相關倉庫，頭部產品成熟且資金充裕。
>
> **差異化建議：**
> - 聚焦特定語言（Rust/Go 專用 AI 程式碼審查）
> - 針對特定框架（React/Vue 元件審查）
> - 針對特定行業（金融／醫療程式碼合規審查）
>
> 要繼續做差異化版本，還是換一個方向？

**你：** 「那做一個開發前創意驗證的 MCP 伺服器呢？」

> **reality_signal: 8/100（非常低）**
>
> PyPI 和 npm 上沒有直接競品。GitHub 上有一些沾邊的倉庫，但沒有一個解決完全相同的問題。
>
> 這個領域完全空白。開始開發。

## 進階玩法

- **深度模式**：使用 `depth="deep"` 同時掃描全部 5 個資料來源（GitHub + HN + npm + PyPI + Product Hunt），適合重大專案決策。
- **批量驗證**：在黑客松前，給 OpenClaw 一份 10 個創意的清單，讓它按 `reality_signal` 排名——分數最低的 = 最具原創性的機會。
- **先試用 Web 版**：在 [mnemox.ai/check](https://mnemox.ai/check) 免費試用，看看這個工作流是否適合你的需求。

## 關鍵洞察

- 這能防止開發中最昂貴的錯誤：**解決一個已經被解決的問題**。
- `reality_signal` 基於真實資料（倉庫數量、Star 分布、HN 討論量），而不是 LLM 猜測。
- 高分不意味著「別做」——而是「要麼差異化，要麼別白費力氣」。
- 低分意味著真正的藍海。這才是個人開發者勝算最大的方向。

## 中國用戶適配

### idea-reality-mcp 已支援中文

v0.3.0 版本新增了三階段關鍵詞提取管線，內建 150+ 中英術語對應（涵蓋 15+ 領域），可以直接用中文描述你的創意。例如輸入「寵物預約看診 app」，會自動對應為「pet appointment veterinary booking app」進行搜尋。

### 資料來源說明

idea-reality-mcp 掃描的 5 個資料來源（GitHub、Hacker News、npm、PyPI、Product Hunt）均為國際平台。對於面向國內市場的專案，建議補充以下國內資料來源進行交叉驗證：

| 國際資料來源 | 國內對應平台 | 用途 |
|-----------|-------------|------|
| Product Hunt | V2EX [創意] 板塊、少數派 | 發現國內新產品和競品 |
| Hacker News | V2EX、掘金、CSDN | 技術社群討論熱度 |
| GitHub | Gitee | 國內開源專案搜尋 |
| npm / PyPI | npm（通用）/ Gitee 鏡像 | 套件管理和依賴檢索 |

### 補充國內市場資料驗證

在 idea-reality-mcp 給出國際競爭度評分後，建議進一步透過國內資料平台驗證市場需求：

- **百度指數**（index.baidu.com）：檢視關鍵詞搜尋趨勢，判斷用戶是否在主動搜尋你要解決的問題
- **微信指數**：微信小程式內檢視關鍵詞在微信生態的熱度，適合 C 端產品驗證
- **巨量算數**（trendinsight.oceanengine.com）：抖音/頭條生態資料，了解短影片和內容領域的趨勢
- **阿里指數 / 生意參謀**：電商領域需求驗證，檢視商品搜尋趨勢和競爭程度
- **36氪、IT桔子**：檢視該領域是否已有融資專案，評估競爭格局

### 建議補充的提示詞

在原版提示詞基礎上，可以新增以下規則以涵蓋國內市場：

```text
After running idea_check, also help me research the Chinese market:
- Search for similar products on V2EX, 少數派, and 36氪
- Check Baidu Index trends for related keywords
- Look for competing projects on Gitee
- Summarize whether the idea has more or less competition in China vs. internationally
```

### 適用場景

這個用例對國內開發者和新創業者的價值尤其突出：

- **獨立開發者**：在 Product Hunt 或國內社群發布前，快速驗證創意的全球競爭度
- **出海團隊**：驗證產品在國際市場的競爭空間，找到差異化角度
- **黑客松參賽者**：批量篩選最具原創性的選題
- **產品經理**：在立項前用資料說話，避免重複造輪子

## 相關連結

- [idea-reality-mcp GitHub](https://github.com/mnemox-ai/idea-reality-mcp)
- [Web 線上體驗](https://mnemox.ai/check)（無需安裝即可試用）
- [PyPI](https://pypi.org/project/idea-reality-mcp/)

---

