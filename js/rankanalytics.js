var PREDICTION_TYPE_LINEAR = 0;
var PREDICTION_TYPE_RANGE = 1;

var UPDATE_TYPE_EIGHT_HOURS = 0;
var UPDATE_TYPE_ONE_DAY = 1;
var INTERVAL_HOUR = [8, 24];

var RADER_MAX_RATE = 0.6;

// 各レース情報定義領域 開始位置

var RACE_TYPE_CONFIG_MAP = {
  daifugom : {
    name : '大富豪決定戦',
    rounds : [
      {id : 7,name : '第7回'},
      {id : 6,name : '第6回'},
      {id : 5,name : '第5回'},
      {id : 4,name : '第4回'},
      {id : 3,name : '第3回'},
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'}]
  },
  daifugo : {
    name : '大富豪段位戦',
    rounds : [
      {id : 16,name : '第16回'},
      {id : 15,name : '第15回'},
      {id : 14,name : '第14回'},
      {id : 13,name : '第13回'},
      {id : 12,name : '第12回'},
      {id : 11,name : '第11回'},
      {id : 10,name : '第10回'},
      {id : 9,name : '第9回'},
      {id : 8,name : '第8回'},
      {id : 7,name : '第7回'},
      {id : 6,name : '第6回'},
      {id : 5,name : '第5回'},
      {id : 4,name : '第4回'},
      {id : 3,name : '第3回'},
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'}]
  },
  slimerace : {
    name : 'スライムレース',
    rounds : [
      {id : 8,name : '第8回'},
      {id : 7,name : '第7回'},
      {id : 6,name : '第6回'},
      {id : 5,name : '第5回'}]
  },
  casinoraid : {
    name : 'カジノレイド',
    rounds : [
      {id : 6,name : '第6回'},
      {id : 5,name : '第5回'},
      {id : 4,name : '第4回'},
      {id : 3,name : '第3回'},
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'}]
  },
  fishing : {
    name : 'フィッシングコンテスト',
    rounds : [
      {id : 8,name : '第8回'},
      {id : 7,name : '第7回'},
      {id : 6,name : '第6回'},
      {id : 5,name : '第5回'},
      {id : 4,name : '第4回'},
      {id : 3,name : '第3回'},
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'}]
  },
  pencil : {
    name : 'バトエン大会',
    rounds : [
      {id : 9,name : '第4回マイデッキ'},
      {id : 8,name : '第4回タクティカル'},
      {id : 7,name : '第3回マイデッキ'},
      {id : 6,name : '第3回タクティカル'},
      {id : 5,name : '第2回マイデッキ'},
      {id : 4,name : '第2回タクティカル'},
      {id : 3,name : '第1回マイデッキ'},
      {id : 2,name : '第1回タクティカル'}]
  }
};

var RACE_10_100_LINEAR = [
  {
    rankIndex : 0,
    borderName : '1位境界',
    predictionName : '1位予測'
  },
  {
    rankIndex : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    rankIndex : 99,
    borderName : '100位境界',
    predictionName : '100位予測'
  }
];
var RACE_10_100_RANGE = [
  {
    rankIndex : 0,
    borderName : '1位境界',
    predictionName : '1位継続'
  },
  {
    rankIndex : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    rankIndex : 99,
    borderName : '100位境界',
    predictionName : '100位予測'
  }
];
var RACE_10_100_200_RANGE = [
  {
    rankIndex : 0,
    borderName : '1位境界',
    predictionName : '1位継続'
  },
  {
    rankIndex : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    rankIndex : 99,
    borderName : '100位境界',
    predictionName : '100位予測'
  },
  {
    rankIndex : 199,
    borderName : '200位境界',
    predictionName : '200位予測'
  }
];
var RACE_10_100_1000_LINEAR = [
  {
    rankIndex : 0,
    borderName : '1位境界',
    predictionName : '1位予測'
  },
  {
    rankIndex : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    rankIndex : 99,
    borderName : '100位境界',
    predictionName : '100位予測'
  },
  {
    rankIndex : 999,
    borderName : '1000位境界',
    predictionName : '1000位予測'
  }
];

// カンマ区切りにした後末尾に単位を付加した文字列を返却する関数を返却
var NORMAL_FORMATTER_GENERATOR = function(str){
  return function(x) {return Math.floor(x).toLocaleString() + str; }
}

// 釣り用のフォーマッタ
var FISHING_FORMATTER = function (x) { return (x * 0.1).toFixed(1) + 'cm';}

var RACE_CONFIG_MAP = {
  daifugom7 : {
    title : '第7回大富豪決定戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2025,0,1,12,0),
    endTime : new Date(2025,0,14,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugom6 : {
    title : '第6回大富豪決定戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2024,4,1,12,0),
    endTime : new Date(2024,4,13,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugom5 : {
    title : '第5回大富豪決定戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2023,7,30,12,0),
    endTime : new Date(2023,8,11,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugom4 : {
    title : '第4回大富豪決定戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2023,0,4,12,0),
    endTime : new Date(2023,0,16,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugom3 : {
    title : '第3回大富豪決定戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2022,4,25,12,0),
    endTime : new Date(2022,5,6,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugom2 : {
    title : '第2回大富豪決定戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2021,7,18,12,0),
    endTime : new Date(2021,7,30,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugom1 : {
    title : '第1回大富豪決定戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2021,0,6,0,0),
    endTime : new Date(2021,0,24,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo16 : {
    title : '第16回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2025,0,29,0,0),
    endTime : new Date(2025,4,15,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo15 : {
    title : '第15回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2024,9,23,0,0),
    endTime : new Date(2025,0,30,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo14 : {
    title : '第14回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2024,6,10,0,0),
    endTime : new Date(2024,9,24,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo13 : {
    title : '第13回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2024,2,21,0,0),
    endTime : new Date(2024,6,11,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo12 : {
    title : '第12回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2023,9,5,0,0),
    endTime : new Date(2024,2,21,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo11 : {
    title : '第11回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2023,5,14,0,0),
    endTime : new Date(2023,9,6,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo10 : {
    title : '第10回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2023,1,1,0,0),
    endTime : new Date(2023,5,15,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo9 : {
    title : '第9回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2022,9,19,0,0),
    endTime : new Date(2023,1,2,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo8 : {
    title : '第8回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2022,6,6,0,0),
    endTime : new Date(2022,9,20,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo7 : {
    title : '第7回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2022,2,17,0,0),
    endTime : new Date(2022,6,7,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo6 : {
    title : '第6回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2021,10,12,0,0),
    endTime : new Date(2022,2,17,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo5 : {
    title : '第5回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2021,6,8,0,0),
    endTime : new Date(2021,10,11,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo4 : {
    title : '第4回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2021,2,31,0,0),
    endTime : new Date(2021,6,9,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo3 : {
    title : '第3回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2020,11,23,0,0),
    endTime : new Date(2021,3,1,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo2 : {
    title : '第2回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2020,8,16,0,0),
    endTime : new Date(2020,11,24,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  daifugo1 : {
    title : '第1回大富豪段位戦ランキング',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2020,5,3,0,0),
    endTime : new Date(2020,8,17,0,0),
    updateType : UPDATE_TYPE_ONE_DAY,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  slimerace8 : {
    title : '第8回スライムレース',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2025,3,9,12,0),
    endTime : new Date(2025,3,21,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_LINEAR,
    rankBorder : 100
  },
  slimerace7 : {
    title : '第7回スライムレース',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2024,0,10,12,0),
    endTime : new Date(2024,0,22,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_LINEAR,
    rankBorder : 100
  },
  slimerace6 : {
    title : '第6回スライムレース',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2021,8,1,12,0),
    endTime : new Date(2021,8,13,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_LINEAR,
    rankBorder : 100
  },
  slimerace5 : {
    title : '第5回スライムレース',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2020,0,9,12,0),
    endTime : new Date(2020,0,27,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_LINEAR,
    rankBorder : 100
  },
  casinoraid6 : {
    title : '第6回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2025,0,15,12,0),
    endTime : new Date(2025,0,27,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ポーカー','スロット','ルーレット','ビンゴ'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  casinoraid5 : {
    title : '第5回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2023,10,29,12,0),
    endTime : new Date(2023,11,11,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ポーカー','スロット','ルーレット','ビンゴ'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  casinoraid4 : {
    title : '第4回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2022,8,21,12,0),
    endTime : new Date(2022,9,3,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ポーカー','スロット','ルーレット','ビンゴ'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  casinoraid3 : {
    title : '第3回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2021,3,21,12,0),
    endTime : new Date(2021,4,3,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ポーカー','スロット','ルーレット','ビンゴ'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  casinoraid2 : {
    title : '第2回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2019,7,28,12,0),
    endTime : new Date(2019,8,8,12,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ポーカー','スロット','ルーレット'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  casinoraid1 : {
    title : '第1回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2017,11,1,12,0),
    endTime : new Date(2017,11,12,12,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ポーカー','スロット','ルーレット'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  fishing8 : {
    title : '第8回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2024,7,14,12,0),
    endTime : new Date(2024,8,2,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  fishing7 : {
    title : '第7回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2023,6,27,12,0),
    endTime : new Date(2023,7,14,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  fishing6 : {
    title : '第6回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2021,8,29,12,0),
    endTime : new Date(2021,9,11,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  fishing5 : {
    title : '第5回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2020,10,4,12,0),
    endTime : new Date(2020,10,15,4,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  fishing4 : {
    title : '第4回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2019,4,8,12,0),
    endTime : new Date(2019,4,19,12,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  fishing3 : {
    title : '第3回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2018,8,21,12,0),
    endTime : new Date(2018,8,30,12,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  fishing2 : {
    title : '第2回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2017,7,25,12,0),
    endTime : new Date(2017,8,4,12,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  fishing1 : {
    title : '第1回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2017,0,19,12,0),
    endTime : new Date(2017,0,31,12,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['最大ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  pencil9 : {
    title : '第4回マイデッキピックルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2023,10,8,12,0),
    endTime : new Date(2023,10,19,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  pencil8 : {
    title : '第4回タクティカルピックルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2023,9,25,12,0),
    endTime : new Date(2023,10,5,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  pencil7 : {
    title : '第3回マイデッキルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2022,0,27,12,0),
    endTime : new Date(2022,1,6,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  pencil6 : {
    title : '第3回タクティカルピックルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2022,0,13,12,0),
    endTime : new Date(2022,0,23,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  pencil5 : {
    title : '第2回マイデッキルール',
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    predictionType : PREDICTION_TYPE_LINEAR,
    beginTime : new Date(2019,11,5,12,0),
    endTime : new Date(2019,11,15,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  pencil4 : {
    title : '第2回タクティカルピックルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2019,10,21,12,0),
    endTime : new Date(2019,11,1,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  pencil3 : {
    title : '第1回マイデッキルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2018,10,21,12,0),
    endTime : new Date(2018,11,1,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  pencil2 : {
    title : '第1回タクティカルピックルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2018,10,8,12,0),
    endTime : new Date(2018,10,18,20,0),
    updateType : UPDATE_TYPE_EIGHT_HOURS,
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },

}

// 各レース情報定義領域 終了位置

// 祝日データを定義
// 12/30～1/3は祝日とみなす

var HOLIDAYS = [
  new Date('2020/1/1'),
  new Date('2020/1/2'),
  new Date('2020/1/3'),
  new Date('2020/1/13'),
  new Date('2020/2/11'),
  new Date('2020/2/23'),
  new Date('2020/2/24'),
  new Date('2020/3/20'),
  new Date('2020/4/29'),
  new Date('2020/5/3'),
  new Date('2020/5/4'),
  new Date('2020/5/5'),
  new Date('2020/5/6'),
  new Date('2020/7/23'),
  new Date('2020/7/24'),
  new Date('2020/8/10'),
  new Date('2020/9/21'),
  new Date('2020/9/22'),
  new Date('2020/11/3'),
  new Date('2020/11/23'),
  new Date('2020/12/30'),
  new Date('2020/12/31'),
  new Date('2021/1/1'),
  new Date('2021/1/2'),
  new Date('2021/1/3'),
  new Date('2021/1/11'),
  new Date('2021/2/11'),
  new Date('2021/2/23'),
  new Date('2021/3/20'),
  new Date('2021/4/29'),
  new Date('2021/5/3'),
  new Date('2021/5/4'),
  new Date('2021/5/5'),
  new Date('2021/7/22'),
  new Date('2021/7/23'),
  new Date('2021/8/8'),
  new Date('2021/8/9'),
  new Date('2021/9/20'),
  new Date('2021/9/23'),
  new Date('2021/11/3'),
  new Date('2021/11/23'),
  new Date('2021/12/30'),
  new Date('2021/12/31'),
  new Date('2022/1/1'),
  new Date('2022/1/2'),
  new Date('2022/1/3'),
  new Date('2022/1/10'),
  new Date('2022/2/11'),
  new Date('2022/2/23'),
  new Date('2022/3/21'),
  new Date('2022/4/29'),
  new Date('2022/5/3'),
  new Date('2022/5/4'),
  new Date('2022/5/5'),
  new Date('2022/7/18'),
  new Date('2022/8/11'),
  new Date('2022/9/19'),
  new Date('2022/9/23'),
  new Date('2022/10/10'),
  new Date('2022/11/3'),
  new Date('2022/11/23'),
  new Date('2022/12/30'),
  new Date('2022/12/31'),
  new Date('2023/1/1'),
  new Date('2023/1/2'),
  new Date('2023/1/3'),
  new Date('2023/1/9'),
  new Date('2023/2/11'),
  new Date('2023/2/23'),
  new Date('2023/3/21'),
  new Date('2023/4/29'),
  new Date('2023/5/3'),
  new Date('2023/5/4'),
  new Date('2023/5/5'),
  new Date('2023/7/17'),
  new Date('2023/8/11'),
  new Date('2023/9/18'),
  new Date('2023/9/23'),
  new Date('2023/10/9'),
  new Date('2023/11/3'),
  new Date('2023/11/23'),
  new Date('2023/12/30'),
  new Date('2023/12/31'),
  new Date('2024/1/1'),
  new Date('2024/1/2'),
  new Date('2024/1/3'),
  new Date('2024/1/8'),
  new Date('2024/2/11'),
  new Date('2024/2/12'),
  new Date('2024/2/23'),
  new Date('2024/3/20'),
  new Date('2024/4/29'),
  new Date('2024/5/3'),
  new Date('2024/5/4'),
  new Date('2024/5/5'),
  new Date('2024/5/6'),
  new Date('2024/7/15'),
  new Date('2024/8/11'),
  new Date('2024/8/12'),
  new Date('2024/9/16'),
  new Date('2024/9/22'),
  new Date('2024/9/23'),
  new Date('2024/10/14'),
  new Date('2024/11/3'),
  new Date('2024/11/4'),
  new Date('2024/11/23'),
  new Date('2024/12/30'),
  new Date('2024/12/31'),
  new Date('2025/1/1'),
  new Date('2025/1/2'),
  new Date('2025/1/3'),
  new Date('2025/1/1'),
  new Date('2025/1/13'),
  new Date('2025/2/11'),
  new Date('2025/2/23'),
  new Date('2025/2/24'),
  new Date('2025/3/20'),
  new Date('2025/4/29'),
  new Date('2025/5/3'),
  new Date('2025/5/4'),
  new Date('2025/5/5'),
  new Date('2025/5/6'),
  new Date('2025/7/21'),
  new Date('2025/8/11'),
  new Date('2025/9/15'),
  new Date('2025/9/23'),
  new Date('2025/10/13'),
  new Date('2025/11/3'),
  new Date('2025/11/23'),
  new Date('2025/11/24'),
  new Date('2025/12/30'),
  new Date('2025/12/31'),
  ];

// ページ遷移の際、1位-(10+[この値])位 → 11位 - (20 + [この値])位というように
// この値分下位のキャラのデータを表示するようにする。
var TARGET_RANK_LOWER_INTERVAL = 10;

// 順位グラフ表示の際、過去の順位について、表示最下位順位 + この値までを表示するようにする。
var DISPLAY_RANK_UPPER_INTERVAL = 10;
var DISPLAY_RANK_LOWER_INTERVAL = 10;

// キャラ個別画面で表示される履歴の最大数
var DISPLAY_HISTORY_NUM = 5;

// レーダーの直近サンプリング数
var RADAR_SAMPLE_NUM = 3;

// 差分ランキングの表示限界
var DISPLAY_DIFF_RANK_MAX = 100;

// レースデータ保持領域
var data;

// 選択情報保持領域 初期選択状態を定義
var initialSelection = {
  screen : 0,
  raceType : "daifugo",
  round : 16,
  race : "daifugo16",
  subrace : 0,
  targetRank : 1,
  targetRankInterval : 10,
  characterId : 0,
  diffRankIndex : 0
};

var selection = Object.create(initialSelection);

var nameIdMapper;

var currentPeriod;
var modifiedCurrentPeriod;
var allPeriod;
var timeIndexMapperAll;
var timeIndexMapper;

var subraceSelectionTemplate;
var raceTypeSelectionTemplate;
var roundSelectionTemplate;
var characterTableTemplate;
var diffRankTableTemplate;

var strengthRadarChart;

function isHoliday(d) {
  for(var i=0;i<HOLIDAYS.length;i++) {
    var t=HOLIDAYS[i];
    if(t.getFullYear() == d.getFullYear() && t.getMonth() == d.getMonth() && t.getDate() == d.getDate()){
      return true;
    }
  }
  return false;
}

function timeStringFormatter(d){
  return d.getFullYear() +'/' + (d.getMonth() + 1) +'/'+ d.getDate() + ' ' + d.getHours() + '時'
}

function calculateTimeMappers(snapshotList){
  // データの存在しない時刻を判定するための配列
  var emptyTimes = new Array(currentPeriod.length);
  emptyTimes.fill(true);

  // サンプル数が1以下の時は イベント開始時刻を軸に加える
  if(snapshotList.length <= 1) {
    emptyTimes[0] = false;
  }

  // スナップショットのIndexからallPetiodの時刻Indexを逆引きする配列を作成
  timeIndexMapperAll = new Array(snapshotList.length);

  // 欠けている時刻を判定する。
  for (var i = 0,j = 0; i < snapshotList.length; i++) {
    var snapshotTime = snapshotList[i].date;

    while(j < currentPeriod.length && currentPeriod[j] < snapshotTime){
      j++;
    }

    var k=Math.min(j,currentPeriod.length - 1);
    timeIndexMapperAll[i]=k;
    emptyTimes[k]=false;
  }

  // 欠けている時刻を除去した新たなX軸データを作成する
  modifiedCurrentPeriod = currentPeriod.slice();

  for (var i = modifiedCurrentPeriod.length-1;i>=0;i--){
    if(emptyTimes[i]){
      modifiedCurrentPeriod.splice(i,1);
    }
  }

  // スナップショットのIndexからmodifiedCurrentPeriodの時刻Indexを逆引きする配列を作成
  timeIndexMapper = new Array(snapshotList.length);

  for (var i = 0,j = 0; i < snapshotList.length; i++) {
    var snapshotTime = snapshotList[i].date;

    while(j < modifiedCurrentPeriod.length && modifiedCurrentPeriod[j] < snapshotTime){
      j++;
    }

    timeIndexMapper[i] = Math.min(j,modifiedCurrentPeriod.length - 1);
  }
}


function displayDashboard(){
  $('#dashboard').removeClass('ra-hidden');
  $('#selectDashboard').addClass('active');

  for(var i=0;i<4;i++) {
    $('#border' + i + ' .borderName').text('');
    $('#border' + i + ' .latest').text('');
    $('#border' + i + ' .prediction').text('');
  }

  var raceConfig = RACE_CONFIG_MAP[selection.race];

  var snapshotList = data.subraceList[selection.subrace].snapshotList;

  // 表示最下位ランクを計算
  var endRank=Math.min(
    selection.targetRank + selection.targetRankInterval + TARGET_RANK_LOWER_INTERVAL -1,
    raceConfig.rankBorder);

  // インデックスを超えないよう、表示キャラ数を計算
  // 最新snapshotでのrankListの開始インデックスを計算
  var startIndex;
  var latestSnapshot = snapshotList[snapshotList.length-1];
  for(startIndex = 0;startIndex < latestSnapshot.rankList.length;startIndex++){
    if(latestSnapshot.rankList[startIndex].rank >= selection.targetRank){
      break;
    }
  }

  // 最新snapshotでのrankListの終了インデックスに1足した値を計算
  var endIndex;
  for(endIndex = startIndex;endIndex < latestSnapshot.rankList.length;endIndex++){
    if(latestSnapshot.rankList[endIndex].rank >= endRank){
      break;
    }
  }
  endIndex = Math.min(endIndex + 1, latestSnapshot.rankList.length);

  // 表示数を計算
  var rankLength = endIndex - startIndex;

  if(rankLength <=0){
    alert('表示領域が不正です');
    return;
  }  

  $('#displayRankString').text(
    selection.targetRank + '位～' + endRank + '位');

  // 各キャラのデータを格納する配列を作成
  var rankColumns = new Array(rankLength);
  var pointColumns = new Array(rankLength);

  // 最新時刻のランキング者を表示対象として記憶する
  var displayIds = new Array(rankLength);

  calculateTimeMappers(snapshotList);

  // 前回のスナップショットで登場したIDを記録
  previousIdSet = {};
  if (snapshotList.length > 1 ) {
    for (var i=0;i< snapshotList[snapshotList.length - 2].rankList.length;i++) {
      previousIdSet[snapshotList[snapshotList.length - 2].rankList[i].id] = true;
    }
  }

  nameIdMapper = {};

  for (var i = 0,nameMap = {}; i < rankLength; i++) {
    rankColumns[i] = new Array(modifiedCurrentPeriod.length + 1);
    rankColumns[i].fill(null, 1);

    pointColumns[i] = new Array(modifiedCurrentPeriod.length + 1);
    pointColumns[i].fill(null, 1);

    var id = snapshotList[snapshotList.length - 1].rankList[startIndex +i].id;
    displayIds[i] = id;

    var name = snapshotList[snapshotList.length - 1].rankList[startIndex +i].name;

    if(name in nameMap){
      nameMap[name] = nameMap[name] + 1;
      name = name + nameMap[name];
    } else {
      nameMap[name] = 1;
    }

    //前日にいなかった人にはしるしをつける
    if(!(id in previousIdSet)) {
      name = name + '*';
    }

    nameIdMapper[name] = id;

    rankColumns[i][0] = name;
    pointColumns[i][0] = name;
  }

  for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {

    for (var i = 0; i < snapshotList[snapshotIndex].rankList.length; i++) {
      var currentId = snapshotList[snapshotIndex].rankList[i].id;
      var columnIndex = displayIds.indexOf(currentId);

      if (columnIndex != -1) {
        pointColumns[columnIndex][1 + timeIndexMapper[snapshotIndex]] = snapshotList[snapshotIndex].rankList[i].point;

        //ランクは、特定の領域内にある場合のみ表示する
        if(snapshotList[snapshotIndex].rankList[i].rank >= selection.targetRank -DISPLAY_RANK_UPPER_INTERVAL
          && snapshotList[snapshotIndex].rankList[i].rank <= endRank +DISPLAY_RANK_LOWER_INTERVAL){
          // グラフを逆順に並べる方法として、順位の値はマイナスでグラフを生成し、表示時に再度プラスに置き換える
          rankColumns[columnIndex][1 + timeIndexMapper[snapshotIndex]] = -snapshotList[snapshotIndex].rankList[i].rank;
        }
      }
    }
  }

  var actualBorderColumns = new Array(raceConfig.borders.length);
  var predictedBorderColumns = new Array(raceConfig.borders.length);
  var borderRegions = {};

  for (var i = 0; i < raceConfig.borders.length; i++) {
    actualBorderColumns[i] = new Array(allPeriod.length + 1);
    actualBorderColumns[i][0] = raceConfig.borders[i].borderName;
    actualBorderColumns[i].fill(null,1);

    for (var j = 0; j < snapshotList.length; j++) {
      var snapshot = snapshotList[j];

      actualBorderColumns[i][timeIndexMapperAll[j] + 1] = snapshot.rankList[snapshot.rankMapper[raceConfig.borders[i].rankIndex]].point;
    }
 
    predictedBorderColumns[i] = new Array(allPeriod.length + 1);
    predictedBorderColumns[i][0] = raceConfig.borders[i].predictionName;
    predictedBorderColumns[i].fill(null,1);

    $('#border' + i + ' .borderName').text(raceConfig.borders[i].borderName);
    $('#border' + i + ' .latest').text(raceConfig.numberFormatter(snapshot.rankList[snapshot.rankMapper[raceConfig.borders[i].rankIndex]].point));

    if (raceConfig.predictionType == PREDICTION_TYPE_LINEAR) {
      actualBorderColumns[i][1] = 0;
      predictedBorderColumns[i][1] = 0;

      var currentTimeIndex = timeIndexMapperAll[snapshotList.length - 1];

      if(currentTimeIndex > 0){
        var snapshot = snapshotList[snapshotList.length - 1];

        var averagePointDiff = snapshot.rankList[snapshot.rankMapper[raceConfig.borders[i].rankIndex]].point / currentTimeIndex;

        predictedBorderColumns[i][allPeriod.length] = Math.floor(averagePointDiff * (allPeriod.length - 1));

        $('#border' + i + ' .prediction').text(raceConfig.numberFormatter(predictedBorderColumns[i][allPeriod.length]));
      }

      borderRegions[raceConfig.borders[i].predictionName] = [{ 'start': raceConfig.beginTime }];
    } else {
      var snapshot = snapshotList[snapshotList.length - 1];

      var currentTimeIndex = timeIndexMapperAll[snapshotList.length - 1];
      if(currentTimeIndex > 0){
        for(var timeIndex = currentTimeIndex;timeIndex < allPeriod.length;timeIndex++) {
          // 順位に 経過期間/計算対象時刻 を掛けて、最終日値が現在の何位に相当するかを小数ありで求める
          var predictedRankIndex = Math.max((raceConfig.borders[i].rankIndex + 1) * currentTimeIndex / timeIndex -1,0);

          // 小数部分は線形補完する

          var lowerRankIndex = Math.floor(predictedRankIndex);
          var lowerDiff = predictedRankIndex - lowerRankIndex;
          var upperRankIndex = Math.min(lowerRankIndex + 1,raceConfig.rankBorder-1);
          var upperDiff = 1 - lowerDiff;

          predictedBorderColumns[i][timeIndex+1] = snapshot.rankList[snapshot.rankMapper[lowerRankIndex]].point * upperDiff + snapshot.rankList[snapshot.rankMapper[upperRankIndex]].point * lowerDiff;
        }
        $('#border' + i + ' .prediction').text(raceConfig.numberFormatter(predictedBorderColumns[i][allPeriod.length]));
      } else {
        actualBorderColumns[i][1] = 0;
        predictedBorderColumns[i][1] = 0;
      }

      borderRegions[raceConfig.borders[i].predictionName] = [{ 'start': currentTime }];
    }

  }


  var rank = c3.generate({
    bindto: '#rank',
    data: {
      x : 'x',
      columns: [['x'].concat(modifiedCurrentPeriod)].concat(rankColumns),
      onclick : function (d, element) {
        selection.characterId = nameIdMapper[d.id];
        selection.screen = 1;
        display();
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m/%d %H'
        }
      },
      y: {
        tick: {
          format: function (x) { return -x; }
        }
      }
    },
    legend: {
      item: {
        onclick: function (id) {
          selection.characterId = nameIdMapper[id];
          selection.screen = 1;
          display();
        } 
      }
    }
  });

  var point = c3.generate({
    bindto: '#point',
    data: {
      x : 'x',
      columns: [['x'].concat(modifiedCurrentPeriod)].concat(pointColumns),
      onclick : function (d, element) {
        selection.characterId = nameIdMapper[d.id];
        selection.screen = 1;
        display();
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m/%d %H'
        }
      },
      y: {
        tick: {
          format: raceConfig.numberFormatter
        }
      }
    },
    legend: {
      item: {
        onclick: function (id) {
          selection.characterId = nameIdMapper[id];
          selection.screen = 1;
          display();
        } 
      }
    }
  });

  var border = c3.generate({
    bindto: '#border',
    data: {
      x : 'x',
      columns: [['x'].concat(allPeriod)].concat(actualBorderColumns,predictedBorderColumns),
      regions: borderRegions
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m/%d %H'
        }
      },
      y: {
        tick: {
          format: raceConfig.numberFormatter
        }
      }
    },
    line: {
      connectNull: true
    }

  });
}

function displayCharacter(){
  $('#character').removeClass('ra-hidden');
  $('#selectCharacter').addClass('active');

  var raceConfig = RACE_CONFIG_MAP[selection.race];

  if(raceConfig.predictionType == PREDICTION_TYPE_LINEAR){
    $('#character').find('.ra-linear-only').removeClass('ra-hidden');
  } else {
    $('#character').find('.ra-linear-only').addClass('ra-hidden');
  }

  var snapshotList = data.subraceList[selection.subrace].snapshotList;
  var name = data.subraceList[selection.subrace].displayNameList[selection.characterId].name;
  var i = snapshotList[snapshotList.length-1].idMapper[selection.characterId];
  var s = (i==null)?'ランク外':snapshotList[snapshotList.length-1].rankList[i].rank+'位';

  $('#characterTitle').text('最新' + s + ' ' + name + 'のステータス');
  $('#characterPointTitle').text(name + 'のスコア');
  $('#characterRankTitle').text(name + 'の順位');
  $('#characterTableTitle').text(name + 'の履歴');
  $('#characterStrengthTitle').text(name + 'の強さ');

  
  calculateTimeMappers(snapshotList);

  // キャラクターデータを表示
  var parentDom = $('#characterTable');
  parentDom.find('.ra-dynamic').remove();
  
  for(var i = snapshotList.length-1;
      i>snapshotList.length-1-DISPLAY_HISTORY_NUM && i>=0;i--){

    var newDom = characterTableTemplate.clone();
    var j = snapshotList[i].idMapper[selection.characterId];

    if(j == null){
      newDom.children('.rank').text('-');
      newDom.children('.point').text('(ランク外)');
    } else {
      newDom.children('.rank').text(snapshotList[i].rankList[j].rank+'位');
      newDom.children('.point').text(raceConfig.numberFormatter(snapshotList[i].rankList[j].point));
    }
    newDom.children('.date').text(timeStringFormatter(snapshotList[i].date));
    parentDom.append(newDom);
  }

  // ポイントグラフを生成
  var pointColumns = new Array(modifiedCurrentPeriod.length);
  pointColumns.fill(null);
  var pointDiffColumns = new Array(modifiedCurrentPeriod.length);
  pointDiffColumns.fill(null);

  for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {
    var timeIndex = timeIndexMapper[snapshotIndex];
    var rankIndex = snapshotList[snapshotIndex].idMapper[selection.characterId];
    if(rankIndex != null){
      pointColumns[timeIndex] = snapshotList[snapshotIndex].rankList[rankIndex].point;
    }

    if(snapshotList[snapshotIndex].diffCount > 0){
      var d = snapshotList[snapshotIndex].diffs[selection.characterId];
      if(d != null){
        pointDiffColumns[timeIndex] = d/snapshotList[snapshotIndex].diffCount;
      }
    }
  }

  var point = c3.generate({
    bindto: '#characterPoint',
    data: {
      x : 'x',
      columns: [['x'].concat(modifiedCurrentPeriod)].concat([['スコア'].concat(pointColumns)], [['差分'].concat(pointDiffColumns)]),
      types: {
        'スコア' : 'line',
        '差分' : 'bar'
      },
      axes: {
        'スコア': 'y',
        '差分': 'y2'
      },
      colors: {
        '差分' : '#2e8b57'
      }
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m/%d %H'
        }
      },
      y: {
        tick: {
          format: raceConfig.numberFormatter
        }
      },
      y2: {
        show: true,
        tick: {
          format: raceConfig.numberFormatter
        }
      }
    },
  });

  //ランクグラフを生成
  var rankColumns = new Array(modifiedCurrentPeriod.length);
  rankColumns.fill(null);
  for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {
    var timeIndex = timeIndexMapper[snapshotIndex];
    var rankIndex = snapshotList[snapshotIndex].idMapper[selection.characterId];
    if(rankIndex != null){
      rankColumns[timeIndex] = -snapshotList[snapshotIndex].rankList[rankIndex].rank;
    }
  }

  var rank = c3.generate({
    bindto: '#characterRank',
    data: {
      x : 'x',
      columns: [['x'].concat(modifiedCurrentPeriod)].concat([['ランク'].concat(rankColumns)])
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m/%d %H'
        }
      },
      y: {
        tick: {
          format: function (x) { return -x; }
        }
      },
    },
  });


  var allAverage;
  var recentAverage;
  var labels;
  var maxValue;
  if(raceConfig.updateType == UPDATE_TYPE_ONE_DAY) {
    // レーダーチャートグラフを生成
    // 0:日、1:月、2:火、3:水、4:木、5:金、6:土
    var allDiffs = new Array(7);
    for(var i=0;i<7;i++){
      allDiffs[i]=[];
    }

    for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {
      var rankIndex = snapshotList[snapshotIndex].idMapper[selection.characterId];
      if(rankIndex != null && snapshotList[snapshotIndex].diffCount==1){
        // 前日の曜日で差分を表示する
        var index = (snapshotList[snapshotIndex].date.getDay() + 6)%7;

        allDiffs[index].push(snapshotList[snapshotIndex].diffs[selection.characterId]);
      }
    }
    allAverage = new Array(7);
    allAverage.fill(0);
    recentAverage = new Array(7);
    recentAverage.fill(0);
    for(var i=0;i<7;i++){
      if(allDiffs[i].length > 0){
        var total = 0;
        for(var j=0;j<allDiffs[i].length;j++) {
          total+=allDiffs[i][j];
        }
        allAverage[i]=Math.floor(total/allDiffs[i].length);

        total = 0;
        var recentDiffs = allDiffs[i].slice(Math.max(allDiffs[i].length-RADAR_SAMPLE_NUM,0));
        for(var j=0;j<recentDiffs.length;j++) {
          total+=recentDiffs[j];
        }
        recentAverage[i]=Math.floor(total/recentDiffs.length);
      }
    }

    labels = ['日','月','火','水','木','金','土'];

    maxValue = Math.floor(data.subraceList[selection.subrace].maxDiff * RADER_MAX_RATE);

  } else {
    // レーダーチャートグラフを生成
    // 0:休日20-4、1:休日4-12、2:休日12-20、3:平日20-4、4:平日4-12、5:平日12-20
    var allDiffs = new Array(6);
    for(var i=0;i<6;i++){
      allDiffs[i]=[];
    }

    for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {
      var rankIndex = snapshotList[snapshotIndex].idMapper[selection.characterId];
      if(rankIndex != null && snapshotList[snapshotIndex].diffCount==1){
        var d = new Date(snapshotList[snapshotIndex].date);

        // 午前4時の場合は前日の日付で休日判定を行う。
        if(d.getHours() <= 4){
          d.setDate(d.getDate()-1);
        }

        // 休日は、祝日もしくは土曜日もしくは日曜日とする
        // index値を取得
        var index = (d.getHours() - 4)/8 + ((d.getDay() == 0 || d.getDay() == 6 || isHoliday(d)) ? 0 : 3);

        allDiffs[index].push(snapshotList[snapshotIndex].diffs[selection.characterId]);
      }
    }
    allAverage = new Array(6);
    allAverage.fill(0);
    recentAverage = new Array(6);
    recentAverage.fill(0);
    for(var i=0;i<6;i++){
      if(allDiffs[i].length > 0){
        var total = 0;
        for(var j=0;j<allDiffs[i].length;j++) {
          total+=allDiffs[i][j];
        }
        allAverage[i]=Math.floor(total/allDiffs[i].length);

        total = 0;
        var recentDiffs = allDiffs[i].slice(Math.max(allDiffs[i].length-RADAR_SAMPLE_NUM,0));
        for(var j=0;j<recentDiffs.length;j++) {
          total+=recentDiffs[j];
        }
        recentAverage[i]=Math.floor(total/recentDiffs.length);
      }
    }

    labels = ['休日20-4','休日4-12','休日12-20','平日20-4','平日4-12','平日12-20'];

    maxValue = Math.floor(data.subraceList[selection.subrace].maxDiff * RADER_MAX_RATE);
  }

  var ctx = $('#characterStrength');
  if(strengthRadarChart){
    strengthRadarChart.destroy();
  }

  strengthRadarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets : [{
        label : '直近'+RADAR_SAMPLE_NUM+'回',
        data : recentAverage,
        borderColor :'rgb(255,105,180)',
        backgroundColor :'rgba(255,105,180,0.4)'
      },{
        label : '全期間',
        data : allAverage,
        borderColor :'rgb(65,104,225)',
        backgroundColor :'rgba(65,104,225,0.4)'
      }]
    }, 
    options: {
      legend: {
         display: false
      },
      scale: {
        ticks: {
            maxTicksLimit : 5,
            min : 0,
            max : maxValue,
            callback : function(value, index, values) {return raceConfig.numberFormatter(value);}
        }
      },
      tooltips: {
        mode: 'index',
        callbacks: {
          title : function(tooltipItem, data) {
            return data.labels[tooltipItem[0].index];
          },
          label : function(tooltipItem, data) {
            return data.datasets[tooltipItem.datasetIndex].label+':'+raceConfig.numberFormatter(tooltipItem.value);
          }
        }
      }
    }  
  });

}

function displayDiffRank(){
  $('#diffRank').removeClass('ra-hidden');
  $('#selectDiffRank').addClass('active');

  var raceConfig = RACE_CONFIG_MAP[selection.race];

  var snapshotList = data.subraceList[selection.subrace].snapshotList;

  var displayNameList = data.subraceList[selection.subrace].displayNameList

  var characterLength = displayNameList.length
  var diffRankTable = new Array(characterLength);
  diffRankTable.fill(null);

  // 各キャラクターの差分値とIDを記録
  for(var i=0;i<diffRankTable.length;i++) {
    diffRankTable[i] = {};
    diffRankTable[i]['diff'] = snapshotList[selection.diffRankIndex].diffs[i];
    diffRankTable[i]['characterId'] = i;
  }

  // 差分値降順でソート
  diffRankTable.sort(function(a, b){
    if (a.diff === null && b.diff === null) {
      return 0;
    } else if (a.diff === null){
      return 1;
    } else if (b.diff === null){
      return -1;
    } else {
      return b.diff - a.diff;
    }
  });


  // キャラクターデータを表示
  var parentDom = $('#diffRankTable');
  parentDom.find('.ra-dynamic').remove();
  
  $('#displayDiffRankString').text(timeStringFormatter(snapshotList[selection.diffRankIndex].date) + 'の差分ランキング');

  for(var i=0;i<diffRankTable.length && i<DISPLAY_DIFF_RANK_MAX;i++) {
    var newDom = diffRankTableTemplate.clone();
    newDom.children('.rank').text((i+1)+'位');
    newDom.children('.name').text(displayNameList[diffRankTable[i].characterId].name);
    
    if(diffRankTable[i].diff === null) {
      newDom.children('.point').text('データなし');
    } else {
      newDom.children('.point').text(raceConfig.numberFormatter(diffRankTable[i].diff));
    }

    newDom.on('click', {characterId : diffRankTable[i].characterId} , function(e){
      selection.characterId = e.data.characterId;
      selection.screen = 1;

      display();
    });

    parentDom.append(newDom);
  }



}

function display(){
  $('#dashboard').addClass('ra-hidden');
  $('#selectDashboard').removeClass('active');
  $('#character').addClass('ra-hidden');
  $('#selectCharacter').removeClass('active');
  $('#diffRank').addClass('ra-hidden');
  $('#selectDiffRank').removeClass('active');

  var raceConfig = RACE_CONFIG_MAP[selection.race];
  $('#raceTitle').text(raceConfig.title);

  var snapshotList = data.subraceList[0].snapshotList;
  $('#currentTime').text(timeStringFormatter(snapshotList[snapshotList.length - 1].date));

  switch (selection.screen){
    case 0:
      displayDashboard();
      break;
    case 1:
      displayCharacter();
      break;
    case 2:
      displayDiffRank();
      break;
  }
}

function resetSubraceSelection(){
  var raceConfig = RACE_CONFIG_MAP[selection.race];

  var parentDom = $('#subraceSelection');
  parentDom.children('.ra-dynamic').remove();

  for(var i=0;i<raceConfig.subraceNames.length;i++) {
    var newDom = subraceSelectionTemplate.clone();
    newDom.children().text(raceConfig.subraceNames[i]);
    if(selection.subrace == i){
      newDom.addClass('active');
    }

    newDom.on('click', {index : i} , function(e){
      selection.subrace = e.data.index;
      selection.screen = 0;

      resetSubraceSelection();
      display();
    });

    parentDom.append(newDom);
  }

}

//読み込みデータをもとに追加情報を計算
function calculate(){
  var raceConfig = RACE_CONFIG_MAP[selection.race];

  // x軸をあらかじめ計算する。
  currentPeriod = [];
  allPeriod = [];

  var snapshotList = data.subraceList[0].snapshotList;

  var currentTime = new Date(snapshotList[snapshotList.length - 1].timeString);

  for(var targetTime = new Date(raceConfig.beginTime) ;
    targetTime <= raceConfig.endTime;
    targetTime.setHours(targetTime.getHours() + INTERVAL_HOUR[raceConfig.updateType])){
      allPeriod.push(new Date(targetTime));
      if(targetTime <= currentTime){
        currentPeriod.push(new Date(targetTime));
      }
  }

  for(var i = 0; i< data.subraceList.length ; i++){
    var snapshotList = data.subraceList[i].snapshotList;

    // ランキングからrankListのインデックスの逆引き配列を計算し、snapshotList配下に追加する
    for(var j=0;j<snapshotList.length;j++) {
      var mapper = new Array(raceConfig.rankBorder);
      var rankList = snapshotList[j].rankList;
      // 該当の順位に対し、データが無い場合はそれより上位のデータを参照する。
      // ただし、1位の場合はデータが存在する最上位のデータを参照することとする。
      for(var rankIndex = 0,rankListIndex = 0; rankIndex< raceConfig.rankBorder ; rankIndex++){
        if(rankListIndex < rankList.length-1 && rankIndex + 1 == rankList[rankListIndex+1].rank){
          rankListIndex++;
        }
        mapper[rankIndex] = rankListIndex;
      }
      snapshotList[j]['rankMapper']=mapper;
      // 各snapshotのDate情報を格納する。ただし、イベント期間よりも後の時刻はイベント期間最終日時に修正される
      var d = new Date(snapshotList[j].timeString);
      if(d >= raceConfig.endTime) {
        d = raceConfig.endTime; 
      }

      snapshotList[j]['date'] = d;
    }

    // idからrankListのインデックスの逆引き配列を計算し、snapshotList配下に追加する
    for(var j=0;j<snapshotList.length;j++) {
      var mapper = new Array(data.subraceList[i].displayNameList.length);
      mapper.fill(null);

      var rankList = snapshotList[j].rankList;

      for(var rankListIndex = 0; rankListIndex< rankList.length ; rankListIndex++){
        mapper[rankList[rankListIndex].id] = rankListIndex;
      }
      snapshotList[j]['idMapper']=mapper;
    }

    // キャラクターごとの前日との差分を計算し、snaphostList配下に追加する
    // 過去最高の差分値を計算する
    var maxDiff=0;

    for(var j=0;j<snapshotList.length;j++) {
      var characterLength = data.subraceList[i].displayNameList.length
      var diffs = new Array(characterLength);
      diffs.fill(null);

      if(j>0) {
        // 8時間刻みで前回のスナップショットから何回になるか計算。
        // 基本1となることを期待
        var diffCount = (snapshotList[j].date.getTime() - snapshotList[j-1].date.getTime())/1000/60/60/INTERVAL_HOUR[raceConfig.updateType];
        snapshotList[j]['diffCount'] = diffCount;

        for(var characterIndex = 0;characterIndex < characterLength;characterIndex++) {
          var currentIndex = snapshotList[j].idMapper[characterIndex];
          var previousIndex = snapshotList[j-1].idMapper[characterIndex];
          if(currentIndex != null && previousIndex != null){
            var d = snapshotList[j].rankList[currentIndex].point - snapshotList[j-1].rankList[previousIndex].point;
            diffs[characterIndex] = d;
            if(diffCount == 1){
              maxDiff = Math.max(maxDiff,d);
            }
          }
        }
      } else {
        snapshotList[j]['diffCount'] = 0;
      }

      snapshotList[j]['diffs']=diffs;
    }

    data.subraceList[i]['maxDiff'] = maxDiff;

    // サブレース毎のキャラ別画面の表示順序を計算する
    // 優先順位は、最終スナップショットでの順位、1つ前のスナップショットでの順位、・・・で計算する
    var idSet={}
    var characterIds=[];
    var characterIdToIndex=new Array(data.subraceList[i].displayNameList.length);
    characterIdToIndex.fill(0);

    for(var j=snapshotList.length-1;j>=0;j--){
      for(var k=0;k<snapshotList[j].rankList.length;k++){
        var id = snapshotList[j].rankList[k].id;
        if(!(id in idSet)){
          idSet[id] = true;
          characterIdToIndex[id]=characterIds.length;
          characterIds.push(id);
        }
      }
    }

    data.subraceList[i]['characterIdToIndex']=characterIdToIndex;
    data.subraceList[i]['characterIds']=characterIds;
  }
}

function initEventHandler(){
  $('#rankIndexLeft').on('click',function(){
    selection.targetRank -= selection.targetRankInterval;
    selection.targetRank = Math.max(selection.targetRank,1);
    display();
  });

  $('#rankIndexRight').on('click',function(){
    selection.targetRank += selection.targetRankInterval;
    selection.targetRank = Math.min(selection.targetRank,
      RACE_CONFIG_MAP[selection.race].rankBorder+1
      -selection.targetRankInterval
      -Math.floor(DISPLAY_RANK_LOWER_INTERVAL/selection.targetRankInterval)*selection.targetRankInterval);
    display();
  });

  $('#characterIndexLeft').on('click',function(){
    var characterIndex = data.subraceList[selection.subrace].characterIdToIndex[selection.characterId];
    if(characterIndex>0){
      characterIndex--;
    }
    selection.characterId=data.subraceList[selection.subrace].characterIds[characterIndex];
    display();
  });

  $('#characterIndexRight').on('click',function(){
    var characterIndex = data.subraceList[selection.subrace].characterIdToIndex[selection.characterId];
    if(characterIndex<data.subraceList[selection.subrace].characterIds.length-1){
      characterIndex++;
    }
    selection.characterId=data.subraceList[selection.subrace].characterIds[characterIndex];
    display();
  });

  $('#diffRankIndexLeft').on('click',function(){
    if (selection.diffRankIndex < data.subraceList[selection.subrace].snapshotList.length - 1) {
      selection.diffRankIndex++;
    }
    display();
  });

  $('#diffRankIndexRight').on('click',function(){
    if (selection.diffRankIndex > 0) {
      selection.diffRankIndex--;
    }
    display();
  });

}

function reloadRaceData(){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'json/'+ selection.race + '.json.gz?v='+Math.random().toString(32).substring(2), true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {
    var e = pako.inflate(xhr.response, { to: 'string' });

    data = $.parseJSON(e);

    calculate();

    display();
  }
  xhr.send();
}

function setRound() {
  var rounds = RACE_TYPE_CONFIG_MAP[selection.raceType].rounds;

  var parentDom = $('#roundSelection');
  parentDom.children('.ra-dynamic').remove();

  for(var i=0;i<rounds.length;i++) {
    var newDom = roundSelectionTemplate.clone();
    newDom.children().text(rounds[i].name);

    newDom.on('click', {round : rounds[i].id} , function(e){
      var t = selection.raceType;
      selection = Object.create(initialSelection);
      selection.raceType = t;
      selection.round = e.data.round;
      selection.race = selection.raceType + selection.round;

      resetSubraceSelection();
      reloadRaceData();
    });

    parentDom.append(newDom);
  }

}

function initSelectionTemplate() {
  var tempDom;
  tempDom = $('#subraceSelection .ra-template');
  subraceSelectionTemplate = tempDom.clone();
  subraceSelectionTemplate.removeClass('ra-template');
  subraceSelectionTemplate.addClass('ra-dynamic');
  tempDom.remove();

  tempDom = $('#raceTypeSelection .ra-template');
  raceTypeSelectionTemplate = tempDom.clone();
  raceTypeSelectionTemplate.removeClass('ra-template');
  raceTypeSelectionTemplate.addClass('ra-dynamic');
  tempDom.remove();

  tempDom = $('#roundSelection .ra-template');
  roundSelectionTemplate = tempDom.clone();
  roundSelectionTemplate.removeClass('ra-template');
  roundSelectionTemplate.addClass('ra-dynamic');
  tempDom.remove();

  tempDom = $('#characterTable .ra-template');
  characterTableTemplate = tempDom.clone();
  characterTableTemplate.removeClass('ra-template');
  characterTableTemplate.addClass('ra-dynamic');
  tempDom.remove();

  tempDom = $('#diffRankTable .ra-template');
  diffRankTableTemplate = tempDom.clone();
  diffRankTableTemplate.removeClass('ra-template');
  diffRankTableTemplate.addClass('ra-dynamic');
  tempDom.remove();

}

function initHeader(){
  //レースタイプ選択肢を設定
  var parentDom = $('#raceTypeSelection');
  parentDom.children('.ra-dynamic').remove();

  for(var key in RACE_TYPE_CONFIG_MAP) {
    var newDom = raceTypeSelectionTemplate.clone();
    newDom.children().text(RACE_TYPE_CONFIG_MAP[key].name);
    newDom.on('click', {key : key} , function(e){
      selection = Object.create(initialSelection);
      selection.raceType = e.data.key;
      selection.round = RACE_TYPE_CONFIG_MAP[e.data.key].rounds[0].id;
      selection.race = selection.raceType + selection.round;
      setRound();
      resetSubraceSelection();
      reloadRaceData();
    });

    parentDom.append(newDom)
  }

  //画面切り替えイベントを設定
  $('#selectDashboard').on('click',function(){
    selection.screen = 0;
    var snapshotList = data.subraceList[selection.subrace].snapshotList;
    var snapshot = snapshotList[snapshotList.length-1];
    var rankListIndex = snapshot.idMapper[selection.characterId];

    if(rankListIndex == null){
      selection.targetRank = 1;
    } else{
      var r = snapshot.rankList[rankListIndex].rank;
      selection.targetRank = r- ((r-1)%selection.targetRankInterval);
    }

    display();
  });

  $('#selectCharacter').on('click',function(){
    selection.screen = 1;
    var snapshotList = data.subraceList[selection.subrace].snapshotList;
    var snapshot = snapshotList[snapshotList.length-1];
    var rankListIndex = snapshot.rankMapper[selection.targetRank-1];
    selection.characterId = snapshot.rankList[rankListIndex].id;
    display();
  });

  $('#selectDiffRank').on('click',function(){
    if(RACE_CONFIG_MAP[selection.race].predictionType == PREDICTION_TYPE_LINEAR){
      selection.screen = 2;
      selection.diffRankIndex = data.subraceList[selection.subrace].snapshotList.length - 1;
      display();
    }
  });

}

$(function () {
  initSelectionTemplate();
  initHeader();
  initEventHandler();
  setRound();
  resetSubraceSelection();
  reloadRaceData();
});


