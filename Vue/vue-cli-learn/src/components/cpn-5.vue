<template>
  <div>
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'cpn5',
  props: ['name'],
  methods: {
    showName() {
      console.log('Child Component Mounted')
      console.log(`Child Component: ${this.name}`)
    }
  }
}
</script>

<style>

</style>