---
title: "動態儀表板與子智能體生成"
description: "建立跨多個資料源的即時動態儀表板，無需手動更新，由子智能體自動擷取資料。"
category: "生產力"
difficulty: 3
tags:
  - 儀表板
  - 資料視覺化
  - 子智能體
integrations: []
featured: false
---

# 動態儀表板與子智慧型代理產生

靜態儀表板顯示的是過時的資料，需要持續手動更新。你需要跨多個資料源的即時可見性，又不想建構自訂前端或觸發 API 速率限制。

這個工作流建立一個即時儀表板，透過產生子智慧型代理（sub-agent）平行取得和處理資料：

- 同時監控多個資料源（API、資料庫、GitHub、社群媒體）
- 為每個資料源產生子智慧型代理，避免阻塞並分散 API 負載
- 將結果彙整到統一的儀表板中（文字、HTML 或 Canvas）
- 每 N 分鐘用最新資料更新
- 當指標超過閾值時發送警報
- 在資料庫中維護歷史趨勢以供視覺化

## 痛點

建構自訂儀表板需要數週時間。等完成時，需求已經變了。循序輪詢多個 API 既慢又容易觸及速率限制。你現在就需要洞察，而不是花一個週末寫程式。

## 功能介紹

你透過對話定義要監控的內容：「追蹤 GitHub 星標、Twitter 提及、Polymarket 交易量和系統健康狀況。」 OpenClaw 產生子智慧型代理平行取得每個資料源，彙整結果，並以格式化的儀表板發送到 Discord 或產生 HTML 檔案。更新按定時任務（cron job）自動執行。

儀表板範例板塊：
- **GitHub**：星標、Fork、未關閉的 Issue、最近的提交
- **社群媒體**：Twitter 提及、Reddit 討論、Discord 活動
- **市場**：Polymarket 交易量、預測趨勢
- **系統健康**：CPU、記憶體、磁碟使用率、服務狀態

## 所需技能

- 子智慧型代理產生用於平行執行
- `github`（gh CLI）用於 GitHub 指標
- `bird`（Twitter）用於社群資料
- `web_search` 或 `web_fetch` 用於外部 API
- `postgres` 用於儲存歷史指標
- Discord 或 Canvas 用於渲染儀表板
- 定時任務（cron job）用於定期更新

## 設定方法

1. 設定指標資料庫：
```sql
-- 指標表
CREATE TABLE metrics (
  id SERIAL PRIMARY KEY,
  source TEXT, -- 例如 "github"、"twitter"、"polymarket"
  metric_name TEXT,
  metric_value NUMERIC,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- 警報表
CREATE TABLE alerts (
  id SERIAL PRIMARY KEY,
  source TEXT,
  condition TEXT,
  threshold NUMERIC,
  last_triggered TIMESTAMPTZ
);
```

2. 建立一個用於儀表板更新的 Discord 頻道（例如 #dashboard）。

3. 給 OpenClaw 設定提示詞：

以下提示詞讓智慧型代理每 15 分鐘自動取得多源資料並產生儀表板：

```text
You are my dynamic dashboard manager. Every 15 minutes, run a cron job to:

1. Spawn sub-agents in parallel to fetch data from:
   - GitHub: stars, forks, open issues, commits (past 24h)
   - Twitter: mentions of "@username", sentiment analysis
   - Polymarket: volume for tracked markets
   - System: CPU, memory, disk usage via shell commands

2. Each sub-agent writes results to the metrics database.

3. Aggregate all results and format a dashboard:

📊 **Dashboard Update** — [timestamp]

**GitHub**
- ⭐ Stars: [count] (+[change])
- 🍴 Forks: [count]
- 🐛 Open Issues: [count]
- 💻 Commits (24h): [count]

**Social Media**
- 🐦 Twitter Mentions: [count]
- 📈 Sentiment: [positive/negative/neutral]

**Markets**
- 📊 Polymarket Volume: $[amount]
- 🔥 Trending: [market names]

**System Health**
- 💻 CPU: [usage]%
- 🧠 Memory: [usage]%
- 💾 Disk: [usage]%

4. Post to Discord #dashboard.

5. Check alert conditions:
   - If GitHub stars change > 50 in 1 hour → ping me
   - If system CPU > 90% → alert
   - If negative sentiment spike on Twitter → notify

Store all metrics in the database for historical analysis.
```

4. 可選：使用 Canvas 渲染包含圖表的 HTML 儀表板。

5. 查詢歷史資料：「顯示過去 30 天的 GitHub 星標增長情況。」

## 相關連結

- [使用子智慧型代理進行平行處理](https://docs.openclaw.ai/subagents)
- [儀表板設計原則](https://www.nngroup.com/articles/dashboard-design/)

---

