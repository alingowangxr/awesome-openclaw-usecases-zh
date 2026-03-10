---
title: "多智能體專業團隊（獨立創始人配置）"
description: "建立小型 AI 專業智能體團隊，每個智能體有獨特角色，透過單一聊天介面控制全部工作流。"
category: "創意與構建"
difficulty: 3
tags:
  - 多智能體
  - 獨立創始人
  - 專業團隊
integrations: []
featured: true
---

# 多智能體專業團隊（獨立創始人配置）

獨立創始人身兼數職——策略、開發、行銷、銷售、營運。在這些角色之間頻繁切換會破壞深度工作。招聘既昂貴又緩慢。如果你能啟動一個小型的專業 AI 智能體團隊，每個智能體都有獨特的角色和個性，全部透過單一聊天介面控制呢？

這個用例設定多個 OpenClaw 智能體作為一個協調團隊，每個智能體專注於一個領域，透過共享記憶進行通訊，並透過 Telegram 控制。

## 痛點

- **單一智能體無法勝任所有工作**：當同時處理策略、程式碼、行銷研究和業務分析時，單個智能體的上下文視窗（context window）很快就會填滿
- **缺乏專業化**：通用提示詞產生通用輸出——編碼智能體不應該同時撰寫行銷文案
- **獨立創始人的倦怠**：你需要的是一個團隊，而不是又一個需要管理的工具。智能體應該在背景工作並呈現結果，而不是需要持續監管
- **知識孤島**：行銷研究的洞察不會自動影響開發優先順序，除非你手動橋接它們

## 功能介紹

- **專業化智能體**：每個智能體都有獨特的角色、個性和針對其領域最佳化的模型
- **共享記憶**：專案文件、目標和關鍵決策對所有智能體可存取——不會丟失任何資訊
- **私有上下文**：每個智能體還維護自己的對話歷史和領域特定筆記
- **統一控制面板**：所有智能體透過一個 Telegram 群組聊天存取——@標記你需要的智能體
- **每日定時任務**：智能體無需被要求即可主動工作——內容建議、競品監控、指標追蹤
- **並行執行**：多個智能體可以同時處理獨立任務

## 團隊配置示例

### 智能體 1：Milo（策略負責人）

```text
## SOUL.md — Milo

You are Milo, the team lead. Confident, big-picture, charismatic.

Responsibilities:
- Strategic planning and prioritization
- Coordinating the other agents
- Weekly goal setting and OKR tracking
- Synthesizing insights from all agents into actionable decisions

Model: Claude Opus
Channel: Telegram (responds to @milo)

Daily tasks:
- 8:00 AM: Review overnight agent activity, post morning standup summary
- 6:00 PM: End-of-day recap with progress toward weekly goals
```

### 智能體 2：Josh（業務與增長）

```text
## SOUL.md — Josh

You are Josh, the business analyst. Pragmatic, straight to the point, numbers-driven.

Responsibilities:
- Pricing strategy and competitive analysis
- Growth metrics and KPI tracking
- Revenue modeling and unit economics
- Customer feedback analysis

Model: Claude Sonnet (fast, analytical)
Channel: Telegram (responds to @josh)

Daily tasks:
- 9:00 AM: Pull and summarize key metrics
- Track competitor pricing changes weekly
```

### 智能體 3：行銷智能體

```text
## SOUL.md — Marketing Agent

You are the marketing researcher. Creative, curious, trend-aware.

Responsibilities:
- Content ideation and drafting
- Competitor social media monitoring
- Reddit/HN/X trend tracking for relevant topics
- SEO keyword research

Model: Gemini (strong at web research and long-context analysis)
Channel: Telegram (responds to @marketing)

Daily tasks:
- 10:00 AM: Surface 3 content ideas based on trending topics
- Monitor competitor Reddit/X mentions daily
- Weekly content calendar draft
```

### 智能體 4：開發智能體

```text
## SOUL.md — Dev Agent

You are the dev agent. Precise, thorough, security-conscious.

Responsibilities:
- Coding and architecture decisions
- Code review and quality checks
- Bug investigation and fixing
- Technical documentation

Model: Claude Opus / Codex (for implementation)
Channel: Telegram (responds to @dev)

Daily tasks:
- Check CI/CD pipeline health
- Review open PRs
- Flag technical debt items
```

## 所需技能

