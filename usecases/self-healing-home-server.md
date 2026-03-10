---
title: "自愈式家庭伺服器與基礎設施管理"
description: "讓 AI 智能體 7x24 小時監控和自動修復家庭伺服器問題，包括憑證過期、磁碟空間和服務崩潰。"
category: "基礎設施與DevOps"
difficulty: 3
tags:
  - 家庭伺服器
  - 自動修復
  - 監控
integrations:
  - Docker
  - Kubernetes
featured: true
---

# 自愈式家庭伺服器與基礎設施管理

執行家庭伺服器意味著 7x24 小時隨時待命處理自己的基礎設施問題。服務在凌晨 3 點宕機、憑證默默過期、磁碟空間耗盡、Pod 進入崩潰循環（crash-loop）——而這些都發生在你睡覺或外出的時候。

這個用例將 OpenClaw 變成一個持久執行的基礎設施智能體（agent），擁有 SSH 存取權限、自動化定時任務（cron job），以及在你發現問題之前就偵測、診斷和修復問題的能力。

## 痛點

家庭實驗室運維者和自託管用戶面臨持續的維護負擔：

- 健康檢查、日誌監控和告警需要手動設定和持續關注
- 當出現故障時，你必須 SSH 登入、診斷並修復——通常還是在手機上操作
- 基礎設施即程式碼（Infrastructure-as-Code）工具（Terraform、Ansible、Kubernetes 清單）需要定期更新
- 關於你的設定的知識儲存在你的腦子裡，而不是可搜尋的文件中
- 日常任務（郵件分類、部署檢查、安全審計）每週要消耗數小時

## 功能概述

- **自動化健康監控**：基於定時任務檢查服務、部署和系統資源
- **自我修復**：透過健康檢查偵測問題，並自主套用修復（重啟 Pod、擴展資源、修復設定）
- **基礎設施管理**：編寫並套用 Terraform、Ansible 和 Kubernetes 清單
- **晨間簡報**：每日系統健康狀況、日曆、天氣和任務板狀態摘要
- **郵件分類**：掃描收件匣，標記可操作項目，歸檔雜訊
- **知識提取**：將筆記和對話匯出處理為結構化、可搜尋的知識庫
- **部落格發布管線**：草稿 → 生成橫幅圖 → 發布到 CMS → 部署到託管平台——全自動化
- **安全審計**：定期掃描硬編碼金鑰、特權容器和過度寬鬆的存取權限

## 所需技能

- `ssh` 存取家庭網路機器
- `kubectl`，用於 Kubernetes 叢集管理
- `terraform` 和 `ansible`，用於基礎設施即程式碼
- `1password` CLI，用於金鑰管理
- `gog` CLI，用於郵件存取
- 日曆 API 存取
- Obsidian vault 或筆記目錄（用於知識庫）
- `openclaw doctor`，用於自我診斷

## 如何設定

### 1. 核心智能體設定

為你的智能體命名並在 AGENTS.md 中定義其存取範圍：

```text
## Infrastructure Agent

You are Reef, an infrastructure management agent.

Access:
- SSH to all machines on the home network (192.168.1.0/24)
- kubectl for the K3s cluster
- 1Password vault (read-only for credentials, dedicated AI vault)
- Gmail via gog CLI
- Calendar (yours + partner's)
- Obsidian vault at ~/Documents/Obsidian/

Rules:
- NEVER hardcode secrets — always use 1Password CLI or environment variables
- NEVER push directly to main — always create a PR
- Run `openclaw doctor` as part of self-health checks
- Log all infrastructure changes to ~/logs/infra-changes.md
```

### 2. 自動化定時任務系統

此設定的核心在於排程任務系統。在 HEARTBEAT.md 中設定：

```text
## Cron Schedule

Every 15 minutes:
- Check kanban board for in-progress tasks → continue work

Every hour:
- Monitor health checks (Gatus, ArgoCD, service endpoints)
- Triage Gmail (label actionable items, archive noise)
- Check for unanswered alerts or notifications

Every 6 hours:
- Knowledge base data entry (process new Obsidian notes)
- Self health check (openclaw doctor, disk usage, memory, logs)

Every 12 hours:
- Code quality and documentation audit
- Log analysis via Loki/monitoring stack

Daily:
- 4:00 AM: Nightly brainstorm (explore connections between notes)
- 8:00 AM: Morning briefing (weather, calendars, system stats, task board)
- 1:00 AM: Velocity assessment (process improvements)

Weekly:
- Knowledge base QA review
- Infrastructure security audit
```

