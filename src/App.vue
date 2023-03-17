<template>
  <component :is="gameMode" />
</template>

<script lang="ts" setup>
import { ref } from "vue";

// import GameMode from "./classic/App.vue";
import GameMode from "./text/App.vue";

const gameMode = ref(GameMode)
</script>
