// 各レース情報定義領域 開始位置

var RACE_TYPE_CONFIG_MAP = [
  {
    id : 'slimerace',
    name : 'スライムレース',
    rounds : [
      {id : 5,name : '第5回'}]
  },
  {
    id : 'casinoraid',
    name : 'カジノレイド',
    rounds : [
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'}]
  },
  {
    id : 'fishing',
    name : 'フィッシングコンテスト',
    rounds : [
      {id : 4,name : '第4回'},
      {id : 3,name : '第3回'},
      {id : 2,name : '第2回'},
      {id : 1,name : '第1回'}]
  }/*,
  {
    id : 'pencil',
    name : 'バトエン大会',
    rounds : [
      {id : 5,name : '第2回マイデッキ'},
      {id : 4,name : '第2回タクティカル'},
      {id : 3,name : '第1回マイデッキ'},
      {id : 2,name : '第1回タクティカル'}]
  }*/
];


// 各イベントの開催内容・開催期間情報を定義
// 開始日時、終了日次はデータが更新される時刻である8時間区切りとする。

var RACE_10_100_LINEAR = [
  {
    index : 0,
    borderName : '1位境界',
    predictionName : '1位予測'
  },
  {
    index : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    index : 99,
    borderName : '100位境界',
    predictionName : '100位予測'
  }
];
var RACE_10_100_RANGE = [
  {
    index : 0,
    borderName : '1位境界',
    predictionName : '1位継続'
  },
  {
    index : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    index : 99,
    borderName : '100位境界',
    predictionName : '100位予測'
  }
];
var RACE_10_100_RANGE = [
  {
    index : 0,
    borderName : '1位境界',
    predictionName : '1位継続'
  },
  {
    index : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    index : 99,
    borderName : '100位境界',
    predictionName : '100位予測'
  }
];
var RACE_10_100_200_RANGE = [
  {
    index : 0,
    borderName : '1位境界',
    predictionName : '1位継続'
  },
  {
    index : 9,
    borderName : '10位境界',
    predictionName : '10位予測'
  },
  {
    index : 199,
    borderName : '200位境界',
    predictionName : '200位予測'
  }
];

var RACE_CONFIG_MAP = {
  "slimerace5" : {
    title : '第5回スライムレース',
    pointRate : 1,
    beginTime : new Date(2020,0,9,12,00),
    endTime : new Date(2020,0,27,4,00),
    subraceNames : ['スライムレースランキング'],
    borders : RACE_10_100_LINEAR,
    rankBorder : 100
  },
  "casinoraid2" : {
    title : '第2回カジノレイド',
    pointRate : 1,
    beginTime : new Date(2019,7,28,12,00),
    endTime : new Date(2019,8,8,12,00),
    subraceNames : ['ポーカー','スロット','ルーレット'],
    borders : RACE_10_100_RANGE,
    rankBorder : 200
  },
  "fishing4" : {
    title : '第4回フィッシングコンテスト',
    pointRate : 0.1,
    beginTime : new Date(2019,4,8,12,00),
    endTime : new Date(2019,4,19,12,00),
    subraceNames : ['最大ランキング','最小ランキング'],
    borders : RACE_10_100_200_RANGE,
    rankBorder : 200
  }

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

function displayDashboard(){

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

  $('#displayRankString').text(
    selection.targetRank + '位～' + endRank + '位');

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

  var borderColumns = new Array(raceConfig.borders.length * 2);
  var borderRegions = {};

  for (var i = 0; i < raceConfig.borders.length; i++) {
    borderColumns[i] = new Array(allPeriod.length + 1);
    borderColumns[i + 3] = new Array(allPeriod.length + 1);

    borderColumns[i][0] = raceConfig.borders[i].borderName;
    borderColumns[i + 3][0] = raceConfig.borders[i].predictionName;

    borderColumns[i].fill(null,1);
    borderColumns[i + 3].fill(null,1);

    for (var j = 0; j < snapshotList.length; j++) {
      borderColumns[i][timeIndexMapperAll[j] + 1] = snapshotList[j].rankList[raceConfig.borders[i].index].point;
    }

    borderColumns[i][1] = 0;
    borderColumns[i + 3][1] = 0;

    var timeIndex = timeIndexMapperAll[snapshotList.length - 1];

    if(timeIndex > 0){
      var averagePointDiff = snapshotList[snapshotList.length - 1].rankList[raceConfig.borders[i].index].point / timeIndex;

      borderColumns[i + 3][allPeriod.length] = Math.floor(averagePointDiff * (allPeriod.length - 1));

      $("#border" + i + " .borderName").text(raceConfig.borders[i].borderName);
      $("#border" + i + " .latest").text(snapshotList[snapshotList.length - 1].rankList[raceConfig.borders[i].index].point.toLocaleString());
      $("#border" + i + " .prediction").text(borderColumns[i + 3][allPeriod.length].toLocaleString());
    }

    borderRegions[raceConfig.borders[i].predictionName] = [{ 'start': raceConfig.beginTime }];
  }


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
          format: function (x) { return x * raceConfig.pointRate; }
        }
      }
    }
  });

  var border = c3.generate({
    bindto: '#border',
    data: {
      x : 'x',
      columns: [['x'].concat(allPeriod)].concat(borderColumns),
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
          format: function (x) { return x * raceConfig.pointRate; }
        }
      }
    },
    line: {
      connectNull: true
    }

  });
}

function display(){
  switch (selection.screen){
    case 0:
      displayDashboard();
      break;
  }
}

//読み込みデータをもとに追加情報を計算
function calculate(){
  var raceConfig = RACE_CONFIG_MAP[selection.race];

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
}

function initRaceType(){
  var tempDom = $('#raceSelection .ra-template');
  var newTempDom = tempDom.clone();
  newTempDom.removeClass('ra-template');
  newTempDom.addClass('ra-dynamic');

  var prevDom = tempDom;

　for(var i=0;i<RACE_TYPE_CONFIG_MAP.length;i++) {
    var newDom = newTempDom.clone();
    newDom.children().text(RACE_TYPE_CONFIG_MAP[i].name);
    newDom.on('click', {index : i} , function(e){
      selection = Object.create(initialSelection);
      selection.raceType = RACE_TYPE_CONFIG_MAP[e.data.index].id;
      selection.round = RACE_TYPE_CONFIG_MAP[e.data.index].rounds[0].id;
      selection.race = selection.raceType + selection.round;
      initEventHandler();
      reloadRaceData();
    });

    prevDom.after(newDom)
    prevDom = newDom;
  }
}

$(function () {
  initRaceType();
  initEventHandler();
  reloadRaceData();
});
