<template>
  <div class="home container">
    <div class="d-flex justify-content-center">
      <AttendanceForm @submit="onAttendanceSubmit" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { canCreateANewAttendance } from "@/utils";
export default {
  name: "Home",
  components: {
    AttendanceForm: () =>
      import(
        /* webpackChunkName: "AttendanceForm" */ "@v/Home/AttendanceForm.vue"
      )
  },
  methods: {
    onAttendanceSubmit(data) {
      const canCreateAttendance = canCreateANewAttendance(
        this.activeAttendance,
        data.name
      );
      if (canCreateAttendance) {
        this.addAttendance(data);
        this.$router.push({ name: "LogsList" });
      } else {
        alert("No puede hacer ponches nuevos sino se cierra la pasada");
      }
    },
    ...mapActions({
      addAttendance: "Attendance/addAttendance"
    })
  },
  computed: {
    ...mapGetters({
      activeAttendance: "Attendance/activeAttendance"
    })
  }
};
</script>
