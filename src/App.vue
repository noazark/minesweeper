<template lang="html">
  <div :is="gameMode"></div>
</template>

<script>
import Classic from './classic/App.vue'
import Txt from './text/App.vue'

export default {
  components: {
    Classic,
    Txt,
  },

  data() {
    return {
      gameMode: 'classic'
    }
  }
}
</script>
