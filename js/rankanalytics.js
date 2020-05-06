var RACE_TYPE_CONFIG_MAP = {
  "slimerace" : {
    rounds : [5]
  }
}

// 各イベントの開催内容・開催期間情報を定義
// 開始日時、終了日次はデータが更新される時刻である8時間区切りとする。

var RACE_CONFIG_MAP = {
  "slimerace5" : {
    beginTime : new Date(2020,0,9,12,00),
    endTime : new Date(2020,0,27,4,00),
    subraceNames : ['スライムレースランキング'],
    borders : [
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
    ],
    rankBorder : 100
  }
}

// ページ遷移の際、1位-(10+[この値])位 → 11位 - (20 + [この値])位というように
// この値分下位のキャラのデータを表示するようにする。
var TARGET_RANK_LOWER_INTERVAL = 10;

// 順位グラフ表示の際、過去の順位について、表示最下位順位 + この値までを表示するようにする。
var DISPLAY_RANK_UPPER_INTERVAL = 10;
var DISPLAY_RANK_LOWER_INTERVAL = 10;

var DYNAMIC_CLASS_NAME = "ra-dynamic-item";

// レースデータ保持領域
var data;

// 選択情報保持領域 初期選択状態を定義
var selection = {
  "screen" : 0,
  "raceType" : "slimerace",
  "round" : 5,
  "race" : "slimerace5",
  "subrace" : 0,
  "targetIndex" : 10,
  "targetIndexInterval" : 10
};

var currentPeriod;
var allPeriod;

function displayDashboard(){

  
  var raceConfig = RACE_CONFIG_MAP[selection.race];

  // インデックスを超えないよう、表示キャラ数を計算
  var rankLength = Math.min(selection.targetIndex + selection.targetIndexInterval + TARGET_RANK_LOWER_INTERVAL, raceConfig.rankBorder) - selection.targetIndex;

  if(rankLength <=0){
    alert('表示領域が不正です');
    return;
  }  

  // 各キャラのデータを格納する配列を作成
  var rankColumns = new Array(rankLength);
  var pointColumns = new Array(rankLength);

  // 最新時刻のランキング者を表示対象として記憶する
  var displayIds = new Array(rankLength);


  var snapshotList = data.subraceList[selection.subrace].snapshotList;

  // スナップショットのインデックスから時刻インデックスを逆引きできるようにする
  // 欠けている時刻がある場合、nullデータのままとする。
  var timeIndexMapper = new Array(snapshotList.length);

  for (var i = 0,j = 0; i < snapshotList.length; i++) {
    var snapshotTime = new Date(snapshotList[i].timeString);

    while(j < currentPeriod.length && currentPeriod[j] < snapshotTime){
      j++;
    }

    timeIndexMapper[i] = Math.min(j,currentPeriod.length - 1);
  }

  for (var i = 0; i < rankLength; i++) {
    rankColumns[i] = new Array(currentPeriod.length + 1);
    rankColumns[i].fill(null, 1);

    pointColumns[i] = new Array(currentPeriod.length + 1);
    pointColumns[i].fill(null, 1);

    displayIds[i] = snapshotList[snapshotList.length - 1].rankList[selection.targetIndex +i].id;
    rankColumns[i][0] = snapshotList[snapshotList.length - 1].rankList[selection.targetIndex +i].name;
    pointColumns[i][0] = snapshotList[snapshotList.length - 1].rankList[selection.targetIndex +i].name;
  }

  for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {
    var endRank = Math.min(selection.targetIndex + rankLength + DISPLAY_RANK_LOWER_INTERVAL,raceConfig.rankBorder);
    for (var i = Math.max(selection.targetIndex - DISPLAY_RANK_UPPER_INTERVAL,0); i < endRank; i++) {
      var currentId = snapshotList[snapshotIndex].rankList[i].id;
      var columnIndex = displayIds.indexOf(currentId);
      if (columnIndex != -1) {
        rankColumns[columnIndex][1 + timeIndexMapper[snapshotIndex]] = snapshotList[snapshotIndex].rankList[i].rank;
        pointColumns[columnIndex][1 + timeIndexMapper[snapshotIndex]] = snapshotList[snapshotIndex].rankList[i].point;
      }
    }
  }

/*
  var borderColumns = new Array(DISPLAY_BORDER.length * 2);
  var borderRegions = {};

  for (var i = 0; i < DISPLAY_BORDER.length; i++) {
    borderColumns[i] = new Array(DISPLAY_RACE_END + 2);
    borderColumns[i + 3] = new Array(DISPLAY_RACE_END + 2);

    borderColumns[i][0] = DISPLAY_BORDER_NAME[i];
    borderColumns[i + 3][0] = DISPLAY_BORDER_NAME_PREDICTION[i];
    borderColumns[i][1] = 0;
    borderColumns[i + 3][1] = 0;

    for (var j = 0; j < snapshotList.length; j++) {
      borderColumns[i][j + 2] = snapshotList[j].rankList[DISPLAY_BORDER[i]].point;
      borderColumns[i + 3][j + 2] = null;
    }

    var averagePointDiff = snapshotList[snapshotList.length - 1].rankList[DISPLAY_BORDER[i]].point / snapshotList.length;

    for (var j = snapshotList.length; j < DISPLAY_RACE_END; j++) {
      borderColumns[i][j + 2] = null;
      borderColumns[i + 3][j + 2] = null;
    }
    borderColumns[i + 3][DISPLAY_RACE_END + 1] = Math.floor(averagePointDiff * DISPLAY_RACE_END);

    borderRegions[DISPLAY_BORDER_NAME_PREDICTION[i]] = [{ 'start': 0 }];

    $("#border" + i + " .latest").text(snapshotList[snapshotList.length - 1].rankList[DISPLAY_BORDER[i]].point.toLocaleString());
    $("#border" + i + " .prediction").text(borderColumns[i + 3][DISPLAY_RACE_END + 1].toLocaleString());
  }*/


  var top = c3.generate({
    bindto: '#rank',
    data: {
      columns: rankColumns
    },
    axis: {
      y: {
        inverted: true
      }
    }
  });

  var point = c3.generate({
    bindto: '#point',
    data: {
      columns: pointColumns
    }
  });

  /*
  var border = c3.generate({
    bindto: '#border',
    data: {
      columns: borderColumns,
      regions: borderRegions
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

//読み込みデータをもとに追加情報を計算
function calculate(){
  var raceConfig = RACE_CONFIG_MAP[selection.race];

  currentPeriod = [];
  allPeriod = [];

  var snapshotList = data.subraceList[0].snapshotList;

  var currentTime = new Date(snapshotList[snapshotList.length - 1].timeString);

  for(var targetTime = raceConfig.beginTime ;
    targetTime <= raceConfig.endTime;
    targetTime.setHours(targetTime.getHours() + 8)){
      allPeriod.push(new Date(targetTime));
      if(targetTime <= currentTime){
        currentPeriod.push(new Date(targetTime));
      }
  }

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

$(function () {
  reloadRaceData();
});
