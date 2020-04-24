(function() {
  var $excel = (window.$excel = {});

  const wopts = { bookType: "xlsx", bookSST: false, type: "binary" }; //这里的数据是用来定义导出的格式类型

  var COL_SIZE = 12;

  var STYLE_BORDER_ALL = {
    top: {
      style: "thin",
    },
    bottom: {
      style: "thin",
    },
    left: {
      style: "thin",
    },
    right: {
      style: "thin",
    },
  };
  var STYLE_FONT_TEXT = { sz: 10, color: { rgb: "000000" } };

  var STYLE_TITLE = {
    font: { sz: 14, bold: true, color: { rgb: "000000" } },
    border: {
      diagonalDown: true,
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  };

  var STYLE_NORMAL = {
    font: STYLE_FONT_TEXT,
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  };
  var STYLE_NORMAL_LEFT = {
    font: STYLE_FONT_TEXT,
    alignment: {
      vertical: "center",
      horizontal: "left",
    },
  };
  var STYLE_NORMAL_RIGHT = {
    font: STYLE_FONT_TEXT,
    alignment: {
      vertical: "center",
      horizontal: "right",
    },
  };

  var STYLE_CELL = {
    font: STYLE_FONT_TEXT,
    border: STYLE_BORDER_ALL,
    alignment: {
      vertical: "center",
      horizontal: "center",
      wrapText: true,
    },
  };
  var STYLE_CELL_VERT = {
    font: STYLE_FONT_TEXT,
    border: STYLE_BORDER_ALL,
    alignment: {
      vertical: "center",
      horizontal: "center",
      wrapText: true,
    },
  };

  var STYLE_CELL_LEFT = {
    font: STYLE_FONT_TEXT,
    border: STYLE_BORDER_ALL,
    alignment: {
      vertical: "center",
      horizontal: "left",
      wrapText: true,
    },
  };

  var STYLE_CELL_XX = {
    font: STYLE_FONT_TEXT,
    border: {
      top: {
        style: "thin",
      },
      bottom: {
        style: "thin",
      },
      left: {
        style: "thin",
      },
      right: {
        style: "thin",
      },
      diagonal: {
        style: "thin",
      },
      diagonalDown: true,
    },
    alignment: {
      vertical: "center",
      horizontal: "left",
    },
  };

  //导出
  $excel.export = function(data) {
    var wb = { SheetNames: ["Sheet1"], Sheets: {} };
    var sheetData = {};
    var ri = 0;

    //宽度
    sheetData["!cols"] = [
      { wch: 4 },
      { wch: 7 },
      { wch: 16 },
      { wch: 7 },
      { wch: 10 },
      { wch: 10 },
      { wch: 10 },
      { wch: 7 },
      { wch: 8 },
      { wch: 10 },
      { wch: 10 },
      { wch: 15 },
      { wch: 15 },
    ];
    sheetData["!rows"] = [
      { hpt: 30 },
      { hpt: 15 },
      { hpt: 24 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 20 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 30 },
      { hpt: 16 },
      { hpt: 20 },
      { hpt: 20 },
      { hpt: 20 },
      { hpt: 20 },
      { hpt: 20 },
    ];
    //标题
    text(sheetData, [ri, 0, ri, COL_SIZE], data.title, STYLE_TITLE);
    ri++;
    //值班领导
    text(
      sheetData,
      [ri, 0, 0, 4],
      `  值班领导：${data.zbld}`,
      STYLE_NORMAL_LEFT
    );
    text(sheetData, [ri, 6, 0, 2], "天气：多云 2~15℃", STYLE_NORMAL);
    text(sheetData, [ri, 10, 0, 2], "日期：2020年3月30日", STYLE_NORMAL_RIGHT);
    ri++;
    text(sheetData, [ri, 0, 16, 0], `生产情况`, STYLE_CELL_VERT);
    //产销量
    text(sheetData, [ri, 1, 8, 0], `产销量`, STYLE_CELL);
    text(
      sheetData,
      [ri, 2, 0, 1],
      `   品种                                        产量`,
      STYLE_CELL_XX
    );
    text(sheetData, [ri, 4, 0, 1], `日产量（t）`, STYLE_CELL);
    text(sheetData, [ri, 6, 0, 1], `月累计（t）`, STYLE_CELL);
    text(sheetData, [ri + 1, 2, 1, 1], `原煤`, STYLE_CELL);
    text(sheetData, [ri + 3, 2, 1, 1], `入选量`, STYLE_CELL);
    text(sheetData, [ri + 5, 2, 3, 0], `商品煤`, STYLE_CELL);
    text(sheetData, [ri + 5, 3, 1, 0], `精煤`, STYLE_CELL);
    text(sheetData, [ri + 7, 3, 1, 0], `筛混煤`, STYLE_CELL);
    text(sheetData, [ri + 1, 4, 1, 1], data.cxl.ym_day, STYLE_CELL);
    text(sheetData, [ri + 1, 6, 1, 1], data.cxl.ym_month, STYLE_CELL);
    text(sheetData, [ri + 3, 4, 1, 1], data.cxl.rxl_day, STYLE_CELL);
    text(sheetData, [ri + 3, 6, 1, 1], data.cxl.rxl_month, STYLE_CELL);
    text(sheetData, [ri + 5, 4, 1, 1], data.cxl.jm_day, STYLE_CELL);
    text(sheetData, [ri + 5, 6, 1, 1], data.cxl.jm_month, STYLE_CELL);
    text(sheetData, [ri + 7, 4, 1, 1], data.cxl.shm_day, STYLE_CELL);
    text(sheetData, [ri + 7, 6, 1, 1], data.cxl.shm_month, STYLE_CELL);
    //销售
    text(sheetData, [ri, 8, 8, 0], `销售`, STYLE_CELL);
    text(sheetData, [ri, 9], `品种`, STYLE_CELL);
    text(sheetData, [ri, 10], `日销量（t）`, STYLE_CELL);
    text(sheetData, [ri, 11], `月销售（t）`, STYLE_CELL);
    text(sheetData, [ri, 12], `品种煤库存（t）`, STYLE_CELL);
    text(sheetData, [ri + 1, 9], `原煤`, STYLE_CELL);
    text(sheetData, [ri + 1, 10], data.xs.ym_day, STYLE_CELL);
    text(sheetData, [ri + 1, 11], data.xs.ym_month, STYLE_CELL);
    text(sheetData, [ri + 1, 12], data.xs.ym_kc, STYLE_CELL);
    text(sheetData, [ri + 2, 9], `筛混煤`, STYLE_CELL);
    text(sheetData, [ri + 2, 10], data.xs.shm_day, STYLE_CELL);
    text(sheetData, [ri + 2, 11], data.xs.shm_month, STYLE_CELL);
    text(sheetData, [ri + 2, 12], data.xs.shm_kc, STYLE_CELL);
    text(sheetData, [ri + 3, 9], `末精煤`, STYLE_CELL);
    text(sheetData, [ri + 3, 10], data.xs.mjm_day, STYLE_CELL);
    text(sheetData, [ri + 3, 11], data.xs.mjm_month, STYLE_CELL);
    text(sheetData, [ri + 3, 12], data.xs.mjm_kc, STYLE_CELL);
    text(sheetData, [ri + 4, 9], `籽煤`, STYLE_CELL);
    text(sheetData, [ri + 4, 10], data.xs.zm_day, STYLE_CELL);
    text(sheetData, [ri + 4, 11], data.xs.zm_month, STYLE_CELL);
    text(sheetData, [ri + 4, 12, 2, 0], data.xs.zm_kc, STYLE_CELL);
    text(sheetData, [ri + 5, 9], `三八块煤`, STYLE_CELL);
    text(sheetData, [ri + 5, 10], data.xs.sbk_day, STYLE_CELL);
    text(sheetData, [ri + 5, 11], data.xs.sbk_month, STYLE_CELL);
    text(sheetData, [ri + 6, 9], `大块`, STYLE_CELL);
    text(sheetData, [ri + 6, 10], data.xs.dk_day, STYLE_CELL);
    text(sheetData, [ri + 6, 11], data.xs.dk_month, STYLE_CELL);
    text(sheetData, [ri + 7, 9, 1, 0], `合计`, STYLE_CELL);
    text(sheetData, [ri + 7, 10, 1, 0], data.xs.total_day, STYLE_CELL);
    text(sheetData, [ri + 7, 11, 1, 0], data.xs.total_month, STYLE_CELL);
    text(sheetData, [ri + 7, 12, 1, 0], data.xs.total_kc, STYLE_CELL);
    ri += 9;
    //综采队
    text(sheetData, [ri, 1, 1, 0], "综采队", STYLE_CELL);
    text(sheetData, [ri, 2, 1, 0], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri, 3, 0, 4], "当日生产9999", STYLE_CELL);
    text(sheetData, [ri + 1, 3, 0, 4], "1012001工作面", STYLE_CELL);
    //掘一队
    text(sheetData, [ri + 2, 1, 1, 0], "掘一队", STYLE_CELL);
    text(sheetData, [ri + 2, 2, 0, 0], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 2, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 2, 5, 0, 2], "月累计：20米", STYLE_CELL);
    text(sheetData, [ri + 3, 2], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 3, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 3, 5, 0, 2], "月累计：20米", STYLE_CELL);
    //掘三队
    text(sheetData, [ri + 4, 1, 1, 0], "掘三队", STYLE_CELL);
    text(sheetData, [ri + 4, 2, 0, 0], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 4, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 4, 5, 0, 2], "月累计：20米", STYLE_CELL);
    text(sheetData, [ri + 5, 2], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 5, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 5, 5, 0, 2], "月累计：20米", STYLE_CELL);
    //重庆中环
    text(sheetData, [ri + 6, 1, 3, 0], "重庆中环", STYLE_CELL);
    text(sheetData, [ri + 6, 2, 0, 0], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 6, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 6, 5, 0, 2], "月累计：20米", STYLE_CELL);
    text(sheetData, [ri + 7, 2], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 7, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 7, 5, 0, 2], "月累计：20米", STYLE_CELL);
    text(sheetData, [ri + 8, 2], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 8, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 8, 5, 0, 2], "月累计：20米", STYLE_CELL);
    text(sheetData, [ri + 9, 2], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 9, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 9, 5, 0, 2], "月累计：20米", STYLE_CELL);
    //中煤36处
    text(sheetData, [ri + 10, 1], "中煤36处", STYLE_CELL);
    text(sheetData, [ri + 10, 2], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri + 10, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 10, 5, 0, 2], "月累计：20米", STYLE_CELL);
    //合计掘进进尺
    text(sheetData, [ri + 11, 1, 0, 1], "合计掘进进尺", STYLE_CELL);
    text(sheetData, [ri + 11, 3, 0, 1], "掘进8米", STYLE_CELL);
    text(sheetData, [ri + 11, 5, 0, 2], "月累计：20米", STYLE_CELL);

    //抽采队
    text(sheetData, [ri, 8, 3, 0], "抽采队", STYLE_CELL);
    text(sheetData, [ri, 9, 1, 3], "当日抽采xxxxxxxxxxxxx", STYLE_CELL);
    text(
      sheetData,
      [ri + 2, 9, 1, 3],
      "当日抽采xxxxxxxxxxxxx",
      STYLE_CELL_LEFT
    );
    //通风队
    text(sheetData, [ri + 4, 8], "通风队", STYLE_CELL);
    text(sheetData, [ri + 4, 9], "通风系统", STYLE_CELL);
    text(sheetData, [ri + 4, 10, 0, 2], "总回风量", STYLE_CELL);
    //运输队
    text(sheetData, [ri + 5, 8], "运输队", STYLE_CELL);
    text(sheetData, [ri + 5, 9], "运输系统", STYLE_CELL);
    text(sheetData, [ri + 5, 10, 0, 2], "正常", STYLE_CELL);
    //机电队
    text(sheetData, [ri + 6, 8, 3, 0], "机电队", STYLE_CELL);
    text(sheetData, [ri + 6, 9], "提升系统", STYLE_CELL);
    text(sheetData, [ri + 6, 10, 0, 2], "提煤xxx", STYLE_CELL);
    text(sheetData, [ri + 7, 9], "供电系统", STYLE_CELL);
    text(sheetData, [ri + 7, 10, 0, 2], "正常", STYLE_CELL);
    text(sheetData, [ri + 8, 9, 1, 0], "排水系统", STYLE_CELL);
    text(sheetData, [ri + 8, 10, 1, 2], "正常", STYLE_CELL);
    //准备队
    text(sheetData, [ri + 10, 8], "准备队", STYLE_CELL);
    text(
      sheetData,
      [ri + 10, 9, 0, 3],
      "当日去问我去饿我去饿我去饿我去饿我去",
      STYLE_CELL_LEFT
    );
    //东翼一号回风立井
    text(sheetData, [ri + 11, 8], "东翼一号回风立井", STYLE_CELL);
    text(
      sheetData,
      [ri + 11, 9, 0, 3],
      "当日去问我去饿我去饿我去饿我去饿我去",
      STYLE_CELL_LEFT
    );
    ri += 12;
    //生产影响
    text(sheetData, [ri, 0], "序号", STYLE_CELL);
    text(sheetData, [ri, 1, 0, 6], "生产影响", STYLE_CELL);
    text(sheetData, [ri, 8], "责任人", STYLE_CELL);
    text(sheetData, [ri, 9, 0, 3], "处理结果", STYLE_CELL);
    data.scyx.forEach((item, i) => {
      text(sheetData, [ri + i + 1, 0], i + 1, STYLE_CELL);
      text(sheetData, [ri + i + 1, 1, 0, 6], item.title, STYLE_CELL_LEFT);
      text(sheetData, [ri + i + 1, 8], item.person, STYLE_CELL);
      text(sheetData, [ri + i + 1, 9, 0, 3], item.result, STYLE_CELL_LEFT);
    });
    ri += 1 + data.scyx.length;
    //备注
    text(sheetData, [ri, 0], "备注", STYLE_CELL);
    text(
      sheetData,
      [ri, 1, 0, 11],
      "生产影12312321321321321321321响",
      STYLE_CELL
    );
    ri += 1;
    //备注
    text(sheetData, [ri, 0, 0, 5], "值班领导：额为全  请问", STYLE_NORMAL_LEFT);
    text(sheetData, [ri, 6, 0, 2], "天气：多云 2~15℃", STYLE_NORMAL);
    text(sheetData, [ri, 10, 0, 2], "日期：2020年3月30日", STYLE_NORMAL_RIGHT);

    sheetData["!ref"] = `A1:${XLSX.utils.encode_cell({
      r: ri,
      c: COL_SIZE,
    })}`;
    wb.Sheets["Sheet1"] = sheetData;
    saveAs(
      new Blob([s2ab(XLSX.write(wb, wopts))], {
        type: "application/octet-stream",
      }),
      "这里是下载的文件名" +
        "." +
        (wopts.bookType == "biff2" ? "xls" : wopts.bookType)
    );
  };
})();

