---
title: "小紅書內容自動化"
description: "輔助完成小紅書選題、文案撰寫、封面圖生成到發布的完整自動化流程。"
category: "中國特色"
difficulty: 3
tags:
  - 小紅書
  - 內容創作
  - 自媒體
integrations: []
featured: false
---

# 小紅書內容自動化

自媒體運營者每天在小紅書上的工作流程：追熱點 → 寫文案 → 做封面圖 → 排期發布。每篇筆記從構思到發布至少一小時，如果要日更多個帳號，時間直接翻倍。

這個用例透過社群開發的 OpenClaw Skill 呼叫 Python 自動化腳本，輔助完成選題、文案撰寫、封面圖生成到發布的流程。

## 它能做什麼

- **熱點偵測**：自動分析小紅書當前熱門話題
- **文案生成**：AI 按照小紅書特有的寫作風格生成圖文筆記（包括標題、正文、標籤）
- **封面圖生成**：呼叫 AI 圖像模型生成專業封面圖
- **自動發布**：登入帳號後定時發布筆記
- **資料追蹤**：查看筆記的瀏覽、按讚、收藏資料

## 所需技能

[XiaohongshuSkills](https://github.com/white0dew/XiaohongshuSkills) —— 社群開發的小紅書自動化技能。**目前僅在 Windows 上測試通過**，macOS/Linux 使用者需自行驗證相容性。

需要 Python 3.10+ 和 Chrome 瀏覽器。

## 如何設定

1. 複製專案並安裝依賴：
```bash
git clone https://github.com/white0dew/XiaohongshuSkills.git
cd XiaohongshuSkills
pip install -r requirements.txt
```

2. 登入帳號（首次需要掃碼）：
```bash
python scripts/cdp_publish.py login
```

3. 將專案目錄放到 OpenClaw 的 skills 目錄（如 `~/.openclaw/workspace/skills/`），使 OpenClaw 能識別該 Skill。

4. 設定完成後，在 OpenClaw 對話中用自然語言發布內容：
```text
生成一篇美妝推薦的圖文筆記，明天上午 10 點發布。

幫我寫一篇關於「居家收納技巧」的小紅書筆記，要有吸引力的標題和 5 個相關話題標籤。

分析一下最近「健身餐」相關的熱門筆記，找出高讚共性。
```

## 實用建議

- **內容品質優先**：AI 生成的內容建議人工審核後再發布，確保內容品質和品牌調性一致
- **控制發布頻率**：過於頻繁的自動發布可能觸發平台風控，建議每天不超過 3-5 篇
- **多帳號管理**：該技能支援多帳號隔離的 Cookie 管理，可以同時管理多個運營帳號
- **資料驅動迭代**：用資料追蹤功能分析哪類內容表現好，讓 OpenClaw 記住你的偏好並持續優化選題

> **⚠️ 風險提醒**：小紅書對自動化操作有嚴格的風控策略，包括但不限於 Chrome 指紋偵測、發布頻率限制、帳號行為分析等。自動化操作可能導致帳號限流或封禁。**強烈建議使用測試帳號驗證後再用於正式帳號**，以輔助創作為主，避免批量灌水。

## 相關連結

- [XiaohongshuSkills - GitHub](https://github.com/white0dew/XiaohongshuSkills)
- [CSDN - 實戰案例：用 OpenClaw 自動發小紅書筆記](https://blog.csdn.net/weixin_49598732/article/details/158286134)
- [騰訊雲 - 把小紅書交給 OpenClaw](https://cloud.tencent.com/developer/article/2629870)
