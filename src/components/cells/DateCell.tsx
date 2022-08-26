import { FC } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";

const DateCell: FC<{
  value: Date;
  percentage: number;
  setValue: (date: Date) => void;
}> = ({ value, setValue, percentage }) => {
  return (
    <div
      className="flex flex-wrap bg-slate-50 border-2  border-slate-800 p-1 items-start"
      style={{ width: `${percentage}%` }}
    >
      <DateTimePicker
        className="flex flex-wrap bg-slate-50 w-full p-1"
        value={value}
        onChange={(e: Date) => setValue(e)}
      />
    </div>
  );
};

export default DateCell;
