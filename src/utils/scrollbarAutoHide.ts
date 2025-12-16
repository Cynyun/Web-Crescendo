export function enableScrollbarAutoHide(delay = 1500) {
    let hideTimer: number | null = null;

    const showScrollbar = () => {
        document.documentElement.classList.remove('hide-scrollbar');
        if (hideTimer !== null) {
            clearTimeout(hideTimer);
        }
    };

    const scheduleHideScrollbar = () => {
        hideTimer = window.setTimeout(() => {
            document.documentElement.classList.add('hide-scrollbar');
        }, delay);
    };

    // 监听滚动
    window.addEventListener('scroll', () => {
        showScrollbar();
        scheduleHideScrollbar();
    });

    // 可选：鼠标进入/离开页面时显示/隐藏
    document.documentElement.addEventListener('mouseenter', showScrollbar);
    document.documentElement.addEventListener('mouseleave', scheduleHideScrollbar);

    // 初始状态：显示滚动条
    showScrollbar();
}