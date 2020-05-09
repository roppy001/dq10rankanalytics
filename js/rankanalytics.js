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
  "targetIndex" : 0,
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

  $('#displayRankString').text(
    (selection.targetIndex+1) + '位～' + (selection.targetIndex+rankLength) + '位');

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

  for (var i = 0,nameMap = {}; i < rankLength; i++) {
    rankColumns[i] = new Array(currentPeriod.length + 1);
    rankColumns[i].fill(null, 1);

    pointColumns[i] = new Array(currentPeriod.length + 1);
    pointColumns[i].fill(null, 1);

    displayIds[i] = snapshotList[snapshotList.length - 1].rankList[selection.targetIndex +i].id;

    var name = snapshotList[snapshotList.length - 1].rankList[selection.targetIndex +i].name

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
    var endRank = Math.min(selection.targetIndex + rankLength + DISPLAY_RANK_LOWER_INTERVAL,raceConfig.rankBorder);
    for (var i = Math.max(selection.targetIndex - DISPLAY_RANK_UPPER_INTERVAL,0); i < endRank; i++) {
      var currentId = snapshotList[snapshotIndex].rankList[i].id;
      var columnIndex = displayIds.indexOf(currentId);
      if (columnIndex != -1) {
        // グラフを逆順に並べる方法として、順位の値はマイナスでグラフを生成し、表示時に再度プラスに置き換える
        rankColumns[columnIndex][1 + timeIndexMapper[snapshotIndex]] = -snapshotList[snapshotIndex].rankList[i].rank;
        pointColumns[columnIndex][1 + timeIndexMapper[snapshotIndex]] = snapshotList[snapshotIndex].rankList[i].point;
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
      borderColumns[i][timeIndexMapper[j] + 1] = snapshotList[j].rankList[raceConfig.borders[i].index].point;
    }

    borderColumns[i][1] = 0;
    borderColumns[i + 3][1] = 0;

    var timeIndex = timeIndexMapper[snapshotList.length - 1];

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
      columns: [['x'].concat(currentPeriod)].concat(rankColumns)
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
      columns: [['x'].concat(currentPeriod)].concat(pointColumns)
    },
    axis: {
      x: {
        type: 'timeseries',
        tick: {
          format: '%m/%d %H'
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

  for(var targetTime = raceConfig.beginTime ;
    targetTime <= raceConfig.endTime;
    targetTime.setHours(targetTime.getHours() + 8)){
      allPeriod.push(new Date(targetTime));
      if(targetTime <= currentTime){
        currentPeriod.push(new Date(targetTime));
      }
  }

}

function initEventHandler(){
  $('#rankIndexLeft').on('click',function(){
    selection.targetIndex -= selection.targetIndexInterval;
    selection.targetIndex = Math.max(selection.targetIndex,0);
    display();
  });

  $('#rankIndexRight').on('click',function(){
    selection.targetIndex += selection.targetIndexInterval;
    selection.targetIndex = Math.min(selection.targetIndex,
      RACE_CONFIG_MAP[selection.race].rankBorder
      -selection.targetIndexInterval
      -Math.floor(DISPLAY_RANK_LOWER_INTERVAL/selection.targetIndexInterval)*selection.targetIndexInterval);
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

$(function () {
  initEventHandler();
  reloadRaceData();
});
