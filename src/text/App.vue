<template>
  <div class="txt-app">
    <code
      class="map"
      :style="{ '--columns': gameSize[0] }"
    >
      <template
        v-for="(el, i) in times(matrix.size, Number)"
        :key="i"
      >
        <GameTile
          :is-bomb="isBomb(matrix, i)"
          :is-masked="isMasked(matrix, i)"
          :is-flagged="isFlagged(matrix, i)"
          :bomb-count="neighboringBombs(matrix, i)"
          :is-active="cursor === i"
          :is-preview="preview != null && preview === i.toString()"
        />
      </template>
    </code>

    <p>
      <GameTerminal
        @input="playPreview"
        @submit="play"
      />
    </p>

    <code class="history">
      <pre>{{ output }}</pre>
    </code>
  </div>
</template>

<script lang="ts">
import {
  Map,
  toggle,
  offsetToPoint,
  countFlags,
  findBombs,
  initializeMap,
  isComplete,
  isPlayable,
  isCell,
  isValidPoint,
  countNeighbors,
  toggleFlag,
  unmask,
  unmaskAroundFlags,
  validFirstPlay,
  PROPS,
  pointToOffset,
} from "../../lib/gameplay";
import GameTerminal from "./components/GameTerminal.vue";
import GameTile from "./components/GameTile.vue";
import { times } from "lodash";
import { stripIndent } from "common-tags";