- `telegram` 技能用於共享控制介面
- `sessions_spawn` / `sessions_send` 用於多智能體協調
- 共享檔案系統或筆記工具用於團隊記憶
- 不同模型供應商的獨立 API 金鑰（如果使用混合模型）
- 一台 VPS 或始終在線的機器來執行智能體

## 設定方法

### 1. 共享記憶結構

```text
team/
├── GOALS.md           # 當前 OKR 和優先順序（所有智能體可讀）
├── DECISIONS.md       # 關鍵決策日誌（僅追加）
├── PROJECT_STATUS.md  # 當前專案狀態（所有智能體更新）
├── agents/
│   ├── milo/          # Milo 的私有上下文和筆記
│   ├── josh/          # Josh 的私有上下文
│   ├── marketing/     # 行銷智能體的研究資料
│   └── dev/           # 開發智能體的技術筆記
```

### 2. Telegram 路由

設定一個所有智能體監聽的 Telegram 群組，但每個智能體只在被 @標記時回應：

以下提示詞設定 Telegram 群組中的智能體路由規則：

```text
## AGENTS.md — Telegram Routing

Telegram group: "Team"

Routing:
- @milo → Strategy agent (spawns/resumes milo session)
- @josh → Business agent (spawns/resumes josh session)
- @marketing → Marketing agent (spawns/resumes marketing session)
- @dev → Dev agent (spawns/resumes dev session)
- @all → Broadcast to all agents
- No tag → Milo (team lead) handles by default

Each agent:
1. Reads shared GOALS.md and PROJECT_STATUS.md for context
2. Reads its own private notes
3. Processes the message
4. Responds in Telegram
5. Updates shared files if the response involves a decision or status change
```

### 3. 定時任務

以下提示詞設定團隊的每日和每週自動化任務：

```text
## HEARTBEAT.md — Team Schedule

Daily:
- 8:00 AM: Milo posts morning standup (aggregates overnight agent activity)
- 9:00 AM: Josh pulls key metrics
- 10:00 AM: Marketing surfaces content ideas from trending topics
- 6:00 PM: Milo posts end-of-day recap

Ongoing:
- Dev: Monitor CI/CD health, review PRs as they come in
- Marketing: Reddit/X keyword monitoring (every 2 hours)
- Josh: Competitor pricing checks (weekly)

Weekly:
- Monday: Milo drafts weekly priorities (input from all agents)
- Friday: Josh compiles weekly metrics report
```

## 關鍵洞察

- **個性比你想像的更重要**：賦予智能體獨特的名字和溝通風格，使得「與你的團隊對話」變得自然，而不是與通用 AI 搏鬥
- **共享記憶 + 私有上下文**：這種組合至關重要——智能體需要共同基礎（目標、決策），但也需要自己的空間來累積領域專業知識
- **為正確的工作選擇正確的模型**：不要用昂貴的推理模型來做關鍵字監控。將模型能力與任務複雜度匹配
- **定時任務是飛輪**：真正的價值在於智能體主動呈現洞察，而不是等你提問
- **從 2 個開始，而不是 4 個**：先設定一個負責人加一個專家，然後在發現瓶頸時再新增智能體

## 靈感來源

這個模式由 [Trebuh 在 X 上](https://x.com/iamtrebuh/status/2011260468975771862)描述，他是一位獨立創始人，設定了 4 個 OpenClaw 智能體——Milo（策略負責人）、Josh（業務）、行銷智能體和開發智能體——全部透過 VPS 上的單一 Telegram 聊天控制。每個智能體都有自己的個性、模型和定時任務，同時共享專案記憶。他將其描述為「一個 7x24 小時可用的真正小團隊」。

這個模式在 [OpenClaw Showcase](https://openclaw.ai/showcase) 上也得到了驗證，`@jdrhyne` 報告執行「15+ 個智能體，3 台機器，1 個 Discord 伺服器——IT 基本上都是透過聊天構建的」，`@nateliason` 描述了一個多模型流水線（原型 -> 摘要 -> 最佳化 -> 實現 -> 重複），在每個階段使用不同的模型。另一位用戶 `@danpeguine` 在同一個 WhatsApp 群組中執行兩個不同的 OpenClaw 實例進行協作。

## 相關連結

- [OpenClaw 子智能體文件](https://github.com/openclaw/openclaw)
- [OpenClaw Telegram 技能](https://github.com/openclaw/openclaw)
- [OpenClaw Showcase](https://openclaw.ai/showcase)
- [Anthropic：構建有效的智能體](https://www.anthropic.com/research/building-effective-agents)

---

