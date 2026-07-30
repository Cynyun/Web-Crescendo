// interface ContextItem {
//     text?: string
//     indent?: boolean // 空格
//     wideGap?: boolean // 更大的间距
//     showbackground?: boolean // 展示背景
// }

// const originString = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a justo vel velit efficitur ullamcorper non ut augue. Nunc ultrices massa nulla, non rutrum justo accumsan eget. Aenean volutpat pharetra dolor, in mollis felis consectetur faucibus. Vestibulum varius ligula et tempor varius. Suspendisse et neque vitae est porttitor malesuada sit amet consectetur quam. Nam vestibulum vestibulum ante sit amet bibendum. Integer vel porta massa, ac suscipit velit. In auctor ex eu tristique dignissim. Praesent vitae faucibus eros, vel ultricies lectus. Integer at turpis ut ex ultrices tristique. Mauris venenatis imperdiet dignissim. Quisque eleifend dui ac neque consectetur, in sollicitudin elit consequat. Sed suscipit mauris nec leo tristique, id lacinia purus aliquam.
// Duis nisl metus, pellentesque nec egestas nec, finibus eu erat. Morbi mollis, dui in rutrum blandit, tellus mauris vestibulum eros, ac gravida orci augue eget mauris. Maecenas pharetra convallis est placerat lacinia. Curabitur ipsum metus, sagittis vitae efficitur congue, suscipit quis nunc. Integer convallis, nisl sed mattis consectetur, mi nunc rutrum purus, at bibendum quam mi nec elit. Aliquam vulputate posuere ipsum, quis condimentum tortor ultricies vitae. Nunc vitae justo id neque dictum vulputate quis nec enim. Ut a venenatis metus.
// Etiam ut mattis ligula. Vestibulum a nisl vel magna fermentum sodales et ac metus. Ut cursus libero tincidunt nisl imperdiet, vel vulputate tellus pulvinar. Donec ac nulla tempus, aliquam tellus vitae, ornare velit. Nam quis massa ac elit scelerisque finibus eu ac metus. Nullam faucibus nunc id interdum tincidunt. Maecenas ut neque a justo ultricies pretium. Integer efficitur sit amet est in mattis. Vivamus interdum erat in quam sodales sagittis. Sed laoreet urna at neque volutpat rutrum. Duis id ornare lectus. Praesent in felis vitae tortor viverra congue. Pellentesque commodo diam eu lorem dapibus, ac scelerisque turpis tristique.
// Duis justo sapien, auctor a ligula eget, iaculis pharetra nulla. In sed malesuada arcu. Quisque viverra tortor sed imperdiet euismod. Aliquam quis sem vitae metus consequat posuere id ornare elit. Donec porttitor nulla id euismod luctus. In euismod a quam a convallis. Vivamus sit amet vehicula sapien, nec vulputate ex. Fusce non enim a felis luctus mattis ac nec nulla.
// Praesent tortor risus, sagittis at aliquet vel, egestas a ligula. Aliquam euismod lobortis magna, a varius massa tincidunt et. Praesent et ultrices turpis, sed rhoncus quam. Praesent quis congue tortor, sed ultrices mi. Curabitur tincidunt placerat tincidunt. Sed non varius risus. Proin suscipit magna arcu, a congue augue tempor vel. Sed hendrerit nisi a tellus luctus, eu venenatis orci semper. Vestibulum a nulla semper, elementum elit at, consequat nisl. Mauris ipsum mauris, ultrices nec ante et, elementum rhoncus diam. Mauris nisl arcu, maximus at ultricies at, convallis nec justo. Integer congue placerat sem, id ultrices odio porttitor consequat. Vestibulum porttitor tincidunt justo, vel sodales dui imperdiet ut. Mauris eget accumsan sapien, et viverra ante. Donec et turpis et neque euismod sollicitudin. Donec sit amet vulputate felis.`;

