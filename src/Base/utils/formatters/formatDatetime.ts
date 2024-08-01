import dayjs from "dayjs";
import "dayjs/locale/es";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const formatDatetime = (date: Date) => {
  const now = dayjs();
  const givenDate = dayjs(date);

  if (givenDate.isSame(now, "day")) {
    return `Hoy a las ${givenDate.format("HH:mm")}`;
  }

  if (givenDate.isSame(now.subtract(1, "day"), "day")) {
    return `Ayer a las ${givenDate.format("HH:mm")}`;
  }

  const formattedDate = givenDate.locale("es").format("DD/MM/YYYY HH:mm");
  return formattedDate;
};

export default formatDatetime;
