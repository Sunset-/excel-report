(function() {
  var $excel = (window.$excel = {});

  const wopts = { bookType: "xlsx", bookSST: false, type: "binary" }; //这里的数据是用来定义导出的格式类型

  function num(v) {
    if (!v) {
      return 0;
    }
    var nv = +v;
    if (isNaN(nv)) {
      return 0;
    }
    return nv;
    n;
  }

  function fixed(v, d) {
    var v = +v;
    if (isNaN(v)) {
      v = 0;
    }
    return v.toFixed(d);
  }

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
  var STYLE_FONT_TEXT = { name: "宋体", sz: 18, color: { rgb: "000000" } };

  var STYLE_TITLE = {
    font: {
      name: "方正小标宋简体",
      sz: 36,
      bold: true,
      color: { rgb: "000000" },
    },
    border: {
      diagonalDown: true,
    },
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  };

  var STYLE_NORMAL = {
    font: { name: "宋体", sz: 20, color: { rgb: "000000" } },
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

  //导出报表A
  $excel.exportReportA = function(data) {
    var wb = { SheetNames: ["Sheet1"], Sheets: {} };
    var sheetData = {};
    var ri = 0;

    //宽度
    sheetData["!cols"] = [
      { wch: 6.6 }, //A
      { wch: 12.6 }, //B
      { wch: 31 }, //C
      { wch: 12 }, //D
      { wch: 14 }, //E
      { wch: 19 }, //F
      { wch: 15 }, //G
      { wch: 14 }, //H
      { wch: 14.5 }, //I
      { wch: 21 }, //G
      { wch: 21 }, //K
      { wch: 21 }, //L
      { wch: 30 }, //M
    ];
    sheetData["!rows"] = [
      { hpt: 45 },
      { hpt: 29 },
      { hpt: 45 },
      { hpt: 24 },
      { hpt: 24 },
      { hpt: 24 },
      { hpt: 24 },
      { hpt: 24 },
      { hpt: 24 },
      { hpt: 24 },
      { hpt: 24 },
      { hpt: 37 },
      { hpt: 37 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 40 },
      { hpt: 45 },
      { hpt: 45 },
      { hpt: 45 },
      { hpt: 45 },
      { hpt: 38 },
    ];
    //标题
    text(sheetData, [ri, 0, ri, COL_SIZE], data.title, STYLE_TITLE);
    ri++;
    //值班领导
    text(
      sheetData,
      [ri, 0, 0, 4],
      `  值班领导：${data.gzrzbld}`,
      STYLE_NORMAL_LEFT
    );
    text(sheetData, [ri, 6, 0, 2], `天气：${data.gzrtq}`, STYLE_NORMAL);
    text(sheetData, [ri, 10, 0, 2], `日期：${data.gzrrq}`, STYLE_NORMAL_RIGHT);
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
    text(
      sheetData,
      [ri + 1, 4, 1, 1],
      fixed(num(data.ym_rc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 1, 6, 1, 1],
      fixed(num(data.ym_ylj), 1),
      STYLE_CELL
    );
    text(sheetData, [ri + 3, 4, 1, 1], fixed(num(data.rxl_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 3, 6, 1, 1], fixed(num(data.rxl_ylj), 1), STYLE_CELL);
    text(sheetData, [ri + 5, 4, 1, 1], fixed(num(data.jm_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 5, 6, 1, 1], fixed(num(data.jm_ylj), 1), STYLE_CELL);
    text(sheetData, [ri + 7, 4, 1, 1], fixed(num(data.shm_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 7, 6, 1, 1], fixed(num(data.shm_ylj), 1), STYLE_CELL);
    //销售
    text(sheetData, [ri, 8, 8, 0], `销售`, STYLE_CELL);
    text(sheetData, [ri, 9], `品种`, STYLE_CELL);
    text(sheetData, [ri, 10], `日销量（t）`, STYLE_CELL);
    text(sheetData, [ri, 11], `月销售（t）`, STYLE_CELL);
    text(sheetData, [ri, 12], `品种煤库存（t）`, STYLE_CELL);
    text(sheetData, [ri + 1, 9], `原煤`, STYLE_CELL);
    text(sheetData, [ri + 1, 10], fixed(num(data.ym_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 1, 11], fixed(num(data.ym_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 1, 12], fixed(num(data.ym_kc), 2), STYLE_CELL);
    text(sheetData, [ri + 2, 9], `筛混煤`, STYLE_CELL);
    text(sheetData, [ri + 2, 10], fixed(num(data.shm_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 2, 11], fixed(num(data.shm_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 2, 12], fixed(num(data.shm_kc), 2), STYLE_CELL);
    text(sheetData, [ri + 3, 9], `末精煤`, STYLE_CELL);
    text(sheetData, [ri + 3, 10], fixed(num(data.mjm_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 3, 11], fixed(num(data.mjm_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 3, 12], fixed(num(data.mjm_kc), 2), STYLE_CELL);
    text(sheetData, [ri + 4, 9], `籽煤`, STYLE_CELL);
    text(sheetData, [ri + 4, 10], fixed(num(data.zm_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 4, 11], fixed(num(data.zm_yxl), 2), STYLE_CELL);
    text(
      sheetData,
      [ri + 4, 12, 2, 0],
      fixed(num(data.zm_sbkm_dk_kc), 2),
      STYLE_CELL
    );
    text(sheetData, [ri + 5, 9], `三八块煤`, STYLE_CELL);
    text(sheetData, [ri + 5, 10], fixed(num(data.sbkm_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 5, 11], fixed(num(data.sbkm_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 6, 9], `大块`, STYLE_CELL);
    text(sheetData, [ri + 6, 10], fixed(num(data.dk_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 6, 11], fixed(num(data.dk_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 7, 9, 1, 0], `合计`, STYLE_CELL);
    text(
      sheetData,
      [ri + 7, 10, 1, 0],
      fixed(num(data.total_rxl), 2),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 11, 1, 0],
      fixed(num(data.total_yxl), 2),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 12, 1, 0],
      fixed(num(data.total_kc), 2),
      STYLE_CELL
    );
    ri += 9;
    //综采队
    text(sheetData, [ri, 1, 1, 0], "综采队", STYLE_CELL);
    text(sheetData, [ri, 2, 1, 0], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri, 3, 0, 4], data.zcd_work, STYLE_CELL);
    text(sheetData, [ri + 1, 3, 0, 4], data.zcd_desc, STYLE_CELL);
    //掘一队
    text(sheetData, [ri + 2, 1, 1, 0], "掘一队", STYLE_CELL);
    text(sheetData, [ri + 2, 2, 0, 0], "1032101工作面回风巷", STYLE_CELL);
    text(sheetData, [ri + 2, 3, 0, 1], `掘进${data.j1d_1032101hfx_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 2, 5, 0, 2], `月累计${data.j1d_1032101hfx_yjj}米`, STYLE_CELL);
    text(sheetData, [ri + 3, 2], "1032102工作面回风联巷", STYLE_CELL);
    text(sheetData, [ri + 3, 3, 0, 1], `掘进${data.j1d_1032102hflx_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 3, 5, 0, 2],  `月累计${data.j1d_1032102hflx_yjj}米`, STYLE_CELL);
    //掘三队
    text(sheetData, [ri + 4, 1, 1, 0], "掘三队", STYLE_CELL);
    text(sheetData, [ri + 4, 2, 0, 0], "1012006辅运绕道", STYLE_CELL);
    text(sheetData, [ri + 4, 3, 0, 1], `掘进${data.j3d_1012006fyrd_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 4, 5, 0, 2],  `月累计${data.j3d_1012006fyrd_yjj}米`, STYLE_CELL);
    text(sheetData, [ri + 5, 2], "1012006回风道", STYLE_CELL);
    text(sheetData, [ri + 5, 3, 0, 1], `掘进${data.j3d_1012006hfd_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 5, 5, 0, 2],  `月累计${data.j3d_1012006hfd_yjj}米`, STYLE_CELL);
    //重庆中环
    text(sheetData, [ri + 6, 1, 3, 0], "重庆中环", STYLE_CELL);
    text(sheetData, [ri + 6, 2, 0, 0], "2-1煤辅运联络巷", STYLE_CELL);
    text(sheetData, [ri + 6, 3, 0, 1], `掘进${data.cqzh_21mfyllx_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 6, 5, 0, 2],  `月累计${data.cqzh_21mfyllx_yjj}米`, STYLE_CELL);
    text(sheetData, [ri + 7, 2], "东翼一号回风反掘", STYLE_CELL);
    text(sheetData, [ri + 7, 3, 0, 1], `掘进${data.cqzh_dyyhhffj_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 7, 5, 0, 2],  `月累计${data.cqzh_dyyhhffj_yjj}米`, STYLE_CELL);
    text(sheetData, [ri + 8, 2], "1012007回风巷", STYLE_CELL);
    text(sheetData, [ri + 8, 3, 0, 1], `掘进${data.cqzh_1012007hfx_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 8, 5, 0, 2],  `月累计${data.cqzh_1012007hfx_yjj}米`, STYLE_CELL);
    text(sheetData, [ri + 9, 2], "东翼一号辅运巷", STYLE_CELL);
    text(sheetData, [ri + 9, 3, 0, 1], `掘进${data.cqzh_dyyhfyx_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 9, 5, 0, 2],  `月累计${data.cqzh_dyyhfyx_yjj}米`, STYLE_CELL);
    //中煤36处
    text(sheetData, [ri + 10, 1], "中煤36处", STYLE_CELL);
    text(sheetData, [ri + 10, 2], "1012007皮带巷", STYLE_CELL);
    text(sheetData, [ri + 10, 3, 0, 1], `掘进${data.zm36c_1012007pdx_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 10, 5, 0, 2],  `月累计${data.zm36c_1012007pdx_yjj}米`, STYLE_CELL);
    //合计掘进进尺
    text(sheetData, [ri + 11, 1, 0, 1], "合计掘进进尺", STYLE_CELL);
    text(sheetData, [ri + 11, 3, 0, 1], `掘进${data.total_rjj}米`, STYLE_CELL);
    text(sheetData, [ri + 11, 5, 0, 2],  `月累计${data.total_yjj}米`, STYLE_CELL);

    //抽采队
    text(sheetData, [ri, 8, 3, 0], "抽采队", STYLE_CELL);
    text(sheetData, [ri, 9, 1, 3], data.ccd_ccl, STYLE_CELL);
    text(
      sheetData,
      [ri + 2, 9, 1, 3],
      data.ccd_desc,
      STYLE_CELL_LEFT
    );
    //通风队
    text(sheetData, [ri + 4, 8], "通风队", STYLE_CELL);
    text(sheetData, [ri + 4, 9], "通风系统", STYLE_CELL);
    text(sheetData, [ri + 4, 10, 0, 2], data.tfd_desc, STYLE_CELL);
    //运输队
    text(sheetData, [ri + 5, 8], "运输队", STYLE_CELL);
    text(sheetData, [ri + 5, 9], "运输系统", STYLE_CELL);
    text(sheetData, [ri + 5, 10, 0, 2], data.ysd_desc, STYLE_CELL);
    //机电队
    text(sheetData, [ri + 6, 8, 3, 0], "机电队", STYLE_CELL);
    text(sheetData, [ri + 6, 9], "提升系统", STYLE_CELL);
    text(sheetData, [ri + 6, 10, 0, 2], data.jdd_tsxt, STYLE_CELL);
    text(sheetData, [ri + 7, 9], "供电系统", STYLE_CELL);
    text(sheetData, [ri + 7, 10, 0, 2], data.jdd_gdxt, STYLE_CELL);
    text(sheetData, [ri + 8, 9, 1, 0], "排水系统", STYLE_CELL);
    text(sheetData, [ri + 8, 10, 1, 2], data.jdd_psxt, STYLE_CELL);
    //准备队
    text(sheetData, [ri + 10, 8], "准备队", STYLE_CELL);
    text(
      sheetData,
      [ri + 10, 9, 0, 3],
      data.zbd_desc,
      STYLE_CELL_LEFT
    );
    //东翼一号回风立井
    text(sheetData, [ri + 11, 8], "东翼一号回风立井", STYLE_CELL);
    text(
      sheetData,
      [ri + 11, 9, 0, 3],
      data.dyyhhflj_desc,
      STYLE_CELL_LEFT
    );
    ri += 12;
    //生产影响
    text(sheetData, [ri, 0], "序号", STYLE_CELL);
    text(sheetData, [ri, 1, 0, 6], "生产影响", STYLE_CELL);
    text(sheetData, [ri, 8], "责任人", STYLE_CELL);
    text(sheetData, [ri, 9, 0, 3], "处理结果", STYLE_CELL);
    ["1","2","3"].forEach((v,i) => {
      text(sheetData, [ri + i + 1, 0], i + 1, STYLE_CELL);
      text(sheetData, [ri + i + 1, 1, 0, 6], data[`scqk${v}_scyx`], STYLE_CELL_LEFT);
      text(sheetData, [ri + i + 1, 8], data[`scqk${v}_zrr`], STYLE_CELL);
      text(sheetData, [ri + i + 1, 9, 0, 3], data[`scqk${v}_cljg`], STYLE_CELL_LEFT);
    });
    ri += 1 + 3;
    //备注
    text(sheetData, [ri, 0], "备注", STYLE_CELL_LEFT);
    text(
      sheetData,
      [ri, 1, 0, 11],
      data.remark,
      STYLE_CELL
    );
    ri += 1;
    //备注
    text(sheetData, [ri, 0, 0, 5], `值班领导：${data.tbrzbld}`, STYLE_NORMAL_LEFT);
    text(sheetData, [ri, 6, 0, 2], `天气：${data.tbrtq}`, STYLE_NORMAL);
    text(sheetData, [ri, 10, 0, 2], `日期：${data.tbrrq}`, STYLE_NORMAL_RIGHT);

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