import { ref } from 'vue';
export const randomStrlist = ref([
    {
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla a justo vel velit efficitur ullamcorper non ut augue. Nunc ultrices massa nulla, non rutrum justo accumsan eget. Aenean volutpat pharetra dolor, in mollis felis consectetur faucibus. Vestibulum varius ligula et tempor varius. Suspendisse et neque vitae est porttitor malesuada sit amet consectetur quam. Nam vestibulum vestibulum ante sit amet bibendum. Integer vel porta massa, ac suscipit velit. In auctor ex eu tristique dignissim. Praesent vitae faucibus eros, vel ultricies lectus. Integer at turpis ut ex ultrices tristique. Mauris venenatis imperdiet dignissim. Quisque eleifend dui ac neque consectetur, in sollicitudin elit consequat. Sed suscipit mauris nec leo tristique, id lacinia purus aliquam.',
        indent: true,
        wideGap: false,
        showbackground: true
    },
    {
        text: 'Duis nisl metus, pellentesque nec egestas nec, finibus eu erat. Morbi mollis, dui in rutrum blandit, tellus mauris vestibulum eros, ac gravida orci augue eget mauris. Maecenas pharetra convallis est placerat lacinia. Curabitur ipsum metus, sagittis vitae efficitur congue, suscipit quis nunc. Integer convallis, nisl sed mattis consectetur, mi nunc rutrum purus, at bibendum quam mi nec elit. Aliquam vulputate posuere ipsum, quis condimentum tortor ultricies vitae. Nunc vitae justo id neque dictum vulputate quis nec enim. Ut a venenatis metus.',
        indent: true,
        wideGap: false,
        showbackground: true
    },
    {
        text: 'Etiam ut mattis ligula. Vestibulum a nisl vel magna fermentum sodales et ac metus. Ut cursus libero tincidunt nisl imperdiet, vel vulputate tellus pulvinar. Donec ac nulla tempus, aliquam tellus vitae, ornare velit. Nam quis massa ac elit scelerisque finibus eu ac metus. Nullam faucibus nunc id interdum tincidunt. Maecenas ut neque a justo ultricies pretium. Integer efficitur sit amet est in mattis. Vivamus interdum erat in quam sodales sagittis. Sed laoreet urna at neque volutpat rutrum. Duis id ornare lectus. Praesent in felis vitae tortor viverra congue. Pellentesque commodo diam eu lorem dapibus, ac scelerisque turpis tristique.',
        indent: true,
        wideGap: false,
        showbackground: true
    },
    {
        text: 'Duis justo sapien, auctor a ligula eget, iaculis pharetra nulla. In sed malesuada arcu. Quisque viverra tortor sed imperdiet euismod. Aliquam quis sem vitae metus consequat posuere id ornare elit. Donec porttitor nulla id euismod luctus. In euismod a quam a convallis. Vivamus sit amet vehicula sapien, nec vulputate ex. Fusce non enim a felis luctus mattis ac nec nulla.',
        indent: true,
        wideGap: false,
        showbackground: true
    },
    {
        text: 'Praesent tortor risus, sagittis at aliquet vel, egestas a ligula. Aliquam euismod lobortis magna, a varius massa tincidunt et. Praesent et ultrices turpis, sed rhoncus quam. Praesent quis congue tortor, sed ultrices mi. Curabitur tincidunt placerat tincidunt. Sed non varius risus. Proin suscipit magna arcu, a congue augue tempor vel. Sed hendrerit nisi a tellus luctus, eu venenatis orci semper. Vestibulum a nulla semper, elementum elit at, consequat nisl. Mauris ipsum mauris, ultrices nec ante et, elementum rhoncus diam. Mauris nisl arcu, maximus at ultricies at, convallis nec justo. Integer congue placerat sem, id ultrices odio porttitor consequat. Vestibulum porttitor tincidunt justo, vel sodales dui imperdiet ut. Mauris eget accumsan sapien, et viverra ante. Donec et turpis et neque euismod sollicitudin. Donec sit amet vulputate felis.',
        indent: true,
        wideGap: false,
        showbackground: true
    }
])

// Lorem ipsum 句子池，用于随机拼接段落
export const sentencePool = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Nulla a justo vel velit efficitur ullamcorper non ut augue.',
    'Nunc ultrices massa nulla, non rutrum justo accumsan eget.',
    'Aenean volutpat pharetra dolor, in mollis felis consectetur faucibus.',
    'Vestibulum varius ligula et tempor varius.',
    'Suspendisse et neque vitae est porttitor malesuada sit amet consectetur quam.',
    'Nam vestibulum vestibulum ante sit amet bibendum.',
    'Integer vel porta massa, ac suscipit velit.',
    'In auctor ex eu tristique dignissim.',
    'Praesent vitae faucibus eros, vel ultricies lectus.',
    'Integer at turpis ut ex ultrices tristique.',
    'Mauris venenatis imperdiet dignissim.',
    'Quisque eleifend dui ac neque consectetur, in sollicitudin elit consequat.',
    'Sed suscipit mauris nec leo tristique, id lacinia purus aliquam.',
    'Duis nisl metus, pellentesque nec egestas nec, finibus eu erat.',
    'Morbi mollis, dui in rutrum blandit, tellus mauris vestibulum eros.',
    'Ac gravida orci augue eget mauris. Maecenas pharetra convallis est placerat lacinia.',
    'Curabitur ipsum metus, sagittis vitae efficitur congue, suscipit quis nunc.',
    'Integer convallis, nisl sed mattis consectetur, mi nunc rutrum purus.',
    'At bibendum quam mi nec elit. Aliquam vulputate posuere ipsum.',
    'Quis condimentum tortor ultricies vitae. Nunc vitae justo id neque dictum vulputate quis nec enim.',
    'Ut a venenatis metus. Etiam ut mattis ligula.',
    'Vestibulum a nisl vel magna fermentum sodales et ac metus.',
    'Ut cursus libero tincidunt nisl imperdiet, vel vulputate tellus pulvinar.',
    'Donec ac nulla tempus, aliquam tellus vitae, ornare velit.',
    'Nam quis massa ac elit scelerisque finibus eu ac metus.',
    'Nullam faucibus nunc id interdum tincidunt.',
    'Maecenas ut neque a justo ultricies pretium.',
    'Integer efficitur sit amet est in mattis.',
    'Vivamus interdum erat in quam sodales sagittis.',
    'Sed laoreet urna at neque volutpat rutrum. Duis id ornare lectus.',
    'Praesent in felis vitae tortor viverra congue.',
    'Pellentesque commodo diam eu lorem dapibus, ac scelerisque turpis tristique.',
    'Duis justo sapien, auctor a ligula eget, iaculis pharetra nulla.',
    'In sed malesuada arcu. Quisque viverra tortor sed imperdiet euismod.',
    'Aliquam quis sem vitae metus consequat posuere id ornare elit.',
    'Donec porttitor nulla id euismod luctus. In euismod a quam a convallis.',
    'Vivamus sit amet vehicula sapien, nec vulputate ex.',
    'Fusce non enim a felis luctus mattis ac nec nulla.',
    'Praesent tortor risus, sagittis at aliquet vel, egestas a ligula.',
    'Aliquam euismod lobortis magna, a varius massa tincidunt et.',
    'Praesent et ultrices turpis, sed rhoncus quam.',
    'Praesent quis congue tortor, sed ultrices mi.',
    'Curabitur tincidunt placerat tincidunt. Sed non varius risus.',
    'Proin suscipit magna arcu, a congue augue tempor vel.',
    'Sed hendrerit nisi a tellus luctus, eu venenatis orci semper.',
    'Vestibulum a nulla semper, elementum elit at, consequat nisl.',
    'Mauris ipsum mauris, ultrices nec ante et, elementum rhoncus diam.',
    'Mauris nisl arcu, maximus at ultricies at, convallis nec justo.',
    'Integer congue placerat sem, id ultrices odio porttitor consequat.',
]

