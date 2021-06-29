<template>
  <div class="classic-app">
    <div class="timer">
      <span class="right">{{ flagCount }}</span>
      :
      <timer class="left" :time="time"></timer>
      :
      <a href="" @click.prevent="restart">restart</a>
    </div>

    <div class="map" :style="{ '--columns': gameSize[0] }">
      <template v-for="(el, i) in times(matrix.w * matrix.h, Number)">
        <tile
          :key="i"
          :isBomb="isCell(matrix, i, PROPS.BOMB)"
          :isMasked="isCell(matrix, i, PROPS.MASK)"
          :isFlagged="isCell(matrix, i, PROPS.FLAG)"
          :bombCount="countNeighbors(matrix, i, PROPS.BOMB)"
          @flag="flag(i)"
          @unmaskAroundFlags="unmaskAroundFlags(i)"
          @unmask="unmask(i)"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { times } from "lodash";
import {
  countFlags,
  findBombs,
  initializeMap,
  isComplete,
  isPlayable,
  isCell,
  toggleFlag,
  toggle,
  unmask,
  unmaskAroundFlags,
  countNeighbors,
  validFirstPlay,
  PROPS,
} from "../../lib/gameplay";
import Tile from "./components/Tile.vue";
import Timer from "./components/Timer.vue";

export default {
  components: {
    Tile,
    Timer,
  },

  data() {
    return {
      PROPS,
      gameSize: [30, 16],
      bombCount: 99,
      matrix: [],
      playing: true,
      startedAt: 0,
      time: 0,
    };
  },

  mounted() {
    this.matrix = initializeMap(
      this.gameSize[0],
      this.gameSize[1],
      this.bombCount
    );
  },

  watch: {
    startedAt() {
      const setTimer = () => {
        window.requestIdleCallback(() => {
          if (this.playing) {
            this.time = Date.now() - this.startedAt;
            setTimer();
          }
        });
      };

      setTimer();
    },

    matrix: {
      handler() {
        if (
          (this.playing && isComplete(this.matrix)) ||
          !isPlayable(this.matrix)
        ) {
          this.stop();
        }

        if (!isComplete(this.matrix) && !isPlayable(this.matrix)) {
          const unmasked = findBombs(this.matrix);
          unmasked.forEach((i) => (isCell(this.matrix, i).isMasked = false));
        }
      },
      deep: true,
    },
  },

  computed: {
    flagCount() {
      return this.bombCount - countFlags(this.matrix);
    },
  },

  methods: {
    times,
    isCell,
    countNeighbors,

    start(i) {
      while (!validFirstPlay(this.matrix, i)) {
        this.matrix = initializeMap(
          this.gameSize[0],
          this.gameSize[1],
          this.bombCount
        );
      }

      this.playing = true;
      this.startedAt = Date.now();
    },

    restart() {
      this.matrix = initializeMap(
        this.gameSize[0],
        this.gameSize[1],
        this.bombCount
      );
      this.playing = false;
      this.startedAt = 0;
      this.time = 0;
    },

    stop() {
      this.playing = false;
    },

    flag(i) {
      if (!isPlayable(this.matrix)) return;
      if (!this.startedAt) this.start(i);
      toggleFlag(this.matrix, i);
    },

    unmaskAroundFlags(i) {
      if (!isPlayable(this.matrix)) return;
      const unmasked = unmaskAroundFlags(this.matrix, i);
      unmasked.forEach((i) => isCell(this.matrix, i, PROPS.MASK));
      unmasked.forEach((offset) => this.doUnmask(offset));
    },

    unmask(i) {
      if (!isPlayable(this.matrix)) return;
      if (!this.startedAt) this.start(i);
      const unmasked = unmask(this.matrix, i);
      unmasked.forEach((offset) => this.doUnmask(offset));
    },

    doUnmask(offset) {
      toggle(this.matrix, offset, PROPS.MASK, false);
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.classic-app {
  font-family: -apple-system, sans-serif;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.timer {
  margin-bottom: 0.5rem;
}

.map {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1.5rem [col-start]);
}
</style>
