<template>
  <div class="Lunch">
    <span>
      {{ lunchFormated }}
    </span>

    <button
      v-show="shouldTakeLunch"
      @click="takeLunch()"
      type="button"
      class="btn btn-success btn-sm"
      :disabled="disabled"
    >
      Lunch
    </button>
    <button
      v-show="shouldBackFromLunch"
      @click="backFromLunch()"
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
  name: "Lunch",
  props: {
    lunch: {
      type: Object,
      default: () => {
        return { in: null, out: null };
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    takeLunch() {
      const goToLunch = { in: Date.now(), out: null };
      this.$emit("update-lunch", goToLunch);
    },
    backFromLunch() {
      const finishLunch = {
        ...this.lunch,
        out: Date.now()
      };
      this.$emit("update-lunch", finishLunch);
    }
  },
  computed: {
    shouldTakeLunch() {
      return !this.lunch.in;
    },
    shouldBackFromLunch() {
      return this.lunch.in !== null && !this.lunch.out;
    },
    lunchFormated() {
      let result = "";
      if (this.lunch.in) {
        result = `${format(this.lunch.in, "hh:mm:ss a")} - Now`;
      }

      if (this.lunch.out) {
        result = result.replace(
          "Now",
          `${format(this.lunch.out, "hh:mm:ss a")}`
        );
      }
      return result;
    }
  }
};
</script>
