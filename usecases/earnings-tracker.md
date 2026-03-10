---
title: "AI 驅動的財報追蹤器"
description: "自動追蹤財報資料，支援 AKShare 東方財富 巨潮資訊等國內資料源。"
category: "金融與交易"
difficulty: 2
tags:
  - 財報
  - 股票
  - 資料追蹤
integrations:
  - AKShare
featured: true
---

# AI 驅動的財報追蹤器

> 含國內適配：AKShare / 東方財富 / 巨潮資訊

在財報季追蹤數十家科技公司意味著需要檢視多個資訊來源並記住報告日期。你希望緊跟 AI/科技公司的財報動態，而不必手動追蹤每一家公司。

這個工作流自動化了財報追蹤和推送：

- 每週日預覽：掃描即將到來的財報日曆，將相關的科技/AI 公司發布到 Telegram
- 你選擇關注哪些公司，OpenClaw 為每個財報日期安排一次性的 cron job（定時任務）
- 每份報告發布後，OpenClaw 搜尋結果，格式化詳細摘要（超預期/不及預期、關鍵指標、AI 亮點），並推送給你

## 所需技能

- `web_search`（內建）
- OpenClaw 的 cron job（定時任務）支援
- 用於財報更新的 Telegram 話題

## 如何設定

1. 建立一個名為 "earnings" 的 Telegram 話題用於接收更新。
2. 向 OpenClaw 發送以下提示詞：
```text
Every Sunday at 6 PM, run a cron job to:
1. Search for the upcoming week's earnings calendar for tech and AI companies
2. Filter for companies I care about (NVDA, MSFT, GOOGL, META, AMZN, TSLA, AMD, etc.)
3. Post the list to my Telegram "earnings" topic
4. Wait for me to confirm which ones I want to track

When I reply with which companies to track:
1. Schedule one-shot cron jobs for each earnings date/time
2. After each report drops, search for earnings results
3. Format a summary including: beat/miss, revenue, EPS, key metrics, AI-related highlights, guidance
4. Post to Telegram "earnings" topic

Keep a memory of which companies I typically track so you can auto-suggest them each week.
```

## 中國用戶適配

A 股市場有完善的財報披露制度，而且資料取得比美股更規範。以下是針對 A 股投資者的適配方案。

### A 股 vs 美股財報機制差異

| 維度 | 美股 | A 股 |
|------|------|------|
| 財報日曆 | 公司自行公布，需依賴第三方彙整 | 交易所要求提前公布**預約披露時間表**，更規範 |
| 發布節奏 | 季報一次性發布 | **業績預告 → 業績快報 → 正式報告**三階段機制 |
| 資料取得 | 需付費 API（Alpha Vantage 等） | 有免費開源方案（AKShare） |

這意味著 A 股的財報追蹤可以做得更精細——你可以在業績預告階段就提前取得訊號。

### A 股資料源推薦

| 資料源 | 費用 | 說明 |
|--------|------|------|
| **AKShare** | 免費 | 推薦首選，MIT 開源，介面最全 |
| Tushare Pro | 積分制 | 基礎免費，進階功能需積分 |
| 東方財富 Choice | 付費 | 專業級，適合機構用戶 |
| 巨潮資訊 | 免費 | 官方披露管道，適合取得原始公告 PDF |

**推薦方案：AKShare**（[GitHub](https://github.com/akfamily/akshare)，10k+ stars，MIT 許可）

安裝：

```bash
pip install akshare
```

關鍵介面：

| 介面 | 用途 | 對應原用例功能 |
|------|------|---------------|
| `stock_yysj_em(date)` | 預約披露時間表 | earnings calendar（核心） |
| `stock_yjyg_em()` | 業績預告資料 | 提前訊號，美股無對應 |
| `stock_yjkb_em()` | 業績快報 | 快速業績概覽 |
| `stock_yjbb_em()` | 正式業績報表 | 完整財報資料 |

快速上手範例：

```python
import akshare as ak

# 取得 2025 年一季報預約披露時間表
df = ak.stock_yysj_em(date="20250331")
# 篩選你關注的公司（以股票代碼篩選）
watchlist = ["600519", "000858", "601318", "000001"]
my_stocks = df[df["股票代碼"].isin(watchlist)]
print(my_stocks[["股票代碼", "股票簡稱", "首次預約時間"]])
```

### 推送管道適配

| 原版方案 | 國內替代 | 說明 |
|---------|---------|------|
| Telegram | **釘釘群機器人** | Webhook 方式，最簡單 |
| Telegram | **飛書機器人** | 支援富文字卡片訊息 |
| Telegram | **企業微信應用程式** | 企業用戶首選 |

### 提示詞適配

將原版提示詞中的美股部分替換為 A 股邏輯：

```text
每週日晚 8 點，執行定時任務：
1. 呼叫 AKShare 的 stock_yysj_em 介面，取得下週預約披露時間表
2. 篩選我關注的公司（600519 貴州茅台、000858 五糧液、601318 中國平安 等）
3. 將列表推送到釘釘群「財報追蹤」
4. 等我確認要跟蹤哪些

當我回覆確認後：
1. 為每個披露日期安排一次性定時任務
2. 報告發布後，搜尋業績快報和市場解讀
3. 格式化摘要：營收、淨利潤、同比增長、業績預告對比、機構點評
4. 推送到釘釘群

記住我通常關注的公司列表，每週自動推薦。
同時監控業績預告（stock_yjyg_em），有預告發布時提前通知我。
```

### 合規提醒

- 資料僅供個人學習研究，不構成投資建議
- 控制 API 呼叫頻率，避免對上游平台造成壓力
- AKShare 底層依賴公開網站資料，介面可能因上游變更而需更新，建議關注其 [GitHub Issues](https://github.com/akfamily/akshare/issues)

### 相關連結

- [AKShare 文件](https://akshare.akfamily.xyz/) — 免費開源 A 股資料介面
- [巨潮資訊](https://www.cninfo.com.cn/) — 官方資訊披露平台
- [東方財富資料中心](https://data.eastmoney.com/) — 財報日曆與資料查詢

---

