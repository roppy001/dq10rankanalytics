var raceConfig = {
  "slimerace" : {
    "beginTime" : "",
    "endTime" : "",
    "subraceNameList" : ["スライムレースランキング"]
  }
}

var DYNAMIC_CLASS_NAME = "ra-dynamic-item";


var selection = {
  "race" : "slimerace",
  "round" : 5,
  "subrace" : 0
};



$(function () {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://yumedqx.web.fc2.com/json/slimerace5.json.gz?v='+Math.random().toString(32).substring(2), true);
  xhr.responseType = 'arraybuffer';
  xhr.onload = function () {

    var e = pako.inflate(xhr.response, { to: 'string' });


    var data = $.parseJSON(e);

    var DISPLAY_RANK = 20;
    var DISPLAY_RANK_LOWERLIMIT = 30;
    var DISPLAY_RACE_END = 60;
    var DISPLAY_BORDER = [0, 9, 199];
    var DISPLAY_BORDER_NAME = ['1位境界', '10位境界', '200位境界'];
    var DISPLAY_BORDER_NAME_PREDICTION = ['1位予測', '10位予測', '200位予測'];


    var rankColumns = new Array(DISPLAY_RANK);
    var pointColumns = new Array(DISPLAY_RANK);


    var displayIds = new Array(DISPLAY_RANK);

    var snapshotList = data.subraceList[0].snapshotList;

    for (var i = 0; i < DISPLAY_RANK; i++) {
      rankColumns[i] = new Array(snapshotList.length + 1);
      rankColumns[i].fill(null, 1);

      pointColumns[i] = new Array(snapshotList.length + 1);
      pointColumns[i].fill(null, 1);

      displayIds[i] = snapshotList[snapshotList.length - 1].rankList[i].id;
      rankColumns[i][0] = snapshotList[snapshotList.length - 1].rankList[i].name;
      pointColumns[i][0] = snapshotList[snapshotList.length - 1].rankList[i].name;
    }

    for (var snapshotIndex = 0; snapshotIndex < snapshotList.length; snapshotIndex++) {
      for (var i = 0; i < DISPLAY_RANK_LOWERLIMIT; i++) {
        var currentId = snapshotList[snapshotIndex].rankList[i].id;
        var columnIndex = displayIds.indexOf(currentId);
        if (columnIndex != -1) {
          rankColumns[columnIndex][1 + snapshotIndex] = snapshotList[snapshotIndex].rankList[i].rank;
          pointColumns[columnIndex][1 + snapshotIndex] = snapshotList[snapshotIndex].rankList[i].point;
        }
      }
    }


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
    }


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

    var border = c3.generate({
      bindto: '#border',
      data: {
        columns: borderColumns,
        regions: borderRegions
      },
      line: {
        connectNull: true
      }
    });
    

  }
  xhr.send();

});
