<template>
  <span>
    {{ displayTime }}
  </span>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  time: { type: Number, default: 0 }
})

const displayTime = computed(() => {
  return (props.time / 1000).toFixed();
})
</script>
