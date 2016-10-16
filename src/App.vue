<template lang="html">
  <div :is="gameMode"></div>
</template>

<script>
import Classic from './classic/App.vue'

export default {
  components: {
    Classic
  },

  data() {
    return {
      gameMode: 'classic'
    }
  }
}
</script>

<style lang="css">
</style>
