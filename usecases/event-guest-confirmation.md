---
title: "活動嘉賓確認"
description: "自動撥打電話確認活動嘉賓出席情況，記錄飲食限制和攜伴資訊，取得比簡訊更高的回覆率。"
category: "生產力"
difficulty: 2
tags:
  - 活動管理
  - 電話自動化
  - 嘉賓確認
integrations: []
featured: false
---

# 活動嘉賓確認

你正在舉辦一個活動——晚宴派對、婚禮、公司團建——你需要確認一份嘉賓名單上的出席情況。手動打電話給 20 多個人非常繁瑣：你要反覆打電話、忘記誰說了什麼、還會弄丟飲食限制或攜伴資訊。發簡訊有時管用，但人們會忽略訊息。真正的電話通話能取得更高的回覆率。

這個用例讓 OpenClaw 使用 [SuperCall](https://clawhub.ai/xonder/supercall) 外掛程式逐一給你名單上的每位嘉賓打電話，確認他們是否出席，收集備注資訊，並將所有結果彙整成一份摘要。

## 功能介紹

- 遍歷嘉賓名單（姓名 + 電話號碼）並逐一撥打
- AI 以友好的角色介紹自己是你的活動協調員
- 向嘉賓確認活動日期、時間和地點
- 詢問是否出席，並收集備注資訊（飲食需求、攜伴、到達時間等）
- 所有電話完成後，彙整摘要：誰確認了、誰拒絕了、誰沒接電話，以及所有備注

## 為什麼選擇 SuperCall

這個用例專門使用 [SuperCall](https://clawhub.ai/xonder/supercall) 外掛程式——而不是內建的 `voice_call` 外掛程式。關鍵區別在於：SuperCall 是一個完全獨立的語音智慧型代理。通話中的 AI 角色**只能存取你提供的上下文**（角色名稱、目標和開場白）。它無法存取你的網關智慧型代理、你的檔案、你的其他工具或任何其他內容。

這對嘉賓確認很重要，因為：

- **安全性**：電話另一端的人無法透過對話操縱或存取你的智慧型代理。沒有提示注入（prompt injection）或資料洩露的風險。
- **更好的對話**：因為 AI 被限定在單一聚焦任務（確認出席），它能保持話題並比通用語音智慧型代理更自然地處理通話。
- **適合批次處理**：你要給不同的人打很多電話。一個每次通話都重置的沙箱化角色正是你所需要的——對話之間不會互相影響。

## 所需技能

- [SuperCall](https://clawhub.ai/xonder/supercall) — 透過 `openclaw plugins install @xonder/supercall` 安裝
- 一個帶電話號碼的 Twilio 帳號（用於撥打外呼電話）
- 一個 OpenAI API 金鑰（用於 GPT-4o 即時語音 AI）
- ngrok（用於 webhook（網路回呼）隧道——免費版即可）

完整設定說明請參閱 [SuperCall README](https://github.com/xonder/supercall)。

## 設定方法

1. 按照[設定指南](https://github.com/xonder/supercall#configuration)安裝並設定 SuperCall。確保在你的 OpenClaw 設定中啟用了 hooks。

2. 準備你的嘉賓名單。你可以直接在聊天中貼上，也可以儲存在檔案中：

```text
Guest List — Summer BBQ, Saturday June 14th, 4 PM, 23 Oak Street

- Sarah Johnson: +15551234567
- Mike Chen: +15559876543
- Rachel Torres: +15555551234
- David Kim: +15558887777
```

3. 給 OpenClaw 設定提示詞：

以下提示詞讓智慧型代理逐一撥打嘉賓電話並彙整確認結果：

```text
I need you to confirm attendance for my event. Here are the details:

Event: Summer BBQ
Date: Saturday, June 14th at 4 PM
Location: 23 Oak Street

Here is my guest list:
<paste your guest list here>

For each guest, use supercall to call them. Use the persona "Jamie, event coordinator
for [your name]". The goal for each call is to confirm whether they're attending,
and note any dietary restrictions, plus-ones, or other comments.

After each call, log the result. Once all calls are done, give me a full summary:
- Who confirmed
- Who declined
- Who didn't answer
- Any notes or special requests from each guest
```

4. OpenClaw 會使用 SuperCall 逐一撥打每位嘉賓的電話，然後彙整結果。你可以隨時詢問進度更新。

## 關鍵洞察

- **從小規模測試開始**：先用 2-3 位嘉賓試試，確保角色和開場白聽起來合適。你可以在撥打完整名單之前調整語調。
- **注意撥打時間**：不要安排太早或太晚的電話。你可以告訴 OpenClaw 只在特定時間段內撥打。
- **檢視通話記錄**：SuperCall 會將通話記錄儲存到 `~/clawd/supercall-logs`。在第一批電話後瀏覽一下，看看對話進行得如何。
- **未接電話處理**：如果有人沒接電話，OpenClaw 會記錄下來，你可以決定是稍後重試還是改用簡訊跟進。
- **真實電話通話需要花錢**：每次通話都會消耗 Twilio 通話時長。在你的 Twilio 帳號中設定適當的限額，尤其是嘉賓名單較大時。

## 相關連結

- [SuperCall on ClawHub](https://clawhub.ai/xonder/supercall)
- [SuperCall on GitHub](https://github.com/xonder/supercall)
- [Twilio Console](https://console.twilio.com)
- [OpenAI Realtime API](https://platform.openai.com/docs/guides/realtime)
- [ngrok](https://ngrok.com)

---

