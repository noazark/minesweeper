<template>
  <pre
    class="tile"
    :class="{
      [`val-${bombCount}`]: !isMasked,
      bomb: isBomb,
      masked: isMasked,
      unmasked: !isMasked,
      flagged: isFlagged,
      active: isActive
    }" v-html="display">
  </pre>
</template>

<script>
export default {
  props: ['isBomb', 'isMasked', 'isFlagged', 'bombCount', 'isActive'],

  computed: {
    display() {
      if (this.isFlagged) {
        return 'x'
      } else if (this.isMasked) {
        return 'o'
      } else if (this.isBomb) {
        return '*'
      } else {
        if (this.bombCount > 0) {
          return this.bombCount
        } else if (this.isActive) {
          return '#'
        } else {
          return '.'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tile {
  display: inline;
}

.unmasked {
  @for $i from 0 through 8 {
    &.val-#{$i} {
      color: darken(#fbfbfb, 10 + $i * 10);
    }
  }

  &.bomb {
    color: red
  }
}

.flagged {
  color: blue
}

.masked.active,
.unmasked.active {
  color: rgb(83, 233, 52)
}
</style>
