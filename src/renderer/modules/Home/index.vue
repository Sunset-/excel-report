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

var data = {
    title: "生产日报表",
    zbld: "张三 李四",
    date: "2020年3月29日",
    cxl: {
        ym_day: 11886,
        ym_month: 48984,
        rxl_day: 11316,
        rxl_month: 47612,
        jm_day: 12321,
        jm_month: 54121,
        shm_day: 31233,
        shm_month: 123213
    },
    xs: {
        ym_day: 11886,
        ym_month: 48984,
        ym_kc: 3123,
        shm_day: 31233,
        shm_month: 123213,
        shm_kc: 3123,
        mjm_day: 31233,
        mjm_month: 123213,
        mjm_kc: 3123,
        zm_day: 31233,
        zm_month: 123213,
        sbk_day: 31233,
        sbk_month: 123213,
        dk_day: 31233,
        dk_month: 123213,
        dmsbkdk_kc: 3123,

        zm_kc: 0,
        total_day: 0,
        total_month: 0,
        total_kc: 0
    },
    zcd: {
        title: "当日胜场：312312312",
        desc: "当日推进让微软微软"
    },
    scyx: [
        {
            title: "werwerwerwer",
            person: "rwerwerwer",
            result: "qwewqeqwewqeqw"
        },
        {
            title: "werwerwerwer",
            person: "rwerwerwer",
            result: "qwewqeqwewqeqw"
        },
        {
            title: "werwerwerwer",
            person: "rwerwerwer",
            result: "qwewqeqwewqeqw"
        }
    ]
};

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
                            $excel.export(data);
                        }
                    }
                ]
            },
            formOptions: {
                cols: 3,
                fields: [
                    {
                        label: "日期",
                        name: "date",
                        widget: "datetime",
                        placeholder: "请选择日期"
                    },
                    {
                        label: "值班领导",
                        name: "ld",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "天气",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "产销量",
                        label: "原煤 - 日产",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "原煤 - 月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "入选量 - 日产",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "入选量 - 月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "精煤 - 日产",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "精煤 - 月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "筛混煤 - 日产",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "筛混煤 - 月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "销售",
                        label: "原煤 - 日销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "原煤 - 月销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "原煤 - 品种煤库存",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "筛混煤 - 日销量",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "筛混煤 - 月销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "筛混煤 - 品种煤库存",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "末精煤 - 日销量",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "末精煤 - 月销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "末精煤 - 品种煤库存",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "籽煤 - 日销量",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "籽煤 - 月销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "三八块煤 - 日销量",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "三八块煤 - 月销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "大块 - 日销量",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "大块 - 月销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "籽煤、三八块、大块 - 库存",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "合计 - 日销量",
                        name: "title",
                        widget: "input",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "合计 - 月销量",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "合计 - 库存",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "综采队 - 1012001工作面",
                        label: "当日生产",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "详情",
                        name: "title",
                        widget: "input",
                        monopolize: true,
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "掘一队 - 1032101工作面回风巷",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:42px;'></span> - 1032102工作面回风联巷",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "掘三队 - 1012006浮云绕道",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:42px;'></span> - 1032102工作面回风联巷",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "重庆中环 - 1012006浮云绕道",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:56px;'></span> - 1032102工作面回风联巷",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:56px;'></span> - 1032102工作面回风联巷",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group:
                            "<span style='display:inline-block;width:56px;'></span> - 1032102工作面回风联巷",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "中煤36处 - 1012006浮云绕道",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "合计掘进进尺",
                        label: "当日掘进",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "月累计",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "抽采队",
                        label: "抽采量",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "详情",
                        name: "title",
                        widget: "textarea",
                        rows: 4,
                        monopolize: true,
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "通风队",
                        label: "通风系统",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "运输队",
                        label: "运输系统",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "机电队",
                        label: "提升系统",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "供电系统",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "排水系统",
                        name: "title",
                        widget: "input",
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "准备队",
                        label: "工作详情",
                        name: "title",
                        widget: "textarea",
                        rows: 4,
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "东翼一号回风立井",
                        label: "工作详情",
                        name: "title",
                        widget: "textarea",
                        rows: 4,
                        style: "width:630px;",
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "生产情况1",
                        label: "生产影响",
                        name: "title",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "责任人",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "处理结果",
                        name: "title",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "生产情况2",
                        label: "生产影响",
                        name: "title",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "责任人",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "处理结果",
                        name: "title",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "生产情况3",
                        label: "生产影响",
                        name: "title",
                        widget: "textarea",
                        rows: 2,
                        style: "width:630px;",
                        cols: false,
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "责任人",
                        name: "title",
                        widget: "input",
                        placeholder: "请输入值班领导"
                    },
                    {
                        label: "处理结果",
                        name: "title",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入值班领导"
                    },
                    {
                        group: "备注",
                        label: "备注",
                        name: "title",
                        widget: "textarea",
                        rows: 3,
                        style: "width:630px;",
                        newline: true,
                        placeholder: "请输入值班领导"
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
}
</style>