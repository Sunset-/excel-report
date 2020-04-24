<style lang="less">
.sunset-coder-container {
    width: 100%;
    min-height: 100px;
    & > div {
        width: 100%;
        height: 100%;
        min-height: 100px;
        font: 16px "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
            "source-code-pro", monospace;
        font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas",
            "source-code-pro", monospace;
    }
}
</style>
<template>
    <div class="sunset-coder-container">
        <div :id="id" :style="style" :class="[readOnly?'sunset-coder-readonly':'']">
        </div>
    </div>
</template>
<script>
var uid = 0;
export default {
    model: {
        prop: "value",
        event: "input"
    },
    props: {
        options: {},
        value: {},
        height: {},
        readonly: {}
    },
    data() {
        return {
            id: "",
            waitValue: null,
            ready: false,
            pending: false
        };
    },
    computed: {
        theme() {
            return (this.options && this.options.theme) || "ace/theme/monokai";
        },
        mode() {
            return (this.options && this.options.mode) || "ace/mode/javascript";
        },
        readOnly() {
            return this.readonly === true || this.readonly === "";
        },
        style() {
            return (this.options && this.options.style) || "";
        }
    },
    methods: {
        init() {
            if (!ace) {
                throw new Error("请装载AceCode组件");
            }
            this.id = `sunset-coder-${++uid}`;
            this.$nextTick(() => {
                var coder = (this.coder = ace.edit(this.id));
                coder.setTheme(this.theme);
                coder.getSession().setMode(this.mode);
                // if (this.height && !isNaN(+this.height)) {
                // 	editor.setHeight(+this.height);
                // }
                coder.setFontSize(16);
                coder.setValue(this.waitValue || this.value || "");
                this.ready = true;
                //监听
                coder.on("change", () => {
                    this.setValueSilent(coder.getValue());
                });
                coder.on("blur", () => {
                    this.$emit("input", coder.getValue());
                });
                coder.on("focus", () => {
                    this.$emit("focus");
                });
                //只读
                if (this.readOnly) {
                    coder.setReadOnly(true);
                }
                this.ready = true;
            });
        },
        setValueSilent(value) {
            this.pending = true;
            this.$emit("input", value);
            this.$nextTick(() => {
                this.pending = false;
            });
        },
        getcoder() {
            return this.coder;
        }
    },
    mounted() {
        this.init();
    },
    watch: {
        value(v) {
            if (!this.pending) {
                if (this.ready) {
                    this.coder && this.coder.setValue(v || "");
                    this.coder && this.coder.focus(true);
                } else {
                    this.waitValue = v;
                }
            }
        },
        readonly(v) {
            try {
                //只读
                if (!!v) {
                    this.coder && this.coder.setReadOnly(true);
                } else {
                    this.coder && this.coder.setReadOnly(false);
                }
            } catch (e) {
                console.warn(e);
            }
        }
    }
};
</script>