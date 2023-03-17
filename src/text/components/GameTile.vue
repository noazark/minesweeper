<template>
  <div
    :class="['tile', {
      [`val-${bombCount}`]: !isMasked,
      bomb: isBomb,
      masked: isMasked,
      unmasked: !isMasked,
      flagged: isFlagged,
      active: isActive,
      preview: isPreview,
    }]"
  >
    {{ display }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  "isBomb": { type: Boolean },
  "isMasked": { type: Boolean },
  "isFlagged": { type: Boolean },
  "bombCount": { type: Number, required: true },
  "isActive": { type: Boolean },
  "isPreview": { type: Boolean },
})

const display = computed(() => {
  if (props.isFlagged) {
    return "x";
  } else if (props.isMasked) {
    return "o";
  } else if (props.isBomb) {
    return "*";
  } else {
    if (props.bombCount > 0) {
      return props.bombCount;
    } else if (props.isActive) {
      return "#";
    } else {
      return ".";
    }
  }
})
</script>

<style lang="scss" scoped>
.tile {
  display: inline;
  border-bottom: 2px solid transparent;
  text-align: center;
}

.unmasked {
  @for $i from 0 through 8 {
    &.val-#{$i} {
      color: darken(#fbfbfb, 10 + $i * 10);
    }
  }

  &.bomb {
    color: red;
  }
}

.flagged {
  color: blue;
}

.masked.active,
.unmasked.active {
  color: rgb(83, 233, 52);
}

.preview {
  border-bottom-color: #454545;
}
</style>
