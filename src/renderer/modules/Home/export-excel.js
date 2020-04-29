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

  var STYLE_SUB_TEXT = {
    font: { name: "宋体", sz: 20, color: { rgb: "000000" } },
    alignment: {
      vertical: "center",
      horizontal: "center",
    },
  };
  var STYLE_SUB_TEXT_LEFT = {
    font: STYLE_FONT_TEXT,
    alignment: {
      vertical: "center",
      horizontal: "left",
    },
  };
  var STYLE_SUB_TEXT_RIGHT = {
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
    var colSize = 12;

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
      { hpt: 40 },
      { hpt: 65 },
      { hpt: 65 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 55 },
      { hpt: 40 },
      { hpt: 48 },
      { hpt: 48 },
      { hpt: 48 },
      { hpt: 48 },
      { hpt: 38 },
    ];
    //标题
    text(
      sheetData,
      [ri, 0, ri, colSize],
      data.title.split("").join(" "),
      STYLE_TITLE
    );
    ri++;
    //值班领导
    text(
      sheetData,
      [ri, 0, 0, 4],
      `  值班领导：${data.gzrzbld}`,
      STYLE_SUB_TEXT_LEFT
    );
    text(sheetData, [ri, 6, 0, 2], `天气：${data.gzrtq}`, STYLE_SUB_TEXT);
    text(
      sheetData,
      [ri, 10, 0, 2],
      `日期：${data.gzrrq}`,
      STYLE_SUB_TEXT_RIGHT
    );
    ri++;
    text(sheetData, [ri, 0, 16, 0], `生产情况`, STYLE_CELL_VERT);
    //产销量
    text(sheetData, [ri, 1, 8, 0], `产销量`, STYLE_CELL);
    text(
      sheetData,
      [ri, 2, 0, 1],
      `   品种                产量`,
      STYLE_CELL_XX
    );
    text(sheetData, [ri, 4, 0, 1], `日产量（t）`, STYLE_CELL);
    text(sheetData, [ri, 6, 0, 1], `月累计（t）`, STYLE_CELL);
    text(sheetData, [ri + 1, 2, 1, 1], `原煤`, STYLE_CELL);
    text(sheetData, [ri + 3, 2, 1, 1], `入选量`, STYLE_CELL);
    text(sheetData, [ri + 5, 2, 3, 0], `商品煤`, STYLE_CELL);
    text(sheetData, [ri + 5, 3, 1, 0], `精煤`, STYLE_CELL);
    text(sheetData, [ri + 7, 3, 1, 0], `筛混煤`, STYLE_CELL);
    text(sheetData, [ri + 1, 4, 1, 1], fixed(num(data.ym_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 1, 6, 1, 1], fixed(num(data.ym_ylj), 1), STYLE_CELL);
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
    text(
      sheetData,
      [ri + 2, 3, 0, 1],
      `掘进${data.j1d_1032101hfx_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 2, 5, 0, 2],
      `月累计${data.j1d_1032101hfx_yjj}米`,
      STYLE_CELL
    );
    text(sheetData, [ri + 3, 2], "1032102工作面回风联巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 3, 3, 0, 1],
      `掘进${data.j1d_1032102hflx_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 3, 5, 0, 2],
      `月累计${data.j1d_1032102hflx_yjj}米`,
      STYLE_CELL
    );
    //掘三队
    text(sheetData, [ri + 4, 1, 1, 0], "掘三队", STYLE_CELL);
    text(sheetData, [ri + 4, 2, 0, 0], "1012006辅运绕道", STYLE_CELL);
    text(
      sheetData,
      [ri + 4, 3, 0, 1],
      `掘进${data.j3d_1012006fyrd_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 4, 5, 0, 2],
      `月累计${data.j3d_1012006fyrd_yjj}米`,
      STYLE_CELL
    );
    text(sheetData, [ri + 5, 2], "1012006回风道", STYLE_CELL);
    text(
      sheetData,
      [ri + 5, 3, 0, 1],
      `掘进${data.j3d_1012006hfd_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 5, 5, 0, 2],
      `月累计${data.j3d_1012006hfd_yjj}米`,
      STYLE_CELL
    );
    //重庆中环
    text(sheetData, [ri + 6, 1, 3, 0], "重庆中环", STYLE_CELL);
    text(sheetData, [ri + 6, 2, 0, 0], "2-1煤辅运联络巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 6, 3, 0, 1],
      `掘进${data.cqzh_21mfyllx_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 6, 5, 0, 2],
      `月累计${data.cqzh_21mfyllx_yjj}米`,
      STYLE_CELL
    );
    text(sheetData, [ri + 7, 2], "东翼一号回风反掘", STYLE_CELL);
    text(
      sheetData,
      [ri + 7, 3, 0, 1],
      `掘进${data.cqzh_dyyhhffj_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 5, 0, 2],
      `月累计${data.cqzh_dyyhhffj_yjj}米`,
      STYLE_CELL
    );
    text(sheetData, [ri + 8, 2], "1012007回风巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 8, 3, 0, 1],
      `掘进${data.cqzh_1012007hfx_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 8, 5, 0, 2],
      `月累计${data.cqzh_1012007hfx_yjj}米`,
      STYLE_CELL
    );
    text(sheetData, [ri + 9, 2], "东翼一号辅运巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 9, 3, 0, 1],
      `掘进${data.cqzh_dyyhfyx_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 9, 5, 0, 2],
      `月累计${data.cqzh_dyyhfyx_yjj}米`,
      STYLE_CELL
    );
    //中煤36处
    text(sheetData, [ri + 10, 1], "中煤36处", STYLE_CELL);
    text(sheetData, [ri + 10, 2], "1012007皮带巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 10, 3, 0, 1],
      `掘进${data.zm36c_1012007pdx_rjj}米`,
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 10, 5, 0, 2],
      `月累计${data.zm36c_1012007pdx_yjj}米`,
      STYLE_CELL
    );
    //合计掘进进尺
    text(sheetData, [ri + 11, 1, 0, 1], "合计掘进进尺", STYLE_CELL);
    text(sheetData, [ri + 11, 3, 0, 1], `掘进${data.total_rjj}米`, STYLE_CELL);
    text(
      sheetData,
      [ri + 11, 5, 0, 2],
      `月累计${data.total_yjj}米`,
      STYLE_CELL
    );

    //抽采队
    text(sheetData, [ri, 8, 3, 0], "抽采队", STYLE_CELL);
    text(sheetData, [ri, 9, 1, 3], data.ccd_ccl, STYLE_CELL);
    text(sheetData, [ri + 2, 9, 1, 3], data.ccd_desc, STYLE_CELL_LEFT);
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
    text(sheetData, [ri + 10, 9, 0, 3], data.zbd_desc, STYLE_CELL_LEFT);
    //东翼一号回风立井
    text(sheetData, [ri + 11, 8], "东翼一号回风立井", STYLE_CELL);
    text(sheetData, [ri + 11, 9, 0, 3], data.dyyhhflj_desc, STYLE_CELL_LEFT);
    ri += 12;
    //生产影响
    text(sheetData, [ri, 0], "序号", STYLE_CELL);
    text(sheetData, [ri, 1, 0, 6], "生产影响", STYLE_CELL);
    text(sheetData, [ri, 8], "责任人", STYLE_CELL);
    text(sheetData, [ri, 9, 0, 3], "处理结果", STYLE_CELL);
    ["1", "2", "3"].forEach((v, i) => {
      text(sheetData, [ri + i + 1, 0], i + 1, STYLE_CELL);
      text(
        sheetData,
        [ri + i + 1, 1, 0, 6],
        data[`scqk${v}_scyx`],
        STYLE_CELL_LEFT
      );
      text(sheetData, [ri + i + 1, 8], data[`scqk${v}_zrr`], STYLE_CELL);
      text(
        sheetData,
        [ri + i + 1, 9, 0, 3],
        data[`scqk${v}_cljg`],
        STYLE_CELL_LEFT
      );
    });
    ri += 1 + 3;
    //备注
    text(sheetData, [ri, 0], "备注", STYLE_CELL);
    text(sheetData, [ri, 1, 0, 11], data.remark, STYLE_CELL_LEFT);
    ri += 1;
    //备注
    text(
      sheetData,
      [ri, 0, 0, 5],
      `值班领导：${data.tbrzbld}`,
      STYLE_SUB_TEXT_LEFT
    );
    text(sheetData, [ri, 6, 0, 2], `天气：${data.tbrtq}`, STYLE_SUB_TEXT);
    text(
      sheetData,
      [ri, 10, 0, 2],
      `日期：${data.tbrrq}`,
      STYLE_SUB_TEXT_RIGHT
    );

    sheetData["!ref"] = `A1:${XLSX.utils.encode_cell({
      r: ri,
      c: colSize,
    })}`;
    wb.Sheets["Sheet1"] = sheetData;
    saveAs(
      new Blob([s2ab(XLSX.write(wb, wopts))], {
        type: "application/octet-stream",
      }),
      `${data.gzrrq}生产日报表（投屏）` +
        "." +
        (wopts.bookType == "biff2" ? "xls" : wopts.bookType)
    );
  };

  //导出报表B
  $excel.exportReportB = function(data) {
    var wb = { SheetNames: ["Sheet1"], Sheets: {} };
    var sheetData = {};
    var ri = 0;
    var colSize = 18;

    var STYLE_TITLE = {
      font: {
        name: "宋体",
        sz: 20,
        bold: true,
        color: { rgb: "000000" },
      },
      border: {
        bottom: {
          style: "thin",
        },
      },
      alignment: {
        vertical: "center",
        horizontal: "center",
      },
    };

    var STYLE_SUB_TEXT_BOLD = {
      font: {
        name: "宋体",
        sz: 10.5,
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
    var STYLE_SUB_TEXT_BOLD_LEFT = {
      font: {
        name: "宋体",
        sz: 10.5,
        bold: true,
        color: { rgb: "000000" },
      },
      border: {
        diagonalDown: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "left",
      },
    };
    var STYLE_SUB_TEXT_BOLD_RIGHT = {
      font: {
        name: "宋体",
        sz: 10.5,
        bold: true,
        color: { rgb: "000000" },
      },
      border: {
        diagonalDown: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "right",
      },
    };

    var STYLE_SUB_TEXT = {
      font: {
        name: "宋体",
        sz: 11,
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
    var STYLE_SUB_TEXT_LEFT = {
      font: {
        name: "宋体",
        sz: 11,
        color: { rgb: "000000" },
      },
      border: {
        diagonalDown: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "left",
      },
    };
    var STYLE_SUB_TEXT_RIGHT = {
      font: {
        name: "宋体",
        sz: 11,
        color: { rgb: "000000" },
      },
      border: {
        diagonalDown: true,
      },
      alignment: {
        vertical: "center",
        horizontal: "right",
      },
    };

    var STYLE_CELL = {
      font: { name: "宋体", sz: 10, color: { rgb: "000000" } },
      border: STYLE_BORDER_ALL,
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
    };
    var STYLE_CELL_LEFT = {
      font: { name: "宋体", sz: 10, color: { rgb: "000000" } },
      border: STYLE_BORDER_ALL,
      alignment: {
        vertical: "center",
        horizontal: "left",
        wrapText: true,
      },
    };

    var STYLE_CELL_BOLD = {
      font: { name: "宋体", sz: 10, bold: true, color: { rgb: "000000" } },
      border: STYLE_BORDER_ALL,
      alignment: {
        vertical: "center",
        horizontal: "center",
        wrapText: true,
      },
    };

    var STYLE_CELL_XX = {
      font: { name: "宋体", sz: 10, color: { rgb: "000000" } },
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

    var STYLE_CELL_XX_BOLD = {
      font: { name: "宋体", sz: 10, bold: true, color: { rgb: "000000" } },
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

    //宽度
    sheetData["!cols"] = [
      { wch: 8 }, //A
      { wch: 12 }, //B
      { wch: 12 }, //C
      { wch: 12 }, //D
      { wch: 15 }, //E
      { wch: 15 }, //F
      { wch: 14 }, //G
      { wch: 9.2 }, //H
      { wch: 9.2 }, //I
      { wch: 10 }, //J
      { wch: 8.3 }, //K
      { wch: 9.5 }, //L
      { wch: 9.5 }, //M
      { wch: 9.5 }, //N
      { wch: 9.5 }, //O
      { wch: 12 }, //P
      { wch: 12 }, //Q
      { wch: 12 }, //R
    ];
    sheetData["!rows"] = [
      { hpt: 27.75 },
      { hpt: 21 },
      { hpt: 26 },
      { hpt: 16 },
      { hpt: 16 },
      { hpt: 16 },
      { hpt: 16 },
      { hpt: 16 },
      { hpt: 16 },
      { hpt: 16 },
      { hpt: 16 },

      { hpt: 25.5 },
      { hpt: 25.5 },

      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },
      { hpt: 16.5 },

      { hpt: 19.5 },

      { hpt: 27 },
      { hpt: 27 },

      { hpt: 24 },
      { hpt: 24 },
      { hpt: 24 },

      { hpt: 31.5 },
      { hpt: 31.5 },

      { hpt: 30 },
      { hpt: 30 },

      { hpt: 27 },
      { hpt: 27 },
      { hpt: 14 },
      { hpt: 14 },
      { hpt: 14 },
    ];
    //标题
    text(sheetData, [ri, 0, ri, colSize - 1], data.title, STYLE_TITLE);
    ri++;
    //值班领导
    text(
      sheetData,
      [ri, 0, 0, 4],
      ` 值班领导：${data.gzrzbld}`,
      STYLE_SUB_TEXT_BOLD_LEFT
    );
    text(sheetData, [ri, 6, 0, 3], `天气：${data.gzrtq}`, STYLE_SUB_TEXT_BOLD);
    text(
      sheetData,
      [ri, 15, 0, 2],
      `日期：${data.gzrrq}`,
      STYLE_SUB_TEXT_BOLD_RIGHT
    );
    ri++;
    //产销量
    text(sheetData, [ri, 0, 8, 0], `产销量`, STYLE_CELL_BOLD);
    text(
      sheetData,
      [ri, 1, 0, 1],
      ` 品种                  产量`,
      STYLE_CELL_XX
    );
    text(sheetData, [ri, 3], `日产量（t）`, STYLE_CELL);
    text(sheetData, [ri, 4], `月累计（t）`, STYLE_CELL);
    text(sheetData, [ri + 1, 1, 1, 1], `原煤`, STYLE_CELL);
    text(sheetData, [ri + 3, 1, 1, 1], `入选量`, STYLE_CELL);
    text(sheetData, [ri + 5, 1, 3, 0], `商品煤`, STYLE_CELL);
    text(sheetData, [ri + 5, 2, 1, 0], `精煤`, STYLE_CELL);
    text(sheetData, [ri + 7, 2, 1, 0], `筛混煤`, STYLE_CELL);
    text(sheetData, [ri + 1, 3, 1, 0], fixed(num(data.ym_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 1, 4, 1, 0], fixed(num(data.ym_ylj), 1), STYLE_CELL);
    text(sheetData, [ri + 3, 3, 1, 0], fixed(num(data.rxl_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 3, 4, 1, 0], fixed(num(data.rxl_ylj), 1), STYLE_CELL);
    text(sheetData, [ri + 5, 3, 1, 0], fixed(num(data.jm_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 5, 4, 1, 0], fixed(num(data.jm_ylj), 1), STYLE_CELL);
    text(sheetData, [ri + 7, 3, 1, 0], fixed(num(data.shm_rc), 1), STYLE_CELL);
    text(sheetData, [ri + 7, 4, 1, 0], fixed(num(data.shm_ylj), 1), STYLE_CELL);
    //销售
    text(sheetData, [ri, 5, 0, 1], `日销量（t）`, STYLE_CELL);
    text(sheetData, [ri, 7, 0, 1], `月销量（t）`, STYLE_CELL);
    text(sheetData, [ri, 9, 0, 1], `品种煤库存（t）`, STYLE_CELL);
    text(sheetData, [ri + 1, 5], `原  煤`, STYLE_CELL);
    text(sheetData, [ri + 1, 6], fixed(num(data.ym_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 1, 7, 0, 1], fixed(num(data.ym_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 1, 9, 0, 1], fixed(num(data.ym_kc), 2), STYLE_CELL);
    text(sheetData, [ri + 2, 5], `筛混煤`, STYLE_CELL);
    text(sheetData, [ri + 2, 6], fixed(num(data.shm_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 2, 7, 0, 1], fixed(num(data.shm_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 2, 9, 0, 1], fixed(num(data.shm_kc), 2), STYLE_CELL);
    text(sheetData, [ri + 3, 5], `末精煤`, STYLE_CELL);
    text(sheetData, [ri + 3, 6], fixed(num(data.mjm_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 3, 7, 0, 1], fixed(num(data.mjm_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 3, 9, 0, 1], fixed(num(data.mjm_kc), 2), STYLE_CELL);
    text(sheetData, [ri + 4, 5], `籽  煤`, STYLE_CELL);
    text(sheetData, [ri + 4, 6], fixed(num(data.zm_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 4, 7, 0, 1], fixed(num(data.zm_yxl), 2), STYLE_CELL);
    text(
      sheetData,
      [ri + 4, 9, 2, 1],
      fixed(num(data.zm_sbkm_dk_kc), 2),
      STYLE_CELL
    );
    text(sheetData, [ri + 5, 5], `三八块煤`, STYLE_CELL);
    text(sheetData, [ri + 5, 6], fixed(num(data.sbkm_rxl), 2), STYLE_CELL);
    text(
      sheetData,
      [ri + 5, 7, 0, 1],
      fixed(num(data.sbkm_yxl), 2),
      STYLE_CELL
    );
    text(sheetData, [ri + 6, 5], `大  块`, STYLE_CELL);
    text(sheetData, [ri + 6, 6], fixed(num(data.dk_rxl), 2), STYLE_CELL);
    text(sheetData, [ri + 6, 7, 0, 1], fixed(num(data.dk_yxl), 2), STYLE_CELL);
    text(sheetData, [ri + 7, 5, 1, 0], `合计`, STYLE_CELL);
    text(
      sheetData,
      [ri + 7, 6, 1, 0],
      fixed(num(data.total_rxl), 2),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 7, 1, 1],
      fixed(num(data.total_yxl), 2),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 9, 1, 1],
      fixed(num(data.total_kc), 2),
      STYLE_CELL
    );
    ri += 9;
    //采煤
    text(sheetData, [ri, 0, 1, 0], "采煤", STYLE_CELL_BOLD);
    text(sheetData, [ri, 1, 1, 0], "综采队", STYLE_CELL);
    text(sheetData, [ri, 2, 1, 1], "1012001综采工作面", STYLE_CELL);
    text(sheetData, [ri, 4, 0, 6], data.zcd_work, STYLE_CELL);
    text(sheetData, [ri + 1, 4, 0, 6], data.zcd_desc, STYLE_CELL);
    ri += 2;
    //掘进
    text(sheetData, [ri, 0, 13, 0], "掘进", STYLE_CELL_BOLD);
    text(
      sheetData,
      [ri, 1, 1, 2],
      `   区域                       掘进进尺`,
      STYLE_CELL_XX_BOLD
    );
    text(sheetData, [ri, 4, 1, 0], "月计划      （m）", STYLE_CELL_BOLD);
    text(sheetData, [ri, 5, 1, 0], "日计划      （m）", STYLE_CELL_BOLD);
    text(sheetData, [ri, 6, 1, 0], "日完成      （m）", STYLE_CELL_BOLD);
    text(sheetData, [ri, 7, 1, 0], "月完成    （m）", STYLE_CELL_BOLD);
    text(sheetData, [ri, 8, 1, 0], "累计   （m）", STYLE_CELL_BOLD);
    text(sheetData, [ri, 9, 1, 0], "剩余   （m）", STYLE_CELL_BOLD);

    text(sheetData, [ri + 2, 1, 2, 0], "东翼大巷", STYLE_CELL);
    text(sheetData, [ri + 5, 1, 1, 0], "1012006工作面", STYLE_CELL);
    text(sheetData, [ri + 7, 1], "1032101工作面", STYLE_CELL);
    text(sheetData, [ri + 8, 1], "1032102工作面", STYLE_CELL);
    text(sheetData, [ri + 9, 1, 2, 0], "1012007工作面", STYLE_CELL);
    text(sheetData, [ri + 12, 1], "西翼大巷", STYLE_CELL);
    text(sheetData, [ri + 13, 1, 0, 2], "掘进进尺合计（m）", STYLE_CELL_BOLD);

    text(sheetData, [ri + 2, 2, 0, 1], "一号回风大巷反掘", STYLE_CELL);
    text(sheetData, [ri + 3, 2, 0, 1], "2-1煤辅运联络巷", STYLE_CELL);
    text(sheetData, [ri + 4, 2, 0, 1], "一号辅运大巷", STYLE_CELL);
    text(sheetData, [ri + 5, 2, 0, 1], "辅运绕道", STYLE_CELL);
    text(sheetData, [ri + 6, 2, 0, 1], "回风道", STYLE_CELL);
    text(sheetData, [ri + 7, 2, 0, 1], "回风绕道", STYLE_CELL);
    text(sheetData, [ri + 8, 2, 0, 1], "回风联巷", STYLE_CELL);
    text(sheetData, [ri + 9, 2, 0, 1], "胶运巷", STYLE_CELL);
    text(sheetData, [ri + 10, 2, 0, 1], "回风巷", STYLE_CELL);
    text(sheetData, [ri + 11, 2, 0, 1], "高抽巷", STYLE_CELL);
    text(sheetData, [ri + 12, 2, 0, 1], "一号回风巷", STYLE_CELL);

    text(
      sheetData,
      [ri + 2, 4],
      fixed(num(data.dydx_yhhfdxfj_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 2, 5],
      fixed(num(data.dydx_yhhfdxfj_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 2, 6],
      fixed(num(data.dydx_yhhfdxfj_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 2, 7],
      fixed(num(data.dydx_yhhfdxfj_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 2, 8],
      fixed(num(data.dydx_yhhfdxfj_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 2, 9],
      fixed(num(data.dydx_yhhfdxfj_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 3, 4],
      fixed(num(data.dydx_21mfyllx_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 3, 5],
      fixed(num(data.dydx_21mfyllx_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 3, 6],
      fixed(num(data.dydx_21mfyllx_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 3, 7],
      fixed(num(data.dydx_21mfyllx_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 3, 8],
      fixed(num(data.dydx_21mfyllx_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 3, 9],
      fixed(num(data.dydx_21mfyllx_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 4, 4],
      fixed(num(data.dydx_yhfydx_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 4, 5],
      fixed(num(data.dydx_yhfydx_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 4, 6],
      fixed(num(data.dydx_yhfydx_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 4, 7],
      fixed(num(data.dydx_yhfydx_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 4, 8],
      fixed(num(data.dydx_yhfydx_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 4, 9],
      fixed(num(data.dydx_yhfydx_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 5, 4],
      fixed(num(data.gzm1012006_fyrd_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 5, 5],
      fixed(num(data.gzm1012006_fyrd_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 5, 6],
      fixed(num(data.gzm1012006_fyrd_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 5, 7],
      fixed(num(data.gzm1012006_fyrd_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 5, 8],
      fixed(num(data.gzm1012006_fyrd_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 5, 9],
      fixed(num(data.gzm1012006_fyrd_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 6, 4],
      fixed(num(data.gzm1012006_hfd_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 6, 5],
      fixed(num(data.gzm1012006_hfd_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 6, 6],
      fixed(num(data.gzm1012006_hfd_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 6, 7],
      fixed(num(data.gzm1012006_hfd_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 6, 8],
      fixed(num(data.gzm1012006_hfd_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 6, 9],
      fixed(num(data.gzm1012006_hfd_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 7, 4],
      fixed(num(data.gzm1032101_hfrd_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 5],
      fixed(num(data.gzm1032101_hfrd_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 6],
      fixed(num(data.gzm1032101_hfrd_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 7],
      fixed(num(data.gzm1032101_hfrd_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 8],
      fixed(num(data.gzm1032101_hfrd_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 7, 9],
      fixed(num(data.gzm1032101_hfrd_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 8, 4],
      fixed(num(data.gzm1032102_hflx_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 8, 5],
      fixed(num(data.gzm1032102_hflx_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 8, 6],
      fixed(num(data.gzm1032102_hflx_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 8, 7],
      fixed(num(data.gzm1032102_hflx_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 8, 8],
      fixed(num(data.gzm1032102_hflx_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 8, 9],
      fixed(num(data.gzm1032102_hflx_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 9, 4],
      fixed(num(data.gzm1012007_jyx_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 9, 5],
      fixed(num(data.gzm1012007_jyx_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 9, 6],
      fixed(num(data.gzm1012007_jyx_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 9, 7],
      fixed(num(data.gzm1012007_jyx_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 9, 8],
      fixed(num(data.gzm1012007_jyx_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 9, 9],
      fixed(num(data.gzm1012007_jyx_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 10, 4],
      fixed(num(data.gzm1012007_hfx_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 10, 5],
      fixed(num(data.gzm1012007_hfx_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 10, 6],
      fixed(num(data.gzm1012007_hfx_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 10, 7],
      fixed(num(data.gzm1012007_hfx_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 10, 8],
      fixed(num(data.gzm1012007_hfx_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 10, 9],
      fixed(num(data.gzm1012007_hfx_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 11, 4],
      fixed(num(data.gzm1012007_gcx_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 11, 5],
      fixed(num(data.gzm1012007_gcx_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 11, 6],
      fixed(num(data.gzm1012007_gcx_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 11, 7],
      fixed(num(data.gzm1012007_gcx_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 11, 8],
      fixed(num(data.gzm1012007_gcx_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 11, 9],
      fixed(num(data.gzm1012007_gcx_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 12, 4],
      fixed(num(data.xydx_yhhfx_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 12, 5],
      fixed(num(data.xydx_yhhfx_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 12, 6],
      fixed(num(data.xydx_yhhfx_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 12, 7],
      fixed(num(data.xydx_yhhfx_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 12, 8],
      fixed(num(data.xydx_yhhfx_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 12, 9],
      fixed(num(data.xydx_yhhfx_sy), 1),
      STYLE_CELL
    );

    text(
      sheetData,
      [ri + 13, 4],
      fixed(num(data.total_jjjchj_yjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 13, 5],
      fixed(num(data.total_jjjchj_rjh), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 13, 6],
      fixed(num(data.total_jjjchj_rwc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 13, 7],
      fixed(num(data.total_jjjchj_ywc), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 13, 8],
      fixed(num(data.total_jjjchj_lj), 1),
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 13, 9],
      fixed(num(data.total_jjjchj_sy), 1),
      STYLE_CELL
    );

    ri += 14;
    //钻孔施工
    text(sheetData, [ri, 0, 0, 9], "其它安全生产情况", STYLE_CELL_BOLD);
    ri += 1;
    text(sheetData, [ri, 0, 1, 0], "钻孔施工", STYLE_CELL_BOLD);
    text(sheetData, [ri, 1, 1, 8], data.zksg, STYLE_CELL);

    //瓦斯抽放系统运行情况
    text(sheetData, [ri + 2, 0, 2, 0], "瓦斯抽放系统运行情况", STYLE_CELL_BOLD);
    text(
      sheetData,
      [ri + 2, 1, 0, 1],
      "1012001工作面二号回风巷本煤层钻孔",
      STYLE_CELL
    );
    text(
      sheetData,
      [ri + 2, 3, 0, 5],
      `瓦斯抽采浓度 ${fixed(
        num(data.cc_gzm1012001_ehhfxbmczk_ccnd),
        2
      )}%，混合流量${fixed(
        num(data.cc_gzm1012001_ehhfxbmczk_hhll),
        2
      )}m³/min，日抽采量 ${data.cc_gzm1012001_ehhfxbmczk_rccl} m³，月累计 ${
        data.cc_gzm1012001_ehhfxbmczk_ccylj
      } m³。`,
      STYLE_CELL_LEFT
    );
    text(sheetData, [ri + 2, 9], "月累计抽采量（总）m³", STYLE_CELL);

    text(sheetData, [ri + 3, 1, 0, 1], "1012001工作面高抽巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 3, 3, 0, 5],
      `瓦斯抽采浓度 ${fixed(
        num(data.cc_gzm1012001_gcx_ccnd),
        2
      )}%，混合流量${fixed(
        num(data.cc_gzm1012001_gcx_hhll),
        2
      )}m³/min，日抽采量 ${data.cc_gzm1012001_gcx_rccl} m³，月累计 ${
        data.cc_gzm1012001_gcx_ccylj
      } m³。`,
      STYLE_CELL_LEFT
    );
    text(sheetData, [ri + 3, 9, 1, 0], data.total_cc_yljccl, STYLE_CELL);

    text(sheetData, [ri + 4, 1, 0, 1], "1012001工作面上隅角", STYLE_CELL);
    text(
      sheetData,
      [ri + 4, 3, 0, 5],
      `瓦斯抽采浓度 ${fixed(
        num(data.cc_gzm1012001_syj_ccnd),
        2
      )}%，混合流量${fixed(
        num(data.cc_gzm1012001_syj_hhll),
        2
      )}m³/min，日抽采量 ${data.cc_gzm1012001_syj_rccl} m³，月累计 ${
        data.cc_gzm1012001_syj_ccylj
      } m³。`,
      STYLE_CELL_LEFT
    );

    ri += 5;

    //防冲监测
    text(sheetData, [ri, 0, 1, 0], "防冲监测", STYLE_CELL_BOLD);
    text(sheetData, [ri, 1, 1, 1], "1012001工作面", STYLE_CELL);
    text(sheetData, [ri, 3], "微震事件频次", STYLE_CELL);
    text(sheetData, [ri + 1, 3], data.fcjc_gzm1012001_wzsjpc, STYLE_CELL);
    text(sheetData, [ri, 4], "最大能量（J）    预警值：1.00E+04J", STYLE_CELL);
    text(sheetData, [ri + 1, 4], data.fcjc_gzm1012001_zdnl, STYLE_CELL);
    text(sheetData, [ri, 5], "总能量（J）      预警值：2.50E+04J", STYLE_CELL);
    text(sheetData, [ri + 1, 5], data.fcjc_gzm1012001_znl, STYLE_CELL);
    text(
      sheetData,
      [ri, 6, 1, 0],
      "应力监测        预警值：       （浅孔14MPa）  （深孔16MPa）",
      STYLE_CELL
    );
    text(sheetData, [ri, 7, 0, 1], "1012001胶带运输巷", STYLE_CELL);
    text(sheetData, [ri, 9], data.fcjc_yljcyjz_1012001jdysx, STYLE_CELL);
    text(sheetData, [ri + 1, 7, 0, 1], "1012001二号回风巷", STYLE_CELL);
    text(sheetData, [ri + 1, 9], data.fcjc_yljcyjz_1012001ehhfx, STYLE_CELL);

    ri += 2;

    //瓦斯浓度（%）
    text(sheetData, [ri, 0, 1, 0], "瓦斯浓度（%）", STYLE_CELL_BOLD);
    text(sheetData, [ri, 1, 0, 1], "1012001工作面", STYLE_CELL);
    text(
      sheetData,
      [ri + 1, 1, 0, 1],
      `① ${fixed(num(data.wsnd_gzm1012001.v1), 2)}  ② ${fixed(
        num(data.wsnd_gzm1012001.v2),
        2
      )}  ③ ${fixed(num(data.wsnd_gzm1012001.v3), 2)}`,
      STYLE_CELL
    );
    text(sheetData, [ri, 3, 0, 1], "1012001工作面上隅角", STYLE_CELL);
    text(
      sheetData,
      [ri + 1, 3, 0, 1],
      `① ${fixed(num(data.wsnd_gzm1012001_syj.v1), 2)}  ② ${fixed(
        num(data.wsnd_gzm1012001_syj.v2),
        2
      )}  ③ ${fixed(num(data.wsnd_gzm1012001_syj.v3), 2)}`,
      STYLE_CELL
    );
    text(sheetData, [ri, 5, 0, 1], "1012001回风巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 1, 5, 0, 1],
      `① ${fixed(num(data.wsnd_gzm1012001_hfx.v1), 2)}  ② ${fixed(
        num(data.wsnd_gzm1012001_hfx.v2),
        2
      )}  ③ ${fixed(num(data.wsnd_gzm1012001_hfx.v3), 2)}`,
      STYLE_CELL
    );
    text(sheetData, [ri, 7, 0, 2], "1012001胶带运输巷", STYLE_CELL);
    text(
      sheetData,
      [ri + 1, 7, 0, 2],
      `① ${fixed(num(data.wsnd_gzm1012001_jdysx.v1), 2)}  ② ${fixed(
        num(data.wsnd_gzm1012001_jdysx.v2),
        2
      )}  ③ ${fixed(num(data.wsnd_gzm1012001_jdysx.v3), 2)}`,
      STYLE_CELL
    );

    ri += 2;
    //基本建设
    text(sheetData, [ri, 0, 1, 0], "基本建设", STYLE_CELL_BOLD);
    text(sheetData, [ri, 1, 0, 1], "物流中心", STYLE_CELL);
    text(sheetData, [ri, 3, 0, 6], data.jbjs_wlzx, STYLE_CELL_LEFT);
    text(sheetData, [ri + 1, 1, 0, 1], "东翼一号回风立井", STYLE_CELL);
    text(sheetData, [ri + 1, 3, 0, 6], data.jbjs_dyyhhflj, STYLE_CELL_LEFT);

    ri = 2;

    //三违
    text(sheetData, [ri, 11, 5, 0], "当日一般三违（人次）", STYLE_CELL);
    text(sheetData, [ri, 12, 5, 0], data.sw_drybsw, STYLE_CELL);
    text(sheetData, [ri, 13, 5, 0], "当日严重三违（人次）", STYLE_CELL);
    text(sheetData, [ri, 14, 5, 0], data.sw_dryzsw, STYLE_CELL);
    text(sheetData, [ri, 15, 5, 1], "当日领导抓三违（人次）", STYLE_CELL);
    text(sheetData, [ri, 17, 5, 0], data.sw_drldzsw, STYLE_CELL);

    text(sheetData, [ri + 6, 11, 4, 0], "当月一般三违（人次）", STYLE_CELL);
    text(sheetData, [ri + 6, 12, 4, 0], data.sw_dyybsw, STYLE_CELL);
    text(sheetData, [ri + 6, 13, 4, 0], "当月严重三违（人次）", STYLE_CELL);
    text(sheetData, [ri + 6, 14, 4, 0], data.sw_dyyzsw, STYLE_CELL);
    text(sheetData, [ri + 6, 15, 4, 1], "当月领导抓三违（人次）", STYLE_CELL);
    text(sheetData, [ri + 6, 17, 4, 0], data.sw_dyldzsw, STYLE_CELL);

    ri += 11;

    text(sheetData, [ri, 10, 6, 0], "三违主要内容及处罚情况", STYLE_CELL_BOLD);
    text(sheetData, [ri, 11, 6, 3], data.sw_zynrjcfqk, STYLE_CELL_LEFT);

    text(sheetData, [ri, 15, 0, 2], "当日领导带班", STYLE_CELL_BOLD);
    text(sheetData, [ri + 1, 15], "零点班", STYLE_CELL);
    text(sheetData, [ri + 1, 16], "八点班", STYLE_CELL);
    text(sheetData, [ri + 1, 17], "四点班", STYLE_CELL);
    text(sheetData, [ri + 2, 15], data.drlddb_ldb, STYLE_CELL);
    text(sheetData, [ri + 2, 16], data.drlddb_bdb, STYLE_CELL);
    text(sheetData, [ri + 2, 17], data.drlddb_sdb, STYLE_CELL);

    text(sheetData, [ri + 4, 15, 0, 2], "今日领导带班", STYLE_CELL_BOLD);
    text(sheetData, [ri + 5, 15], "零点班", STYLE_CELL);
    text(sheetData, [ri + 5, 16], "八点班", STYLE_CELL);
    text(sheetData, [ri + 5, 17], "四点班", STYLE_CELL);
    text(sheetData, [ri + 6, 15], data.jrlddb_ldb, STYLE_CELL);
    text(sheetData, [ri + 6, 16], data.jrlddb_bdb, STYLE_CELL);
    text(sheetData, [ri + 6, 17], data.jrlddb_sdb, STYLE_CELL);

    ri += 7;

    text(sheetData, [ri, 11, 0, 1], "一般隐患（条）", STYLE_CELL);
    text(sheetData, [ri, 13], data.yh_ybyh, STYLE_CELL);
    text(sheetData, [ri, 14, 0, 2], "重大隐患（条）", STYLE_CELL);
    text(sheetData, [ri, 17], data.yh_zdyh, STYLE_CELL);
    text(sheetData, [ri + 1, 11, 5, 6], data.yh_desc, STYLE_CELL_LEFT);

    ri += 7;

    text(sheetData, [ri, 10, 5, 0], "生产系统运行情况", STYLE_CELL_BOLD);
    text(sheetData, [ri, 11], "提升系统", STYLE_CELL);
    text(sheetData, [ri, 12, 0, 5], "   " + data.scxt_tsxt, STYLE_CELL_LEFT);
    text(sheetData, [ri + 1, 11], "通风系统", STYLE_CELL);
    text(
      sheetData,
      [ri + 1, 12, 0, 5],
      "   " + data.scxt_tfxt,
      STYLE_CELL_LEFT
    );
    text(sheetData, [ri + 2, 11], "供电系统", STYLE_CELL);
    text(
      sheetData,
      [ri + 2, 12, 0, 5],
      "   " + data.scxt_gdxt,
      STYLE_CELL_LEFT
    );
    text(sheetData, [ri + 3, 11, 1, 0], "运输系统", STYLE_CELL);
    text(
      sheetData,
      [ri + 3, 12, 1, 5],
      "   " + data.scxt_ysxt,
      STYLE_CELL_LEFT
    );
    text(sheetData, [ri + 5, 11], "排水系统", STYLE_CELL);
    text(
      sheetData,
      [ri + 5, 12, 0, 5],
      "   " + data.scxt_psxt,
      STYLE_CELL_LEFT
    );

    ri += 6;

    text(sheetData, [ri, 10, 0, 6], "生产影响", STYLE_CELL_BOLD);
    text(sheetData, [ri, 17], "责任人", STYLE_CELL_BOLD);
    [1, 2, 3, 4, 5].forEach((i) => {
      text(sheetData, [ri + i, 10], i + "", STYLE_CELL);
      text(sheetData, [ri + i, 11, 0, 5], data[`scqk${i}_scyx`], STYLE_CELL);
      text(sheetData, [ri + i, 17], data[`scqk${i}_zrr`], STYLE_CELL);
    });

    ri += 6;

    text(sheetData, [ri, 0, 0, 2], "当日安全重点工作", STYLE_CELL_BOLD);
    text(sheetData, [ri, 3, 0, 14], data.draqzdgz, STYLE_CELL_LEFT);
    text(sheetData, [ri + 1, 0, 0, 2], "备   注", STYLE_CELL_BOLD);
    text(sheetData, [ri + 1, 3, 0, 14], data.remark, STYLE_CELL_LEFT);

    ri += 2;

    //end
    text(sheetData, [ri, 0, 0, 5], `审核：${data.tbrsh}`, STYLE_SUB_TEXT_LEFT);
    text(sheetData, [ri, 7, 0, 2], `制表：${data.tbrzb}`, STYLE_SUB_TEXT);
    text(
      sheetData,
      [ri, 15, 0, 2],
      `日期：${data.tbrrq}`,
      STYLE_SUB_TEXT_RIGHT
    );

    sheetData["!ref"] = `A1:${XLSX.utils.encode_cell({
      r: 42,
      c: colSize,
    })}`;
    wb.Sheets["Sheet1"] = sheetData;
    saveAs(
      new Blob([s2ab(XLSX.write(wb, wopts))], {
        type: "application/octet-stream",
      }),
      `${data.gzrrq}安全生产信息日报-上报` +
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

$excel.exportWb = function(filename, wb) {
  var wopts = { bookType: "xlsx", bookSST: false, type: "binary" }; //这里的数据是用来定义导出的格式类型
  saveAs(
    new Blob([s2ab(XLSX.write(wb, wopts))], {
      type: "application/octet-stream",
    }),
    filename + "." + (wopts.bookType == "biff2" ? "xls" : wopts.bookType)
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
