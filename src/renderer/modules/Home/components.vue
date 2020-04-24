<template>
    <div>
        <div style="padding:8px 5px 5px 5px;text-align:right;">
            <xui-input v-model="keyword" style="width:105px;float:left;" placeholder="关键字" @change="refresh"></xui-input>
            <xui-button color="primary" icon="xui-icon xui-icon-add" size="small" @click="editComponent()">新增</xui-button>
        </div>
        <xui-scroll class="BOX" style="position:absolute;top:45px;text-align:center;">
            <div :class="['component-item',currentComponent&&(currentComponent._id==item._id)?'active':'']" v-for="item in components" :key="item.name" @click="selectComponent(item)">
                <p>{{item.updateTime | time}}</p>
                <div>更新于：{{item.updateTime | time}}</div>
                <i class="remove-trigger xui-icon xui-icon-trash" @click="removeComponent(item)"></i>
            </div>
            <div v-if="components.length==0" style="padding:10px;">暂无报表</div>
        </xui-scroll>
    </div>
</template>
<script>
const fs = require("fs");
const path = require("path");

import Store from "./store.js";
import { mkdir } from "fs";

export default {
    data() {
        return {
            currentComponent: null,
            components: [],
            keyword: ""
        };
    },
    methods: {
        refresh() {
            return Store.list(this.keyword).then(res => {
                this.components = res;
                if (
                    this.currentComponent == null &&
                    this.components.length > 0
                ) {
                    this.selectComponent(this.components[0]);
                }
            });
        },
        editComponent() {
            var model = {
                createTime: Date.now(),
                updateTime: Date.now()
            };
            Store.save(model).then(res => {
                this.refresh().then(() => {
                    this.selectComponent(res);
                });
            });
        },
        selectComponent(component) {
            this.currentComponent = component;
            this.$emit("selected", component);
        },
        removeComponent(model) {
            $confirm(`确定删除报表：${model.name}?`).then(res => {
                Store.remove(model).then(res => {
                    this.refresh();
                });
            });
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
    &:before {
        content: "报表";
        width: 40px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        left: 0px;
        top: -2px;
        color: #fff;
        font-size: 11px;
        background: @color-success;
        text-align: center;
    }
    & > p {
        padding: 10px 0px;
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
</style>
