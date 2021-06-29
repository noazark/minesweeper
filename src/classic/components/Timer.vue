<template lang="html">
  <span>
    {{ displayTime }}
  </span>
</template>

<script>
export default {
  props: ["time"],

  computed: {
    displayTime() {
      return (this.time / 1000).toFixed();
    },
  },
};
</script>
