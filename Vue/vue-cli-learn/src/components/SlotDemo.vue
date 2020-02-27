<template>
  <div>
    <h2 class="title">{{title}}</h2>
    <slot>默认</slot>
    <slot name="btns"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: 'SlotDemo',
  props: ['title']
}
</script>

<style>

</style>