---
title: "Todoist 任務管理器：智能體任務可見性"
description: "將 AI 智能體的內部推理和進度日誌同步到 Todoist，最大化長時間執行工作流的透明度。"
category: "生產力"
difficulty: 1
tags:
  - Todoist
  - 任務管理
  - 透明度
integrations:
  - Todoist
featured: false
---

# Todoist 任務管理器：智能體任務可見性

透過將內部推理和進度日誌直接同步到 Todoist，最大化長時間執行的智能體工作流的透明度。

## 痛點

當智能體執行複雜的多步驟任務（如建構全端應用程式或進行深度研究）時，用戶經常無法追蹤智能體當前在做什麼、哪些步驟已完成、以及智能體可能在哪裡卡住。對於背景任務，手動檢查聊天日誌非常繁瑣。

## 功能介紹

這個用例使用 `todoist-task-manager` 技能來：
1. **視覺化狀態**：在特定分區建立任務，如 `🟡 進行中` 或 `🟠 等待中`。
2. **外化推理**：將智能體的內部「計劃」發布到任務描述中。
3. **串流日誌**：將子步驟完成情況作為評論即時新增到任務中。
4. **自動校驗**：心跳腳本（heartbeat script）檢查停滯的任務並通知用戶。

## 所需技能

你不需要預建構的技能。只需提示你的 OpenClaw 智能體建立下面**設定指南**中描述的 bash 腳本。由於 OpenClaw 可以管理自己的檔案系統並執行 shell 指令，它會按你的要求「建構」這個技能。

## 詳細設定指南

### 1. 設定 Todoist

建立一個專案（例如 "OpenClaw Workspace"）並取得其 ID。為不同狀態建立分區：
- `🟡 In Progress`（進行中）
- `🟠 Waiting`（等待中）
- `🟢 Done`（已完成）

### 2. 實作：「智能體自建」技能

你可以讓 OpenClaw 為你建立這些腳本，而不是安裝技能。每個腳本處理與 Todoist API 通訊的不同部分。

**`scripts/todoist_api.sh`**（核心封裝腳本）：
```bash
#!/bin/bash
# 用法：./todoist_api.sh <endpoint> <method> [data_json]
ENDPOINT=$1
METHOD=$2
DATA=$3
TOKEN="YOUR_TODOIST_API_TOKEN"

if [ -z "$DATA" ]; then
  curl -s -X "$METHOD" "https://api.todoist.com/rest/v2/$ENDPOINT" \
    -H "Authorization: Bearer $TOKEN"
else
  curl -s -X "$METHOD" "https://api.todoist.com/rest/v2/$ENDPOINT" \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    -d "$DATA"
fi
```

**`scripts/sync_task.sh`**（任務和狀態管理）：
```bash
#!/bin/bash
# 用法：./sync_task.sh <task_content> <status> [task_id] [description] [labels_json_array]
CONTENT=$1
STATUS=$2
TASK_ID=$3
DESCRIPTION=$4
LABELS=$5
PROJECT_ID="YOUR_PROJECT_ID"

case $STATUS in
  "In Progress") SECTION_ID="SECTION_ID_PROGRESS" ;;
  "Waiting")     SECTION_ID="SECTION_ID_WAITING" ;;
  "Done")        SECTION_ID="SECTION_ID_DONE" ;;
  *)             SECTION_ID="" ;;
esac

PAYLOAD="{\"content\": \"$CONTENT\""
[ -n "$SECTION_ID" ] && PAYLOAD="$PAYLOAD, \"section_id\": \"$SECTION_ID\""
[ -n "$PROJECT_ID" ] && [ -z "$TASK_ID" ] && PAYLOAD="$PAYLOAD, \"project_id\": \"$PROJECT_ID\""
if [ -n "$DESCRIPTION" ]; then
  # 轉義描述中的換行符和引號
  ESC_DESC=$(echo "$DESCRIPTION" | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/"/\\"/g')
  PAYLOAD="$PAYLOAD, \"description\": \"$ESC_DESC\""
fi
[ -n "$LABELS" ] && PAYLOAD="$PAYLOAD, \"labels\": $LABELS"
PAYLOAD="$PAYLOAD}"

if [ -n "$TASK_ID" ]; then
  ./scripts/todoist_api.sh "tasks/$TASK_ID" POST "$PAYLOAD"
else
  ./scripts/todoist_api.sh "tasks" POST "$PAYLOAD"
fi
```

**`scripts/add_comment.sh`**（進度日誌記錄）：
```bash
#!/bin/bash
# 用法：./add_comment.sh <task_id> <comment_text>
TASK_ID=$1
TEXT=$2
# 轉義文字中的換行符和引號
ESC_TEXT=$(echo "$TEXT" | sed ':a;N;$!ba;s/\n/\\n/g' | sed 's/"/\\"/g')
PAYLOAD="{\"task_id\": \"$TASK_ID\", \"content\": \"$ESC_TEXT\"}"
./scripts/todoist_api.sh "comments" POST "$PAYLOAD"
```

### 3. 使用提示詞

你可以將以下提示詞交給你的智能體，用於**設定**和**使用**任務可見性系統：

```text
I want you to build a Todoist-based task visibility system for your own runs.

First, create three bash scripts in a 'scripts/' folder:
1. todoist_api.sh (a curl wrapper for Todoist REST API)
2. sync_task.sh (to create or update tasks with specific section_ids for In Progress, Waiting, and Done)
3. add_comment.sh (to post progress logs as comments)

Use these variables for the setup:
- Token: [Your Todoist API Token]
- Project ID: [Your Project ID]
- Section IDs: [In Progress ID, Waiting ID, Done ID]

Once created, for every complex task I give you:
1. Create a task in 'In Progress' with your full PLAN in the description.
2. For every sub-step completion, call add_comment.sh with a log of what you did.
3. Move the task to 'Done' when finished.
```

## 相關連結

- [Todoist REST API 文件](https://developer.todoist.com/rest/v2/)

---