// 中文句子池，用于随机拼接段落
export const cnSentencePool = [
    '人生若只如初见，何事秋风悲画扇。',
    '等闲变却故人心，却道故人心易变。',
    '骊山语罢清宵半，泪雨霖铃终不怨。',
    '何如薄幸锦衣郎，比翼连枝当日愿。',
    '明月几时有，把酒问青天。',
    '不知天上宫阙，今夕是何年。',
    '我欲乘风归去，又恐琼楼玉宇，高处不胜寒。',
    '起舞弄清影，何似在人间。',
    '转朱阁，低绮户，照无眠。',
    '不应有恨，何事长向别时圆。',
    '人有悲欢离合，月有阴晴圆缺，此事古难全。',
    '但愿人长久，千里共婵娟。',
    '大江东去，浪淘尽，千古风流人物。',
    '故垒西边，人道是，三国周郎赤壁。',
    '乱石穿空，惊涛拍岸，卷起千堆雪。',
    '江山如画，一时多少豪杰。',
    '遥想公瑾当年，小乔初嫁了，雄姿英发。',
    '羽扇纶巾，谈笑间，樯橹灰飞烟灭。',
    '故国神游，多情应笑我，早生华发。',
    '人生如梦，一尊还酹江月。',
    '寻寻觅觅，冷冷清清，凄凄惨惨戚戚。',
    '乍暖还寒时候，最难将息。',
    '三杯两盏淡酒，怎敌他、晚来风急。',
    '雁过也，正伤心，却是旧时相识。',
    '满地黄花堆积，憔悴损，如今有谁堪摘。',
    '守着窗儿，独自怎生得黑。',
    '梧桐更兼细雨，到黄昏、点点滴滴。',
    '这次第，怎一个愁字了得。',
    '北国风光，千里冰封，万里雪飘。',
    '望长城内外，惟余莽莽；大河上下，顿失滔滔。',
    '山舞银蛇，原驰蜡象，欲与天公试比高。',
    '须晴日，看红装素裹，分外妖娆。',
    '江山如此多娇，引无数英雄竞折腰。',
    '惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。',
    '一代天骄，成吉思汗，只识弯弓射大雕。',
    '俱往矣，数风流人物，还看今朝。',
    '枯藤老树昏鸦，小桥流水人家，古道西风瘦马。',
    '夕阳西下，断肠人在天涯。',
    '落霞与孤鹜齐飞，秋水共长天一色。',
    '渔舟唱晚，响穷彭蠡之滨；雁阵惊寒，声断衡阳之浦。',
    '关山难越，谁悲失路之人；萍水相逢，尽是他乡之客。',
    '老当益壮，宁移白首之心；穷且益坚，不坠青云之志。',
    '先天下之忧而忧，后天下之乐而乐。',
    '不以物喜，不以己悲。',
    '居庙堂之高则忧其民，处江湖之远则忧其君。',
    '醉翁之意不在酒，在乎山水之间也。',
    '山水之乐，得之心而寓之酒也。',
    '野芳发而幽香，佳木秀而繁阴。',
    '风霜高洁，水落而石出者，山间之四时也。',
    '日出而林霏开，云归而岩穴暝。',
]

// 混合句子池（中英合并）
export const mixedSentencePool = [...sentencePool, ...cnSentencePool]