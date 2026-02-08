// 颜色

// 默认颜色配置
const DEFAULT_COLORS = {
  background: {
    color1: 'rgb(82, 255, 189)',
  },
  scrollbar: {
    track: 'rgb(195, 194, 163)',
    thumb: 'rgb(37, 116, 213)',
    hover: 'rgb(255, 107, 107)'
  },
  green: {
    light: 'rgb(232, 255, 229)', // 浅色
    lightGrey: 'rgb(179, 198, 176)', // 浅灰
    default: 'rgb(138, 255, 128)', // 普通
    defaultGrey: 'rgb(122, 220, 113)', // 普灰
    dark: 'rgb(0, 255, 0)', // 亮色
    darkGrey: 'rgb(231, 255, 229)', // 深灰
  },
  cyan: {
    light: 'rgb(218, 255, 255)', // 浅色
    lightGrey: 'rgb(174, 202, 202)', // 浅灰
    default: 'rgb(125, 255, 255)', // 普通
    defaultGrey: 'rgb(99, 200, 200)', // 普灰
    dark: 'rgb(0, 255, 255)', // 亮色
    darkGrey: 'rgb(0, 184, 184)', // 深灰
  },
  text: {
    cyan: 'rgb(0, 255, 255)', // 亮色
    green: 'rgb(0, 255, 0)', // 亮色
    purple: 'rgba(151, 65, 252, 0.2)', // 紫色
  }
}

export const COLORS = DEFAULT_COLORS

// 从Pinia store获取颜色配置的函数
export async function getColorsFromStore() {
  try {
    // 动态导入，避免模块顶层依赖
    const { useThemeColorStore } = await import('./stores/themecolor');
    // 检查Pinia是否已初始化
    const pinia = (window as any).pinia;
    if (pinia) {
      const themeColorStore = useThemeColorStore(pinia);
      return {
        background: {
          color1: themeColorStore.backgroundColor,
        },
        scrollbar: {
          track: themeColorStore.scrollbarTrack,
          thumb: themeColorStore.scrollbarThumb,
          hover: themeColorStore.scrollbarHover
        },
        green: {
          light: themeColorStore.light1,
          lightGrey: themeColorStore.lightGrey1,
          default: themeColorStore.default1,
          defaultGrey: themeColorStore.defaultGrey1,
          dark: themeColorStore.dark1,
          darkGrey: themeColorStore.darkGrey1,
        },
        cyan: {
          light: themeColorStore.light2,
          lightGrey: themeColorStore.lightGrey2,
          default: themeColorStore.default2,
          defaultGrey: themeColorStore.defaultGrey2,
          dark: themeColorStore.dark2,
          darkGrey: themeColorStore.darkGrey2,
        },
        text: {
          cyan: themeColorStore.dark2,
          green: themeColorStore.dark1,
          purple: 'rgba(151, 65, 252, 0.2)', // 紫色
        }
      };
    } else {
      // 如果Pinia未初始化，返回默认颜色
      return DEFAULT_COLORS;
    }
  } catch (error) {
    // 如果无法获取store，返回默认颜色
    console.warn('无法从Pinia store获取颜色配置，使用默认颜色:', error);
    return DEFAULT_COLORS;
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