import React, { FC } from "react";

const StringCell: FC<{
  percentage: number;
  value: string;
  setValue: (value: string) => void;
}> = ({ percentage, setValue, value }) => {
  return (
    <div
      className="flex flex-wrap bg-slate-50 border-2  border-slate-800 p-1"
      style={{ width: `${percentage}%` }}
    >
      <textarea
        className="flex flex-wrap bg-slate-50 w-full p-1"
        placeholder="Empty"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default StringCell;
