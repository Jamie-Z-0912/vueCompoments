import { createComponent, reactive } from "@vue/composition-api";
import { filterEmpty, getPropsData } from "@/utils/props-util";
import { cloneElement } from "@/utils/vnode";
import { VNode } from "vue";
import "./style/index.less";

// type statusType = "wait" | "process," | "finish" | "error";
// type sizeType = "default" | "small";
// type directionType = "horizontal" | "vertical";

export default createComponent({
  name: "Steps",
  props: {
    current: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: "process",
    },
    size: {
      type: String,
      default: "",
    },
    direction: {
      type: String,
      default: "horizontal",
    },
    prefixCls: {
      type: String,
      default: "wl-steps",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, emit }) {
    interface curType {
      step_num: any;
    }
    function onStepClick(cur: curType) {
      const { current, disabled } = reactive(props);
      if (!disabled && cur.step_num && current + 1 !== cur.step_num) {
        emit("change", cur);
      }
    }

    return () => {
      const {
        prefixCls,
        direction,
        status,
        size,
        current,
        disabled,
      } = reactive(props);
      const filteredChildren = filterEmpty(slots.default([]));
      const classString = {
        [prefixCls]: true,
        [`${prefixCls}-${direction}`]: true,
        [`${prefixCls}-${size}`]: size,
        [`${prefixCls}-label-${direction}`]: direction === "horizontal",
      };
      return (
        <div ref="WlStepsRef" class={classString}>
          {filteredChildren.map((child: VNode, index: number) => {
            const childProps = getPropsData(child);
            const stepNumber = index + 1;
            const stepProps = {
              props: {
                stepNumber,
                prefixCls,
                disabled,
                ...childProps,
              },
              on: {
                stepClick: onStepClick,
              },
              class: "",
              // scopedSlots: $scopedSlots, 作用于插槽暂时不用
            };
            // fix tail color
            if (status === "error" && stepNumber === current) {
              stepProps.class = `${prefixCls}-next-error`;
            }
            if (!childProps.status) {
              if (index === current) {
                stepProps.props.status = status;
              } else if (index < current) {
                stepProps.props.status = "finish";
              } else {
                stepProps.props.status = "wait";
              }
            }
            stepProps.props.active = index === current;
            return cloneElement(child, stepProps);
          })}
        </div>
      );
    };
  },
});
