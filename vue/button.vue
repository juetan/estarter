<template>
  <div>
    <button class="btn">{{ text }}</button>
  </div>
</template>

<script lang="ts" test="todo">
export default {
  methods: {
    click() {
      console.log('ok')
    }
  }
}
</script>

<script setup name="AButton" lang="ts">
const text = "按钮";
</script>

<style lang="scss" scoped>
.btn {
  color: #09f;
}
</style>
