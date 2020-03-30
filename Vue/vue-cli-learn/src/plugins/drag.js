const fnDown = (el, ev) => {
    // console.log(ev);
    let currentX = el.offsetLeft; // 需要移动元素的左边距
    let currentY = el.offsetTop; // 需要移动元素的上边距

    let downX = ev.clientX; // 鼠标按下位置 X 坐标
    let downY = ev.clientY; // 鼠标按下位置 Y 坐标

    const fnMove = (ev) => {
        // 鼠标移动时计算每次移动的距离，并改变拖拽元素的定位
        let left = ev.clientX - downX + currentX; // 拖动时鼠标的 clientX - 鼠标按下时的 clientX + 元素的初始 X
        let top = ev.clientY - downY + currentY; // 拖动时鼠标的 clienY - 鼠标按下时的 clientY + 元素的初始 Y
        el.style.cursor = 'move';
        el.style.userSelect = 'none'
        el.style.left = left + 'px';
        el.style.top = top + 'px';
    }

    const fnUp = (ev) => {
        document.removeEventListener('mousemove', fnMove, false);
        document.removeEventListener('mouseup', fnUp, false);
    }

    document.addEventListener('mousemove', fnMove, false);
    document.addEventListener('mouseup', fnUp, false);
}
// el.addEventListener('mousedown', fnDown, false);

export default (el) => {
    el.addEventListener('mousedown', fnDown.bind(null, el), false);
}