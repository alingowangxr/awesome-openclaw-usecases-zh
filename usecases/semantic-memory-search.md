---
title: "語義記憶搜尋"
description: "為 OpenClaw 的記憶系統加入語義搜尋能力，輕鬆找到任意時間點儲存的決定和筆記。"
category: "研究與學習"
difficulty: 2
tags:
  - 語義搜尋
  - 記憶
  - RAG
integrations: []
featured: false
---

# 語義記憶搜尋

OpenClaw 的內建記憶系統將所有內容儲存為 Markdown 檔案——但隨著記憶在數週和數月間不斷增長，要找到上週二的那個決定變得幾乎不可能。沒有搜尋功能，只能滾動瀏覽檔案。

這個用例使用 [memsearch](https://github.com/zilliztech/memsearch) 在 OpenClaw 現有的 Markdown 記憶檔案之上新增了**向量驅動的語義搜尋**，讓你可以透過語義而非僅靠關鍵詞即時找到任何過去的記憶。

## 功能介紹

- 用一條指令將所有 OpenClaw Markdown 記憶檔案索引到向量資料庫（Milvus）中
- 按語義搜尋：「我們選了什麼快取方案？」即使文件中沒有出現「快取」這個詞也能找到相關記憶
- 混合搜尋（dense vector（稠密向量）+ BM25 全文檢索）搭配 RRF（倒數排名融合）重排序，取得最佳結果
- SHA-256 內容雜湊值意味著未更改的檔案永遠不會被重新嵌入——零 API 呼叫浪費
- 檔案監視器在記憶檔案變更時自動重新索引，保持索引始終最新
- 支援任何 embedding（向量嵌入）提供商：OpenAI、Google、Voyage、Ollama，或完全本地執行（無需 API 金鑰）

## 痛點

OpenClaw 的記憶以純 Markdown 檔案儲存。這對可移植性和人類可讀性來說很好，但沒有搜尋功能。隨著記憶增長，你要麼只能 grep 檔案（僅支援關鍵詞，會漏掉語義比對），要麼將整個檔案載入到上下文中（在無關內容上浪費 token）。你需要一種方式來問「我關於 X 做了什麼決定？」並取得精確的相關片段，而不受措辭影響。

## 所需技能

- 無需 OpenClaw 技能——memsearch 是一個獨立的 Python CLI／函式庫
- Python 3.10+ 以及 pip 或 uv

## 如何設定

1. 安裝 memsearch：
```bash
pip install memsearch
```

2. 執行互動式設定精靈：
```bash
memsearch config init
```

3. 索引你的 OpenClaw 記憶目錄：
```bash
memsearch index ~/path/to/your/memory/
```

4. 按語義搜尋你的記憶：
```bash
memsearch search "what caching solution did we pick?"
```

5. 若需即時同步，啟動檔案監視器——每次檔案變更時自動索引：
```bash
memsearch watch ~/path/to/your/memory/
```

6. 若需完全本地化部署（無需 API 金鑰），安裝本地 embedding 提供商：
```bash
pip install "memsearch[local]"
memsearch config set embedding.provider local
memsearch index ~/path/to/your/memory/
```

## 關鍵洞察

- **Markdown 始終是資料來源。** 向量索引只是一個衍生快取——你可以隨時用 `memsearch index` 重建它。你的記憶檔案永遠不會被修改。
- **智慧去重節省成本。** 每個文字區塊透過 SHA-256 內容雜湊值識別。重新執行 `index` 只會嵌入新增或更改的內容，因此你可以隨意執行而不會浪費 embedding API 呼叫。
- **混合搜尋優於純向量搜尋。** 透過 Reciprocal Rank Fusion（倒數排名融合）將語義相似度（稠密向量）與關鍵詞比對（BM25）結合，既能擷取基於語義的查詢，也能擷取精確比對的查詢。

## 相關連結

- [memsearch GitHub](https://github.com/zilliztech/memsearch) —— 驅動此用例的函式庫
- [memsearch 文件](https://zilliztech.github.io/memsearch/) —— 完整的 CLI 參考、Python API 和架構說明
- [OpenClaw](https://github.com/openclaw/openclaw) —— 啟發 memsearch 的記憶架構
- [Milvus](https://milvus.io/) —— 向量資料庫後端

---

