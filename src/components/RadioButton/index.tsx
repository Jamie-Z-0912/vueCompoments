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
    value: String || Number,
    eventClick: {
      type: (null as unknown) as PropType<(event: MouseEvent) => void>,
    },
  },
  setup(props) {
    return () => {
      const { name, label, valueList, value } = reactive(props);
      interface itemType {
        label: String;
        value: String | Number;
      }

      const list = valueList as itemType[];

      return (
        <div class="radio_group">
          {label ? <span>{label}：</span> : null}
          {list.map((item: itemType) => (
            <label
              class={
                (item.value as String | Number) === value
                  ? "radio-item active"
                  : "radio-item"
              }
            >
              <input
                name={name}
                type="radio"
                checked={(item.value as String | Number) === value}
                value={item.value}
                onClick={props.eventClick}
              />
              {item.label}
            </label>
          ))}
        </div>
      );
    };
  },
});