export default {
  components: {
    GameTerminal,
    GameTile,
  },

  data() {
    return {
      cursor: 0,
      preview: null as string | null,
      gameSize: [10, 10],
      matrix: {} as Map,
      playing: true,
      score: 0,
      output: "",
      commands: [
        [
          /^m(?:ove)?\s*?(u(?:p)?|d(?:own)?|l(?:eft)?|r(?:ight)?)(?:\s*(\d+))?/i,
          "move",
          "move right 5",
        ],
        [
          /^f(?:lag)?\s*?(u(?:p)?|d(?:own)?|l(?:eft)?|r(?:ight)?)(?:\s*(\d+))?/i,
          "flag",
          "flag down",
        ],
        [/^s(weep)?/i, "sweep", "sweep"],
        [/^\/reset(?: (\d+) (\d+)(?: (\d+))?)?$/, "restart", "/reset 10 10 10"],
        [/^\/score/, "showScore", "/score"],
        [/^\/flags/, "showFlagCount", "/flags"],
        [/^\/clear/, "clear", "/clear"],
        [/^\/help/, "help", "/help"],
        [/^\/howto/, "howto", "/howto"],
      ],
    };
  },

  watch: {
    score: {
      handler() {
        if (isComplete(this.matrix)) {
          this.output = "you win!\n\n/reset to play again";
        } else if (!isPlayable(this.matrix)) {
          this.output = "game over\n\n/reset to play again";
        }

        if (
          (this.playing && isComplete(this.matrix)) ||
          !isPlayable(this.matrix)
        ) {
          this.stop();
        }

        if (!isComplete(this.matrix) && !isPlayable(this.matrix)) {
          const unmasked = findBombs(this.matrix);
          unmasked.forEach((offset) => this.doUnmask(offset));
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.restart();
  },

  methods: {
    times,
    offsetToPoint,

    neighboringBombs(map: Map, i: number) {
      return countNeighbors(map, i, PROPS.BOMB);
    },

    isBomb(map: Map, i: number) {
      return isCell(map, i, PROPS.BOMB);
    },

    isMasked(map: Map, i: number) {
      return isCell(map, i, PROPS.MASK);
    },

    isFlagged(map: Map, i: number) {
      return isCell(map, i, PROPS.FLAG);
    },

    start() {
      this.playing = true;
    },

    restart(cmd?: string, width?: string, height?: string, bombCount?: string) {
      let bc: number | undefined = undefined

      if (width) {
        this.gameSize[0] = parseInt(width);
      }

      if (height) {
        this.gameSize[1] = parseInt(height);
      }

      if (bombCount) {
        bc = parseInt(bombCount);
      }

      this.cursor = 0;

      do {
        this.matrix = initializeMap(
          this.gameSize[0],
          this.gameSize[1],
          bc
        );
      } while (!validFirstPlay(this.matrix, this.cursor));

      const unmasked = unmask(this.matrix, this.cursor);
      unmasked.forEach((p) => this.doUnmask(p));

      this.score = 0;
      this.playing = false;
    },

    stop() {
      this.playing = false;
    },

    play(val: string) {
      const isSlashCommand = val[0] === "/";

      this.preview = null;

      if (!isSlashCommand) {
        if (isComplete(this.matrix) || !isPlayable(this.matrix)) {
          this.output = "game is over, please '/reset'";
          return;
        }
        if (!this.playing) this.start();
      }

      const validCommand = this.commands.some((command) => {
        const [trigger, func] = command;
        const match = val.match(trigger);

        if (match) {
          this.output = this[func](...match);

          if (!isSlashCommand) this.score++;
        }

        return match;
      });

      if (!validCommand) {
        this.output = "unknown command";
      }
    },

    playPreview(val: string) {
      console.log('preview', val);

      const validCommand = this.commands.some((command) => {
        const [trigger, func] = command;
        const funcPreview = func + "Preview";
        const match = val.match(trigger);

        if (match && this[funcPreview]) {
          this.output = this[funcPreview](...match);
        }

        return match;
      });

      if (!validCommand) {
        this.preview = null;
      }
    },

    move(cmd: string, dir: string, step: string) {
      let s = 1
      s = parseInt(step);

      const moves = times(s, () => {
        let { r, c } = offsetToPoint(this.matrix, this.cursor);

        if (dir === "up" || dir === "u") r -= 1;
        if (dir === "down" || dir === "d") r += 1;
        if (dir === "left" || dir === "l") c -= 1;
        if (dir === "right" || dir === "r") c += 1;

        if (isValidPoint(this.matrix, { r, c })) {
          this.cursor = pointToOffset(this.matrix, { r, c });
          const unmasked = unmask(this.matrix, this.cursor).filter(
            this.doUnmask
          );
          return unmasked.length;
        }
        return 0
      });

      return `${moves.reduce((m, c) => m + c)} cleared`;
    },

    cmdPreview(cmd: string, dir: string, step: string) {
      let s = 1
      s = parseInt(step);
      let { r, c } = offsetToPoint(this.matrix, this.cursor);

      if (dir === "up" || dir === "u") r -= s;
      if (dir === "down" || dir === "d") r += s;
      if (dir === "left" || dir === "l") c -= s;
      if (dir === "right" || dir === "r") c += s;

      if (isValidPoint(this.matrix, { r, c })) {
        this.preview = pointToOffset(this.matrix, { r, c }).toString();
      } else {
        this.preview = null;
      }
    },

    movePreview(cmd: string, dir: string, step: string) {
      this.cmdPreview(cmd, dir, step);
    },

    flagPreview(cmd: string, dir: string, step: string) {
      this.cmdPreview(cmd, dir, step);
    },

    flag(cmd: string, dir: string, step: string) {
      let s = 1
      s = parseInt(step);
      let { r, c } = offsetToPoint(this.matrix, this.cursor);

      if (dir === "up" || dir === "u") r -= s;
      if (dir === "down" || dir === "d") r += s;
      if (dir === "left" || dir === "l") c -= s;
      if (dir === "right" || dir === "r") c += s;

      const flagP = { r, c };
      const flagOffset = pointToOffset(this.matrix, flagP);

      if (isValidPoint(this.matrix, flagP)) {
        return toggleFlag(this.matrix, flagOffset) ? "OK" : "Flag removed";
      }
    },

    showScore() {
      return `${this.score} (lower is better)`;
    },

    showFlagCount() {
      return `${countFlags(this.matrix)} of ${findBombs(this.matrix).length}`;
    },

    sweep() {
      const unmasked = unmaskAroundFlags(this.matrix, this.cursor).filter(
        this.doUnmask
      );
      return `${unmasked.length} cleared`;
    },

    help() {
      return this.commands.map((command) => command[2]).join("\r\n");
    },

    howto() {
      return stripIndent`
        Welcome!

        This game is not timed, so have fun and explore. The goal is to
        uncover all the bombs, "*", hidden underneith the masked tiles, "o".

        There are currently ${findBombs(this.matrix).length
        } bombs randomly placed underneith ${this.gameSize[0] *
        this.gameSize[1]}
        tiles. You are welcome to change the size of the game by typing something like:

          /reset 15 10 20

        This will make the game 15 tiles wide, 10 tiles tall and have 20 hidden bombs.
        You are scored by the number of moves it takes to unmask all the bombs. Lower
        score is better! Now it's time to get started. Type '/help' for a list of
        commands, explore them and have fun!

        Oh... and if you think this game sounds a lot like another game you've played
        before, you are correct.`;
    },

    clear() {
      return "";
    },

    doUnmask(offset: number) {
      toggle(this.matrix, offset, PROPS.MASK, false);
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.txt-app {
  font-family: monospace;
  background: white;
  color: #454545;
  font-size: 1.5rem;
}

.map {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1.5rem [col-start]);
}

.history {
  font-size: 1rem;
  line-height: 1.5;
  color: #aaa;

  pre {
    margin: 0.2rem 0 0.3rem;
  }
}
</style>
