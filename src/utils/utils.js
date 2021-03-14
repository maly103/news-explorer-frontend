export function formatDate(today) {
  let dayOfMonth = today.getDate();
  let month = today.getMonth() + 1;
  let year = today.getFullYear();

  // форматирование
  year = year.toString();
  month = month < 10 ? "0" + month : month;
  dayOfMonth = dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth;

  return `${year}-${month}-${dayOfMonth}`;
}

export function formatDateApi(strDate) {
  let today = new Date(strDate);
  let arrMonth = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "майя",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  let dayOfMonth = today.getDate();
  let month = arrMonth[today.getMonth()];
  let year = today.getFullYear();

  year = year.toString();

  return `${dayOfMonth} ${month}, ${year}`;
}
const formatAllDate = { formatDate, formatDateApi };
export default formatAllDate;
