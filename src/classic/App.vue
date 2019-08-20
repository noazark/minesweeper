<template>
  <div class="classic-app">
    <span class='right'>{{flagCount}}</span>
    :
    <timer class="left" :time="time"></timer>
    :
    <a href="" @click.prevent="restart">restart</a>
    <template v-for="(row, r) in matrix">
      <div class="row" :key="r">
        <div class="col" v-for="(el, c) in row" :key="c">
          <tile
            :isBomb="isTile('isBomb', el)"
            :isMasked="isTile('isMasked', el)"
            :isFlagged="isTile('isFlagged', el)"
            :bombCount="neighboringBombs(matrix, {r, c})"
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
import {
  countFlags,
  findBombs,
  initializeMap,
  isComplete,
  isPlayable,
  isTile,
  neighboringBombs,
  toggleFlag,
  unmask,
  unmaskAroundFlags,
  validFirstPlay,
} from '../../lib/gameplay';
import Tile from './components/Tile.vue'
import Timer from './components/Timer.vue'

export default {
  components: {
    Tile,
    Timer
  },

  data() {
    return {
      gameSize: [30, 16],
      bombCount: 99,
      matrix: [],
      playing: true,
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
          if (this.playing) {
            this.time = Date.now() - this.startedAt
            setTimer()
          }
        })
      }

      setTimer()
    },

    matrix: {
      handler() {
        if (this.playing && isComplete(this.matrix) || !isPlayable(this.matrix)) {
          this.stop()
        }


        if (!isComplete(this.matrix) && !isPlayable(this.matrix)) {
          const unmasked = findBombs(this.matrix)
          unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)
        }
      },
      deep: true
    }
  },

  computed: {
    flagCount() {
      return this.bombCount - countFlags(this.matrix)
    }
  },

  methods: {
    neighboringBombs,
    isTile,

    start(r, c) {
      while (!validFirstPlay(this.matrix, r, c)) {
        this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
      }

      this.playing = true
      this.startedAt = Date.now()
    },

    restart() {
      this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
      this.playing = false
      this.startedAt = 0
      this.time = 0
    },

    stop() {
      this.playing = false
    },

    flag(r, c) {
      if (!isPlayable(this.matrix)) return
      if (!this.startedAt) this.start(r, c)
      toggleFlag(this.matrix, r, c)
    },

    unmaskAroundFlags(r, c) {
      if (!isPlayable(this.matrix)) return
      const unmasked = unmaskAroundFlags(this.matrix, r, c)
      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)
    },

    unmask(r, c) {
      if (!isPlayable(this.matrix)) return
      if (!this.startedAt) this.start(r, c)
      const unmasked = unmask(this.matrix, r, c)
      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)
    },
  }
}
</script>

<style lang="scss" scoped>
.classic-app {
  font-family: -apple-system, sans-serif;
  background: white;
  text-align: center;
}

.row {
  line-height: 0;
}

.col {
  display: inline-block;
  vertical-align: middle;
}
</style>
