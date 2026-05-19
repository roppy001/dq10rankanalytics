---
description: 内閣府の祝日データを取得してHOLIDAYS配列を更新する
argument-hint: ""
---

内閣府の公式祝日CSVを取得し、`js/rankanalytics.js` の `HOLIDAYS` 配列を最新化します。引数は不要です。

## 処理手順

### 1. 内閣府CSVの取得・解析

以下URLからCSVを取得します:
```
https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv
```

CSVの構造:
- 1行目: ヘッダー（スキップ）
- 2行目以降: `YYYY/M/D,祝日名` 形式（月・日はゼロ埋めなし）

日付を全行分パースして、`{year, month, day}` の配列を構築します。
日付は正規表現 `(\d{4})/(\d{1,2})/(\d{1,2})` で抽出できます。

### 2. 既存データの確認

`js/rankanalytics.js` の `var HOLIDAYS = [` から `];` までの範囲を読み込み、現在カバーしている年の範囲（最初の年・最後の年）を把握します。

### 3. 新HOLIDAYSリストの生成

**対象年の決定:**
- 開始年: 既存データの最初の年（例: 2020）
- 終了年: CSVに含まれる最後の年

**各年の日付生成ルール:**

CSVから取得した当該年の官公日に加え、年末年始の追加日付を含めます:

```
年末年始追加分（年Yについて）:
  Y/1/2   ← 1/1は元日として既にCSVに含まれるため不要
  Y/1/3
  Y/12/30
  Y/12/31
```

**重複除去・ソート:**
- 上記をマージして日付の重複を除去（同年同月同日が複数ある場合は1つに統一）
- 年→月→日の順で昇順にソート

### 4. 差分の確認とユーザーへの提示

現在の HOLIDAYS 配列と新しいリストを比較し、以下を提示します:

```
[追加される日付]
  YYYY/M/D (祝日名 または 年末年始)
  ...

[削除される日付（重複除去など）]
  YYYY/M/D
  ...

既存: {N}件 → 更新後: {M}件
```

ユーザーに確認を求め、承認された場合のみ次へ進みます。

### 5. rankanalytics.js の HOLIDAYS 配列を置換

`var HOLIDAYS = [` から `];` までの全体を、新しいリストに置き換えます。

**出力フォーマット:**
- 1行に1エントリ、形式は `  new Date('YYYY/M/D'),`
- 月・日はゼロ埋めなし（例: `new Date('2027/1/1')`, `new Date('2027/11/3')`）
- 年が変わるタイミングで空行を1行挿入して年ごとに視覚的に区切る
- コメント行 `// 祝日データを定義` と `// 12/30～1/3は祝日とみなす` は変更しない

出力例:
```javascript
var HOLIDAYS = [
  new Date('2020/1/1'),
  new Date('2020/1/2'),
  new Date('2020/1/3'),
  ...
  new Date('2020/12/30'),
  new Date('2020/12/31'),

  new Date('2021/1/1'),
  ...
];
```

### 6. rankanalytics.html のタイムスタンプ更新

`rankanalytics.html` 内の以下の行:
```html
  <script type='text/javascript' src='js/rankanalytics.js?{タイムスタンプ}'></script>
```

タイムスタンプ部分（`?` 以降の数字）を、今日の日時（JST・`YYYYMMDDHHmm` 形式）に書き換えます。

- タイムスタンプは分単位まで含めます（12桁）
- 現在時刻は `powershell -Command "[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([System.DateTime]::UtcNow, 'Tokyo Standard Time').ToString('yyyyMMddHHmm')"` で取得してください

### 7. 確認とレポート

変更後、以下をユーザーに報告します:
- 追加した日付の一覧と件数
- 削除・重複除去した日付の一覧（あれば）
- カバー年範囲（YYYY年〜YYYY年）
- rankanalytics.html のタイムスタンプ（更新後の値）
