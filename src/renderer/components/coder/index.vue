<style lang="less">
.sunset-coder-container {
    width: 600px;
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
    .CodeMirror-scroll {
        min-height: 200px;
    }
}
</style>
<template>
    <div class="sunset-coder-container">
        <!-- begin code -->
        <textarea :id="id" :style="style" :name="id"></textarea>
        <!-- end code-->
    </div>
</template>
<script>
import "./vendor/codemirror/codemirror.css";
import "./vendor/codemirror/theme/dracula.css";
import CodeMirror from "./vendor/codemirror/lib/codemirror.js";
import "./vendor/codemirror/addon/edit/matchbrackets.js";
import "./vendor/codemirror/addon/comment/continuecomment.js";
import "./vendor/codemirror/addon/comment/comment.js";
import "./vendor/codemirror/mode/javascript/javascript.js";

import "./vendor/codemirror/addon/fold/foldgutter.css";
import "./vendor/codemirror/addon/fold/foldcode.js";
import "./vendor/codemirror/addon/fold/foldgutter.js";
import "./vendor/codemirror/addon/fold/brace-fold.js";
import "./vendor/codemirror/addon/fold/comment-fold.js";

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
            return (this.options && this.options.theme) || "monokai";
        },
        mode() {
            return (this.options && this.options.mode) || "application/ld+json";
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
            this.id = `sunset-coder-${++uid}`;
            this.$nextTick(() => {
                var coder = (this.coder = CodeMirror.fromTextArea(
                    document.getElementById(this.id),
                    {
                        matchBrackets: true,
                        autoCloseBrackets: true,
                        mode: this.mode,
                        lineWrapping: true,
                        lineNumbers: true, //显示行号
                        theme: "dracula", //设置主题
                        lineWrapping: true, //代码折叠
                        indentUnit: 4
                    }
                ));
                // coder.setTheme(this.theme);
                // coder.getSession().setMode(this.mode);
                // if (this.height && !isNaN(+this.height)) {
                // 	editor.setHeight(+this.height);
                // }
                // coder.setFontSize(16);
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