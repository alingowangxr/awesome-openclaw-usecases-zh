---
title: "Polymarket 自動駕駛：自動化模擬交易"
description: "自動監控預測市場套利機會並模擬執行交易策略，在不冒真金白銀風險的情況下測試策略。"
category: "金融與交易"
difficulty: 3
tags:
  - 預測市場
  - Polymarket
  - 模擬交易
integrations:
  - Polymarket
featured: false
---

# Polymarket 自動駕駛：自動化模擬交易

手動監控預測市場的套利機會並執行交易既耗時又需要持續關注。你希望在不冒真金白銀風險的情況下測試和最佳化交易策略。

這個工作流使用自訂策略在 Polymarket 上自動化模擬交易（paper trading）：

- 透過 API 監控市場資料（價格、成交量、價差）
- 使用 TAIL（趨勢跟蹤）和 BONDING（逆向）策略執行模擬交易
- 追蹤投資組合表現、盈虧和勝率
- 每日向 Discord 推送包含交易日誌和洞察的摘要
- 從模式中學習：根據回測結果調整策略參數

## 痛點

預測市場變化很快。手動交易意味著錯過機會、情緒化決策以及難以追蹤哪些策略有效。在你了解市場行為之前就用真錢測試策略，會有虧損風險。

## 功能介紹

自動駕駛系統持續掃描 Polymarket 的機會，使用可設定的策略模擬交易，並記錄所有內容以供分析。你醒來時就能看到它「隔夜交易」的摘要——哪些有效，哪些無效。

策略示例：
- **TAIL**：當成交量飆升且趨勢明確時跟隨趨勢
- **BONDING**：當市場對新聞過度反應時買入逆向頭寸
- **SPREAD**：識別定價偏差的市場，尋找套利機會

## 所需技能

- `web_search` 或 `web_fetch`（用於取得 Polymarket API 資料）
- `postgres` 或 SQLite，用於交易日誌和投資組合追蹤
- Discord 整合，用於每日報告
- Cron job（定時任務），用於持續監控
- Sub-agent（子智能體）生成，用於並行市場分析

## 如何設定

1. 設定用於模擬交易的資料庫：
```sql
CREATE TABLE paper_trades (
  id SERIAL PRIMARY KEY,
  market_id TEXT,
  market_name TEXT,
  strategy TEXT,
  direction TEXT,
  entry_price DECIMAL,
  exit_price DECIMAL,
  quantity DECIMAL,
  pnl DECIMAL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE portfolio (
  id SERIAL PRIMARY KEY,
  total_value DECIMAL,
  cash DECIMAL,
  positions JSONB,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

2. 建立一個 Discord 頻道用於更新（例如 #polymarket-autopilot）。

3. 向 OpenClaw 發送以下提示詞：
```text
You are a Polymarket paper trading autopilot. Run continuously (via cron every 15 minutes):

1. Fetch current market data from Polymarket API
2. Analyze opportunities using these strategies:
   - TAIL: Follow strong trends (>60% probability + volume spike)
   - BONDING: Contrarian plays on overreactions (sudden drops >10% on news)
   - SPREAD: Arbitrage when YES+NO > 1.05
3. Execute paper trades in the database (starting capital: $10,000)
4. Track portfolio state and update positions

Every morning at 8 AM, post a summary to Discord #polymarket-autopilot:
- Yesterday's trades (entry/exit prices, P&L)
- Current portfolio value and open positions
- Win rate and strategy performance
- Market insights and recommendations

Use sub-agents to analyze multiple markets in parallel during high-volume periods.

Never use real money. This is paper trading only.
```

4. 根據表現迭代策略。調整閾值、新增策略、對歷史資料進行回測。

## 相關連結

- [Polymarket API](https://docs.polymarket.com/)
- [模擬交易最佳實踐](https://www.investopedia.com/articles/trading/11/paper-trading.asp)

---

