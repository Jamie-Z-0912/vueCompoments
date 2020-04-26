// import style from "./step.less";
import { createComponent, reactive } from "@vue/composition-api";

// type statusType = "wait" | "process," | "finish" | "error";

export default createComponent({
  name: "Step",
  props: {
    status: {
      type: String,
      default: "process",
    },
    stepNumber: {
      type: Number,
      default: 1,
    },
    title: String,
    content: String,
    prefixCls: {
      type: String,
      default: "wl-steps",
    },
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit, listeners }) {
    function stepClick() {
      const { disabled, stepNumber, status } = reactive(props);
      if (listeners.stepClick && !disabled) {
        emit("stepClick", { status, step_num: stepNumber });
      }
    }

    function renderIconNode() {
      const { prefixCls, stepNumber, status } = reactive(props);
      let iconNode;
      const iconClassName = {
        [`${prefixCls}-icon`]: true,
        iconfont: true,
        [`${prefixCls}-icon-check`]: status === "finish",
        [`${prefixCls}-icon-close`]: status === "error",
      };
      if (status === "finish" || status === "error") {
        iconNode = <span class={iconClassName} />;
      } else {
        iconNode = <span class={`${prefixCls}-icon`}>{stepNumber}</span>;
      }
      return iconNode;
    }

    return () => {
      const { prefixCls, status = "wait", title, content, active } = reactive(
        props
      );
      const classString = {
        [`${prefixCls}-item`]: true,
        [`${prefixCls}-item-${status}`]: true,
        [`${prefixCls}-item-active`]: active,
      };

      return (
        <div class={classString}>
          <div class={`${prefixCls}-item-container`} onClick={stepClick}>
            <div class={`${prefixCls}-item-icon`}>{renderIconNode()}</div>
            <div class={`${prefixCls}-item-content`}>
              <div class={`${prefixCls}-item-title`}>{title}</div>
              {content && (
                <div class={`${prefixCls}-item-description`}>{content}</div>
              )}
            </div>
          </div>
        </div>
      );
    };
  },
});
