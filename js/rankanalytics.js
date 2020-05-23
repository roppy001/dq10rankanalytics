var PREDICTION_TYPE_LINEAR = 0;
var PREDICTION_TYPE_RANGE = 1;

// 各レース情報定義領域 開始位置

var RACE_TYPE_CONFIG_MAP = {
  slimerace : {
    name : 'スライムレース',
    rounds : [
      {id : 5,name : '第5回'}]
  },
  casinoraid : {
    name : 'カジノレイド',
    rounds : [
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'},
      {id : 3,name : 'デモ用'}]
  },
  fishing : {
    name : 'フィッシングコンテスト',
    rounds : [
      {id : 4,name : '第4回'},
      {id : 3,name : '第3回'},
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'},
      {id : 5,name : 'デモ用'}]
  },
  pencil : {
    name : 'バトエン大会',
    rounds : [
      {id : 5,name : '第2回マイデッキ'},
      {id : 4,name : '第2回タクティカル'},
      {id : 3,name : '第1回マイデッキ'},
      {id : 2,name : '第1回タクティカル'}]
  }
};


// 各イベントの開催内容・開催期間情報を定義
// 開始日時、終了日次はデータが更新される時刻である8時間区切りとする。

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
  "slimerace5" : {
    title : '第5回スライムレース',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('P'),
    beginTime : new Date(2020,0,9,12,00),
    endTime : new Date(2020,0,27,4,00),
    subraceNames : ['ランキング'],
    borders : RACE_10_100_LINEAR,
    rankBorder : 100
  },
  "casinoraid3" : {
    title : 'デモ用データ(期間2倍化)',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2020,4,4,20,00),
    endTime : new Date(2020,4,14,20,00),
    subraceNames : ['ポーカー','スロット','ルーレット'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  "casinoraid2" : {
    title : '第2回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2019,7,28,12,00),
    endTime : new Date(2019,8,8,12,00),
    subraceNames : ['ポーカー','スロット','ルーレット'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  "casinoraid1" : {
    title : '第1回カジノレイド',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('枚'),
    beginTime : new Date(2017,11,1,12,00),
    endTime : new Date(2017,11,12,12,00),
    subraceNames : ['ポーカー','スロット','ルーレット'],
    borders : RACE_10_100_RANGE,
    rankBorder : 100
  },
  "fishing5" : {
    title : 'デモ用データ(期間2倍化)',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2020,4,4,20,00),
    endTime : new Date(2020,4,14,20,00),
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  "fishing4" : {
    title : '第4回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2019,4,8,12,00),
    endTime : new Date(2019,4,19,12,00),
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  "fishing3" : {
    title : '第3回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2018,8,21,12,00),
    endTime : new Date(2018,8,30,12,00),
    subraceNames : ['最大ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  "fishing2" : {
    title : '第2回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2017,7,25,12,00),
    endTime : new Date(2017,8,4,12,00),
    subraceNames : ['最大ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  "fishing1" : {
    title : '第1回フィッシングコンテスト',
    predictionType : PREDICTION_TYPE_RANGE,
    numberFormatter : FISHING_FORMATTER,
    beginTime : new Date(2017,0,19,12,00),
    endTime : new Date(2017,0,31,12,00),
    subraceNames : ['最大ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  },
  "pencil5" : {
    title : '第2回マイデッキルール',
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    predictionType : PREDICTION_TYPE_LINEAR,
    beginTime : new Date(2019,11,5,12,00),
    endTime : new Date(2019,11,15,20,00),
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  "pencil4" : {
    title : '第2回タクティカルピックルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2019,10,21,12,00),
    endTime : new Date(2019,11,1,20,00),
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  "pencil3" : {
    title : '第1回マイデッキルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2018,10,21,12,00),
    endTime : new Date(2018,11,1,20,00),
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },
  "pencil2" : {
    title : '第1回タクティカルピックルール',
    predictionType : PREDICTION_TYPE_LINEAR,
    numberFormatter : NORMAL_FORMATTER_GENERATOR('点'),
    beginTime : new Date(2018,10,8,12,00),
    endTime : new Date(2018,10,18,20,00),
    subraceNames : ['ランキング'],
    borders : RACE_10_100_1000_LINEAR,
    rankBorder : 1000
  },

}

// 各レース情報定義領域 終了位置

// ページ遷移の際、1位-(10+[この値])位 → 11位 - (20 + [この値])位というように
// この値分下位のキャラのデータを表示するようにする。
var TARGET_RANK_LOWER_INTERVAL = 10;

// 順位グラフ表示の際、過去の順位について、表示最下位順位 + この値までを表示するようにする。
var DISPLAY_RANK_UPPER_INTERVAL = 10;
var DISPLAY_RANK_LOWER_INTERVAL = 10;

// レースデータ保持領域
var data;

// 選択情報保持領域 初期選択状態を定義
var initialSelection = {
  "screen" : 0,
  "raceType" : "slimerace",
  "round" : 5,
  "race" : "slimerace5",
  "subrace" : 0,
  "targetRank" : 1,
  "targetRankInterval" : 10
};

var selection = Object.create(initialSelection);

var currentPeriod;
var allPeriod;

var subraceSelectionTemplate;
var raceTypeSelectionTemplate;
var roundSelectionTemplate;


var COLORS =[
  'rgb(31, 119, 180)',
  'rgb(255, 127, 14)',
  'rgb(44, 160, 44)',
  'rgb(214, 39, 40)',
  'rgb(148, 103, 189)',
  'rgb(140, 86, 75)',
  'rgb(227, 119, 194)',
  'rgb(127, 127, 127)',
  'rgb(188, 189, 34)',
  'rgb(23, 190, 207)'];

function getColor(num){
  return COLORS[num % COLORS.length];
}

var rankChart;

function displayDashboard(){
  for(var i=0;i<4;i++) {
    $('#border' + i + ' .borderName').text('');
    $('#border' + i + ' .latest').text('');
    $('#border' + i + ' .prediction').text('');
  }

  var raceConfig = RACE_CONFIG_MAP[selection.race];

  $('#raceTitle').text(raceConfig.title);

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

  var currentTime = new Date(snapshotList[snapshotList.length - 1].timeString);

  $('#displayRankString').text(
    selection.targetRank + '位～' + endRank + '位');
/*
  // 各キャラのデータを格納する配列を作成
  var rankColumns = new Array(rankLength);
  var pointColumns = new Array(rankLength);

  // 最新時刻のランキング者を表示対象として記憶する
  var displayIds = new Array(rankLength);

  // データの存在しない時刻を判定するための配列
  var emptyTimes = new Array(currentPeriod.length);
  emptyTimes.fill(true);
  emptyTimes[0] = false;

  // スナップショットのIndexからallPetiodの時刻Indexを逆引きする配列を作成
  var timeIndexMapperAll = new Array(snapshotList.length);

  // 欠けている時刻を判定する。
  for (var i = 0,j = 0; i < snapshotList.length; i++) {
    var snapshotTime = new Date(snapshotList[i].timeString);

    while(j < currentPeriod.length && currentPeriod[j] < snapshotTime){
      j++;
    }

    var k=Math.min(j,currentPeriod.length - 1);
    timeIndexMapperAll[i]=k;
    emptyTimes[k]=false;
  }

  // 欠けている時刻を除去した新たなX軸データを作成する
  var modifiedCurrentPeriod = currentPeriod.slice();

  for (var i = modifiedCurrentPeriod.length-1;i>=0;i--){
    if(emptyTimes[i]){
      modifiedCurrentPeriod.splice(i,1);
    }
  }

  // スナップショットのIndexからmodifiedCurrentPeriodの時刻Indexを逆引きする配列を作成
  var timeIndexMapper = new Array(snapshotList.length);

  for (var i = 0,j = 0; i < snapshotList.length; i++) {
    var snapshotTime = new Date(snapshotList[i].timeString);

    while(j < modifiedCurrentPeriod.length && modifiedCurrentPeriod[j] < snapshotTime){
      j++;
    }

    timeIndexMapper[i] = Math.min(j,modifiedCurrentPeriod.length - 1);
  }
  
  for (var i = 0,nameMap = {}; i < rankLength; i++) {
    rankColumns[i] = new Array(modifiedCurrentPeriod.length + 1);
    rankColumns[i].fill(null, 1);

    pointColumns[i] = new Array(modifiedCurrentPeriod.length + 1);
    pointColumns[i].fill(null, 1);

    displayIds[i] = snapshotList[snapshotList.length - 1].rankList[startIndex +i].id;

    var name = snapshotList[snapshotList.length - 1].rankList[startIndex +i].name;

    if(name in nameMap){
      nameMap[name] = nameMap[name] + 1;
      name = name + nameMap[name];
    } else {
      nameMap[name] = 1;
    }

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
        for(var timeIndex = 0;timeIndex < allPeriod.length;timeIndex++) {
          if(timeIndex<=currentTimeIndex){
            // 過去は実績値を表示
            predictedBorderColumns[i][timeIndex+1] = actualBorderColumns[i][timeIndex+1];
          } else{
            // 未来は予測値を表示
            
            // 順位に 経過期間/計算対象時刻 を掛けて、最終日値が現在の何位に相当するかを小数ありで求める
            var predictedRankIndex = Math.max((raceConfig.borders[i].rankIndex + 1) * currentTimeIndex / timeIndex -1,0);

            // 小数部分は線形補完する

            var lowerRankIndex = Math.floor(predictedRankIndex);
            var lowerDiff = predictedRankIndex - lowerRankIndex;
            var upperRankIndex = Math.min(lowerRankIndex + 1,raceConfig.rankBorder-1);
            var upperDiff = 1 - lowerDiff;

            predictedBorderColumns[i][timeIndex+1] = snapshot.rankList[snapshot.rankMapper[lowerRankIndex]].point * upperDiff + snapshot.rankList[snapshot.rankMapper[upperRankIndex]].point * lowerDiff;
          }
        }
        $('#border' + i + ' .prediction').text(raceConfig.numberFormatter(predictedBorderColumns[i][allPeriod.length]));
      } else {
        actualBorderColumns[i][1] = 0;
        predictedBorderColumns[i][1] = 0;
      }

      borderRegions[raceConfig.borders[i].predictionName] = [{ 'start': currentTime }];
    }

  }
*/
  var rankDatasets = new Array(rankLength);
  var rankColumns = new Array(rankLength);
  var pointColumns = new Array(rankLength);

  // 最新時刻のランキング者を表示対象として記憶する
  var displayIds = new Array(rankLength);

  for (var i = 0,nameMap = {}; i < rankLength; i++) {
    rankColumns[i] = new Array(snapshotList.length);
    pointColumns[i] = new Array(snapshotList.length);

    for(var j = 0;j<snapshotList.length;j ++) {
      rankColumns[i][j] = {x : snapshotList[j].date,y : raceConfig.rankBorder + 10};
    }

    displayIds[i] = snapshotList[snapshotList.length - 1].rankList[startIndex +i].id;

    var name = snapshotList[snapshotList.length - 1].rankList[startIndex +i].name;

    if(name in nameMap){
      nameMap[name] = nameMap[name] + 1;
      name = name + nameMap[name];
    } else {
      nameMap[name] = 1;
    }

    rankDatasets[i] = {
      label : name,
      hoverBorderColor: 'rgba(0, 0, 0)', 
      borderColor: getColor(i),
      backgroundColor: getColor(i),
      data : rankColumns[i],
      fill: false};
  }

  for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {


    for (var i = 0; i < snapshotList[snapshotIndex].rankList.length; i++) {
      var currentId = snapshotList[snapshotIndex].rankList[i].id;
      var columnIndex = displayIds.indexOf(currentId);
      if (columnIndex != -1) {
        pointColumns[columnIndex][snapshotIndex] = 
        { 
          x : snapshotList[snapshotIndex].date,
          y : snapshotList[snapshotIndex].rankList[i].point
        };

        // グラフを逆順に並べる方法として、順位の値はマイナスでグラフを生成し、表示時に再度プラスに置き換える
        rankColumns[columnIndex][snapshotIndex] = 
        { 
          x : snapshotList[snapshotIndex].date,
          y : snapshotList[snapshotIndex].rankList[i].rank
        };
      }
    }
  }

  var config = {
    type: 'line',
    data: {
      datasets: rankDatasets
    },
    options: {
      responsive: true,
      tooltips: {
        mode: 'index'
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            displayFormats: {
                quarter: 'MM/DD HH'
            }
          },
          ticks: {
            min : raceConfig.beginTime,
            max : raceConfig.endTime
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'value'
          },
          ticks: {
            reverse : true,
            min : Math.max(selection.targetRank -DISPLAY_RANK_UPPER_INTERVAL,0),
            max : Math.min(endRank +DISPLAY_RANK_LOWER_INTERVAL,raceConfig.rankBorder)
          }
        }]
      },
      legend : {
        labels: {
          boxWidth: 8,
          fontSize: 6
        }        
      }
    }
  };
  var ctx = document.getElementById('rank').getContext('2d');

  if(rankChart){
    rankChart.destroy();
  }
  rankChart = new Chart(ctx, config);

/*
  var top = c3.generate({
    bindto: '#rank',
    data: {
      x : 'x',
      columns: [['x'].concat(modifiedCurrentPeriod)].concat(rankColumns)
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
    }
  });

  var point = c3.generate({
    bindto: '#point',
    data: {
      x : 'x',
      columns: [['x'].concat(modifiedCurrentPeriod)].concat(pointColumns)
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

  });*/
}

function display(){
  switch (selection.screen){
    case 0:
      displayDashboard();
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
    targetTime.setHours(targetTime.getHours() + 8)){
      allPeriod.push(new Date(targetTime));
      if(targetTime <= currentTime){
        currentPeriod.push(new Date(targetTime));
      }
  }

  // ランキングからrankListのインデックスの逆引き配列を計算し、snapshotList配下に追加する
  // また、各snapshotのDate情報も格納する
  for(var i = 0; i< data.subraceList.length ; i++){
    var mapper = new Array(raceConfig.rankBorder);
    var snapshotList = data.subraceList[i].snapshotList;

    for(var j=0;j<snapshotList.length;j++) {
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
      snapshotList[j]['date'] = Math.min(new Date(snapshotList[j].timeString),raceConfig.endTime);

    }


  }

}

function initEventHandler(){

  $('#rankIndexLeft').off('click');
  $('#rankIndexLeft').on('click',function(){
    selection.targetRank -= selection.targetRankInterval;
    selection.targetRank = Math.max(selection.targetRank,1);
    display();
  });

  $('#rankIndexRight').off('click');
  $('#rankIndexRight').on('click',function(){
    selection.targetRank += selection.targetRankInterval;
    selection.targetRank = Math.min(selection.targetRank,
      RACE_CONFIG_MAP[selection.race].rankBorder+1
      -selection.targetRankInterval
      -Math.floor(DISPLAY_RANK_LOWER_INTERVAL/selection.targetRankInterval)*selection.targetRankInterval);
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
      initEventHandler();
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

}

function initRaceType(){
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
      initEventHandler();
      reloadRaceData();
    });

    parentDom.append(newDom)
  }
}

$(function () {
  initSelectionTemplate();
  initRaceType();
  setRound();
  resetSubraceSelection();
  initEventHandler();
  reloadRaceData();
});
