<template>
  <div>
    <timer :time="time"></timer>
    <template v-for="(row, r) in matrix">
      <div class="row">
        <div class="col" v-for="(el, c) in row">
          <tile
            :isBomb="el.isBomb"
            :isMasked="el.isMasked"
            :isFlagged="el.isFlagged"
            :bombCount="neighboringBombs(matrix, r, c)"
            @flag="flag(r, c)"
            @unmaskAroundFlags="unmaskAroundFlags(r, c)"
            @unmask="unmask(r, c)">
          </tile>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import {neighboringBombs, isBomb, unmask, unmaskAroundFlags, initializeMap, isMasked, toggleFlag} from './gameplay';
import Tile from './components/Tile.vue'
import Timer from './components/Timer.vue'

export default {
  components: {
    Tile,
    Timer
  },

  data() {
    return {
      gameSize: [16, 30],
      bombCount: 99,
      matrix: [],
      startedAt: 0,
      time: 0,
    }
  },

  mounted() {
    this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
  },

  watch: {
    startedAt() {
      const setTimer = () => {
        window.requestIdleCallback(() => {
          this.time = Date.now() - this.startedAt
          setTimer()
        })
      }

      setTimer()
    }
  },

  methods: {
    neighboringBombs,

    start(r, c) {
      while (neighboringBombs(this.matrix, r, c) > 0 || isBomb(this.matrix, r, c)) {
        this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
      }

      this.startedAt = Date.now()
    },

    flag(r, c) {
      if (!this.startedAt) this.start(r, c)
      toggleFlag(this.matrix, r, c)
    },

    unmaskAroundFlags(r, c) {
      const unmasked = unmaskAroundFlags(this.matrix, r, c)
      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)
    },

    unmask(r, c, $event) {
      if (!this.startedAt) this.start(r, c)
      const unmasked = unmask(this.matrix, r, c)
      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)
    },
  }
}
</script>

<style>
body {
  font-family: -apple-system, sans-serif;
  background: white;
  text-align: center;
}

.col {
  display: inline-block;
  vertical-align: middle;
}
</style>
