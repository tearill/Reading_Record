<template>
  <div>
      <h1 v-color>自定义指令</h1>
      <input type="text" v-focus v-color="'green'">
      <div class="drag" v-drag>这个div可以拖拽</div>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    directives: {
        focus: {
            inserted: (el) => {
                el.focus();
            }
        },
        // 自定义指令设置字体颜色
        color: {
            bind: (el, binding) => { // 通过 binding 拿到传递的参数
                el.style.color = binding.value || 'red';
                // console.log(binding);
            }
        },
        drag: { // 拖拽
            inserted: (el) => {
                const fnDown = (ev) => {
                    // console.log(ev);
                    let currentX = el.offsetLeft;
                    let currentY = el.offsetTop;

                    let downX = ev.clientX;
                    let downY = ev.clientY;

                    const fnMove = (ev) => {
                        let left = ev.clientX- downX + currentX;
                        let top = ev.clientY- downY + currentY;

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

                el.addEventListener('mousedown', fnDown, false);

            }
        }
    }
}
</script>

<style lang="less">
.drag {
    position: absolute;
    width: 400px;
    height: 300px;
    background-color: red;
    margin-top: 20px;
}
</style>