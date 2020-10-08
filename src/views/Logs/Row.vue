<template>
  <tr>
    <th scope="row">{{ attendance.name }}</th>
    <th>{{ attendance.presence.in | formatDateStd }}</th>
    <th>
      <Breaks
        :breaks="attendance.breaks"
        @update-breaks="breaks => updateBreaks(breaks, attendance)"
        :disabled="!canTakeABreak"
      />
    </th>
    <th>
      <Lunch
        :lunch="attendance.lunch"
        @update-lunch="lunch => updateLunch(lunch, attendance)"
        :disabled="!canTakeLunch"
      />
    </th>
    <th>
      <button
        @click="signingOff(attendance)"
        type="button"
        class="btn btn-info btn-sm"
        :disabled="!canSigningOff"
      >
        Signing Off
      </button>
    </th>
  </tr>
</template>

<script>
const attendanceDefault = {
  id: "",
  name: "",
  breaks: [
    { in: null, out: null },
    { in: null, out: null }
  ],
  lunch: { in: null, out: null },
  presence: { in: null, out: null },
  active: true
};

export default {
  components: {
    Breaks: () => import(/* webpackChunkName: "Breaks" */ "@v/Logs/Breaks.vue"),
    Lunch: () => import(/* webpackChunkName: "Lunch" */ "@v/Logs/Lunch.vue")
  },
  props: {
    attendance: {
      type: Object,
      required: true,
      default: () => attendanceDefault
    }
  },
  methods: {
    saveAttendance(attendance) {
      this.$emit("update-atendance", attendance);
    },
    signingOff(attendance) {
      let attendanceCopy = {
        ...attendance,
        active: false
      };
      attendanceCopy.presence.out = Date.now();
      this.saveAttendance(attendanceCopy);
    },
    updateBreaks(breaks = [], attendance = {}) {
      const attendanceCopy = {
        ...attendance,
        breaks
      };

      this.saveAttendance(attendanceCopy);
    },
    updateLunch(lunch = {}, attendance = {}) {
      const attendanceCopy = {
        ...attendance,
        lunch
      };

      this.saveAttendance(attendanceCopy);
    }
  },
  computed: {
    canSigningOff() {
      return this.canTakeABreak === this.canTakeLunch;
    },
    canTakeABreak() {
      return (
        this.attendance.lunch.in === null || this.attendance.lunch.out !== null
      );
    },
    canTakeLunch() {
      return !this.shouldCloseBreak;
    },
    shouldCloseBreak() {
      let result = false;
      const copyOfBreaks = [...this.attendance.breaks];
      if (copyOfBreaks.length) {
        const currentIndex = copyOfBreaks.length - 1;
        const lastBreak = copyOfBreaks[currentIndex];
        result = lastBreak.out === null;
      }
      return result;
    }
  }
};
</script>
