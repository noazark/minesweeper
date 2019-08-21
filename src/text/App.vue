<template>
  <div class="txt-app">
    <code class="map">
      <template v-for="(el, i) in toArray(matrix)" >
        <tile
          :key="i"
          :isBomb="isBomb(el)"
          :isMasked="isMasked(el)"
          :isFlagged="isFlagged(el)"
          :bombCount="neighboringBombs(matrix, indexToPoint(matrix, i))"
          :isActive="(cursor.r == indexToPoint(matrix, i).r && cursor.c == indexToPoint(matrix, i).c)"
          :isPreview="(preview.r == indexToPoint(matrix, i).r && preview.c == indexToPoint(matrix, i).c)"></tile>
      </template>
    </code>

    <p>
      <terminal @input="this.playPreview" @submit="this.play"></terminal>
    </p>

    <code class="history">
      <pre v-html="output"></pre>
    </code>
  </div>
</template>

<script>
import {
  toggle,
  toArray,
  indexToPoint,
  countFlags,
  findBombs,
  initializeMap,
  isComplete,
  isPlayable,
  isCell,
  neighboringBombs,
  safeGet,
  toggleFlag,
  unmask,
  unmaskAroundFlags,
  validFirstPlay,
  PROPS
} from '../../lib/gameplay';
import Terminal from './components/Terminal.vue'
import Tile from './components/Tile.vue'
import {times} from 'lodash'
import {stripIndent} from 'common-tags'

export default {
  components: {
    Terminal,
    Tile
  },

  data() {
    return {
      cursor: {r: 0, c: 0},
      preview: {r: 0, c: 0},
      gameSize: [128, 64],
      bombCount: 1024,
      matrix: {},
      playing: true,
      score: 0,
      output: '',
      commands: [
        [/^m(?:ove)?\s*?(u(?:p)?|d(?:own)?|l(?:eft)?|r(?:ight)?)(?:\s*(\d+))?/i, 'move', 'move right 5'],
        [/^f(?:lag)?\s*?(u(?:p)?|d(?:own)?|l(?:eft)?|r(?:ight)?)(?:\s*(\d+))?/i, 'flag', 'flag down'],
        [/^s(weep)?/i, 'sweep', 'sweep'],
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
    score: {
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
          unmasked.forEach((p) => this.doUnmask(p))
        }
      },
      deep: true
    }
  },

  methods: {
    toArray,
    indexToPoint,
    neighboringBombs,

    isBomb(tile) {
      return isCell(PROPS.BOMB, tile)
    },

    isMasked(tile) {
      return isCell(PROPS.MASK, tile)
    },

    isFlagged(tile) {
      return isCell(PROPS.FLAG, tile)
    },

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

      this.cursor = {r: 0, c: 0}

      do {
        this.matrix = initializeMap(this.gameSize[0], this.gameSize[1], this.bombCount)
      } while (!validFirstPlay(this.matrix, this.cursor))

      const unmasked = unmask(this.matrix, this.cursor)
      unmasked.forEach((p) => this.doUnmask(p))

      this.score = 0
      this.playing = false
    },

    stop() {
      this.playing = false
    },

    play(val) {
      const isSlashCommand = val[0] === '/'

      this.preview = {r: null, c: null}

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

    playPreview(val) {
      const validCommand = this.commands.some((command) => {
        const [trigger, func] = command
        const funcPreview = func + 'Preview'
        const match = val.match(trigger)

        if (match && this.hasOwnProperty(funcPreview)) {
          this.output = this[funcPreview](...match)
        }

        return match
      })

      if (!validCommand) {
        this.preview = {r: null, c: null}
      }
    },

    move (cmd, dir, step=1) {
      step = parseInt(step)

      const moves = times(step, () => {
        let {r, c} = this.cursor

        if (dir === 'up' || dir === 'u') r -= 1
        if (dir === 'down' || dir === 'd') r += 1
        if (dir === 'left' || dir === 'l') c -= 1
        if (dir === 'right' || dir === 'r') c += 1

        if (safeGet(this.matrix, {r, c})) {
          this.cursor = {r, c}
          const unmasked = unmask(this.matrix, {r, c}).filter(this.doUnmask)
          return unmasked.length
        }
      })

      return `${moves.reduce((m, c) => m + c)} cleared`
    },

    cmdPreview(cmd, dir, step=1) {
      step = parseInt(step)
      let {r, c} = this.cursor

      if (dir === 'up' || dir === 'u') r -= step
      if (dir === 'down' || dir === 'd') r += step
      if (dir === 'left' || dir === 'l') c -= step
      if (dir === 'right' || dir === 'r') c += step

      if (safeGet(this.matrix, {r, c})) {
        this.preview = {r, c}
      } else {
        this.preview = {r: null, c: null}
      }
    },

    movePreview(...args) {
      this.cmdPreview(...args)
    },

    flagPreview(...args) {
      this.cmdPreview(...args)
    },

    flag (cmd, dir, step=1) {
      step = parseInt(step)
      let {r, c} = this.cursor

      if (dir === 'up' || dir === 'u') r -= step
      if (dir === 'down' || dir === 'd') r += step
      if (dir === 'left' || dir === 'l') c -= step
      if (dir === 'right' || dir === 'r') c += step

      if (safeGet(this.matrix, {r, c})) {
        return toggleFlag(this.matrix, {r, c}) ? 'OK' : 'Flag removed'
      }
    },

    showScore() {
      return `${this.score} (lower is better)`
    },

    showFlagCount() {
      return `${countFlags(this.matrix)} of ${this.bombCount}`
    },

    sweep () {
      const unmasked = unmaskAroundFlags(this.matrix, this.cursor).filter(this.doUnmask)
      return `${unmasked.length} cleared`
    },

    help() {
      return this.commands.map((command) => command[2]).join('\r\n')
    },

    howto() {
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
      toggle(this.matrix, p, PROPS.MASK, false)
      return true
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
  // letter-spacing: .5rem;
  display: grid;
  grid-template-columns: repeat(128, 20px [col-start]);
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
