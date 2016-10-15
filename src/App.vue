<template>
  <div :data-moves="moves">
    <template v-for="(row, r) in matrix">
      <div class="row">
        <div class="col" v-for="(el, c) in row">
          <div :class="[
              'cell', `val-${el.bombCount}`,
              {
                bomb: el.isBomb,
                masked: el.isMasked,
                unmasked: !el.isMasked,
                flagged: el.isFlagged
              }
            ]"
            @contextmenu.stop.prevent=""
            @mouseup="unmask(r,c,$event)"
            @mousedown="track($event)">
            <template v-if="!el.isMasked && !el.isBomb && el.bombCount">
              {{el.bombCount}}
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {unmask, unmaskAroundFlags, initializeMap, isMasked, toggleFlag} from './gameplay';

export default {
  data() {
    return {
      gameSize: [16, 30],
      bombCount: 99,
      matrix: [],
      moves: 0
    }
  },

  created() {
    this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
  },

  methods: {
  	track($event) {
      $event.preventDefault()
      $event.stopPropagation()
    	this.evt = $event
    },

    unmask(r, c, $event) {
      $event.preventDefault()
      $event.stopPropagation()

      // safely handle when the event has been cleaned up
      if (this.evt == null) {
      	this.evt = $event
      }

      let unmasked = []

      if (this.evt.buttons === 2) {
        toggleFlag(this.matrix, r, c)
      } else if (!isMasked(this.matrix, r, c) && this.evt.buttons === (1|2)) {
        unmasked = unmasked.concat(unmaskAroundFlags(this.matrix, r, c))
      } else if(this.evt.buttons === (1)) {
        unmasked = unmask(this.matrix, r, c)
      }

      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)

      // increment moves, mostly as a hack because vue has trouble observing
      // multi-dimensional matrix array.
      this.moves++
      this.evt = undefined
    },
  }
}
</script>

<style lang="sass">
$bomb-background-color: red;
$flag-background-color: yellow;
$mask-background-color: black;
$tile-background-color: #fbfbfb;
$tile-hover-background-color: #455d71;
$tile-text-color: white;

body {
  font-family: -apple-system, sans-serif;
  background: white;
  font-size:50%;
}

.col {
  display: inline-block;
  vertical-align: middle;
}

.cell {
  background: $mask-background-color;
  display: flex;
  flex-direction: column;
  height: 20px;
  justify-content: center;
  text-align: center;
  width: 20px;
}

.masked:hover {
  background: $tile-hover-background-color;
}

.flagged, .flagged:hover {
  background: $flag-background-color;
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
</style>
