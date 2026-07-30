import { defineStore } from 'pinia'

// ==== 滚动条默认值（直接存入 state）====
const originScrollbarTrack = 'rgb(195, 194, 163)';
const originScrollbarThumb = 'rgb(37, 116, 213)';
const originScrollbarHover = 'rgb(255, 107, 107)';

// ==== 背景色默认值（直接存入 state）====
const originBackgroundColor = 'rgb(82, 255, 189)';

// ==== 以下 origin* 为保留参考色，未挂载到 state ====
const originLight = 'rgb(255, 255, 255)';
const originLightGrey = 'rgb(227, 227, 227)';
const originDefault = 'rgb(199, 199, 199)';
const originDefaultGrey = 'rgb(159, 159, 159)';
const originDark = 'rgb(124, 124, 124)';
const originDarkGrey = 'rgb(87, 87, 87)';


// ==== 绿色系（保留参考，未挂载到 state）====
const greenLight = 'rgb(232, 255, 229)';       // 浅色
const greenLightGrey = 'rgb(179, 198, 176)';    // 浅灰
const greenDefault = 'rgb(138, 255, 128)';      // 普通
const greenDefaultGrey = 'rgb(122, 220, 113)';  // 普灰
const greenDark = 'rgb(0, 255, 0)';             // 亮色
const greenDarkGrey = 'rgb(231, 255, 229)';     // 深灰

// ==== 系列B：青色系 → state: light2 / lightGrey2 / default2 / defaultGrey2 / dark2 / darkGrey2 ====
const cyanLight = 'rgb(218, 255, 255)';         // 浅色
const cyanLightGrey = 'rgb(174, 202, 202)';     // 浅灰
const cyanDefault = 'rgb(125, 255, 255)';       // 普通
const cyanDefaultGrey = 'rgb(99, 200, 200)';    // 普灰
const cyanDark = 'rgb(0, 255, 255)';            // 亮色
const cyanDarkGrey = 'rgb(0, 184, 184)';        // 深灰

// ==== 系列A：灰色系 → state: light1 / lightGrey1 / default1 / defaultGrey1 / dark1 / darkGrey1 ====
const greyLight = 'rgba(255, 255, 255, 1)';     // 浅色
const greyLightGrey = 'rgba(227, 227, 227, 1)'; // 浅灰
const greyDefault = 'rgba(199, 199, 199, 1)';   // 普通
const greyDefaultGrey = 'rgba(159, 159, 159, 1)'; // 普灰
const greyDark = 'rgba(124, 124, 124, 1)';      // 亮色
const greyDarkGrey = 'rgba(87, 87, 87, 1)';     // 深灰

// ==== 半透明白色 ====
const transparentWhite10 = 'rgba(255, 255, 255, 0.1)';
const transparentWhite30 = 'rgba(255, 255, 255, 0.3)';
const transparentWhite40 = 'rgba(255, 255, 255, 0.4)';

// ==== 半透明黑色 ====
const transparentBlack10 = 'rgba(0, 0, 0, 0.1)';
const transparentBlack20 = 'rgba(0, 0, 0, 0.2)';
const transparentBlack30 = 'rgba(0, 0, 0, 0.3)';
const transparentBlack80 = 'rgba(0, 0, 0, 0.8)';

// ==== 半透明彩色 ====
const transparentOrange50 = 'rgba(255, 165, 0, 0.5)';
const transparentGrey50 = 'rgba(128, 128, 128, 0.5)';
const transparentBlue50 = 'rgba(0, 128, 255, 0.5)';
const transparentCyan50 = 'rgba(125, 255, 255, 0.5)';

// ==== 错误色 ====
const redError = '#ff6b6b';

export const useThemeColorStore = defineStore('themeColor', {
    state: () => ({
        /* 滚动条 */
        scrollbarTrack: originScrollbarTrack,
        scrollbarThumb: originScrollbarThumb,
        scrollbarHover: originScrollbarHover,
        /* 背景 */
        backgroundColor: originBackgroundColor,
        /* 系列A：灰色系 */
        light1: greyLight,
        lightGrey1: greyLightGrey,
        default1: greyDefault,
        defaultGrey1: greyDefaultGrey,
        dark1: greyDark,
        darkGrey1: greyDarkGrey,
        /* 系列B：青色系 */
        light2: cyanLight,
        lightGrey2: cyanLightGrey,
        default2: cyanDefault,
        defaultGrey2: cyanDefaultGrey,
        dark2: cyanDark,
        darkGrey2: cyanDarkGrey,
        /* 半透明白色 */
        transparentWhite10: transparentWhite10,
        transparentWhite30: transparentWhite30,
        transparentWhite40: transparentWhite40,
        /* 半透明黑色 */
        transparentBlack10: transparentBlack10,
        transparentBlack20: transparentBlack20,
        transparentBlack30: transparentBlack30,
        transparentBlack80: transparentBlack80,
        /* 半透明彩色 */
        transparentOrange50: transparentOrange50,
        transparentGrey50: transparentGrey50,
        transparentBlue50: transparentBlue50,
        transparentCyan50: transparentCyan50,
        /* 错误色 */
        redError: redError,
    }),
})