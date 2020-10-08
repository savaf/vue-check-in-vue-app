<template>
  <div class="break">
    <dl v-if="breaks.length > 0">
      <li v-for="rest in breaksFormated" :key="rest" class="">
        {{ rest }}
      </li>
    </dl>
    <button
      v-show="canAddMoreBreaks && !shouldCloseBreak"
      @click="addBreak()"
      type="button"
      class="btn btn-success btn-sm"
      :disabled="disabled"
    >
      Break
    </button>
    <button
      v-show="shouldCloseBreak"
      @click="closeBreak()"
      type="button"
      class="btn btn-info btn-sm"
      :disabled="disabled"
    >
      Back
    </button>
  </div>
</template>

<script>
import format from "date-fns/lightFormat";

export default {
  name: "Break",
  props: {
    breaks: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addBreak() {
      this.$emit("update-breaks", [
        ...this.breaks,
        { in: Date.now(), out: null }
      ]);
    },
    closeBreak() {
      let copyOfBreaks = [...this.breaks];
      const currentIndex = copyOfBreaks.length - 1;
      let oldBreak = copyOfBreaks[currentIndex];
      const completedBreak = {
        ...oldBreak,
        out: Date.now()
      };
      copyOfBreaks[currentIndex] = completedBreak;
      this.$emit("update-breaks", copyOfBreaks);
    },
    formatedInAndOut(breakTime) {
      let result = "";
      if (breakTime.in) {
        result = `${format(breakTime.in, "hh:mm:ss a")} - Now`;
      }

      if (breakTime.out) {
        result = result.replace(
          "Now",
          `${format(breakTime.out, "hh:mm:ss a")}`
        );
      }
      return result;
    }
  },
  computed: {
    canAddMoreBreaks() {
      return this.breaks.length < 2;
    },
    shouldCloseBreak() {
      let result = false;
      const copyOfBreaks = [...this.breaks];

      if (copyOfBreaks.length) {
        const currentIndex = copyOfBreaks.length - 1;
        const lastBreak = copyOfBreaks[currentIndex];
        result = lastBreak.out === null;
      }
      return result;
    },

    breaksFormated() {
      return [...this.breaks].map(this.formatedInAndOut);
    }
  }
};
</script>
