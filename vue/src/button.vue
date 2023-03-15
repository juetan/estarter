<template>
  <div>
    <img src="./image.png" alt="">
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

const unuse = 'unuse';
</script>

<style lang="scss" scoped>
.btn {
  color: #09f;
}
</style>
