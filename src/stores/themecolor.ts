import { defineStore } from 'pinia'

// 原始颜色
/* scrollbar */
const originScrollbarTrack = 'rgb(195, 194, 163)';
const originScrollbarThumb = 'rgb(37, 116, 213)';
const originScrollbarHover = 'rgb(255, 107, 107)';

/* background */
const originBackgroundColor = 'rgb(82, 255, 189)';

/* colors */

const originLight = 'rgb(255, 255, 255)';
const originLightGrey = 'rgb(227, 227, 227)';
const originDefault = 'rgb(199, 199, 199)';
const originDefaultGrey = 'rgb(159, 159, 159)';

const originDark = 'rgb(124, 124, 124)';

const originDarkGrey = 'rgb(87, 87, 87)';


/* 绿色 */
/* 浅色 */
const greenLight = 'rgb(232, 255, 229)';
/* 浅灰 */
const greenLightGrey = 'rgb(179, 198, 176)';
/* 普通 */
const greenDefault = 'rgb(138, 255, 128)';
/* 普灰 */
const greenDefaultGrey = 'rgb(122, 220, 113)';
/* 亮色 */
const greenDark = 'rgb(0, 255, 0)';
/* 深灰 */
const greenDarkGrey = 'rgb(231, 255, 229)';

/* 青色 */
/* 浅色 */
const cyanLight = 'rgb(218, 255, 255)';
/* 浅灰 */
const cyanLightGrey = 'rgb(174, 202, 202)';
/* 普通 */
const cyanDefault = 'rgb(125, 255, 255)';
/* 普灰 */
const cyanDark = 'rgb(0, 255, 255)';
/* 亮色 */
const cyanDarkGrey = 'rgb(0, 184, 184)';
/* 深灰 */
const cyanDefaultGrey = 'rgb(99, 200, 200)';

/* 灰色 */
/* 浅色 */
const greyLight = 'rgba(255, 255, 255, 1)';
/* 浅灰 */
const greyLightGrey = 'rgba(227, 227, 227, 1)';
/* 普通 */
const greyDefault = 'rgba(199, 199, 199, 1)';
/* 普灰 */
const greyDefaultGrey = 'rgba(159, 159, 159, 1)';
/* 亮色 */
const greyDark = 'rgba(124, 124, 124, 1)';
/* 深灰 */
const greyDarkGrey = 'rgba(87, 87, 87, 1)';

/* 半透明颜色 */
const transparentWhite10 = 'rgba(255, 255, 255, 0.1)';
const transparentWhite30 = 'rgba(255, 255, 255, 0.3)';
const transparentWhite40 = 'rgba(255, 255, 255, 0.4)';
const transparentBlack10 = 'rgba(0, 0, 0, 0.1)';
const transparentBlack20 = 'rgba(0, 0, 0, 0.2)';
const transparentBlack30 = 'rgba(0, 0, 0, 0.3)';

/* 半透明彩色 */
const transparentOrange50 = 'rgba(255, 165, 0, 0.5)';
const transparentGrey50 = 'rgba(128, 128, 128, 0.5)';
const transparentBlue50 = 'rgba(0, 128, 255, 0.5)';

/* 其他颜色 */
const redError = '#ff6b6b';

export const useThemeColorStore = defineStore('themeColor', {
    state: () => ({
        scrollbarTrack: originScrollbarTrack,
        scrollbarThumb: originScrollbarThumb,
        scrollbarHover: originScrollbarHover,
        backgroundColor: originBackgroundColor,
        light1: greyLight,
        lightGrey1: greyLightGrey,
        default1: greyDefault,
        defaultGrey1: greyDefaultGrey,
        dark1: greyDark,
        darkGrey1: greyDarkGrey,
        light2: cyanLight,
        lightGrey2: cyanLightGrey,
        default2: cyanDefault,
        defaultGrey2: cyanDefaultGrey,
        dark2: cyanDark,
        darkGrey2: cyanDarkGrey,
        transparentWhite10: transparentWhite10,
        transparentWhite30: transparentWhite30,
        transparentWhite40: transparentWhite40,
        transparentBlack10: transparentBlack10,
        transparentBlack20: transparentBlack20,
        transparentBlack30: transparentBlack30,
        transparentOrange50: transparentOrange50,
        transparentGrey50: transparentGrey50,
        transparentBlue50: transparentBlue50,
        redError: redError,
    }),
})