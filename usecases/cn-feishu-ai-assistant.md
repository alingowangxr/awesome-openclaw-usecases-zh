---
title: "飛書 AI 助手"
description: "把 OpenClaw 直接部署為飛書機器人，在飛書對話中發訊息就能觸發 AI 任務，無需切換工具。"
category: "中國特色"
difficulty: 2
tags:
  - 飛書
  - 機器人
  - 企業協作
integrations:
  - openclaw-channel-feishu
featured: true
---

# 飛書 AI 助手

飛書是很多團隊的主要溝通工具，但 AI 能力和日常工作流程之間是割裂的——你需要切出飛書去用 AI，用完再切回來貼上結果。

這個用例把 OpenClaw 直接部署為飛書機器人。在飛書對話中發訊息就能觸發 AI 任務，結果直接回覆到對話裡，不需要切換任何工具。

> **2026.3 更新**：飛書官方推出了 OpenClaw 飛書外掛，支援以使用者身份操作文件、日曆、任務等。目前飛書接入 OpenClaw 有兩種主流方式可選，詳見下方[選擇建議](#選擇建議兩種外掛怎麼選)。

## 它能做什麼

- **對話式 AI 助手**：在飛書私聊或群聊中直接與 OpenClaw 對話
- **任務自動化**：透過聊天訊息觸發檔案處理、資訊查詢、定時提醒
- **富媒體支援**：支援圖片、檔案的收發和處理
- **串流輸出**：AI 回覆即時逐字顯示，不用等整段生成完
- **群聊管理**：可設定 @提及觸發、白名單/黑名單等策略
- **多智能體路由**：一個飛書機器人可以根據使用者/群組路由到不同的 AI 智能體

## 所需技能

基礎訊息功能無需額外安裝——OpenClaw 2026.2+ 已內建飛書頻道外掛。如果需要 AI 操作飛書文件、日曆、任務等，可改用飛書官方外掛（兩者二選一，不能同時啟用，見下方選擇建議）。

## 選擇建議：兩種外掛怎麼選

| 維度 | 飛書官方外掛 | OpenClaw 內建外掛 |
|---|---|---|
| **操作身份** | 以**你本人**身份（OAuth 授權） | 以**機器人**身份 |
| **訊息收發** | ✅ | ✅ |
| **文件操作** | ✅ 建立 + 編輯 + 讀取 | 讀取為主 |
| **多維表格** | ✅ 完整操作 | 基礎讀寫 |
| **日曆 / 任務** | ✅ | ❌ |
| **安裝複雜度** | 需額外安裝 CLI 工具 + OAuth | 內建即用，`openclaw channels add` |
| **維護方** | 飛書團隊 | OpenClaw 社群 |

**簡單說**：主要用飛書做聊天入口 → 選內建外掛（簡單）；需要 AI 幫你操作文件、建表、約會議 → 選飛書官方外掛（功能強）。

> ⚠️ **兩種外掛互斥，只能啟用一個。** 安裝飛書官方外掛時會自動停用內建外掛。如果兩個都裝了，會出現 `duplicate plugin id` 報錯導致飛書功能不可用。遇到這種情況，刪除使用者目錄下的副本即可：
> ```bash
> rm -rf ~/.openclaw/extensions/feishu
> openclaw gateway restart
> ```
> 詳細對比和遷移指南見 [openclaw-feishu 社群指南](https://github.com/AlexAnys/openclaw-feishu)。

## 如何設定

> 以下步驟適用於 **OpenClaw 內建外掛**（方案 b）。如果選擇飛書官方外掛（方案 a），請參考 [飛書官方外掛安裝指南](https://github.com/AlexAnys/openclaw-feishu/blob/main/docs/feishu-official-plugin.md)。
>
> ⚠️ **已知問題（2026-03-09，影響 OpenClaw ≥ 2026.3.x）**：飛書官方安裝工具 `feishu-plugin-onboard` 的版本檢查存在 bug（[openclaw-feishu#59](https://github.com/AlexAnys/openclaw-feishu/issues/59)），會誤報「版本過低」。**替代方式**：跳過 onboard CLI，直接執行 `openclaw plugins install @larksuiteoapi/feishu-openclaw-plugin`，然後手動設定 appId/appSecret 即可。詳見安裝指南。

完整的保姆級教學請參考 [openclaw-feishu 設定指南](https://github.com/AlexAnys/openclaw-feishu)，以下是核心步驟概要（約 15-20 分鐘）：

### 第一步：建立飛書應用程式

在 [飛書開發者後台](https://open.feishu.cn) 建立企業自建應用程式，開啟機器人能力。

### 第二步：設定權限

在「權限管理」中批量匯入所需權限（`im:message`、`im:chat`、`im:resource` 等），教學中提供了完整的權限 JSON 可以一鍵匯入。

### 第三步：設定事件訂閱

**關鍵**：選擇「使用長連線接收事件」模式——這樣不需要公網 IP 或網域名稱，你的個人電腦就能執行。

新增事件：`im.message.receive_v1`（接收訊息）

### 第四步：連線 OpenClaw

```bash
# 新增飛書頻道（互動式引導）
openclaw channels add
# 選擇 Feishu → 貼上 App ID → 貼上 App Secret

# 重啟閘道
openclaw gateway restart
```

### 第五步：測試 & 開機自啟

在飛書中搜尋你的機器人，發送訊息測試。確認正常後設定開機自啟：
```bash
openclaw gateway install
```

## 實用建議

- **長連線模式是首選**：不需要公網 IP、不需要網域名稱、不需要雲端伺服器，個人電腦或 NAS 即可執行
- **配對授權**：首次使用者會收到配對碼，管理員需在終端機核准——這是安全特性，不是故障
- **群聊策略**：建議設定為「@機器人時才回覆」，避免在群聊中過於活躍
- **Lark 國際版**：如果使用的是 Lark 國際版而非飛書中國版，需要用 Webhook + Cloudflare Tunnel 模式，教學中有詳細說明

## 進階：文件自動化與權限管理

> **如果你使用的是飛書官方外掛**：文件、多維表格、日曆、任務等操作已內建，不需要下面的額外安裝步驟。

基礎的飛書 AI 助手接入後（內建外掛使用者），你可以進一步安裝飛書文件相關技能，實現「會後一句話整理紀要到飛書」等進階場景。

### 安裝飛書文件技能

```bash
npx playbooks add skill openclaw/openclaw --skill feishu-doc
npx playbooks add skill openclaw/openclaw --skill feishu-drive
npx playbooks add skill openclaw/openclaw --skill feishu-perm
```

| 技能 | 能力 |
|------|------|
| feishu-doc | 讀寫/建立/追加飛書文件 |
| feishu-drive | 飛書雲端硬碟檔案管理 |
| feishu-perm | 文件/資料夾協作者權限管理 |

### 使用範例

會議結束後發一句話：

```text
把今天下午產品評審會的討論整理成飛書文件，放到「會議紀要」資料夾裡。
格式：結論 → 行動項（負責人 + 截止日期）→ 待確認事項。
把文件分享給與會的同事。
```

### 注意事項

- **必須先共享資料夾給 Bot**：飛書機器人沒有「我的空間」根目錄，如果不把目標資料夾分享給 Bot，建立/寫入操作會失敗
- **Wiki 也需要授權**：如果要寫入知識庫，需要先把 Bot 加入對應的 Wiki Space
- **權限管理謹慎使用**：feishu-perm 涉及權限變更，建議只給 Bot 分享特定資料夾，不給全盤權限

## 相關連結

- [feishu-openclaw 完整設定指南與社群支援](https://github.com/AlexAnys/openclaw-feishu) — 含官方 vs 內建外掛對比、遷移指南、常見問題排查
- [飛書官方外掛安裝指南](https://github.com/AlexAnys/openclaw-feishu/blob/main/docs/feishu-official-plugin.md)
- [飛書官方圖文教學](https://www.feishu.cn/content/article/7613711414611463386) — 飛書團隊出品
- [OpenClaw 官方飛書文件](https://docs.openclaw.ai/zh-CN/channels/feishu)
- [騰訊雲 - 保姆級教學：OpenClaw 接入飛書](https://cloud.tencent.com/developer/article/2626160)
- [騰訊雲 - 5 分鐘玩轉飛書全家桶](https://cloud.tencent.com/developer/article/2631667)
