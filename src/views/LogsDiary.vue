<template>
  <div class="History container">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Event Type</th>
          <th scope="col">Tiempo transcurrido</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendance in historyAttendance" :key="attendance.in">
          <th scope="row">{{ attendance.name }}</th>
          <th>{{ attendance.type }}</th>
          <th>{{ attendance.duration }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
// import { mappingHistoryAttendances } from "@/utils";

export default {
  created() {
    console.log(this.historyAttendance);
  },
  computed: {
    ...mapGetters({
      historyAttendance: "Attendance/historyAttendance"
    })
  }
};
</script>
