---
title: "OpenClaw + Opik 可觀測性追蹤"
description: "使用 Opik 為 OpenClaw 加入完整的可觀測性追蹤，讓 LLM 呼叫、工具呼叫和子智能體協作一覽無遺。"
category: "基礎設施與DevOps"
difficulty: 2
tags:
  - 可觀測性
  - Opik
  - 監控
integrations:
  - Opik
featured: false
---

# OpenClaw + Opik 可觀測性追蹤

當 OpenClaw 開始承載真實業務後，問題通常出在「看不見」：一次對話會觸發 LLM 呼叫、工具呼叫、子智能體協作，但排障資訊分散在不同日誌裡，定位成本很高。

這個用例演示如何透過 `@opik/opik-openclaw` 把 OpenClaw 執行過程接入 Opik，實現統一追蹤、錯誤排查和成本監控。

## 痛點

- **鏈路不可見**：很難把一次用戶請求和後續全部執行步驟關聯起來
- **故障排查慢**：排查需要在閘道日誌、模型日誌、工具日誌之間來回切換
- **成本不透明**：按任務/工作流觀察 token 和成本的能力不足

## 功能說明

- 將 OpenClaw 事件匯出為 Opik 中的 trace/span
- 覆蓋以下關鍵資料：
  - LLM 請求與回應 span
  - 工具呼叫 span（入參/結果/錯誤）
  - 子智能體生命週期 span
  - 執行結束元資料
  - 用量與成本元資料

## 提示詞（可直接複製）

```text
請做一次閘道健康檢查，發送一條測試訊息，並彙總今天 Opik 裡所有失敗的工具呼叫及錯誤原因。
```

```text
請統計最近 24 小時 Opik 追蹤裡 token 和成本最高的工作流，並給出每個工作流 1 條最佳化建議。
```

## 所需技能

- 基礎 OpenClaw CLI 使用能力
- 無需額外 OpenClaw skills

## 設定方法

1. 安裝外掛程式：

```bash
openclaw plugins install @opik/opik-openclaw
```

2. 執行設定精靈：

```bash
openclaw opik configure
```

3. 檢查生效設定：

```bash
openclaw opik status
```

4. 發送測試請求並產生追蹤：

```bash
openclaw gateway run
openclaw message send "hello from openclaw"
```

5. 在 Opik 中確認 trace 與 span 正常入庫。

## 相關連結

- [opik-openclaw 倉庫](https://github.com/comet-ml/opik-openclaw)
- [Opik 文件](https://www.comet.com/docs/opik/)
- [OpenClaw 外掛程式文件](https://docs.openclaw.ai/plugin)
