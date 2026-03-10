---
title: "釘釘 AI 助手"
description: "把 OpenClaw 部署為釘釘機器人，透過 WebSocket Stream 模式在釘釘對話中直接觸發 AI 任務。"
category: "中國特色"
difficulty: 2
tags:
  - 釘釘
  - 機器人
  - Stream模式
integrations:
  - openclaw-channel-dingtalk
featured: true
---

# 釘釘 AI 助手

釘釘是很多中小企業的主力辦公工具，但內建的 AI 能力有限，很多場景覆蓋不到。你想讓 AI 幫你整理郵件、查資料、寫文件，但釘釘自帶的功能做不到，又不想讓團隊成員學新工具。

這個用例把 OpenClaw 部署為釘釘機器人。在釘釘對話中發訊息就能觸發 AI 任務，支援 Stream 模式（無需公網 IP），個人電腦即可執行。

## 它能做什麼

- **對話式 AI 助手**：在釘釘私聊或群聊中直接與 OpenClaw 對話
- **Stream 模式**：WebSocket 長連線，無需公網 IP 或網域名稱
- **多媒體支援**：支援圖片、語音、影片、檔案的接收和處理（部分出站類型依賴外掛版本）
- **AI 卡片串流輸出**：回覆以釘釘卡片形式即時串流顯示
- **Markdown 回覆**：支援格式化的 Markdown 訊息
- **群聊 @觸發**：群聊中 @機器人才回應，不打擾正常溝通

## 所需技能

[openclaw-channel-dingtalk](https://github.com/soimy/openclaw-channel-dingtalk)（@soimy/dingtalk）—— 社群維護的釘釘通道外掛

## 如何設定

### 第一步：建立釘釘應用程式

在 [釘釘開放平台](https://open-dev.dingtalk.com) 建立企業內部應用程式，開啟機器人能力。

### 第二步：取得憑證

在應用程式資訊頁面記錄 Client ID（AppKey）和 Client Secret（AppSecret）。

### 第三步：設定訊息接收模式

**關鍵**：選擇「Stream 模式」——這樣不需要公網 IP 或網域名稱，個人電腦就能執行（與飛書的長連線模式類似）。

### 第四步：安裝外掛並設定

```bash
openclaw plugins install @soimy/dingtalk
```

安裝後需將外掛加入安全白名單。編輯 `~/.openclaw/openclaw.json`，新增：

```json
{
  "plugins": {
    "enabled": true,
    "allow": ["@soimy/dingtalk"]
  }
}
```

透過 `openclaw onboard` 互動式引導或手動編輯 `~/.openclaw/openclaw.json` 的 `channels` 設定，填入 Client ID 和 Client Secret。

### 第五步：啟動並測試

```bash
openclaw gateway restart
```

在釘釘中搜尋你的機器人，發送訊息測試。確認正常後設定開機自啟：

```bash
openclaw gateway install
```

## 實用建議

- **Stream 模式是首選**：和飛書一樣，不需要公網 IP，個人電腦或 NAS 即可執行
- **選飛書還是釘釘？按團隊實際使用的 IM 選**：哪個是你們每天開啟的工具，就接哪個。兩個都用的團隊可以同時接入
- **群聊策略**：建議設為「@機器人時才回覆」，避免群聊中過於活躍
- **安全策略**：開啟 pairing/allowlist，限制誰可以使用機器人的進階功能

## 相關連結

- [openclaw-channel-dingtalk - GitHub](https://github.com/soimy/openclaw-channel-dingtalk)
- [騰訊雲 - 保姆級教學：OpenClaw 接入釘釘](https://cloud.tencent.com/developer/article/2625121)
- [騰訊雲 - 快速接入指南](https://cloud.tencent.com/developer/article/2626553)
- [CSDN - 釘釘接入 OpenClaw 完整指南](https://blog.csdn.net/weixin_42125125/article/details/158430832)
- [阿里雲 - 預裝映像方案](https://help.aliyun.com/zh/simple-application-server/use-cases/quickly-deploy-and-use-openclaw)
