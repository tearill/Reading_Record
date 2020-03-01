<template>
  <div>
    <slot :data="languages">
      <ul>
        <li v-for="(item, index) in languages" :key="index">{{item}}</li>
      </ul>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'Slot-scope2',
  data() {
    return {
      languages: ['JavaScript', 'Go', 'Python', 'Flutter']
    }
  }
};
</script>

<style>
</style>