### 3. 安全設定（關鍵）

這是不可妥協的。在給你的智能體 SSH 存取權限之前：

```text
## Security Checklist

1. Pre-push hooks:
   - Install TruffleHog or similar secret scanner on ALL repositories
   - Block any commit containing hardcoded API keys, tokens, or passwords

2. Local-first Git workflow:
   - Use Gitea (self-hosted) for private code before pushing to public GitHub
   - CI scanning pipeline (Woodpecker or similar) runs before any public push
   - Human review required before main branch merges

3. Defense in depth:
   - Dedicated 1Password vault for AI agent (limited scope)
   - Network segmentation for sensitive services
   - Daily automated security audits checking for:
     * Privileged containers
     * Hardcoded secrets in code or configs
     * Overly permissive file/network access
     * Known vulnerabilities in deployed images

4. Agent constraints:
   - Branch protection: PR required for main, agent cannot override
   - Read-only access where write isn't needed
   - All changes logged and auditable via git
```

### 4. 晨間簡報模板

```text
## Daily Briefing Format

Generate and deliver at 8:00 AM:

### Weather
- Current conditions and forecast for [your location]

### Calendars
- Your events today
- Partner's events today
- Conflicts or overlaps flagged

### System Health
- CPU / RAM / Storage across all machines
- Services: UP/DOWN status
- Recent deployments (ArgoCD)
- Any alerts in last 24h

### Task Board
- Cards completed yesterday
- Cards in progress
- Blocked items needing attention

### Highlights
- Notable items from nightly brainstorm
- Emails requiring action
- Upcoming deadlines this week
```

## 關鍵洞察

- **「沒想到我竟然有了一台自愈式伺服器」**：智能體可以執行 SSH、Terraform、Ansible 和 kubectl 指令，在你甚至還不知道有問題的時候就修復基礎設施故障
- **AI 會硬編碼金鑰**：這是頭號安全風險。如果你不設定防護措施，智能體會毫不猶豫地將 API 金鑰內嵌寫入程式碼。Pre-push 鉤子和金鑰掃描是必須的
- **本地優先的 Git 流程至關重要**：永遠不要讓智能體直接推送到公開倉庫。使用私有 Gitea 執行個體作為暫存區，並搭配 CI 掃描
- **定時任務才是真正的產品**：排程自動化（健康檢查、郵件分類、簡報）比臨時指令提供更多的日常價值
- **知識提取具有複利效應**：將筆記、對話匯出和郵件處理為結構化知識庫，隨著時間推移會越來越有價值——一位用戶僅從 ChatGPT 歷史記錄中就提取了 49,079 個原子事實

## 靈感來源

這個用例基於 Nathan 的詳細文章 ["Everything I've Done with OpenClaw (So Far)"](https://madebynathan.com/2026/02/03/everything-ive-done-with-openclaw-so-far/)，他在文中描述了自己的 OpenClaw 智能體「Reef」執行在家庭伺服器上，擁有所有機器的 SSH 存取權限、一個 Kubernetes 叢集、1Password 整合，以及一個包含 5,000+ 筆記的 Obsidian vault。Reef 執行著 15 個活躍的定時任務、24 個自訂腳本，並自主建構和部署了多個應用程式，包括一個任務管理 UI。Nathan 在第一天就遭遇 API 金鑰洩露後得到的慘痛教訓：「AI 助手會毫不猶豫地硬編碼金鑰。它們有時候沒有人類那樣的安全直覺。」他的縱深防禦安全設定（TruffleHog pre-push 鉤子、本地 Gitea、CI 掃描、每日審計）對於任何嘗試此模式的人來說都是必讀內容。

同樣在 [OpenClaw Showcase](https://openclaw.ai/showcase) 上，`@georgedagg_` 描述了類似的模式：部署監控、日誌審查、設定修復和提交 PR——所有這些都是在遛狗的時候完成的。

## 相關連結

- [Nathan 的完整文章](https://madebynathan.com/2026/02/03/everything-ive-done-with-openclaw-so-far/)
- [OpenClaw 文件](https://github.com/openclaw/openclaw)
- [TruffleHog（金鑰掃描）](https://github.com/trufflesecurity/trufflehog)
- [K3s（輕量級 Kubernetes）](https://k3s.io/)
- [Gitea（自託管 Git）](https://gitea.io/)
- [n8n（工作流自動化）](https://n8n.io/)

---

