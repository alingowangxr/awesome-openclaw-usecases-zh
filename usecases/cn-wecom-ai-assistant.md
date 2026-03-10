---
title: "企業微信 AI 助手"
description: "把 OpenClaw 部署為企業微信應用程式，支援企業微信與個人微信同步使用 AI 助手。"
category: "中國特色"
difficulty: 2
tags:
  - 企業微信
  - 微信
  - 機器人
integrations:
  - openclaw-channel-wecom
featured: true
---

# 企業微信 AI 助手

微信是中國最常用的溝通工具，但 AI 能力無法直接在微信生態中使用——你得切到其他 App 用 AI，再手動把結果搬回微信。

這個用例把 OpenClaw 部署為企業微信應用程式。在企業微信裡發訊息就能觸發 AI 任務，而且透過企業微信的「微信外掛」功能，個人微信使用者掃碼關聯後，也能直接在微信裡和 AI 對話。

## 它能做什麼

- **企業微信內對話式 AI**：在企業微信私聊或群聊中直接與 OpenClaw 對話
- **個人微信也能用**：透過企業微信的「微信外掛」，關聯後個人微信使用者也能和 AI 對話
- **串流輸出**：AI 回覆即時逐字顯示
- **群聊 AI 助手**：支援 @觸發、指令白名單等策略
- **多媒體支援**：支援圖片、檔案的收發和處理

## 兩種整合方案

| 方案 | 外掛 | 特點 |
|------|------|------|
| openclaw-china 套件 | `@openclaw-china/wecom-app` | 社群維護的中國 IM 外掛集合，一站式設定 |
| sunnoy 外掛 | `@sunnoy/wecom` | 功能更豐富，支援動態 Agent 管理、群聊整合、指令白名單 |

兩種方案都經過社群驗證，選哪個看你的需求：只做基礎對話選前者，需要群聊管理等進階功能選後者。

## 所需技能

- OpenClaw 2026.2.9+ 版本
- 企業微信管理員權限（建立自建應用程式）
- 公網 IP 或內網穿透工具（用於接收回呼）

## 如何設定

### 第一步：建立企業微信應用程式

在 [企業微信管理後台](https://work.weixin.qq.com) → 應用程式管理 → 建立應用程式。記錄 Corp ID、Corp Secret、Agent ID。

### 第二步：設定回呼 URL

在應用程式設定中設定「接收訊息」的回呼 URL，格式一般為：

```
http://<你的公網IP>:18789/wecom-app
```

如果沒有公網 IP，可以使用內網穿透工具（如 frp、ngrok）。

### 第三步：安裝外掛並設定

**方案 A：openclaw-china 套件**

```bash
openclaw plugins install @openclaw-china/wecom-app
```

在 `openclaw.json` 中設定：

```json
{
  "channels": {
    "wecom-app": {
      "enabled": true,
      "webhookPath": "/wecom-app",
      "token": "<企業微信 Token>",
      "encodingAESKey": "<企業微信 AES Key>",
      "corpId": "<Corp ID>",
      "corpSecret": "<Corp Secret>",
      "agentId": "<Agent ID>"
    }
  }
}
```

> **安全提醒**：請勿將真實憑證直接寫入設定檔並提交到版本控制。建議使用環境變數：將 Token、AES Key 等敏感資訊存入 `.env` 檔案，並確保 `.env` 已加入 `.gitignore`。

**方案 B：sunnoy 外掛**

```bash
openclaw plugins install @sunnoy/wecom
```

按 [外掛文件](https://github.com/sunnoy/openclaw-plugin-wecom) 設定 channels。該外掛支援 Bot 模式和 App 模式，具體設定參數請參考倉庫 README。

> 安裝第三方社群外掛後，建議在 `plugins.allow` 中設定白名單（參考釘釘用例中的說明）。

### 第四步：啟動並測試

```bash
openclaw gateway restart
```

在企業微信中找到你的應用程式，發一條訊息測試。

### 第五步（可選）：關聯個人微信

在企業微信管理後台 → 微信外掛 → 邀請成員關聯個人微信。關聯後，成員可以在個人微信中直接和 AI 對話。

## 實用建議

- **強烈推薦企業微信路線**：使用官方 API，零封號風險，穩定可靠。不建議使用個人微信第三方協議方案（隨時面臨封號）
- **內網穿透**：與飛書的長連線模式不同，企業微信需要公網可達的回呼 URL。如果你在家裡部署，需要設定內網穿透
- **安全策略**：建議開啟 pairing/allowlist，群聊設為 @觸發，避免任何人都能使用
- **微信外掛是殺手級功能**：它讓你不需要讓所有人都安裝企業微信，個人微信關聯後就能直接用

## 相關連結

- [openclaw-china 企業微信外掛](https://github.com/BytePioneer-AI/openclaw-china)
- [sunnoy 企業微信外掛（進階功能）](https://github.com/sunnoy/openclaw-plugin-wecom)
- [阿里雲 - 企業微信接入 OpenClaw 官方教學](https://help.aliyun.com/zh/simple-application-server/use-cases/openclaw-enterprise-wechat-integration)
- [騰訊雲 - 企業微信整合教學](https://cloud.tencent.com/developer/article/2625147)
- [阿里雲開發者社群 - 2026 保姆級教學](https://developer.aliyun.com/article/1711514)
