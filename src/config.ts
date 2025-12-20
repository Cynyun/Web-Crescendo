// 颜色
export const COLORS = {
  background: {
    color1: '#52ffbdff',
  },
  scrollbar: {
    track: 'rgba(201, 200, 161, 1)',
    thumb: 'rgba(70, 183, 244, 1)',
    hover: 'rgb(255, 107, 107)'
  },
  green: {
    light: '#e7ffe5ff', // 浅色
    lightGrey: '#b3c6b0ff', // 浅灰
    default: '#8aff80ff', // 普通
    defaultGrey: '#7adc71ff', // 普灰
    dark: '#00ff00ff', // 亮色
    darkGrey: '#00b000ff', // 深灰
  },
  cyan: {
    light: '#daffffff', // 浅色
    lightGrey: '#aecacaff', // 浅灰
    default: '#7dffffff', // 普通
    defaultGrey: '#63c8c8ff', // 普灰
    dark: '#00FFFFff', // 亮色
    darkGrey: '#00b8b8ff', // 深灰
  },
  text: {
    cyan: '#00FFFFff', // 亮色
    green: '#00ff00ff', // 亮色
    purple: 'rgba(151, 65, 252, 0.2)', // 紫色
  }
}

// 导出函数
export function registerColorCssVariables(colors: typeof COLORS) {
  const setVar = (obj: any, path = '') => {
    for (const key in obj) {
      const value = obj[key];
      const newPath = path ? `${path}-${key}` : key;
      if (typeof value === 'string') {
        document.documentElement.style.setProperty(`--color-${newPath}`, value);
      } else if (typeof value === 'object') {
        setVar(value, newPath);
      }
    }
  };
  setVar(colors);
}

// 图片函数

export const getImageSrc = (path: string): string => {
  return `/Images/${path}`;
};

export default {
  install(app: any) {
    app.config.globalProperties.$getImageSrc = getImageSrc;
  }
};