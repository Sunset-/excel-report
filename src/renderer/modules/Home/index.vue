<template>
    <div class="MODULE-Home">
        <home-components ref="components" class="BOX home-components-wrap" @selected="selectedComponent"></home-components>
        <div class="BOX home-component-frame">
            <div class="report-header">
                <span class="report-title">XXXXX生产日报</span>
                <span class="report-subtitle">创建于2020年4月10日</span>
                <xui-toolbar :options="toolbarOptions" style="float:right;"></xui-toolbar>
            </div>
            <div class="BOX home-component-content" style="overflow-y:scroll;">
                <xui-form ref="form" :options="formOptions" @submit="save"></xui-form>
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
    data() {
        return {
            component: null,
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
                            this.$refs.form.submit();
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
            formOptions: {
                cols: 3,
                fillEmpty: "",
                fields: [
                    {
                        label: "报表名称",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入报表名称"
                    },
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
                        group: "综采队 - 1012001工作面",
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
                        group: "掘一队 - 1032101工作面回风巷",
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
                            "<span style='display:inline-block;width:42px;'></span> - 1032102工作面回风联巷",
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
                        group: "掘三队 - 1012006辅运绕道",
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
                            "<span style='display:inline-block;width:42px;'></span> - 1012006回风道",
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
                        group: "重庆中环 - 2-1煤辅运联络巷",
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
                            "<span style='display:inline-block;width:56px;'></span> - 东翼一号回风反掘",
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
                            "<span style='display:inline-block;width:56px;'></span> - 1012007回风巷",
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
                            "<span style='display:inline-block;width:56px;'></span> - 东翼一号辅运巷",
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
                        group: "中煤36处 - 1012007皮带巷",
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
            }
        };
    },
    methods: {
        selectedComponent(component) {
            this.rawModel = JSON.parse(JSON.stringify(component));
            this.$refs.form.reset(component);
        },
        reset() {
            this.$refs.form.reset(this.rawModel);
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
            this.$refs.form.getValidateModel().then(res => {
                $excel.exportReportA(res);
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
            background: #eee;
            position: absolute;
            top: 11px;
            left: 0;
        }
        span {
            display: inline-block;
            background: #fff;
            position: relative;
            z-index: 1;
            padding: 0px 10px;
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
            .xui-form.xui-form-style .xui-form-field .xui-field-label {
                min-width: 180px;
                text-align: right;
                font-size: 14px;
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
}
</style>