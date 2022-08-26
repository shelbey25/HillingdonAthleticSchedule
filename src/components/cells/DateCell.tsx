import { FC } from "react";

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
      <input
        className="flex flex-wrap bg-slate-50 w-full p-1"
        type="datetime-local"
        value={value.toString()}
        onChange={(e) => setValue(new Date(e.target.value))}
      />
    </div>
  );
};

export default DateCell;
