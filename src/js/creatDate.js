export default function creatsDate() {
  const date = new Date();
  const dateHours = date.getHours();
  let dateMinutes = date.getMinutes();
  let dateDay = date.getDate();
  let dateMonth = date.getMonth() + 1;

  dateMinutes = (dateMinutes < 10) ? `0${dateMinutes}` : dateMinutes;
  dateDay = (dateDay < 10) ? `0${dateDay}` : dateDay;
  dateMonth = (dateMonth < 10) ? `0${dateMonth}` : dateMonth;

  return `${dateHours}:${dateMinutes} ${dateDay}.${dateMonth}.${date.getFullYear()}`;
}
