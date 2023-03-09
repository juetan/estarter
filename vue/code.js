import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from "vue";

const _hoisted_1 = { class: "btn" };

export function render(_ctx, _cache) {
  return (
    _openBlock(),
    _createElementBlock("div", null, [
      _createElementVNode("button", _hoisted_1, _toDisplayString(_ctx.text), 1 /* TEXT */),
    ])
  );
}
import { defineComponent as _defineComponent } from "vue";

const __default__ = {
  methods: {
    click() {
      console.log("ok");
    },
  },
};

export default /*#__PURE__*/ _defineComponent({
  ...__default__,
  setup(__props, { expose }) {
    expose();

    const text = "按钮";

    const __returned__ = { text };
    Object.defineProperty(__returned__, "__isScriptSetup", { enumerable: false, value: true });
    return __returned__;
  },
});
