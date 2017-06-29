<template>
  <div class="txt-app">
    <code class="map">
      <template v-for="(row, r) in matrix">
        <template v-for="(col, c) in row">
          <tile
          :isBomb="col.isBomb"
          :isMasked="col.isMasked"
          :isFlagged="col.isFlagged"
          :bombCount="neighboringBombs(matrix, r, c)"
          :isHere="(cursor[0] == r && cursor[1] == c)"></tile>
        </template><br>
      </template>
    </code>

    <p>
      <terminal @submit="this.play"></terminal>
    </p>

    <code class="history">
      <pre v-html="output"></pre>
    </code>
  </div>
</template>

<script>
import {
  countFlags,
  findBombs,
  initializeMap,
  isComplete,
  isPlayable,
  neighboringBombs,
  safeGet,
  toggleFlag,
  unmask,
  unmaskAroundFlags,
  validFirstPlay,
} from '../../lib/gameplay'
import countBy from 'lodash/countBy'
import reverse from 'lodash/reverse'
import Terminal from './components/Terminal.vue'
import Tile from './components/Tile.vue'
import times from 'lodash/times'
import take from 'lodash/take'
import stripIndent from 'common-tags/lib/stripIndent'

export default {
  components: {
    Terminal,
    Tile
  },

  data() {
    return {
      cursor: [],
      gameSize: [30, 16],
      bombCount: 99,
      matrix: [],
      playing: true,
      score: 0,
      output: '',
      commands: [
        [/^move (up|down|left|right)(?: (\d+))?/i, 'move', 'move right 5'],
        [/^flag (up|down|left|right)/i, 'flag', 'flag down'],
        [/^sweep/i, 'sweep', 'sweep'],
        [/^\/reset(?: (\d+) (\d+) (\d+))?$/, 'restart', '/reset 10 10 10'],
        [/^\/score/, 'showScore', '/score'],
        [/^\/flags/, 'showFlagCount', '/flags'],
        [/^\/clear/, 'clear', '/clear'],
        [/^\/help/, 'help', '/help'],
        [/^\/howto/, 'howto', '/howto']
      ]
    }
  },

  mounted() {
    this.restart()
  },

  watch: {
    matrix: {
      handler() {
        if (isComplete(this.matrix)) {
          this.output = 'you win!\n\n/reset to play again'
        } else if (!isPlayable(this.matrix)) {
          this.output = 'game over\n\n/reset to play again'
        }

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

  methods: {
    neighboringBombs,

    start() {
      this.playing = true
    },

    restart(cmd, width, height, bombCount) {
      if (width) {
        this.gameSize[0] = parseInt(width)
      }

      if (height) {
        this.gameSize[1] = parseInt(height)
      }

      if (bombCount) {
        this.bombCount = parseInt(bombCount)
      }

      const [r, c] = this.cursor = [0, 0]

      do {
        this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
      } while (!validFirstPlay(this.matrix, r, c))

      const unmasked = unmask(this.matrix, r, c)
      unmasked.forEach((p) => this.matrix[p.r][p.c].isMasked = false)

      this.score = 0
      this.playing = false
    },

    stop() {
      this.playing = false
    },

    play(val) {
      const isSlashCommand = val[0] === '/'

      if (!isSlashCommand) {
        if (isComplete(this.matrix) || !isPlayable(this.matrix)) {
          this.output = 'game is over, please \'/reset\''
          return
        }
        if (!this.playing) this.start()
      }

      const validCommand = this.commands.some((command) => {
        const [trigger, func] = command
        const match = val.match(trigger)

        if (match) {
          this.output = this[func](...match)

          if (!isSlashCommand) this.score++
        }

        return match
      })

      if (!validCommand) {
        this.output = 'unknown command'
      }

    },

    move (cmd, dir, step=1) {
      step = parseInt(step)

      const moves = times(step, () => {
        let [r, c] = this.cursor

        if (dir === 'up') r -= 1
        if (dir === 'down') r += 1
        if (dir === 'left') c -= 1
        if (dir === 'right') c += 1

        if (safeGet(this.matrix, r, c)) {
          this.cursor = [r, c]
          const unmasked = unmask(this.matrix, r, c).filter(this.doUnmask)
          return unmasked.length
        }
      })

      return `${moves.reduce((m, c) => m + c)} cleared`
    },

    flag (cmd, dir) {
      let [r, c] = this.cursor

      if (dir === 'up') r -= 1
      if (dir === 'down') r += 1
      if (dir === 'left') c -= 1
      if (dir === 'right') c += 1

      if (safeGet(this.matrix, r, c)) {
        return toggleFlag(this.matrix, r, c) ? 'OK' : 'Flag removed'
      }
    },

    showScore() {
      return `${this.score} (lower is better)`
    },

    showFlagCount() {
      return `${countFlags(this.matrix)} of ${this.bombCount}`
    },

    sweep () {
      let [r, c] = this.cursor

      const unmasked = unmaskAroundFlags(this.matrix, r, c).filter(this.doUnmask)
      return `${unmasked.length} cleared`
    },

    help() {
      return this.commands.map((command) => command[2]).join('\r\n')
    },

    howto() {
      function trimLead() {

      }

      return stripIndent`
        Welcome!

        This game is not timed, so have fun and explore. The goal is to
        uncover all the bombs, "*", hidden underneith the masked tiles, "o".

        There are currently ${this.bombCount} bombs randomly placed underneith ${this.gameSize[0] * this.gameSize[1]}
        tiles. You are welcome to change the size of the game by typing something like:

          /reset 15 10 20

        This will make the game 15 tiles wide, 10 tiles tall and have 20 hidden bombs.
        You are scored by the number of moves it takes to unmask all the bombs. Lower
        score is better! Now it's time to get started. Type '/help' for a list of
        commands, explore them and have fun!

        Oh... and if you think this game sounds a lot like another game you've played
        before, you are correct.`
    },

    clear() {
      return ''
    },

    doUnmask (p) {
      const tile = this.matrix[p.r][p.c]
      if (tile.isMasked) {
        tile.isMasked = false
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.txt-app {
  font-family: monospace;
  background: white;
  color: #454545;
  font-size: 1.5rem;
}

.map {
  letter-spacing: .5rem;
}

.history {
  font-size: 1rem;
  line-height: 1.5;
  color: #aaa;

  pre {
    margin: .2rem 0 .3rem;
  }
}
</style>
