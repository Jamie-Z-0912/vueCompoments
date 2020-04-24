// import style from "./step.less";
import { createComponent } from "@vue/composition-api";

// type statusType = "wait" | "process," | "finish" | "error";

export default createComponent({
  name: "WlStep",
  props: {
    status: {
      type: String,
      default: "process",
    },
    title: String,
    content: String,
    prefixCls: {
      type: String,
      default: "wl-Step",
    },
    itemWidth: String,
  },
  setup(props) {
    const {
      prefixCls,
      itemWidth,
      // active,
      status = "wait",
      // disabled,
      title,
      content,
    } = props;

    const classString = {
      [`${prefixCls}-item`]: true,
      [`${prefixCls}-item-${status}`]: true,
    };
    const stepProps = {
      class: classString,
    };
    const stepItemStyle = { width: "" };
    if (itemWidth) {
      stepItemStyle.width = itemWidth;
    }

    return (
      <div {...stepProps} style={stepItemStyle}>
        <div class={`${prefixCls}-item-container`}>
          <div class={`${prefixCls}-item-content`}>
            <div class={`${prefixCls}-item-title`}>{title}</div>
            {content && (
              <div class={`${prefixCls}-item-description`}>{content}</div>
            )}
          </div>
        </div>
      </div>
    );
  },
});
