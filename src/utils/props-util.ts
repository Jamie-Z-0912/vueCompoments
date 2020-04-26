const camelizeRE = /-(\w)/g;
const camelize = (str: String) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};

export const parseStyleText = (cssText = "", camel: boolean = false) => {
  const res: { [index: string]: any } = {};
  const listDelimiter = /;(?![^(]*\))/g;
  const propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function(item) {
    if (item) {
      const tmp = item.split(propertyDelimiter);
      if (tmp.length > 1) {
        const k = camel ? camelize(tmp[0].trim()) : tmp[0].trim();
        res[k] = tmp[1].trim();
      }
    }
  });
  return res;
};

export function getPropsData(ele: any) {
  let componentOptions = ele.componentOptions;
  if (ele.$vnode) {
    componentOptions = ele.$vnode.componentOptions;
  }
  return componentOptions ? componentOptions.propsData || {} : {};
}

export function isEmptyElement(c: any) {
  return !(c.tag || (c.text && c.text.trim() !== ""));
}

export function filterEmpty(children: any[] = []) {
  return children.filter((c) => !isEmptyElement(c));
}

// export function getEvents(child: any) {
//   let events = {};
//   if (child.componentOptions && child.componentOptions.listeners) {
//     events = child.componentOptions.listeners;
//   } else if (child.data && child.data.on) {
//     events = child.data.on;
//   }
//   return { ...events };
// }
