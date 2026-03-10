---
title: "OpenClaw + n8n 工作流編排"
description: "透過 n8n 安全管理 API 金鑰和外部服務呼叫，讓 AI 智能體不直接接觸敏感憑證。"
category: "基礎設施與DevOps"
difficulty: 3
tags:
  - n8n
  - 工作流
  - 安全
integrations:
  - n8n
featured: false
---

# OpenClaw + n8n 工作流編排

讓你的 AI 智能體（agent）直接管理 API 金鑰和呼叫外部服務，是安全事故的溫床。每增加一個新整合，就意味著 `.env.local` 中多一個憑證，多一個智能體可能意外洩露或誤用的攻擊面。

這個用例描述了一種模式：OpenClaw 透過 webhook（網路鉤子）將所有外部 API 互動委託給 n8n 工作流——智能體永遠不接觸憑證，每個整合都可以視覺化檢查和鎖定。

## 痛點

當 OpenClaw 直接處理所有事情時，你會面臨三個疊加的問題：

- **缺乏可見性**：當邏輯埋在 JavaScript 技能檔案或 shell 腳本中時，很難檢查智能體實際構建了什麼
- **憑證蔓延**：每個 API 金鑰都存在於智能體的環境中，一次錯誤的提交就可能暴露
- **浪費令牌（token）**：確定性子任務（發送郵件、更新試算表）本可以作為簡單工作流執行，卻在消耗 LLM 推理令牌

## 功能概述

- **代理模式**：OpenClaw 編寫帶有傳入 webhook 的 n8n 工作流，然後透過呼叫這些 webhook 進行所有後續的 API 互動
- **憑證隔離**：API 金鑰儲存在 n8n 的憑證倉庫中——智能體只知道 webhook URL
- **視覺化除錯**：每個工作流都可以在 n8n 的拖放式 UI 中檢查
- **可鎖定工作流**：工作流構建和測試完成後，你可以鎖定它，防止智能體修改其與 API 的互動方式
- **安全防護步驟**：你可以在 n8n 中新增驗證、速率限制和審批門控，在任何外部呼叫執行前進行攔截

## 工作原理

1. **智能體設計工作流**：告訴 OpenClaw 你需要什麼（例如，「建立一個工作流，當新的 GitHub issue 被標記為 `urgent` 時發送 Slack 訊息」）
2. **智能體在 n8n 中構建**：OpenClaw 透過 n8n 的 API 建立工作流，包括傳入 webhook 觸發器
3. **你新增憑證**：開啟 n8n 的 UI，手動新增你的 Slack token / GitHub token
4. **你鎖定工作流**：防止智能體進一步修改
5. **智能體呼叫 webhook**：從此以後，OpenClaw 使用 JSON 載荷呼叫 `http://n8n:5678/webhook/my-workflow`——它永遠看不到 API 金鑰

```text
┌──────────────┐     webhook 呼叫      ┌─────────────────┐     API 呼叫    ┌──────────────┐
│   OpenClaw   │ ───────────────────→  │   n8n 工作流     │ ─────────────→  │   外部服務    │
│  （智能體）   │   （無憑證）           │ （已鎖定，含     │  （憑證留在     │ （Slack 等）  │
│              │                       │   API 金鑰）     │   此處）        │              │
└──────────────┘                       └─────────────────┘                  └──────────────┘
```

## 所需技能

- `n8n` API 存取（用於建立/觸發工作流）
- `fetch` 或 `curl`，用於 webhook 呼叫
- Docker（如果使用預設定的技術堆疊）
- n8n 憑證管理（手動操作，每個整合只需設定一次）

## 如何設定

### 方案一：預設定的 Docker 技術堆疊

一個社群維護的 Docker Compose 設定（[openclaw-n8n-stack](https://github.com/caprihan/openclaw-n8n-stack)）在共享 Docker 網路上預先連線了所有元件：

```bash
git clone https://github.com/caprihan/openclaw-n8n-stack.git
cd openclaw-n8n-stack
cp .env.template .env
# 將你的 Anthropic API 金鑰新增到 .env
docker-compose up -d
```

這將為你提供：
- OpenClaw 執行在連接埠 3456
- n8n 執行在連接埠 5678
- 共享 Docker 網路，使 OpenClaw 可以直接呼叫 `http://n8n:5678/webhook/...`
- 預構建的工作流範本（多 LLM 事實核查、郵件分類、社群監控）

### 方案二：手動設定

1. 安裝 n8n（`npm install n8n -g` 或透過 Docker 執行）
2. 設定 OpenClaw 使其知道 n8n 的基礎 URL
3. 將以下內容新增到你的 AGENTS.md：

```text
## n8n Integration Pattern

When I need to interact with external APIs:

1. NEVER store API keys in my environment or skill files
2. Check if an n8n workflow already exists for this integration
3. If not, create one via n8n API with a webhook trigger
4. Notify the user to add credentials and lock the workflow
5. For all future calls, use the webhook URL with a JSON payload

Workflow naming: openclaw-{service}-{action}
Example: openclaw-slack-send-message

Webhook call format:
curl -X POST http://n8n:5678/webhook/{workflow-name} \
  -H "Content-Type: application/json" \
  -d '{"channel": "#general", "message": "Hello from OpenClaw"}'
```

## 關鍵洞察

- **一舉三得**：可觀測性（視覺化 UI）、安全性（憑證隔離）和效能（確定性工作流不消耗令牌）
- **測試後鎖定**：「構建 → 測試 → 鎖定」的循環至關重要——不鎖定的話，智能體可以悄悄修改工作流
- **n8n 擁有 400+ 整合**：你想連線的大多數外部服務已經有 n8n 節點，省去了智能體編寫自訂 API 呼叫的工作
- **免費的稽核追蹤**：n8n 記錄每次工作流執行的輸入/輸出資料

## 靈感來源

這個模式由 [Simon Hoiberg](https://x.com/SimonHoiberg/status/2020843874382487959) 描述，他闡述了這種方法優於讓 OpenClaw 直接處理 API 互動的三個原因：透過 n8n 視覺化 UI 實現可觀測性、透過憑證隔離實現安全性、以及透過將確定性子任務作為工作流而非 LLM 呼叫來執行以提升效能。[openclaw-n8n-stack](https://github.com/caprihan/openclaw-n8n-stack) 倉庫提供了一個即用型的 Docker Compose 設定來實現此模式。

## 相關連結

- [n8n 文件](https://docs.n8n.io/)
- [openclaw-n8n-stack（Docker 設定）](https://github.com/caprihan/openclaw-n8n-stack)
- [n8n Webhook 觸發器文件](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.webhook/)

---

