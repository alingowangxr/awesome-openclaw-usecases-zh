---
title: "多智能體協作作業系統（OpenCrew）"
description: "把 OpenClaw 從單一智能體升級為多智能體團隊，透過 Slack/Discord/飛書進行多執行緒管理。"
category: "中國特色"
difficulty: 3
tags:
  - 多智能體
  - OpenCrew
  - 團隊協作
integrations:
  - Slack
  - Discord
  - 飛書
featured: false
---

# 多智能體協作作業系統（OpenCrew）

OpenClaw 用久了會遇到一組共性問題：單個智能體處理多個領域導致上下文膨脹、多專案並行時缺乏統一管理介面、智能體自行修改設定導致崩潰、以及對話中積累的經驗和知識隨著聊天記錄消失。

OpenCrew 把 OpenClaw 從「一個什麼都做的智能體」變成「一支各司其職的 AI 團隊」，透過 Slack、Discord、飛書進行多執行緒管理和排程（中國大陸使用者需要科學上網存取 Slack、Discord）。

## 它能做什麼

- **多智能體分工**：每個智能體有明確職責——戰略參謀（CoS）、技術負責人（CTO）、執行者（Builder）等
- **Slack 即管理介面**：每個頻道對應一個智能體的「工位」，每個 Thread 是一個獨立任務。你的未讀訊息就是待辦佇列
- **意圖對齊**：戰略參謀在執行前確認你的真實意圖，防止智能體「高效地解決錯誤的問題」
- **主動推進**：智能體在你不在線時可以按照授權級別自主推進任務
- **知識沉澱**：每個任務完成後結構化提取可複用的經驗，不再隨聊天記錄消失
- **變更稽核**：Ops 智能體審核所有自我修改，防止設定漂移和崩潰

## 核心架構

```
你（決策者）
 └── 戰略參謀 CoS（意圖對齊、非同步推進）
      ├── CTO（技術架構決策）
      ├── Builder（執行與交付）
      ├── CIO（領域專家，可替換）
      └── Ops（變更稽核、防漂移）
           └── Knowledge Officer（知識提取與沉澱）
```

最小可用設定只需 3 個智能體：CoS + CTO + Builder。

## 關鍵機制

### 自主決策分級

決策按**可逆性**而非複雜度分級，決定智能體何時可以自行行動、何時需要請示：

| 級別 | 含義 | 行為 |
|:----:|------|------|
| L0 | 僅建議 | 只提供建議，不執行 |
| L1 | 可逆操作 | 自主執行，出錯可回滾 |
| L2 | 有影響但可恢復 | 執行後提交工作報告 |
| L3 | 不可逆操作 | 必須等你核准 |

### 知識三層壓縮

| 層級 | 內容 | 壓縮比 |
|:----:|------|:------:|
| L0 | 原始對話記錄 | 1x |
| L1 | 結構化工作報告（10-15 行） | 25x |
| L2 | 抽象複用知識 | 100x+ |

### 智能體間通訊（A2A 協議）

智能體之間的協作有嚴格的安全控制：
- 只有 CoS/CTO/Ops 有權發起跨智能體通訊
- 每次互動限制 4-5 輪，防止死循環
- 所有通訊在 Slack 中可見，保證透明

## 所需技能

- OpenClaw 2026.2+ 版本
- Slack 工作區（免費版即可，中國大陸需 VPN 存取）
- [OpenCrew 框架](https://github.com/AlexAnys/opencrew)

## 如何設定

完整部署指南請參考 [OpenCrew 文件](https://github.com/AlexAnys/opencrew)，核心步驟：

1. **建立 Slack App**（Socket Mode，無需公網）：
   - 取得 App Token（`xapp-...`）和 Bot Token（`xoxb-...`）
   - 設定事件訂閱和權限

2. **建立 Slack 頻道**：
   - 最少 3 個：`#hq`（CoS）、`#cto`（CTO）、`#build`（Builder）
   - 可選：`#know`（知識）、`#ops`（稽核）

3. **部署智能體設定**：
   - 每個智能體有標準化的設定檔（角色定義、工作流程、使用者偏好、記憶等）
   - 共享協議透過 symlink 確保所有智能體遵循統一規範

4. **驗證執行**：發送訊息到 `#hq`，確認 CoS 正常回應

## 適用場景

- **多專案並行**：同時推進產品開發、市場調研、內容運營，每個專案在獨立 Thread 中
- **團隊協作增強**：一個人 + AI 團隊 = 一個人完成小團隊的工作量
- **長期專案管理**：經驗不隨對話消失，知識持續積累
- **設定穩定性**：不再擔心智能體自行修改設定導致崩潰

## 相關連結

- [OpenCrew - GitHub](https://github.com/AlexAnys/opencrew)
- [OpenCrew 部署指南](https://github.com/AlexAnys/opencrew/blob/main/DEPLOY.md)
- [OpenCrew 核心概念文件](https://github.com/AlexAnys/opencrew/blob/main/docs/CONCEPTS.md)

## 中國使用者注意事項

- **網路要求**：Slack 在中國大陸無法直接存取，需要使用 VPN。部署到雲端伺服器時需確保伺服器能存取 Slack API
- **替代方案探索**：如果團隊主要使用飛書，可關注 OpenCrew 對飛書的支援進展。飛書整合方案參考 [openclaw-feishu 設定指南](https://github.com/AlexAnys/openclaw-feishu)
- **最小設定**：初次嘗試建議從 3 個智能體（CoS + CTO + Builder）開始，跑通後再擴展
