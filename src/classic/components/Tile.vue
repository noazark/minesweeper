<template>
  <div
    class="tile"
    :class="{
      [`val-${bombCount}`]: !isMasked,
      debug: debug && !isMasked,
      bomb: isBomb,
      masked: isMasked && !debug,
      unmasked: !isMasked || debug,
      flagged: isFlagged
    }"
    @contextmenu.stop.prevent=""
    @mouseup="unmask($event)"
    @mousedown="track($event)">
    <template v-if="debug || !isMasked && !isBomb && bombCount">
      {{bombCount}}
    </template>
  </div>
</template>

<script>
export default {
  props: ['isBomb', 'isMasked', 'isFlagged', 'bombCount'],

  data() {
    return {
      debug: false
    }
  },

  methods: {
    track($event) {
      $event.preventDefault()
      $event.stopPropagation()
      this.evt = $event
    },

    unmask($event) {
      $event.preventDefault()
      $event.stopPropagation()

      // safely handle when the event has been cleaned up
      if (this.evt == null) {
        this.evt = $event
      }

      if (this.evt.buttons === 2) {
        this.$emit('flag')
      } else if (this.evt.buttons === (1|2) || this.evt.buttons === (1) && this.evt.metaKey) {
        this.$emit('unmaskAroundFlags')
      } else if(this.evt.buttons === (1)) {
        this.$emit('unmask')
      }

      this.evt = undefined
    },
  }
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
  height: 20px;
  justify-content: center;
  text-align: center;
  width: 20px;
  font-size:50%;
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
