<div align="center">

<img width="1500" height="500" alt="OpenClaw AI 智能體最佳用例合集" src="https://github.com/user-attachments/assets/4ae57dfb-4f18-4677-9136-43bf93017250" />

<br/>
<br/>

<h3>OpenClaw AI 智能體最佳真實用例大全</h3>

<p>40 個經過驗證的真實場景，手把手教你用 AI 智能體自動化工作與生活</p>

<br/>

[![Awesome](https://awesome.re/badge.svg)](https://awesome.re)
![用例數量](https://img.shields.io/badge/用例-40-blue?style=flat-square)
![語言](https://img.shields.io/badge/語言-繁體中文-red?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)

</div>

---

一份面向中文使用者的 OpenClaw 真實使用案例合集，包含國際用例的中文適配，以及飛書、釘釘、企業微信、小紅書、AKShare 等國內生態的原創用例。

> 解決 OpenClaw 普及的瓶頸：不是 ~~技能~~，而是找到**能改善你生活的方式**。

<details>
<summary>來源聲明</summary>

本倉庫受 [awesome-openclaw-usecases](https://github.com/hesamsheikh/awesome-openclaw-usecases) 啟發，在其基礎上獨立發展。感謝原作者 [hesamsheikh](https://github.com/hesamsheikh) 和所有社群貢獻者。

</details>

---

## 快速開始

[OpenClaw](https://github.com/openclaw/openclaw) 是一個開源的個人 AI 智能體，能主動執行任務、永久記住你的偏好、連接多個平台、按時間表自動執行。

```
1. 安裝 OpenClaw → github.com/openclaw/openclaw
2. 從下方挑一個感興趣的用例
3. 複製用例中的提示詞，貼給你的 OpenClaw
```

> ⭐ 複製貼上即可用 · ⭐⭐ 需要簡單設定 · ⭐⭐⭐ 需要一定技術基礎

> ⚠️ 本合集引用的技能和第三方依賴**未經維護者審核**。使用前請審查原始碼、檢查權限，避免硬編碼憑證。

---

## 用例目錄

### 🇨🇳 中國特色用例

> 為國內工具生態設計或適配，使用飛書、釘釘、企業微信、小紅書等平台。

| 名稱 | 描述 | 難度 |
|------|------|:---:|
| [飛書 AI 助手](usecases/cn-feishu-ai-assistant.md) | 把 OpenClaw 部署為飛書機器人，在對話中直接觸發 AI 任務，支援文件自動化 | ⭐⭐ |
| [釘釘 AI 助手](usecases/cn-dingtalk-ai-assistant.md) | 把 OpenClaw 部署為釘釘機器人，Stream 模式無需公網 IP | ⭐⭐ |
| [企業微信 AI 助手](usecases/cn-wecom-ai-assistant.md) | 在企業微信中使用 AI，透過微信外掛讓個人微信也能用 | ⭐⭐ |
| [辦公自動化套件](usecases/cn-office-automation.md) | 郵件管理、檔案整理、會議紀要、週報生成，支援 163/QQ/Outlook | ⭐⭐ |
| [小紅書內容自動化](usecases/cn-xiaohongshu-automation.md) | 從選題、文案、封面圖到定時發布的全流程自動化 | ⭐ |
| [多智能體協作作業系統](usecases/cn-multi-agent-operating-system.md) | 把 OpenClaw 變成專業分工、協同、穩定迭代的智能體系統 | ⭐⭐⭐ |
| [早間簡報（適配）](usecases/custom-morning-brief.md) | 每日定時推送簡報到飛書/釘釘，支援中文新聞來源 | ⭐ |
| [會議紀要與待辦自動化（適配）](usecases/meeting-notes-action-items.md) | 會議轉錄自動生成紀要並建立任務（飛書妙記/騰訊會議/釘釘） | ⭐⭐ |
| [多管道 AI 客戶服務（適配）](usecases/multi-channel-customer-service.md) | 企業微信/抖音/小紅書多管道客服自動化 | ⭐⭐⭐ |
| [播客製作流水線（適配）](usecases/podcast-production-pipeline.md) | 從選題到發布的全流程播客製作自動化（小宇宙/喜馬拉雅/B站） | ⭐⭐ |
| [AI 財報追蹤器（適配）](usecases/earnings-tracker.md) | A 股財報追蹤，AKShare 免費資料來源 + 業績預告/快報自動化 | ⭐⭐ |
| [開發前創意驗證器（適配）](usecases/pre-build-idea-validator.md) | 編碼前自動掃描競品（百度指數/微信指數/V2EX/少數派） | ⭐⭐ |

### 📱 社群媒體

| 名稱 | 描述 | 難度 |
|------|------|:---:|
| [每日 Reddit 摘要](usecases/daily-reddit-digest.md) | 根據你的偏好，生成喜愛的 subreddit 精選摘要 | ⭐ |
| [每日 YouTube 摘要](usecases/daily-youtube-digest.md) | 取得關注頻道的每日新影片摘要，不錯過任何內容 | ⭐ |
| [X 帳號分析](usecases/x-account-analysis.md) | 取得你的 X（原 Twitter）帳號的定性分析 | ⭐⭐ |
| [多來源科技新聞摘要](usecases/multi-source-tech-news-digest.md) | 自動聚合 109+ 來源的科技新聞，支援品質評分和多管道分發 | ⭐⭐ |

### 🎨 創意與構建

| 名稱 | 描述 | 難度 |
|------|------|:---:|
| [目標驅動的自主任務](usecases/overnight-mini-app-builder.md) | 告訴 AI 你的目標，它自動拆解並每天執行，還能一夜造出迷你應用程式 | ⭐⭐ |
| [YouTube 內容流水線](usecases/youtube-content-pipeline.md) | 為 YouTube 頻道自動化影片創意發掘、研究和追蹤 | ⭐⭐⭐ |
| [多智能體內容工廠](usecases/content-factory.md) | 在 Discord 中執行研究、寫作、設計三個智能體組成的內容流水線 | ⭐⭐⭐ |

### ⚙️ 基礎設施與 DevOps

| 名稱 | 描述 | 難度 |
|------|------|:---:|
| [n8n 工作流程編排](usecases/n8n-workflow-orchestration.md) | 透過 webhook 將 API 呼叫委託給 n8n，智能體從不接觸憑證 | ⭐⭐⭐ |
| [Opik 可觀測性追蹤](usecases/opik-openclaw-observability.md) | 將 OpenClaw 執行鏈路接入 Opik，統一查看 LLM/工具/子智能體追蹤與成本 | ⭐⭐ |
| [自癒家庭伺服器](usecases/self-healing-home-server.md) | 執行始終在線的基礎設施智能體，自動發現並修復故障 | ⭐⭐⭐ |

### ⚡ 生產力

| 名稱 | 描述 | 難度 |
|------|------|:---:|
| [收件匣整理](usecases/inbox-declutter.md) | 自動彙總電子報並發送摘要郵件，告別郵件堆積 | ⭐ |
| [第二大腦](usecases/second-brain.md) | 隨手發訊息記住一切，在自訂儀表板中隨時搜尋 | ⭐ |
| [健康與症狀追蹤器](usecases/health-symptom-tracker.md) | 追蹤食物攝入和症狀以識別過敏誘因，帶有定期簽到提醒 | ⭐ |
| [個人 CRM](usecases/personal-crm.md) | 自動從郵件和日曆中發現並追蹤聯絡人，支援自然語言查詢 | ⭐⭐ |
| [基於電話的個人助理](usecases/phone-based-personal-assistant.md) | 透過電話或簡訊從任何手機存取你的 AI 智能體 | ⭐⭐ |
| [多管道個人助理](usecases/multi-channel-assistant.md) | 一個 AI 助理統管 Telegram、Slack、郵件和日曆 | ⭐⭐ |
| [家庭日曆與家務助理](usecases/family-calendar-household-assistant.md) | 聚合所有家庭日曆到早間簡報，監控訊息取得預約，管理庫存 | ⭐⭐ |
| [Todoist 任務管理器](usecases/todoist-task-manager.md) | 將 AI 推理和進度日誌同步到 Todoist，即時看到智能體在做什麼 | ⭐⭐ |
| [活動嘉賓確認](usecases/event-guest-confirmation.md) | 自動逐一致電嘉賓確認出席、收集備注並編譯摘要 | ⭐⭐ |
| [專案狀態管理](usecases/project-state-management.md) | 事件驅動的專案追蹤，自動擷取上下文，取代靜態看板 | ⭐⭐⭐ |
| [動態儀表板](usecases/dynamic-dashboard.md) | 即時儀表板，子智能體並行從 API、資料庫和社群媒體取得資料 | ⭐⭐⭐ |
| [自主專案管理](usecases/autonomous-project-management.md) | 使用 STATE.yaml 模式協調多智能體專案，無需人工編排 | ⭐⭐⭐ |
| [多智能體專業團隊](usecases/multi-agent-team.md) | 4 個專業 AI 智能體（戰略＋開發＋行銷＋商務）作為你的虛擬團隊 | ⭐⭐⭐ |

### 🔬 研究與學習

| 名稱 | 描述 | 難度 |
|------|------|:---:|
| [個人知識庫（RAG）](usecases/knowledge-base-rag.md) | 把 URL、推文和文章拖入聊天，構建可語義搜尋的知識庫 | ⭐⭐ |
| [語義記憶搜尋](usecases/semantic-memory-search.md) | 為 OpenClaw 記憶檔案添加向量驅動的語義搜尋 | ⭐⭐ |
| [市場研究與產品工廠](usecases/market-research-product-factory.md) | 從 Reddit 和 X 挖掘真實痛點，讓 AI 構建解決方案 MVP | ⭐⭐⭐ |

### 📈 金融與交易

| 名稱 | 描述 | 難度 |
|------|------|:---:|
| [Polymarket 自動駕駛](usecases/polymarket-autopilot.md) | 自動化預測市場模擬交易，帶回測、策略分析和每日績效報告 | ⭐⭐⭐ |

---

## 本地開發（網站）

本倉庫同時包含一個 [Astro](https://astro.build) 靜態網站，可在本地預覽所有用例。

```bash
npm install
npm run dev      # 開發模式，http://localhost:4321
npm run build    # 產生靜態檔案到 dist/
npm run preview  # 預覽建置結果
```

**部署**：連接 GitHub 倉庫至 Cloudflare Pages 或 Vercel，Build command 設為 `npm run build`，Output directory 設為 `dist`。

---

## 貢獻

歡迎提交經過驗證的真實用例，詳見 [CONTRIBUTING.md](CONTRIBUTING.md)。

**收錄標準**：真實跑通 + 多源驗證 + 讀者照做能複現。不接受未測試的用例和加密貨幣相關內容。

---

## 相關資源

- [OpenClaw 官方倉庫](https://github.com/openclaw/openclaw) — 安裝和官方文件
- [ClawHub 技能市場](https://clawhub.ai) — 瀏覽和安裝技能
- [官方中文教學](https://docs.openclaw.ai/zh-CN)

---

<div align="center">

**覺得有用？請給個 ⭐ Star，讓更多中文使用者發現這個合集！**

</div>
