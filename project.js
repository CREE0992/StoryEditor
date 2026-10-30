/* Application fields and sample data. MIT License. */
const SPEC={
  "id": "A07",
  "slug": "branch-game",
  "name": "互动剧情编辑器",
  "desc": "编排剧情节点、条件和选项，校验连接并导出可试玩的网页游戏。",
  "fields": [
    {
      "key": "title",
      "label": "游戏名称",
      "type": "text",
      "value": "灯塔来信"
    },
    {
      "key": "start",
      "label": "起始节点ID",
      "type": "text",
      "value": "start"
    },
    {
      "key": "vars",
      "label": "初始变量（每行 名称=整数）",
      "type": "textarea",
      "value": "key=0"
    }
  ],
  "tables": [
    {
      "key": "nodes",
      "label": "剧情节点",
      "columns": [
        {
          "key": "id",
          "label": "节点ID",
          "type": "text"
        },
        {
          "key": "text",
          "label": "剧情内容",
          "type": "textarea"
        }
      ],
      "rows": [
        {
          "id": "start",
          "text": "海边有一把钥匙，远处灯塔的门锁着。"
        },
        {
          "id": "key",
          "text": "你捡起了钥匙。"
        },
        {
          "id": "end",
          "text": "灯塔的门打开了，你找到了来信。故事结束。"
        }
      ]
    },
    {
      "key": "links",
      "label": "选项与条件",
      "columns": [
        {
          "key": "from",
          "label": "来源节点",
          "type": "text"
        },
        {
          "key": "label",
          "label": "选项文字",
          "type": "text"
        },
        {
          "key": "to",
          "label": "目标节点",
          "type": "text"
        },
        {
          "key": "condition",
          "label": "条件（如key>=1）",
          "type": "text"
        },
        {
          "key": "effect",
          "label": "变量变化（如key+=1）",
          "type": "text"
        }
      ],
      "rows": [
        {
          "from": "start",
          "label": "捡起钥匙",
          "to": "key",
          "condition": "",
          "effect": "key+=1"
        },
        {
          "from": "start",
          "label": "打开灯塔",
          "to": "end",
          "condition": "key>=1",
          "effect": ""
        },
        {
          "from": "key",
          "label": "返回海边",
          "to": "start",
          "condition": "",
          "effect": ""
        }
      ]
    }
  ],
  "limits": "结构可达检查不证明所有条件组合均可达；循环剧情允许，变量只支持整数、比较和增减，不执行任意代码。",
  "dirname": "branch-game",
  "example": {
    "_files": {},
    "title": "灯塔来信",
    "start": "start",
    "vars": "key=0",
    "nodes": [
      {
        "id": "start",
        "text": "海边有一把钥匙，远处灯塔的门锁着。"
      },
      {
        "id": "key",
        "text": "你捡起了钥匙。"
      },
      {
        "id": "end",
        "text": "灯塔的门打开了，你找到了来信。故事结束。"
      }
    ],
    "links": [
      {
        "from": "start",
        "label": "捡起钥匙",
        "to": "key",
        "condition": "",
        "effect": "key+=1"
      },
      {
        "from": "start",
        "label": "打开灯塔",
        "to": "end",
        "condition": "key>=1",
        "effect": ""
      },
      {
        "from": "key",
        "label": "返回海边",
        "to": "start",
        "condition": "",
        "effect": ""
      }
    ]
  },
  "inputTitle": "剧情设计",
  "outputTitle": "校验与试玩",
  "action": "校验并试玩"
};
