---
description: イベントの新ラウンドをRACE_CONFIG_MAPに追加する
argument-hint: "<eventType> <startDate[THH:MM]> <endDate[THH:MM]>"
---

イベントの新ラウンドデータを `js/rankanalytics.js` に追加します。

## 引数

`$ARGUMENTS` にスペース区切りで渡されます:

1. **eventType**: イベント種別（`daifugom`, `fishing`, `slimerace`, `casinoraid`, `pencil` など）
2. **startDate**: 開始日。形式は `YYYY-MM-DD` または `YYYY-MM-DDTHH:MM`
3. **endDate**: 終了日。形式は `YYYY-MM-DD` または `YYYY-MM-DDTHH:MM`

**時刻省略時のデフォルト:**
- startDate に時刻がない場合 → 当日 **12:00**（正午）
- endDate に時刻がない場合 → **翌日の 04:00**（午前4時）

引数が不足または不正な場合は、ユーザーにフォーマットを案内して処理を中止してください。

## 処理手順

### 1. 現在状態の確認

`js/rankanalytics.js` を読み込み、以下を確認します:

- `RACE_TYPE_CONFIG_MAP.{eventType}.rounds` の先頭エントリ → 現在の最新ラウンド ID と name
- 新ラウンド ID = 現在最新 ID + 1
- `RACE_CONFIG_MAP` 内の `{eventType}{現在最新ID}` エントリ（全フィールドを記録）

### 2. 日時の計算

引数を解析して beginTime・endTime を決定します。

#### startDate の解析
- `YYYY-MM-DDTHH:MM` 形式 → そのまま使用
- `YYYY-MM-DD` 形式 → 時刻は `12:00`（正午）

#### endDate の解析
- `YYYY-MM-DDTHH:MM` 形式 → そのまま使用
- `YYYY-MM-DD` 形式 → **翌日の 04:00**（例: `2026-07-14` → 2026-07-15 04:00）

#### JavaScript 表記への変換（月は0始まり: 1月=0）
- `new Date(year, month-1, day, hour, minute)`
- 例: 2026-07-01 12:00 → `new Date(2026,6,1,12,0)`
- 例: 2026-07-15 04:00 → `new Date(2026,6,15,4,0)`

### 3. 新エントリの構築

最新エントリの全フィールドをコピーし、以下を変更します:

#### title の更新
- 最新エントリの title に含まれる `第N回` を `第(N+1)回` に置換する
- 例: `'第9回フィッシングコンテスト'` → `'第10回フィッシングコンテスト'`
- 置換できない場合（title に `第N回` 形式が見つからない場合）: title はそのままコピーし、後でユーザーに確認する

#### rounds の name 決定
- RACE_TYPE_CONFIG_MAP の最新 rounds エントリの `name` に含まれる `第N回` を `第(N+1)回` に置換する
- 例: `'第9回'` → `'第10回'`
- 置換できない場合: そのままコピーし、後でユーザーに確認する

### 4. ユーザーへの確認

変更を適用する前に、以下の内容をユーザーに提示して確認を求めてください:

```
以下の内容で追加します:

キー: {eventType}{新ID}
title: {新title}
beginTime: new Date({beginTime引数})
endTime: new Date({endTime引数})
（その他のフィールドは {eventType}{現在最新ID} からコピー）

rounds に追加: {id: {新ID}, name: '{新name}'}
```

ユーザーが確認した場合のみ次の手順へ進みます。title や rounds name の修正があれば受け付けてください。

### 5. rankanalytics.js への変更

#### 変更1: 新エントリを追加

`{eventType}{現在最新ID}` エントリの直前（コード上で上の位置）に以下を挿入します:

```javascript
  {eventType}{新ID} : {
    title : '{新title}',
    predictionType : {コピー元と同じ},
    numberFormatter : {コピー元と同じ（文字列として正確にコピー）},
    beginTime : new Date({beginTime引数}),
    endTime : new Date({endTime引数}),
    updateType : {コピー元と同じ},
    subraceNames : {コピー元と同じ},
    borders : {コピー元と同じ},
    rankBorder : {コピー元と同じ}
  },
```

**重要:** `numberFormatter` は参照（`FISHING_FORMATTER` や `NORMAL_FORMATTER_GENERATOR('P')` など）を文字列としてそのまま正確にコピーしてください。

#### 変更2: RACE_TYPE_CONFIG_MAP.{eventType}.rounds を更新

`rounds` 配列の先頭に以下を追加します:
```javascript
      {id : {新ID},name : '{新name}'},
```

#### 変更3: initialSelection の更新確認

`js/rankanalytics.js` の `initialSelection` オブジェクト（`var initialSelection = {` の直下）の現在の値をユーザーに提示し、以下を確認します:

> `initialSelection` の `raceType`・`round`・`race` を新ラウンド（{eventType}）に更新しますか？

ユーザーが更新を承認した場合、以下のように書き換えます:
```javascript
  raceType : "{eventType}",
  round : {新ID},
  race : "{eventType}{新ID}",
```

ユーザーが拒否した場合はそのまま次へ進みます。

### 6. rankanalytics.html のタイムスタンプ更新

`rankanalytics.html` 内の以下の行:
```html
  <script type='text/javascript' src='js/rankanalytics.js?{タイムスタンプ}'></script>
```

タイムスタンプ部分（`?` 以降の数字）を、今日の日時（JST・`YYYYMMDDHHmm` 形式）に書き換えます。

- 例: 今日が 2026-07-01 で作業時刻が 12:30 JST なら → `js/rankanalytics.js?202607011230`
- タイムスタンプは分単位まで含めます（12桁）。
- 現在時刻は `powershell -Command "[System.TimeZoneInfo]::ConvertTimeBySystemTimeZoneId([System.DateTime]::UtcNow, 'Tokyo Standard Time').ToString('yyyyMMddHHmm')"` で取得してください。

### 7. 確認とレポート

変更後、変更内容のサマリーをユーザーに報告してください:
- 追加した新エントリ名、title、beginTime（YYYY/MM/DD HH:MM）、endTime（YYYY/MM/DD HH:MM）
- rounds に追加したエントリ
- initialSelection の変更有無（変更した場合は新しい値）
- rankanalytics.html のタイムスタンプ（更新後の値）
