<template lang="html">
  <div
    class="tile"
    :class="{
      [`val-${bombCount}`]: !isMasked,
      bomb: isBomb,
      masked: isMasked,
      unmasked: !isMasked,
      flagged: isFlagged,
      active: isActive,
      preview: isPreview,
    }"
    v-html="display"
  ></div>
</template>

<script>
export default {
  props: [
    "isBomb",
    "isMasked",
    "isFlagged",
    "bombCount",
    "isActive",
    "isPreview",
  ],

  computed: {
    display() {
      if (this.isFlagged) {
        return "x";
      } else if (this.isMasked) {
        return "o";
      } else if (this.isBomb) {
        return "*";
      } else {
        if (this.bombCount > 0) {
          return this.bombCount;
        } else if (this.isActive) {
          return "#";
        } else {
          return ".";
        }
      }
    },
  },
};
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
