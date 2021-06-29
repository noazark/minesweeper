<template lang="html">
  <div>
    &gt;
    <input
      class="cli"
      @keyup.up="historyNext"
      @keyup.down="historyPrev"
      @keyup.enter.prevent="submit(next)"
      @input.stop.prevent="input"
      v-model="next"
      placeholder="try, /howto"
      autofocus
      @blur="$event.target.focus()"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      next: "",
      commands: [],
      cursor: 0,
      mem: undefined,
    };
  },

  methods: {
    reset() {
      const index = this.cursor;

      if (!this.mem == null) {
        this.mem = this.next;
      }

      this.next = this.commands[index];

      if (this.next == null) {
        this.next = this.mem;
      }
    },

    historyPrev() {
      const prev = this.cursor + 1;
      if (prev > this.commands.length - 1) {
        this.cursor = this.commands.length;
      } else {
        this.cursor = prev;
      }

      this.reset();
    },

    historyNext() {
      const next = this.cursor - 1;
      if (next < 0) {
        this.cursor = 0;
      } else {
        this.cursor = next;
      }

      this.reset();
    },

    input(e) {
      this.$emit("input", e.target.value);
    },

    submit(val) {
      this.commands.push(val);
      this.cursor = this.commands.length;
      this.next = "";
      this.$emit("submit", val);
    },
  },
};
</script>

<style lang="css">
.cli {
  border: none;
  outline: none;
  font-family: monospace;
  letter-spacing: .1rem;
  font-size: 1.2rem;
  width: 90%
}
</style>
