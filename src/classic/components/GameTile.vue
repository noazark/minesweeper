<template>
  <div
    :class="[
      'tile',
      {
        [`val-${props.bombCount}`]: !props.isMasked,
        debug: debug && !props.isMasked,
        bomb: props.isBomb,
        masked: props.isMasked && !debug,
        unmasked: !props.isMasked || debug,
        flagged: props.isFlagged,
      }]"
    @contextmenu.stop.prevent=""
    @mouseup="unmask($event)"
    @mousedown="track($event)"
  >
    <template v-if="debug || (!props.isMasked && !props.isBomb && props.bombCount)">
      {{ props.bombCount }}
    </template>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref } from 'vue';

const emit = defineEmits(["flag", "unmaskAroundFlags", "unmask"])
const props = defineProps({
  "isBomb": { type: Boolean },
  "isMasked": { type: Boolean },
  "isFlagged": { type: Boolean },
  "bombCount": { type: Boolean }
})
const debug = false

const evt = ref<MouseEvent>()

function track($event: MouseEvent) {
  $event.preventDefault();
  $event.stopPropagation();
  evt.value = $event;
}

function unmask($event: MouseEvent) {
  $event.preventDefault();
  $event.stopPropagation();

  // safely handle when the event has been cleaned up
  if (evt.value == null) {
    evt.value = $event;
  }

  if (evt.value.buttons === 2) {
    emit("flag");
  } else if (
    evt.value.buttons === (1 | 2) ||
    (evt.value.buttons === 1 && evt.value.metaKey)
  ) {
    emit("unmaskAroundFlags");
  } else if (evt.value.buttons === 1) {
    emit("unmask");
  }

  evt.value = undefined;
}
</script>

<style lang="scss" scoped>
$bomb-background-color: red;
$flag-background-color: yellow;
$mask-background-color: black;
$tile-background-color: #fbfbfb;
$tile-hover-background-color: #455d71;
$tile-text-color: white;

.debug {
  text-decoration: underline;
}

.tile {
  cursor: pointer;
  background: $mask-background-color;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 1.5rem;
  width: 1.5rem;
  font-size: 70%;
}

.masked:hover {
  background: $tile-hover-background-color;
}

.unmasked {
  background: #fbfbfb;

  @for $i from 1 through 8 {
    &.val-#{$i} {
      background: darken($tile-background-color, 10 + $i * 10);
      color: $tile-text-color;
    }
  }

  &.bomb {
    background: $bomb-background-color;
    color: white;
  }
}

.flagged,
.flagged:hover {
  background: $flag-background-color;
}
</style>
