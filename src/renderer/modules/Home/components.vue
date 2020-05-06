<template>
    <div>
        <div style="padding:8px 5px 5px 5px;text-align:right;">
            <xui-input v-model="keyword" style="width:105px;float:left;" placeholder="日期检索" @change="refresh(true)"></xui-input>
            <xui-dropdown :options="addOptions"></xui-dropdown>
        </div>
        <xui-vituralized ref="viewport" class="BOX" style="position:absolute;top:45px;bottom:40px;text-align:center;height:auto;" :options="viewportOptions" :data="components">
            <template slot-scope="{item}">
                <div :title="getTitle(item)" :class="['component-item',getTitleClass(item),currentComponent&&(currentComponent._id==item._id)?'active':'']" @click="selectComponent(item)">
                    <p>工<span style="display:inline-block;width:7px;"></span>作<span style="display:inline-block;width:7px;"></span>日：{{item.gzrrq||""}}</p>
                    <p>值班领导：{{item.gzrzbld||""}}</p>
                    <div>更新于：{{item.updateTime | time}}</div>
                    <i class="remove-trigger xui-icon xui-icon-trash" @click="removeComponent(item)"></i>
                </div>
                <div v-if="components.length==0" style="padding:10px;">暂无报表</div>
            </template>
        </xui-vituralized>
        <!-- <xui-scroll class="BOX" style="position:absolute;top:45px;bottom:40px;text-align:center;">
            <div :title="getTitle(item)" :class="['component-item',getTitleClass(item),currentComponent&&(currentComponent._id==item._id)?'active':'']" v-for="item in components" :key="item.name" @click="selectComponent(item)">
                <p>工<span style="display:inline-block;width:7px;"></span>作<span style="display:inline-block;width:7px;"></span>日：{{item.gzrrq||""}}</p>
                <p>值班领导：{{item.gzrzbld||""}}</p>
                <div>更新于：{{item.updateTime | time}}</div>
                <i class="remove-trigger xui-icon xui-icon-trash" @click="removeComponent(item)"></i>
            </div>
            <div v-if="components.length==0" style="padding:10px;">暂无报表</div>
        </xui-scroll> -->
        <div class="sidebar-foot">
            <span>共{{components.length}}条</span>
            <xui-toolbar :options="footToolBar"></xui-toolbar>
        </div>
    </div>
</template>
<script>
const path = require("path");

import { remote } from "electron";
import Store from "./store.js";
import fs from "fs";

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

