---
description: 大富豪段位戦（daifugo）の新ラウンドをRACE_CONFIG_MAPに追加する
argument-hint: "<次のバージョンアップ日 YYYY-MM-DD> <次の次のバージョンアップ概算日 YYYY-MM-DD>"
---

大富豪段位戦（daifugo）の新ラウンドデータを `js/rankanalytics.js` に追加します。

## 引数

`$ARGUMENTS` にスペース区切りで2つの日付が渡されます:

1. **nextVersionDate**: 次のマイナーバージョンアップの正確な日付（YYYY-MM-DD形式）
2. **afterNextVersionApproxDate**: 次の次のマイナーバージョンアップの概算日（YYYY-MM-DD形式）

引数が不足または不正な場合は、ユーザーにフォーマットを案内して処理を中止してください。

## 処理手順

### 1. 現在状態の確認

`js/rankanalytics.js` を読み込み、以下を確認します:
- `RACE_TYPE_CONFIG_MAP.daifugo.rounds` の先頭エントリの `id` → これが現在の最新ラウンド番号（例: 19）
- 新ラウンド番号 = 現在最新 + 1（例: 20）
- `RACE_CONFIG_MAP` 内の `daifugo{現在最新番号}` エントリの内容

### 2. 日付の計算

**nextVersionDate** を `D1`、**afterNextVersionApproxDate** を `D2` とします。

#### 既存エントリの新 endTime
- `D1 + 1日` の午前0時
- JavaScript表記: `new Date(year, month-1, day+1, 0, 0)` ← 月は0始まり（1月=0）
- 例: D1 = 2026-03-19 → `new Date(2026,2,20,0,0)`

#### 新エントリの beginTime
- D1 の午前0時
- JavaScript表記: `new Date(year, month-1, day, 0, 0)`
- 例: D1 = 2026-03-19 → `new Date(2026,2,19,0,0)`

#### 新エントリの endTime（D2 が含まれる週の木曜日）
- 週は月曜始まり（ISO週）
- ISO曜日 = D2.getDay() === 0 ? 7 : D2.getDay()（1=月, 2=火, ..., 4=木, ..., 7=日）
- 木曜日までのオフセット（日数） = 4 - ISO曜日
- 結果の日付 = D2 + オフセット日（負値なら前の日付に戻る。JavaScriptのDateは自動的に月末処理する）
- JavaScript表記: `new Date(year, month-1, day + offset, 0, 0)`
- 例: D2 = 2026-06-20（土 = ISO曜日6） → オフセット = 4-6 = -2 → 2026-06-18（木） → `new Date(2026,5,18,0,0)`

### 3. rankanalytics.js への変更

#### 変更1: 既存の最新エントリの endTime を更新

`daifugo{現在最新番号}` エントリの `endTime` 行を、計算した新 endTime に書き換えます。

#### 変更2: 新エントリを追加

`daifugo{現在最新番号}` エントリの直前（コード上で上の位置）に以下を挿入します:

```javascript
  daifugo{新番号} : {
    title : '第{新番号}回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date({beginTime引数}),
    endTime : new Date({endTime引数}),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
```

#### 変更3: RACE_TYPE_CONFIG_MAP.daifugo.rounds を更新

`rounds` 配列の先頭に以下を追加します:
```javascript
      {id : {新番号},name : '第{新番号}回'},
```

#### 変更4: initialSelection の更新確認

`js/rankanalytics.js` の `initialSelection` オブジェクト（`var initialSelection = {` の直下）を確認し、現在の値をユーザーに提示してユーザーに以下を確認します:

> `initialSelection` の `raceType`・`round`・`race` を新ラウンド（daifugo）に更新しますか？

ユーザーが更新を承認した場合、以下のように書き換えます:
```javascript
  raceType : "daifugo",
  round : {新番号},
  race : "daifugo{新番号}",
```

ユーザーが拒否した場合はそのまま次へ進みます。

### 4. rankanalytics.html のタイムスタンプ更新

`rankanalytics.html` 内の以下の行:
```html
  <script type='text/javascript' src='js/rankanalytics.js?{タイムスタンプ}'></script>
```

タイムスタンプ部分（`?` 以降の数字）を、今日の日時（JST・`YYYYMMDDHHmm` 形式）に書き換えます。

- 例: 今日が 2026-06-18 で作業時刻が 19:00 JST なら → `js/rankanalytics.js?202606181900`
- タイムスタンプは分単位まで含めます（12桁）。

### 5. 確認とレポート

変更後、変更内容のサマリーをユーザーに報告してください:
- 更新した既存エントリ名と新 endTime（YYYY/MM/DD）
- 追加した新エントリ名、beginTime（YYYY/MM/DD）、endTime（YYYY/MM/DD・曜日）
- initialSelection の変更有無（変更した場合は新しい値）
- rankanalytics.html のタイムスタンプ（更新後の値）
