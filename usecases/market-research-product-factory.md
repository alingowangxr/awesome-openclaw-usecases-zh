---
title: "市場調研與產品工廠"
description: "從 Reddit 和 X 上挖掘真實用戶痛點，自動生成解決方案和產品原型。"
category: "研究與學習"
difficulty: 2
tags:
  - 市場調研
  - 產品驗證
  - Reddit
integrations: []
featured: false
---

# 市場調研與產品工廠

你想做一個產品但不知道做什麼。或者你已經有了業務，需要了解客戶面臨的痛點。這個工作流使用 Last 30 Days 技能從 Reddit 和 X 上挖掘真實的用戶痛點，然後讓 OpenClaw 為這些問題構建解決方案。

## 功能介紹

- 使用 [Last 30 Days](https://github.com/matvanhorde/last-30-days) 技能，調研過去 30 天內 Reddit 和 X 上的任何話題
- 挖掘用戶正在發布的真實挑戰、抱怨和功能請求
- 幫助你從真實用戶痛點中發現產品機會
- 更進一步：讓 OpenClaw 構建一個 MVP（最小可行產品）來解決其中一個問題
- 打造從調研到產品的完整流水線，無需你編寫任何程式碼

## 痛點

大多數想創業的人都在「做什麼產品」這個問題上糾結。傳統的市場調研意味著花費數小時手動瀏覽論壇、社群媒體和評論網站。這個工作流將整個從發現到原型的流程自動化。

## 所需技能

- [Last 30 Days](https://github.com/matvanhorde/last-30-days) 技能，作者 Matt Van Horde
- Telegram 或 Discord 整合，用於接收調研報告

## 如何設定

1. 安裝 Last 30 Days 技能：
```text
Install this skill: https://github.com/matvanhorde/last-30-days
```

2. 對任何話題進行調研：
```text
Please use the Last 30 Days skill to research challenges people are
having with [your topic here].

Organize the findings into:
- Top pain points (ranked by frequency)
- Specific complaints and feature requests
- Gaps in existing solutions
- Opportunities for a new product
```

3. 選擇一個痛點，讓 OpenClaw 構建解決方案：
```text
Build me an MVP that solves [pain point from research].
Keep it simple — just the core functionality.
Ship it as a web app I can share with people.
```

4. 若需持續的市場情報，可安排定期調研：
```text
Every Monday morning, use the Last 30 Days skill to research what
people are saying about [your niche] on Reddit and X. Summarize the
top opportunities and send them to my Telegram.
```

## 真實案例

```text
"Use the Last 30 Days skill to research challenges people are having with OpenClaw."

調研結果：
- 安裝困難：許多用戶在初始設定上遇到困難
- 技能發現：用戶找不到滿足需求的技能
- 成本顧慮：用戶希望有更便宜的模型替代方案

→ "Build me a simple web app that makes OpenClaw setup easier with a guided wizard."

OpenClaw 構建了應用程式。你發布上線。你就有了一個產品。
```

## 關鍵洞察

- 這是**創業自動駕駛**：發現問題 → 驗證需求 → 構建解決方案，全部透過發訊息完成。
- Last 30 Days 技能為你提供真實、未經過濾的用戶情緒——而非經過美化的調查問卷資料。
- 你不需要技術背景。OpenClaw 既做調研又做開發。
- 安排每週調研，持續追蹤你所在市場不斷變化的痛點。

## 靈感來源

受 [Alex Finn 關於改變人生的 OpenClaw 使用案例的影片](https://www.youtube.com/watch?v=41_TNGDDnfQ) 和 Matt Van Horde 的 [Last 30 Days 技能](https://github.com/matvanhorde/last-30-days) 啟發。

## 相關連結

- [Last 30 Days 技能](https://github.com/matvanhorde/last-30-days)
- [OpenClaw 技能目錄](https://github.com/openclaw/skills)

---

