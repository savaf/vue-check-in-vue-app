import format from "date-fns/lightFormat";

export const mappingHistoryAttendances = attendances => {
  return attendances.map(item => {
    const inTime = format(item.in, "hh:mm:ss a");
    const outTime = format(item.out, "hh:mm:ss a");
    const hours = `${inTime} - ${outTime}`;
    const date = format(item.in, "dd-MM-yyyy");
    return { ...item, hours, date };
  });
};

export const canCreateANewAttendance = (attendance, name) => {
  let result = false;
  if (name.length === "") {
    return result;
  }
  result = !attendance.some(item => item.name == name);
  return result;
};