export default {
    data() {
        return {
            currentComponent: null,
            components: [],
            keyword: "",
            viewportOptions: {
                containerHeight: () => {
                    var el = this.$refs.viewport;
                    return el ? el.$el.clientHeight : 500;
                },
                recordHeight: 120,
                records: []
            },
            addOptions: {
                label: "新增",
                color: "success",
                icon: "xui-icon xui-icon-add",
                items: [
                    {
                        label: "园子沟煤矿安全生产日报表",
                        operate: record => {
                            this.editComponent({
                                title: "园子沟煤矿安全生产日报表",
                                createTime: Date.now(),
                                updateTime: Date.now(),
                                reportType: 1
                            });
                        }
                    },
                    {
                        line: true
                    },
                    {
                        label: "园子沟煤矿安全生产信息日报表",
                        operate: record => {
                            this.editComponent({
                                title: "园子沟煤矿安全生产信息日报表",
                                createTime: Date.now(),
                                updateTime: Date.now(),
                                reportType: 2
                            });
                        }
                    }
                ]
            },
            footToolBar: {
                size: "small",
                tools: [
                    {
                        label: "导出",
                        color: "primary",
                        operate: () => {
                            Store.exportBak().then(data => {
                                saveAs(
                                    new Blob([data], {
                                        type: "text/plain;charset=utf-8"
                                    }),
                                    `报表备份数据_${Sunset.Dates.format(
                                        new Date(),
                                        "yyyyMMdd"
                                    )}.bak`
                                );
                            });
                        }
                    },
                    {
                        label: "导入",
                        color: "primary",
                        operate: () => {
                            var files = remote.dialog.showOpenDialog({
                                filters: [
                                    {
                                        name: "bak文件",
                                        extensions: ["bak"]
                                    }
                                ],
                                properties: ["openFile"],
                                message: "选择要导入的Mackdown文件",
                                buttonLabel: "导入"
                            });
                            if (files.length > 0) {
                                var data = fs.readFileSync(files[0]);
                                try {
                                    var bak = JSON.parse(data.toString());
                                    Store.importBak(bak).then(res => {
                                        $tip("导入成功", "success");
                                        this.refresh();
                                        this.$emit("refresh");
                                    });
                                } catch (e) {
                                    $tip("备份文件已损坏", "warning");
                                }
                            }
                        }
                    }
                ]
            }
        };
    },
    methods: {
        refresh(fromKeyword) {
            if (fromKeyword === true) {
                this.currentComponent = null;
            }
            return Store.list(this.keyword).then(res => {
                res.forEach((item, i) => {
                    item.index = i;
                });
                this.components = res;
                if (
                    this.currentComponent == null &&
                    this.components.length > 0
                ) {
                    this.selectComponent(this.components[0]);
                } else {
                    this.selectComponent(this.currentComponent);
                }
            });
        },
        editComponent(report) {
            Store.save(report).then(res => {
                this.refresh().then(() => {
                    this.selectComponent(res);
                });
            });
        },
        selectComponent(component) {
            if (!component || component != this.currentComponent) {
                this.currentComponent = component;
                this.$emit("selected", component);
            } else {
            }
        },
        removeComponent(model) {
            $confirm(
                `确定删除报表：${model.gzrrq || "未知日期"} ${model.title}?`
            ).then(res => {
                Store.remove(model).then(res => {
                    if (model == this.currentComponent) {
                        this.currentComponent = null;
                    }
                    this.refresh();
                });
            });
        },
        getTitle(record) {
            var title = record.title || "未命名";
            return title.replace(/ /g, "");
        },
        getTitleClass(record) {
            if (record.reportType == 1) {
                return "success";
            } else if (record.reportType == 2) {
                return "primary";
            } else if (record.reportType) {
                return "warn";
            } else {
                return "unknow";
            }
        }
    },
    mounted() {
        this.refresh();
    }
};
</script>
<style lang="less">
@import "~@/style/variable.less";

.component-item {
    position: relative;
    width: calc(100% - 10px);
    background: @color-background-component;
    margin: 0px auto 10px auto;
    padding: 10px;
    border: 1px solid @color-border;
    border-top: 4px solid @color-success;
    border-radius: 2px;
    box-sizing: border-box;
    cursor: pointer;
    padding-top: 25px;
    text-align: left;
    font-size: 12px;
    &.active {
        background: @color-background-gray;
    }
    &.unknow {
        border-top: 4px solid @color-border;
        &:before {
            background: @color-border;
        }
    }
    &.success {
        border-top: 4px solid @color-success;
        &:before {
            background: @color-success;
        }
    }
    &.primary {
        border-top: 4px solid @color-primary;
        &:before {
            background: @color-primary;
        }
    }
    &.warn {
        border-top: 4px solid @color-warning;
        &:before {
            background: @color-warning;
        }
    }
    &:before {
        content: attr(title);
        max-width: 140px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        left: 0px;
        top: -2px;
        color: #fff;
        font-size: 11px;
        padding: 0px 5px;
        background: @color-success;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    & > p {
        padding: 5px 0px;
        color: @color-title;
        font-size: 14px;
    }
    & > div {
        padding-top: 10px;
        color: @color-subcolor;
    }
    .remove-trigger {
        position: absolute;
        right: 5px;
        top: 5px;
        color: @color-subcolor;
        &:hover {
            color: @color-primary;
        }
    }
    .edit-trigger {
        position: absolute;
        right: 25px;
        top: 5px;
        color: @color-subcolor;
        &:hover {
            color: @color-primary;
        }
    }
}

.sidebar-foot {
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: 40px;
    right: 0px;
    text-align: right;
    line-height: 40px;
    border-top: 1px solid @color-border;
    padding: 0px 5px;
    & > span {
        display: inline-block;
        vertical-align: middle;
        color: #fff;
        padding-top: 2px;
        float: left;
    }
}
.scroll-content.xui-virtualized-content {
    width: 100%;
}
.xui-dropdown.xui-dropdown-style {
    .xui-dropdown-option {
        text-align: left;
    }
}
</style>
