// import style from "./HelloWorld.module.css";
import { createComponent } from "@vue/composition-api";

export default createComponent({
  name: "Steps",
  props: {
    msg: {
      type: String,
      required: true,
    },
  },
  setup(props, setupContext) {
    return () => (
      <div>
        <div>{setupContext.slots.default([])}</div>
        <div>====================</div>
        <div>====={props.msg}===</div>
      </div>
    );
  },
});
