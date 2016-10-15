<template>
  <div :data-moves="moves">
    <template v-for="(row, r) in matrix">
      <div class="row">
        <div class="col" v-for="(el, c) in row">
          <tile :isBomb="el.isBomb"
                :isMasked="el.isMasked"
                :isFlagged="el.isFlagged"
                :bombCount="countBombs(matrix, r, c)"
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
import {countBombs, unmask, unmaskAroundFlags, initializeMap, isMasked, toggleFlag} from './gameplay';
import Tile from './components/Tile.vue'

export default {
  components: {
    Tile
  },

  data() {
    return {
      gameSize: [10, 10],
      bombCount: 10,
      matrix: [],
      moves: 0
    }
  },

  created() {
    this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
  },

  methods: {
    countBombs,

    flag(r, c) {
      toggleFlag(this.matrix, r, c)
    },

    unmaskAroundFlags(r, c) {
      const unmasked = unmaskAroundFlags(this.matrix, r, c)
      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)
    },

    unmask(r, c, $event) {
      const unmasked = unmask(this.matrix, r, c)
      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)
    },
  }
}
</script>

<style lang="scss" scoped>
body {
  font-family: -apple-system, sans-serif;
  background: white;
}

.col {
  display: inline-block;
  vertical-align: middle;
}
</style>
