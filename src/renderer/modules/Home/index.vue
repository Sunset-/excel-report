<template>
    <div class="MODULE-Home">
        <home-components ref="components" class="BOX home-components-wrap" @selected="selectedComponent"></home-components>
        <div class="BOX home-component-frame">
            <div class="report-header">
                <span class="report-title">{{title}}</span>
                <span class="report-subtitle">创建于{{createTime}}</span>
                <xui-toolbar :options="toolbarOptions" style="float:right;"></xui-toolbar>
            </div>
            <div class="BOX home-component-content" style="overflow-y:scroll;">
                <xui-form v-show="component&&component.reportType==1" ref="form1" :options="formAOptions" @submit="save"></xui-form>
                <xui-form v-show="component&&component.reportType==2" ref="form2" :options="formBOptions" @submit="save"></xui-form>
            </div>
        </div>
    </div>
</template>
<script>
import HomeComponents from "./components";
import Store from "./store.js";
import "./export-excel";

function toNum(v) {
    if (!v) {
        return 0;
    }
    var nv = +v;
    if (isNaN(nv)) {
        return 0;
    }
    return nv;
}

function fixed(v, d) {
    var v = +v;
    if (isNaN(v)) {
        v = 0;
    }
    return v.toFixed(d);
}

export default {
    components: {
        HomeComponents
    },
    computed: {
        title() {
            return this.component.title || "未知";
        },
        createTime() {
            return this.component.createTime
                ? Sunset.Dates.format(this.component.createTime)
                : "";
        }
    },
    data() {
        return {
            component: {},
            currentTab: "DEFINE",
            tabOptions: {
                data: [
                    {
                        text: "报表填写",
                        value: "DEFINE"
                    }
                ]
            },
            toolbarOptions: {
                tools: [
                    {
                        label: "还原",
                        icon: "xui-icon xui-icon-refresh",
                        color: "white",
                        operate: () => {
                            this.reset();
                        }
                    },
                    {
                        label: "保存",
                        icon: "xui-icon xui-icon-task_fill",
                        color: "success",
                        operate: () => {
                            this.$refs[
                                `form${this.component.reportType}`
                            ].submit();
                        }
                    },
                    {
                        label: "导出",
                        icon: "xui-icon xui-icon-send",
                        color: "primary",
                        operate: () => {
                            this.export();
                        }
                    }
                ]
            },
            formAOptions: {
                cols: 3,
                fillEmpty: "",
                fields: [
                    {
                        label: "工作日日期",
                        name: "gzrrq",
                        widget: "datetime",
                        newline: true,
                        placeholder: "请选择工作日日期",
                        valueFormat: "yyyy-MM-dd"
                    },
                    {
                        label: "工作日天气",
                        name: "gzrtq",
                        widget: "input",
                        placeholder: "请输入工作日天气"
                    },
                    {
                        label: "工作日值班领导",
                        name: "gzrzbld",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "填表日日期",
                        name: "tbrrq",
                        widget: "datetime",
                        newline: true,
                        placeholder: "请选择填表日日期",
                        valueFormat: "yyyy-MM-dd"
                    },
                    {
                        label: "填表日天气",
                        name: "tbrtq",
                        widget: "input",
                        placeholder: "请输入填表日天气"
                    },
                    {
                        label: "填表日值班领导",
                        name: "tbrzbld",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "产销量",
                        label: "原煤 - 日产",
                        name: "ym_rc",
                        widget: "input",
                        placeholder: "请输入原煤日产量"
                    },
                    {
                        label: "原煤 - 月累计",
                        name: "ym_ylj",
                        widget: "input",
                        placeholder: "请输入原煤月累计"
                    },
                    {
                        label: "入选量 - 日产",
                        name: "rxl_rc",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入选量日产量"
                    },
                    {
                        label: "入选量 - 月累计",
                        name: "rxl_ylj",
                        widget: "input",
                        placeholder: "请输入选量月累计"
                    },
                    {
                        label: "精煤 - 日产",
                        name: "jm_rc",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入精煤日产"
                    },
                    {
                        label: "精煤 - 月累计",
                        name: "jm_ylj",
                        widget: "input",
                        placeholder: "请输入精煤月累计"
                    },
                    {
                        label: "筛混煤 - 日产",
                        name: "shm_rc",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入筛混煤日产"
                    },
                    {
                        label: "筛混煤 - 月累计",
                        name: "shm_ylj",
                        widget: "input",
                        placeholder: "请输入筛混煤月累计"
                    },
                    {
                        group: "销售",
                        label: "原煤 - 日销量",
                        name: "ym_rxl",
                        widget: "input",
                        placeholder: "请输入原煤日销量"
                    },
                    {
                        label: "原煤 - 月销量",
                        name: "ym_yxl",
                        widget: "input",
                        placeholder: "请输入原煤月销量"
                    },
                    {
                        label: "原煤 - 品种煤库存",
                        name: "ym_kc",
                        widget: "input",
                        placeholder: "请输入原煤库存"
                    },
                    {
                        label: "筛混煤 - 日销量",
                        name: "shm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入筛混煤日销量"
                    },
                    {
                        label: "筛混煤 - 月销量",
                        name: "shm_yxl",
                        widget: "input",
                        placeholder: "请输入筛混煤月销量"
                    },
                    {
                        label: "筛混煤 - 品种煤库存",
                        name: "shm_kc",
                        widget: "input",
                        placeholder: "请输入筛混煤库存"
                    },
                    {
                        label: "末精煤 - 日销量",
                        name: "mjm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入末精煤日销量"
                    },
                    {
                        label: "末精煤 - 月销量",
                        name: "mjm_yxl",
                        widget: "input",
                        placeholder: "请输入末精煤月销量"
                    },
                    {
                        label: "末精煤 - 品种煤库存",
                        name: "mjm_kc",
                        widget: "input",
                        placeholder: "请输入末精煤库存"
                    },
                    {
                        label: "籽煤 - 日销量",
                        name: "zm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入籽煤日销量"
                    },
                    {
                        label: "籽煤 - 月销量",
                        name: "zm_yxl",
                        widget: "input",
                        placeholder: "请输入籽煤月销量"
                    },
                    {
                        label: "三八块煤 - 日销量",
                        name: "sbkm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入三八块煤日销量"
                    },
                    {
                        label: "三八块煤 - 月销量",
                        name: "sbkm_yxl",
                        widget: "input",
                        placeholder: "请输入三八块煤月销量"
                    },
                    {
                        label: "大块 - 日销量",
                        name: "dk_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入大块日销量"
                    },
                    {
                        label: "大块 - 月销量",
                        name: "dk_yxl",
                        widget: "input",
                        placeholder: "请输入大块月销量"
                    },
                    {
                        label: "籽煤、三八块、大块 - 库存",
                        name: "zm_sbkm_dk_kc",
                        widget: "input",
                        placeholder: "请输入籽煤、三八块、大块库存"
                    },
                    {
                        label: "合计 - 日销量",
                        name: "total_rxl",
                        widget: "input",
                        newline: true,
                        readonly: true,
                        clearable: false,
                        placeholder: "自动计算",
                        watch: [
                            "ym_rxl,shm_rxl,mjm_rxl,zm_rxl,sbkm_rxl,dk_rxl",
                            model => {
                                model.total_rxl = (
                                    +(model.ym_rxl || 0) +
                                    +(model.shm_rxl || 0) +
                                    +(model.mjm_rxl || 0) +
                                    +(model.zm_rxl || 0) +
                                    +(model.sbkm_rxl || 0) +
                                    +(model.dk_rxl || 0)
                                ).toFixed(2);
                            }
                        ]
                    },
                    {
                        label: "合计 - 月销量",
                        name: "total_yxl",
                        widget: "input",
                        readonly: true,
                        clearable: false,
                        placeholder: "自动计算",
                        watch: [
                            "ym_yxl,shm_yxl,mjm_yxl,zm_yxl,sbkm_yxl,dk_yxl",
                            model => {
                                model.total_yxl = (
                                    +(model.ym_yxl || 0) +
                                    +(model.shm_yxl || 0) +
                                    +(model.mjm_yxl || 0) +
                                    +(model.zm_yxl || 0) +
                                    +(model.sbkm_yxl || 0) +
                                    +(model.dk_yxl || 0)
                                ).toFixed(2);
                            }
                        ]
                    },
                    {
                        label: "合计 - 库存",
                        name: "total_kc",
                        widget: "input",
                        readonly: true,
                        clearable: false,
                        placeholder: "自动计算",
                        watch: [
                            "ym_kc,shm_kc,mjm_kc,zm_sbkm_dk_kc",
                            model => {
                                model.total_kc = (
                                    +(model.ym_kc || 0) +
                                    +(model.shm_kc || 0) +
                                    +(model.mjm_kc || 0) +
                                    +(model.zm_sbkm_dk_kc || 0)
                                ).toFixed(2);
                            }
                        ]
                    },
                    {
                        group:
                            "综采队<span class='sub-group'> - 1012001工作面</span>",
                        label: "当日生产",
                        name: "zcd_work",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入当日生产"
                    },
                    {
                        label: "详情",
                        name: "zcd_desc",
                        widget: "input",
                        monopolize: true,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        group:
                            "掘一队<span class='sub-group'> - 1032101工作面回风巷</span>",
                        label: "当日掘进",
                        name: "j1d_1032101hfx_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "j1d_1032101hfx_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:28px;'></span><span class='sub-group'> - 1032102工作面回风联巷</span>",
                        label: "当日掘进",
                        name: "j1d_1032102hflx_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "j1d_1032102hflx_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "掘三队<span class='sub-group'> - 1012006辅运绕道</span>",
                        label: "当日掘进",
                        name: "j3d_1012006fyrd_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "j3d_1012006fyrd_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:28px;'></span><span class='sub-group'> - 1012006回风道</span>",
                        label: "当日掘进",
                        name: "j3d_1012006hfd_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "j3d_1012006hfd_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "重庆中环<span class='sub-group'> - 2-1煤辅运联络巷</span>",
                        label: "当日掘进",
                        name: "cqzh_21mfyllx_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "cqzh_21mfyllx_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:44px;'></span><span class='sub-group'> - 东翼一号回风反掘</span>",
                        label: "当日掘进",
                        name: "cqzh_dyyhhffj_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "cqzh_dyyhhffj_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:44px;'></span><span class='sub-group'> - 1012007回风巷</span>",
                        label: "当日掘进",
                        name: "cqzh_1012007hfx_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "cqzh_1012007hfx_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:44px;'></span><span class='sub-group'> - 东翼一号辅运巷</span>",
                        label: "当日掘进",
                        name: "cqzh_dyyhfyx_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "cqzh_dyyhfyx_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group:
                            "中煤36处<span class='sub-group'> - 1012007皮带巷</span>",
                        label: "当日掘进",
                        name: "zm36c_1012007pdx_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        label: "月累计",
                        name: "zm36c_1012007pdx_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        placeholder: "请输入米数"
                    },
                    {
                        group: "合计掘进进尺",
                        label: "当日掘进",
                        name: "total_rjj",
                        widget: "input",
                        manner: "juejin",
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "j1d_1032101hfx_rjj,j1d_1032102hflx_rjj,j3d_1012006fyrd_rjj,j3d_1012006hfd_rjj,cqzh_21mfyllx_rjj,cqzh_dyyhhffj_rjj,cqzh_1012007hfx_rjj,cqzh_dyyhfyx_rjj,zm36c_1012007pdx_rjj",
                            model => {
                                model.total_rjj = fixed(
                                    toNum(model.j1d_1032101hfx_rjj) +
                                        toNum(model.j1d_1032102hflx_rjj) +
                                        toNum(model.j3d_1012006fyrd_rjj) +
                                        toNum(model.j3d_1012006hfd_rjj) +
                                        toNum(model.cqzh_21mfyllx_rjj) +
                                        toNum(model.cqzh_dyyhhffj_rjj) +
                                        toNum(model.cqzh_1012007hfx_rjj) +
                                        toNum(model.cqzh_dyyhfyx_rjj) +
                                        toNum(model.zm36c_1012007pdx_rjj),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        label: "月累计",
                        name: "total_yjj",
                        widget: "input",
                        manner: "juejinylj",
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "j1d_1032101hfx_yjj,j1d_1032102hflx_yjj,j3d_1012006fyrd_yjj,j3d_1012006hfd_yjj,cqzh_21mfyllx_yjj,cqzh_dyyhhffj_yjj,cqzh_1012007hfx_yjj,cqzh_dyyhfyx_yjj,zm36c_1012007pdx_yjj",
                            model => {
                                model.total_yjj = fixed(
                                    toNum(model.j1d_1032101hfx_yjj) +
                                        toNum(model.j1d_1032102hflx_yjj) +
                                        toNum(model.j3d_1012006fyrd_yjj) +
                                        toNum(model.j3d_1012006hfd_yjj) +
                                        toNum(model.cqzh_21mfyllx_yjj) +
                                        toNum(model.cqzh_dyyhhffj_yjj) +
                                        toNum(model.cqzh_1012007hfx_yjj) +
                                        toNum(model.cqzh_dyyhfyx_yjj) +
                                        toNum(model.zm36c_1012007pdx_yjj),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        group: "抽采队",
                        label: "抽采量",
                        name: "ccd_ccl",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入抽采量"
                    },
                    {
                        label: "详情",
                        name: "ccd_desc",
                        widget: "textarea",
                        rows: 4,
                        monopolize: true,
                        style: "width:630px;",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        group: "通风队",
                        label: "通风系统",
                        name: "tfd_desc",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        group: "运输队",
                        label: "运输系统",
                        name: "ysd_desc",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        group: "机电队",
                        label: "提升系统",
                        name: "jdd_tsxt",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        label: "供电系统",
                        name: "jdd_gdxt",
                        widget: "input",
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入工作详情"
                    },
                    {
                        label: "排水系统",
                        name: "jdd_psxt",
                        widget: "input",
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入工作详情"
                    },
                    {
                        group: "准备队",
                        label: "工作详情",
                        name: "zbd_desc",
                        widget: "textarea",
                        rows: 4,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        group: "东翼一号回风立井",
                        label: "工作详情",
                        name: "dyyhhflj_desc",
                        widget: "textarea",
                        rows: 4,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        group: "生产情况1",
                        label: "生产影响",
                        name: "scqk1_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk1_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        label: "处理结果",
                        name: "scqk1_cljg",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入处理结果"
                    },
                    {
                        group: "生产情况2",
                        label: "生产影响",
                        name: "scqk2_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk2_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        label: "处理结果",
                        name: "scqk2_cljg",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入处理结果"
                    },
                    {
                        group: "生产情况3",
                        label: "生产影响",
                        name: "scqk3_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk3_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        label: "处理结果",
                        name: "scqk3_cljg",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入处理结果"
                    },
                    {
                        group: "备注",
                        label: "备注",
                        name: "remark",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入备注"
                    }
                ]
            },
            formBOptions: {
                cols: 3,
                fillEmpty: "",
                fields: [
                    {
                        label: "工作日日期",
                        name: "gzrrq",
                        widget: "datetime",
                        newline: true,
                        placeholder: "请选择工作日日期",
                        valueFormat: "yyyy-MM-dd"
                    },
                    {
                        label: "工作日天气",
                        name: "gzrtq",
                        widget: "input",
                        placeholder: "请输入工作日天气"
                    },
                    {
                        label: "工作日值班领导",
                        name: "gzrzbld",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "填表日日期",
                        name: "tbrrq",
                        widget: "datetime",
                        newline: true,
                        placeholder: "请选择填表日日期",
                        valueFormat: "yyyy-MM-dd"
                    },
                    {
                        label: "审核",
                        name: "tbrsh",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入填表日天气"
                    },
                    {
                        label: "制表",
                        name: "tbrzb",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "产销量",
                        label: "原煤 - 日产",
                        name: "ym_rc",
                        widget: "input",
                        placeholder: "请输入原煤日产量"
                    },
                    {
                        label: "原煤 - 月累计",
                        name: "ym_ylj",
                        widget: "input",
                        placeholder: "请输入原煤月累计"
                    },
                    {
                        label: "入选量 - 日产",
                        name: "rxl_rc",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入选量日产量"
                    },
                    {
                        label: "入选量 - 月累计",
                        name: "rxl_ylj",
                        widget: "input",
                        placeholder: "请输入选量月累计"
                    },
                    {
                        label: "精煤 - 日产",
                        name: "jm_rc",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入精煤日产"
                    },
                    {
                        label: "精煤 - 月累计",
                        name: "jm_ylj",
                        widget: "input",
                        placeholder: "请输入精煤月累计"
                    },
                    {
                        label: "筛混煤 - 日产",
                        name: "shm_rc",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入筛混煤日产"
                    },
                    {
                        label: "筛混煤 - 月累计",
                        name: "shm_ylj",
                        widget: "input",
                        placeholder: "请输入筛混煤月累计"
                    },
                    {
                        label: "原煤 - 日销量",
                        name: "ym_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入原煤日销量"
                    },
                    {
                        label: "原煤 - 月销量",
                        name: "ym_yxl",
                        widget: "input",
                        placeholder: "请输入原煤月销量"
                    },
                    {
                        label: "原煤 - 品种煤库存",
                        name: "ym_kc",
                        widget: "input",
                        placeholder: "请输入原煤库存"
                    },
                    {
                        label: "筛混煤 - 日销量",
                        name: "shm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入筛混煤日销量"
                    },
                    {
                        label: "筛混煤 - 月销量",
                        name: "shm_yxl",
                        widget: "input",
                        placeholder: "请输入筛混煤月销量"
                    },
                    {
                        label: "筛混煤 - 品种煤库存",
                        name: "shm_kc",
                        widget: "input",
                        placeholder: "请输入筛混煤库存"
                    },
                    {
                        label: "末精煤 - 日销量",
                        name: "mjm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入末精煤日销量"
                    },
                    {
                        label: "末精煤 - 月销量",
                        name: "mjm_yxl",
                        widget: "input",
                        placeholder: "请输入末精煤月销量"
                    },
                    {
                        label: "末精煤 - 品种煤库存",
                        name: "mjm_kc",
                        widget: "input",
                        placeholder: "请输入末精煤库存"
                    },
                    {
                        label: "籽煤 - 日销量",
                        name: "zm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入籽煤日销量"
                    },
                    {
                        label: "籽煤 - 月销量",
                        name: "zm_yxl",
                        widget: "input",
                        placeholder: "请输入籽煤月销量"
                    },
                    {
                        label: "三八块煤 - 日销量",
                        name: "sbkm_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入三八块煤日销量"
                    },
                    {
                        label: "三八块煤 - 月销量",
                        name: "sbkm_yxl",
                        widget: "input",
                        placeholder: "请输入三八块煤月销量"
                    },
                    {
                        label: "大块 - 日销量",
                        name: "dk_rxl",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入大块日销量"
                    },
                    {
                        label: "大块 - 月销量",
                        name: "dk_yxl",
                        widget: "input",
                        placeholder: "请输入大块月销量"
                    },
                    {
                        label: "籽煤、三八块、大块 - 库存",
                        name: "zm_sbkm_dk_kc",
                        widget: "input",
                        placeholder: "请输入籽煤、三八块、大块库存"
                    },
                    {
                        label: "合计 - 日销量",
                        name: "total_rxl",
                        widget: "input",
                        newline: true,
                        readonly: true,
                        clearable: false,
                        placeholder: "自动计算",
                        watch: [
                            "ym_rxl,shm_rxl,mjm_rxl,zm_rxl,sbkm_rxl,dk_rxl",
                            model => {
                                model.total_rxl = (
                                    +(model.ym_rxl || 0) +
                                    +(model.shm_rxl || 0) +
                                    +(model.mjm_rxl || 0) +
                                    +(model.zm_rxl || 0) +
                                    +(model.sbkm_rxl || 0) +
                                    +(model.dk_rxl || 0)
                                ).toFixed(2);
                            }
                        ]
                    },
                    {
                        label: "合计 - 月销量",
                        name: "total_yxl",
                        widget: "input",
                        readonly: true,
                        clearable: false,
                        placeholder: "自动计算",
                        watch: [
                            "ym_yxl,shm_yxl,mjm_yxl,zm_yxl,sbkm_yxl,dk_yxl",
                            model => {
                                model.total_yxl = (
                                    +(model.ym_yxl || 0) +
                                    +(model.shm_yxl || 0) +
                                    +(model.mjm_yxl || 0) +
                                    +(model.zm_yxl || 0) +
                                    +(model.sbkm_yxl || 0) +
                                    +(model.dk_yxl || 0)
                                ).toFixed(2);
                            }
                        ]
                    },
                    {
                        label: "合计 - 库存",
                        name: "total_kc",
                        widget: "input",
                        readonly: true,
                        clearable: false,
                        placeholder: "自动计算",
                        watch: [
                            "ym_kc,shm_kc,mjm_kc,zm_sbkm_dk_kc",
                            model => {
                                model.total_kc = (
                                    +(model.ym_kc || 0) +
                                    +(model.shm_kc || 0) +
                                    +(model.mjm_kc || 0) +
                                    +(model.zm_sbkm_dk_kc || 0)
                                ).toFixed(2);
                            }
                        ]
                    },
                    {
                        group:
                            "采煤<span class='sub-group'> - 综采队-1012001工作面</span>",
                        label: "当日生产",
                        name: "zcd_work",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入当日生产"
                    },
                    {
                        label: "详情",
                        name: "zcd_desc",
                        widget: "input",
                        monopolize: true,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        group:
                            "掘进<span class='sub-group'> - 东翼大巷 一号回风大巷反掘</span>",
                        label: "月计划",
                        name: "dydx_yhhfdxfj_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "dydx_yhhfdxfj_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "dydx_yhhfdxfj_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "dydx_yhhfdxfj_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "dydx_yhhfdxfj_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "dydx_yhhfdxfj_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 东翼大巷 2-1煤辅运联络巷</span>",
                        label: "月计划",
                        name: "dydx_21mfyllx_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "dydx_21mfyllx_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "dydx_21mfyllx_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "dydx_21mfyllx_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "dydx_21mfyllx_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "dydx_21mfyllx_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 东翼大巷 一号辅运大巷</span>",
                        label: "月计划",
                        name: "dydx_yhfydx_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "dydx_yhfydx_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "dydx_yhfydx_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "dydx_yhfydx_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "dydx_yhfydx_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "dydx_yhfydx_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 1012006工作面 辅运绕道</span>",
                        label: "月计划",
                        name: "gzm1012006_fyrd_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "gzm1012006_fyrd_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "gzm1012006_fyrd_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "gzm1012006_fyrd_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "gzm1012006_fyrd_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "gzm1012006_fyrd_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 1012006工作面 回风道</span>",
                        label: "月计划",
                        name: "gzm1012006_hfd_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "gzm1012006_hfd_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "gzm1012006_hfd_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "gzm1012006_hfd_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "gzm1012006_hfd_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "gzm1012006_hfd_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 1032101工作面 回风绕道</span>",
                        label: "月计划",
                        name: "gzm1032101_hfrd_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "gzm1032101_hfrd_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "gzm1032101_hfrd_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "gzm1032101_hfrd_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "gzm1032101_hfrd_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "gzm1032101_hfrd_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 1032102工作面 回风联巷</span>",
                        label: "月计划",
                        name: "gzm1032102_hflx_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "gzm1032102_hflx_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "gzm1032102_hflx_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "gzm1032102_hflx_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "gzm1032102_hflx_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "gzm1032102_hflx_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 1012007工作面 胶运巷</span>",
                        label: "月计划",
                        name: "gzm1012007_jyx_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "gzm1012007_jyx_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "gzm1012007_jyx_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "gzm1012007_jyx_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "gzm1012007_jyx_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "gzm1012007_jyx_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 1012007工作面 回风巷</span>",
                        label: "月计划",
                        name: "gzm1012007_hfx_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "gzm1012007_hfx_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "gzm1012007_hfx_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "gzm1012007_hfx_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "gzm1012007_hfx_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "gzm1012007_hfx_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 1012007工作面 高抽巷</span>",
                        label: "月计划",
                        name: "gzm1012007_gcx_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "gzm1012007_gcx_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "gzm1012007_gcx_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "gzm1012007_gcx_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "gzm1012007_gcx_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "gzm1012007_gcx_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 西翼大巷 一号回风巷</span>",
                        label: "月计划",
                        name: "xydx_yhhfx_yjh",
                        widget: "input",
                        clearable: false,
                        cols: false,
                        manner: "input-short",
                        placeholder: "米数"
                    },
                    {
                        label: "日计划",
                        name: "xydx_yhhfx_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "日完成",
                        name: "xydx_yhhfx_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "月完成",
                        name: "xydx_yhhfx_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "累计",
                        name: "xydx_yhhfx_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        label: "剩余",
                        name: "xydx_yhhfx_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        placeholder: "米数"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:12px;'></span><span class='sub-group'> - 掘进进尺合计（m）</span>",
                        label: "月计划",
                        name: "total_jjjchj_yjh",
                        widget: "input",
                        cols: false,
                        manner: "input-short",
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "dydx_yhhfdxfj_yjh,dydx_21mfyllx_yjh,dydx_yhfydx_yjh,gzm1012006_fyrd_yjh,gzm1012006_hfd_yjh,gzm1032101_hfrd_yjh,gzm1032102_hflx_yjh,gzm1012007_jyx_yjh,gzm1012007_hfx_yjh,gzm1012007_gcx_yjh,xydx_yhhfx_yjh",
                            model => {
                                model.total_jjjchj_yjh = fixed(
                                    toNum(model.dydx_yhhfdxfj_yjh) +
                                        toNum(model.dydx_21mfyllx_yjh) +
                                        toNum(model.dydx_yhfydx_yjh) +
                                        toNum(model.gzm1012006_fyrd_yjh) +
                                        toNum(model.gzm1012006_hfd_yjh) +
                                        toNum(model.gzm1032101_hfrd_yjh) +
                                        toNum(model.gzm1032102_hflx_yjh) +
                                        toNum(model.gzm1012007_jyx_yjh) +
                                        toNum(model.gzm1012007_hfx_yjh) +
                                        toNum(model.gzm1012007_gcx_yjh) +
                                        toNum(model.xydx_yhhfx_yjh),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        label: "日计划",
                        name: "total_jjjchj_rjh",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "dydx_yhhfdxfj_rjh,dydx_21mfyllx_rjh,dydx_yhfydx_rjh,gzm1012006_fyrd_rjh,gzm1012006_hfd_rjh,gzm1032101_hfrd_rjh,gzm1032102_hflx_rjh,gzm1012007_jyx_rjh,gzm1012007_hfx_rjh,gzm1012007_gcx_rjh,xydx_yhhfx_rjh",
                            model => {
                                model.total_jjjchj_rjh = fixed(
                                    toNum(model.dydx_yhhfdxfj_rjh) +
                                        toNum(model.dydx_21mfyllx_rjh) +
                                        toNum(model.dydx_yhfydx_rjh) +
                                        toNum(model.gzm1012006_fyrd_rjh) +
                                        toNum(model.gzm1012006_hfd_rjh) +
                                        toNum(model.gzm1032101_hfrd_rjh) +
                                        toNum(model.gzm1032102_hflx_rjh) +
                                        toNum(model.gzm1012007_jyx_rjh) +
                                        toNum(model.gzm1012007_hfx_rjh) +
                                        toNum(model.gzm1012007_gcx_rjh) +
                                        toNum(model.xydx_yhhfx_rjh),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        label: "日完成",
                        name: "total_jjjchj_rwc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "dydx_yhhfdxfj_rwc,dydx_21mfyllx_rwc,dydx_yhfydx_rwc,gzm1012006_fyrd_rwc,gzm1012006_hfd_rwc,gzm1032101_hfrd_rwc,gzm1032102_hflx_rwc,gzm1012007_jyx_rwc,gzm1012007_hfx_rwc,gzm1012007_gcx_rwc,xydx_yhhfx_rwc",
                            model => {
                                model.total_jjjchj_rwc = fixed(
                                    toNum(model.dydx_yhhfdxfj_rwc) +
                                        toNum(model.dydx_21mfyllx_rwc) +
                                        toNum(model.dydx_yhfydx_rwc) +
                                        toNum(model.gzm1012006_fyrd_rwc) +
                                        toNum(model.gzm1012006_hfd_rwc) +
                                        toNum(model.gzm1032101_hfrd_rwc) +
                                        toNum(model.gzm1032102_hflx_rwc) +
                                        toNum(model.gzm1012007_jyx_rwc) +
                                        toNum(model.gzm1012007_hfx_rwc) +
                                        toNum(model.gzm1012007_gcx_rwc) +
                                        toNum(model.xydx_yhhfx_rwc),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        label: "月完成",
                        name: "total_jjjchj_ywc",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "dydx_yhhfdxfj_ywc,dydx_21mfyllx_ywc,dydx_yhfydx_ywc,gzm1012006_fyrd_ywc,gzm1012006_hfd_ywc,gzm1032101_hfrd_ywc,gzm1032102_hflx_ywc,gzm1012007_jyx_ywc,gzm1012007_hfx_ywc,gzm1012007_gcx_ywc,xydx_yhhfx_ywc",
                            model => {
                                model.total_jjjchj_ywc = fixed(
                                    toNum(model.dydx_yhhfdxfj_ywc) +
                                        toNum(model.dydx_21mfyllx_ywc) +
                                        toNum(model.dydx_yhfydx_ywc) +
                                        toNum(model.gzm1012006_fyrd_ywc) +
                                        toNum(model.gzm1012006_hfd_ywc) +
                                        toNum(model.gzm1032101_hfrd_ywc) +
                                        toNum(model.gzm1032102_hflx_ywc) +
                                        toNum(model.gzm1012007_jyx_ywc) +
                                        toNum(model.gzm1012007_hfx_ywc) +
                                        toNum(model.gzm1012007_gcx_ywc) +
                                        toNum(model.xydx_yhhfx_ywc),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        label: "累计",
                        name: "total_jjjchj_lj",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "dydx_yhhfdxfj_lj,dydx_21mfyllx_lj,dydx_yhfydx_lj,gzm1012006_fyrd_lj,gzm1012006_hfd_lj,gzm1032101_hfrd_lj,gzm1032102_hflx_lj,gzm1012007_jyx_lj,gzm1012007_hfx_lj,gzm1012007_gcx_lj,xydx_yhhfx_lj",
                            model => {
                                model.total_jjjchj_lj = fixed(
                                    toNum(model.dydx_yhhfdxfj_lj) +
                                        toNum(model.dydx_21mfyllx_lj) +
                                        toNum(model.dydx_yhfydx_lj) +
                                        toNum(model.gzm1012006_fyrd_lj) +
                                        toNum(model.gzm1012006_hfd_lj) +
                                        toNum(model.gzm1032101_hfrd_lj) +
                                        toNum(model.gzm1032102_hflx_lj) +
                                        toNum(model.gzm1012007_jyx_lj) +
                                        toNum(model.gzm1012007_hfx_lj) +
                                        toNum(model.gzm1012007_gcx_lj) +
                                        toNum(model.xydx_yhhfx_lj),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        label: "剩余",
                        name: "total_jjjchj_sy",
                        widget: "input",
                        clearable: false,
                        fieldClass: "input-row-6",
                        cols: false,
                        clearable: false,
                        readonly: true,
                        placeholder: "自动计算",
                        watch: [
                            "dydx_yhhfdxfj_sy,dydx_21mfyllx_sy,dydx_yhfydx_sy,gzm1012006_fyrd_sy,gzm1012006_hfd_sy,gzm1032101_hfrd_sy,gzm1032102_hflx_sy,gzm1012007_jyx_sy,gzm1012007_hfx_sy,gzm1012007_gcx_sy,xydx_yhhfx_sy",
                            model => {
                                model.total_jjjchj_sy = fixed(
                                    toNum(model.dydx_yhhfdxfj_sy) +
                                        toNum(model.dydx_21mfyllx_sy) +
                                        toNum(model.dydx_yhfydx_sy) +
                                        toNum(model.gzm1012006_fyrd_sy) +
                                        toNum(model.gzm1012006_hfd_sy) +
                                        toNum(model.gzm1032101_hfrd_sy) +
                                        toNum(model.gzm1032102_hflx_sy) +
                                        toNum(model.gzm1012007_jyx_sy) +
                                        toNum(model.gzm1012007_hfx_sy) +
                                        toNum(model.gzm1012007_gcx_sy) +
                                        toNum(model.xydx_yhhfx_sy),
                                    1
                                );
                            }
                        ]
                    },
                    {
                        group: "钻孔施工",
                        label: "工作详情",
                        name: "zksg",
                        widget: "textarea",
                        style: "width:630px;",
                        placeholder: "请输入钻孔施工工作"
                    },
                    {
                        group:
                            "瓦斯抽放系统运行情况<span class='sub-group'> - 1012001工作面二号回风巷本煤层钻孔</span>",
                        label: "抽采浓度",
                        name: "cc_gzm1012001_ehhfxbmczk_ccnd",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "ccnd",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "混合流量",
                        name: "cc_gzm1012001_ehhfxbmczk_hhll",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "hhll",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "日抽采量",
                        name: "cc_gzm1012001_ehhfxbmczk_rccl",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "rccl",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "月累计",
                        name: "cc_gzm1012001_ehhfxbmczk_ccylj",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "ccylj",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:129px;'></span><span class='sub-group'> - 1012001工作面高抽巷</span>",
                        label: "抽采浓度",
                        name: "cc_gzm1012001_gcx_ccnd",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "ccnd",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "混合流量",
                        name: "cc_gzm1012001_gcx_hhll",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "hhll",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "日抽采量",
                        name: "cc_gzm1012001_gcx_rccl",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "rccl",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "月累计",
                        name: "cc_gzm1012001_gcx_ccylj",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "ccylj",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:129px;'></span><span class='sub-group'> - 1012001工作面上隅角</span>",
                        label: "抽采浓度",
                        name: "cc_gzm1012001_syj_ccnd",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "ccnd",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "混合流量",
                        name: "cc_gzm1012001_syj_hhll",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "hhll",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "日抽采量",
                        name: "cc_gzm1012001_syj_rccl",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "rccl",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        label: "月累计",
                        name: "cc_gzm1012001_syj_ccylj",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        manner: "ccylj",
                        placeholder: "请输入抽采详情"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:129px;'></span><span class='sub-group'> - 月累计抽采量（总）m³</span>",
                        label: "抽采浓度",
                        name: "total_cc_yljccl",
                        widget: "input",
                        rows: 4,
                        clearable: false,
                        readonly: true,
                        manner: "ccylj",
                        placeholder: "自动计算",
                        watch: [
                            "cc_gzm1012001_ehhfxbmczk_ccylj,cc_gzm1012001_gcx_ccylj,cc_gzm1012001_syj_ccylj",
                            model => {
                                model.total_cc_yljccl = (
                                    +(
                                        model.cc_gzm1012001_ehhfxbmczk_ccylj ||
                                        0
                                    ) +
                                    +(model.cc_gzm1012001_gcx_ccylj || 0) +
                                    +(model.cc_gzm1012001_syj_ccylj || 0)
                                ).toFixed(2);
                            }
                        ]
                    },
                    {
                        group:
                            "防冲监测<span class='sub-group'> - 1012001工作面</span>",
                        label: "微震事件频次",
                        name: "fcjc_gzm1012001_wzsjpc",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入微震事件频次"
                    },
                    {
                        label: "最大能量（J）",
                        name: "fcjc_gzm1012001_zdnl",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入最大能量,预警值：1.00E+04J"
                    },
                    {
                        label: "总能量（J）",
                        name: "fcjc_gzm1012001_znl",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入总能量,预警值：2.50E+04J"
                    },
                    {
                        group:
                            "<span class='sub-group'> - 应力监测预警值：（浅孔14MPa）（深孔16MPa）</span>",
                        label: "1012001胶带运输巷",
                        name: "fcjc_yljcyjz_1012001jdysx",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入应力监测"
                    },
                    {
                        label: "1012001二号回风巷",
                        name: "fcjc_yljcyjz_1012001ehhfx",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入应力监测"
                    },
                    {
                        group: "瓦斯浓度（%）",
                        label: "1012001工作面",
                        name: "wsnd_gzm1012001",
                        widget: "widgets",
                        manner: "widget-wsnd",
                        cols: 12,
                        widgets: [
                            {
                                widget: "input",
                                name : "v1",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v2",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v3",
                                clearable: false
                            }
                        ],
                        clearable: false,
                        placeholder: "请输入瓦斯浓度"
                    },
                    {
                        label: "1012001工作面上隅角",
                        name: "wsnd_gzm1012001_syj",
                        widget: "widgets",
                        manner: "widget-wsnd",
                        cols: 12,
                        widgets: [
                            {
                                widget: "input",
                                name : "v1",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v2",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v3",
                                clearable: false
                            }
                        ],
                        clearable: false,
                        placeholder: "请输入瓦斯浓度"
                    },
                    {
                        label: "1012001回风巷",
                        name: "wsnd_gzm1012001_hfx",
                        widget: "widgets",
                        manner: "widget-wsnd",
                        cols: 12,
                        widgets: [
                            {
                                widget: "input",
                                name : "v1",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v2",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v3",
                                clearable: false
                            }
                        ],
                        clearable: false,
                        placeholder: "请输入瓦斯浓度"
                    },
                    {
                        label: "1012001胶带运输巷",
                        name: "wsnd_gzm1012001_jdysx",
                        widget: "widgets",
                        manner: "widget-wsnd",
                        cols: 12,
                        widgets: [
                            {
                                widget: "input",
                                name : "v1",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v2",
                                clearable: false
                            },
                            {
                                widget: "input",
                                name : "v3",
                                clearable: false
                            }
                        ],
                        clearable: false,
                        placeholder: "请输入瓦斯浓度"
                    },
                    {
                        group: "基本建设",
                        label: "物流中心",
                        name: "jbjs_wlzx",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "东翼一号回风立井",
                        name: "jbjs_dyyhhflj",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline : true,
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        group: "三违",
                        label: "当日一般三违",
                        name: "sw_drybsw",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "当日严重三违",
                        name: "sw_dryzsw",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "当日领导抓三违",
                        name: "sw_drldzsw",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "当月一般三违",
                        name: "sw_dyybsw",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "当月严重三违",
                        name: "sw_dyyzsw",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "当月领导抓三违",
                        name: "sw_dyldzsw",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "三违主要内容及处罚情况",
                        name: "sw_zynrjcfqk",
                        widget: "textarea",
                        clearable: false,
                        style: "width:630px;",
                        placeholder: "请输入"
                    },
                    {
                        group: "<span class='sub-group'> - 当日领导带班</span>",
                        label: "零点班",
                        name: "drlddb_ldb",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "八点班",
                        name: "drlddb_bdb",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "四点班",
                        name: "drlddb_sdb",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        group: "<span class='sub-group'> - 今日领导带班</span>",
                        label: "零点班",
                        name: "jrlddb_ldb",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "八点班",
                        name: "jrlddb_bdb",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "四点班",
                        name: "jrlddb_sdb",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        group: "<span class='sub-group'> - 隐患</span>",
                        label: "一般隐患（条）",
                        name: "yh_ybyh",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "重大隐患（条）",
                        name: "yh_zdyh",
                        widget: "input",
                        clearable: false,
                        placeholder: "请输入"
                    },
                    {
                        label: "详情",
                        name: "yh_desc",
                        widget: "textarea",
                        rows: 4,
                        newline : true,
                        clearable: false,
                        style: "width:630px;",
                        placeholder: "请输入"
                    },
                    {
                        group: "生产系统运行情况",
                        label: "提升系统",
                        name: "scxt_tsxt",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        label: "通风系统",
                        name: "scxt_tfxt",
                        widget: "input",
                        newline: true,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        label: "供电系统",
                        name: "scxt_gdxt",
                        widget: "input",
                        newline: true,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        label: "运输系统",
                        name: "scxt_ysxt",
                        widget: "input",
                        newline: true,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        label: "排水系统",
                        name: "scxt_psxt",
                        widget: "input",
                        newline: true,
                        style: "width:630px;",
                        placeholder: "请输入工作详情"
                    },
                    {
                        group: "生产情况1",
                        label: "生产影响",
                        name: "scqk1_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk1_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        group: "生产情况2",
                        label: "生产影响",
                        name: "scqk2_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk2_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        group: "生产情况3",
                        label: "生产影响",
                        name: "scqk3_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk3_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        group: "生产情况4",
                        label: "生产影响",
                        name: "scqk4_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk4_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        group: "生产情况5",
                        label: "生产影响",
                        name: "scqk5_scyx",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入生产影响"
                    },
                    {
                        label: "责任人",
                        name: "scqk5_zrr",
                        widget: "input",
                        placeholder: "请输入责任人"
                    },
                    {
                        group: "当日安全重点工作",
                        label: "当日安全重点工作",
                        name: "draqzdgz",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入当日安全重点工作"
                    },
                    {
                        group: "备注",
                        label: "备注",
                        name: "remark",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入备注"
                    }
                ]
            }
        };
    },
    methods: {
        selectedComponent(component) {
            this.rawModel = JSON.parse(JSON.stringify(component));
            this.component = component;
            this.$nextTick(() => {
                this.$refs[`form${component.reportType}`].reset(component);
            });
        },
        reset() {
            this.$refs[`form${this.rawModel.reportType}`].reset(this.rawModel);
        },
        save(data) {
            data.updateTime = Date.now();
            Store.save(data).then(() => {
                $tip("保存成功", "success");
                this.rawModel = JSON.parse(JSON.stringify(data));
                this.$refs.components.refresh();
            });
        },
        export() {
            this.$refs[`form${this.component.reportType}`]
                .getValidateModel()
                .then(res => {
                    $excel[`exportReport${this.component.reportType==1?'A':'B'}`](res);
                });
        }
    }
};
</script>
<style lang="less">
@import "~@/style/variable.less";

.MODULE-Home {
    @sidebar-width: 200px;
    .home-components-wrap {
        width: @sidebar-width;
        right: auto;
        background: @color-background-side;
        box-sizing: border-box;
        border-right: 1px solid @color-border;
    }
    .report-title {
        font-size: 20px;
    }
    .report-subtitle {
        display: inline-block;
        padding-left: 10px;
        font-size: 12px;
    }
    .group-title {
        position: relative;
        &:before {
            content: "";
            display: block;
            width: 100%;
            height: 1px;
            background: lighten(@color-border, 5%);
            position: absolute;
            top: 13px;
            left: 0;
        }
        span {
            display: inline-block;
            background: #fff;
            position: relative;
            z-index: 1;
            padding: 0px 10px;
            font-size: 16px;
            font-weight: bold;
            &.sub-group {
                font-size: 14px;
            }
        }
    }
    .home-component-frame {
        left: @sidebar-width;
        background: @color-background-major;
        color: @color-content;
        .report-header {
            width: 100%;
            height: 45px;
            background: #e7eaed;
            border-bottom: 1px solid #e7eaed;
            box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.05);
            border-collapse: separate !important;
            padding: 0px 10px;
            line-height: 45px;
            box-sizing: border-box;
        }
        .home-component-content {
            padding: 10px;
            top: 45px;
            background: #fff;
            .xui-form.xui-form-style {
                .xui-form-field .xui-field-label {
                    min-width: 180px;
                    text-align: right;
                    font-size: 14px;
                }

                .xui-input.xui-input-style.xui-input-manner-input-short {
                    width: 80px;
                }
                .xui-form-field.input-row-6 {
                    .xui-field-label {
                        min-width: 70px;
                    }
                    .xui-input.xui-input-style {
                        width: 80px;
                    }
                }
            }
        }
    }

    .xui-input.xui-input-style.xui-input-manner-juejin {
        .xui-input-inner {
            padding: 0px 40px 0px 60px;
        }
        .xui-input-wrap {
            & > div {
                &:before {
                    content: "掘进";
                    border-right: 1px solid @color-border;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    bottom: 0px;
                    width: 50px;
                    text-align: center;
                }
                &:after {
                    content: "米";
                    border-left: 1px solid @color-border;
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    bottom: 0px;
                    width: 30px;
                    text-align: center;
                }
            }
        }
    }
    .xui-input.xui-input-style.xui-input-manner-juejinylj {
        .xui-input-inner {
            padding: 0px 40px 0px 60px;
        }
        .xui-input-wrap {
            & > div {
                &:before {
                    content: "月累计";
                    border-right: 1px solid @color-border;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    bottom: 0px;
                    width: 50px;
                    text-align: center;
                }
                &:after {
                    content: "米";
                    border-left: 1px solid @color-border;
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    bottom: 0px;
                    width: 30px;
                    text-align: center;
                }
            }
        }
    }
    .xui-input.xui-input-style.xui-input-manner-ccnd,
    .xui-input.xui-input-style.xui-input-manner-hhll,
    .xui-input.xui-input-style.xui-input-manner-rccl,
    .xui-input.xui-input-style.xui-input-manner-ccylj {
        .xui-input-inner {
            padding: 0px 40px 0px 10px;
        }
        .xui-input-wrap {
            & > div {
                &:after {
                    content: "米";
                    border-left: 1px solid @color-border;
                    position: absolute;
                    right: 0px;
                    top: 0px;
                    bottom: 0px;
                    width: 30px;
                    text-align: center;
                }
            }
        }
        &.xui-input.xui-input-style.xui-input-manner-ccnd {
            .xui-input-wrap {
                & > div {
                    &:after {
                        content: "%";
                    }
                }
            }
        }
        &.xui-input.xui-input-style.xui-input-manner-hhll {
            .xui-input-inner {
                padding: 0px 80px 0px 10px;
            }
            .xui-input-wrap {
                & > div {
                    &:after {
                        content: "m³/min";
                        width: 70px;
                    }
                }
            }
        }
        &.xui-input.xui-input-style.xui-input-manner-rccl {
            .xui-input-wrap {
                & > div {
                    &:after {
                        content: " m³";
                    }
                }
            }
        }
        &.xui-input.xui-input-style.xui-input-manner-ccylj {
            .xui-input-wrap {
                & > div {
                    &:after {
                        content: "m³";
                    }
                }
            }
        }
    }

    .xui-widgets.xui-widgets-style.xui-field-widget-component.xui-widgets-manner-widget-wsnd {
        .xui-widgets-item:nth-child(1){
            .xui-input.xui-input-style  .xui-input-wrap {
                & > div {
                    &:before {
                        content: "①";
                    }
                }
            }
        }
        .xui-widgets-item:nth-child(2){
            .xui-input.xui-input-style .xui-input-wrap {
                & > div {
                    &:before {
                        content: "②";
                    }
                }
            }
        }
        .xui-widgets-item:nth-child(3){
            .xui-input.xui-input-style .xui-input-wrap {
                & > div {
                    &:before {
                        content: "③";
                    }
                }
            }
        }
        .xui-input.xui-input-style {
            width: 80px;
            margin-right: 5px;
            .xui-input-inner {
                padding: 0px 5px 0px 35px;
            }
            .xui-input-wrap {
                & > div {
                    &:before {
                        content: "①";
                        border-right: 1px solid @color-border;
                        position: absolute;
                        left: 0px;
                        top: 0px;
                        bottom: 0px;
                        width: 30px;
                        text-align: center;
                    }
                }
            }
        }
    }
}
</style>