function text(data, cellIndex, text, s) {
  var index = XLSX.utils.encode_cell({ r: cellIndex[0], c: cellIndex[1] });
  data[index] = data[index] || {};
  data[index].v = text;
  data[index].t = "s";
  style(data, index, s);
  if (cellIndex.length == 4) {
    merge(data, [
      cellIndex[0],
      cellIndex[1],
      cellIndex[0] + cellIndex[2],
      cellIndex[1] + cellIndex[3],
    ]);
    for (var i = cellIndex[0]; i <= cellIndex[0] + cellIndex[2]; i++) {
      for (var j = cellIndex[1]; j <= cellIndex[1] + cellIndex[3]; j++) {
        style(data, XLSX.utils.encode_cell({ r: i, c: j }), s);
      }
    }
  }
}

function style(data, index, style) {
  data[index] = data[index] || {};
  data[index].s = style;
}

function merge(data, range) {
  data["!merges"] = data["!merges"] || [];
  data["!merges"].push({
    //合并第一行数据[B1,C1,D1,E1]
    s: {
      //s为开始
      c: range[1], //开始列
      r: range[0], //开始取值范围
    },
    e: {
      //e结束
      c: range[3], //结束列
      r: range[2], //结束范围
    },
  });
}

$excel.exportWb = function(wb) {
  var wopts = { bookType: "xlsx", bookSST: false, type: "binary" }; //这里的数据是用来定义导出的格式类型
  saveAs(
    new Blob([s2ab(XLSX.write(wb, wopts))], {
      type: "application/octet-stream",
    }),
    "这里是下载的文件名" +
      "." +
      (wopts.bookType == "biff2" ? "xls" : wopts.bookType)
  );
};

//如果使用 FileSaver.js 就不要同时使用以下函数
function saveAs(obj, fileName) {
  //当然可以自定义简单的下载文件实现方式
  var tmpa = document.createElement("a");
  tmpa.download = fileName || "下载";
  tmpa.href = URL.createObjectURL(obj); //绑定a标签
  tmpa.click(); //模拟点击实现下载
  setTimeout(function() {
    //延时释放
    URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
  }, 100);
}

function s2ab(s) {
  if (typeof ArrayBuffer !== "undefined") {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  } else {
    var buf = new Array(s.length);
    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
}
