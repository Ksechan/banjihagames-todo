import dayjs from 'dayjs';

const todayYear = dayjs().year();
const todayMonth = dayjs().month() + 1;
const todayDate = dayjs().date();
export const today = `${todayYear}-${todayMonth}-${todayDate}`;

export const dateHandler = ({
  result,
  selectDate,
}: {
  result: number;
  selectDate: string;
}) => {
  if (result <= 0 && result > -7) {
    if (result === 0) {
      return '만료일';
    } else {
      return `${Math.abs(result)}일 연체`;
    }
  } else if (result > 0 && result < 7) {
    return `${result}일 남음`;
  } else {
    return `${dayjs(selectDate).month() + 1}월 ${dayjs(selectDate).date()}일`;
  }
};
