/**
 * 组件库注册业务组件
 */

import Coder from "@/components/coder/index.vue";

export default function(NetPosaXUI) {
    NetPosaXUI.Component.registFormField("coder", Coder);
};