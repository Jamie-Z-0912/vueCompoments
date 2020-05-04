import "./index.less";
import { createComponent, reactive, PropType } from "@vue/composition-api";

export default createComponent({
  name: "RadioButton",
  props: {
    name: {
      type: String,
      required: true,
    },
    label: String,
    valueList: {
      type: Array,
      required: true,
    },
    value: String,
  },
  setup(props, { emit, listeners }) {
    function handleChange(event: MouseEvent) {
      const { name } = reactive(props);
      if (listeners.change) {
        emit("change", { name, target: event.target });
      }
    }
    return () => {
      const { name, label, valueList, value } = reactive(props);
      interface itemType {
        label: String;
        value: String;
      }
      const list = valueList as itemType[];

      return (
        <div class="radio_group">
          {label ? <span>{label}：</span> : null}
          {list.map((item: itemType) => (
            <label
              class={item.value === value ? "radio-item active" : "radio-item"}
            >
              <input
                name={name}
                type="radio"
                checked={item.value === value}
                value={item.value}
                onClick={handleChange}
              />
              {item.label}
            </label>
          ))}
        </div>
      );
    };
  },
});
