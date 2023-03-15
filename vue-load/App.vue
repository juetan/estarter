<template>
  <div>
    <div class="title">header</div>
    <div class="content">message: {{ message1 }} {{ message2 }}</div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const message1 = ref('from script setup');
</script>

<script lang="ts">
export default {
  data() {
    return {
      message2: 'from script',
    };
  },
};
</script>

<style scoped>
.title {
  color: red;
}
.content {
  color: blue;
}
</style>
