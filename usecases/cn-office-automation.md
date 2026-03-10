---
title: "辦公自動化套件"
description: "把日常辦公中最常見的重複性工作（郵件、週報、會議紀要）交給 OpenClaw 自動處理。"
category: "中國特色"
difficulty: 2
tags:
  - 辦公自動化
  - 郵件
  - 週報
integrations: []
featured: false
---

# 辦公自動化套件

知識工作者每天花 2-3 小時在重複性辦公任務上：篩選郵件、整理檔案、寫會議紀要、編週報。每項單獨不難，但加起來消耗大量時間和精力。

這個用例把日常辦公中最常見的重複性工作交給 OpenClaw，讓它按照你的偏好自動處理。

## 它能做什麼

| 場景 | 效果 |
|------|------|
| **郵件管理** | 定時檢查收件匣，自動分類、摘要重要郵件、按規則回覆 |
| **檔案整理** | 按類型/日期/專案自動分類下載資料夾中的檔案 |
| **會議紀要** | 會議結束後自動生成結構化紀要，推送到群聊 |
| **週報生成** | 彙總本週工作郵件和任務進展，生成格式化週報 |
| **日程同步** | 從微信截圖中擷取約會資訊，自動建立日曆事件 |

## 所需技能

根據你的郵箱選擇：

- 國內郵箱（163/QQ）：[imap-smtp-email](https://playbooks.com/skills/openclaw/skills/imap-smtp-email) —— 支援標準 IMAP/SMTP 協議，相容 163、QQ 郵箱等國內服務
- Gmail：[gog](https://docs.openclaw.ai/tools/skills) —— OpenClaw 官方維護的 Google Workspace 技能（需安裝和設定 OAuth）
- Outlook/Microsoft 365：[outlook](https://playbooks.com/skills/openclaw/skills/outlook) —— 完整的 Outlook 郵件和日曆管理（安裝：`npx playbooks add skill openclaw/skills --skill outlook`）

## 如何設定

### 郵件自動化（以 163 郵箱為例）

1. 安裝郵件技能：
```bash
npx playbooks add skill openclaw/skills --skill imap-smtp-email
```

2. 設定 163 郵箱的 IMAP/SMTP（需要在郵箱設定中開啟 IMAP 並取得授權碼）

> **安全提示**：郵箱授權碼屬於敏感憑證，請透過技能的 `.env` 檔案設定，不要在對話中直接貼上。確保 `.env` 已加入 `.gitignore`。

3. 設定定時任務：
```text
每天早上 9 點檢查我的郵箱，把過去 24 小時的重要郵件摘要發給我。
篩選規則：忽略廣告和訂閱郵件，重點關注來自團隊成員和客戶的郵件。
把摘要儲存到記憶中，方便我隨時查看。
```

### 檔案整理（提示詞參考）

OpenClaw 內建檔案系統工具可操作本地檔案，執行前會請求確認。首次使用建議在測試資料夾中試執行：
```text
幫我把下載資料夾裡的檔案按類型分類：
- PDF 放到「文件」資料夾
- 圖片放到「圖片」資料夾
- 表格放到「資料」資料夾
超過 30 天未修改的檔案移到「歸檔」資料夾。
```

### 週報生成（提示詞參考）

```text
彙總我本週收發的工作郵件，提取關鍵專案進展和待辦事項，生成一份週報。
格式：按專案分類，每個專案列出本週進展和下週計畫。
```

## 實用建議

- **漸進式自動化**：先從一個場景開始（比如郵件摘要），跑通後再擴展到其他場景
- **設定偏好記憶**：讓 OpenClaw 記住你的郵件分類偏好、週報格式、檔案整理規則，隨著使用逐漸優化
- **定時任務組合**：多個任務可以串聯——早上 9 點郵件摘要 → 下午 5 點整理當天檔案 → 週五 4 點生成週報

## 相關連結

- [imap-smtp-email 技能 - ClawHub](https://playbooks.com/skills/openclaw/skills/imap-smtp-email)
- [outlook 技能 - ClawHub](https://playbooks.com/skills/openclaw/skills/outlook)
- [CSDN - OpenClaw 辦公自動化實戰](https://blog.csdn.net/weixin_41194129/article/details/157644237)
