import "./App.css";
import { createComponent, reactive } from "@vue/composition-api";
// import HelloWorld from "./components/HelloWorld";
// import ImageLogo from "./assets/logo.png";
import Steps from "./components/Steps/Steps";
import Step from "./components/Steps/Step";
import RadioButton from "./components/RadioButton";

const stepList = [0, 1, 2, 3];
const dic = [
  {
    key: "status",
    text: "状态",
    list: [
      { value: "process", label: "正常" },
      { value: "wait", label: "等待" },
      { value: "finish", label: "完成" },
      { value: "error", label: "错误" },
    ],
  },
  {
    key: "size",
    text: "尺寸",
    list: [
      { value: "", label: "默认" },
      { value: "small", label: "略小" },
    ],
  },
  {
    key: "direction",
    text: "方向",
    list: [
      { value: "horizontal", label: "水平" },
      { value: "vertical", label: "垂直" },
    ],
  },
];

const clickDic = [
  { value: "disabled", label: "不可点击" },
  { value: "abled", label: "可点击" },
];
export default createComponent({
  name: "App",
  setup() {
    type dataType = { [index: string]: String | Number | boolean };
    const data: dataType = reactive({
      direction: "horizontal",
      size: "",
      current: 0,
      status: "process",
      disabled: false,
    });

    function changeCurrent(current: { [index: string]: any }) {
      data.current = current.step_num - 1;
      console.log(`被点击前状态：${current.status}`);
    }

    interface iType {
      key: string;
      text: string;
      list: { value: string; label: string }[];
    }
    return () => (
      <div id="app">
        <div class="box">
          <div style="margin-top:10px">
            <RadioButton valueList={clickDic} name="disabled" />
          </div>
          {dic.map((i: iType) => (
            <div style="margin-top:10px">
              <RadioButton valueList={i.list} name={i.key} label={i.text} />
            </div>
          ))}
        </div>
        <div class="box">
          <Steps
            {...{
              props: data,
              on: {
                change: changeCurrent,
              },
            }}
          >
            {stepList.map((item) => (
              <Step
                title={`第 ${item + 1} 步`}
                content={`我的第 ${item + 1} 步`}
              />
            ))}
          </Steps>
        </div>

        {/* <HelloWorld
          msg="Welcome to Your Vue.js + TypeScript App"
          eventClick={(e) => console.log("click", e.target)}
        /> */}
      </div>
    );
  },
});
