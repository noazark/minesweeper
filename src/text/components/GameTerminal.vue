<template>
  <div>
    &gt;
    <input
      v-model="next"
      class="cli"
      placeholder="try, /howto"
      autofocus
      @keyup.up="historyNext"
      @keyup.down="historyPrev"
      @keyup.enter.prevent="submit(next)"
      @input.stop.prevent="emit('input', $event.target.value);"
    >
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from "vue"

const emit = defineEmits(['input', 'submit'])

const next = ref("")
const commands = ref<string[]>([])
const cursor = ref(0)
const mem = ref<string>("")

function reset() {
  const index = cursor.value;

  if (!mem.value == null) {
    mem.value = next.value;
  }

  next.value = commands.value[index];

  if (next.value == null) {
    next.value = mem.value;
  }
}

function historyPrev() {
  const prev = cursor.value + 1;
  if (prev > commands.value.length - 1) {
    cursor.value = commands.value.length;
  } else {
    cursor.value = prev;
  }

  reset();
}

function historyNext() {
  const next = cursor.value - 1;
  if (next < 0) {
    cursor.value = 0;
  } else {
    cursor.value = next;
  }

  reset();
}

function submit(val: string) {
  commands.value.push(val);
  cursor.value = commands.value.length;
  next.value = "";
  emit("submit", val);
}
</script>

<style lang="css">
.cli {
  border: none;
  outline: none;
  font-family: monospace;
  letter-spacing: .1rem;
  font-size: 1.2rem;
  width: 90%
}
</style>
