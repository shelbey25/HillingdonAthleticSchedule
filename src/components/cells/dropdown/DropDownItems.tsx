import React, { FC } from "react";

const DropDownItems: FC<{
  setValue: (value: string) => void;
  drop: boolean;
  setDrop: (value: boolean) => void;
  setOtherDrop: (value: boolean) => void;
  location: string;
}> = ({ setValue, drop, setDrop, setOtherDrop, location }) => {
  const opotacos = () => {
    setDrop(!drop);
    setValue(location);
    setOtherDrop(false);
  };
  return (
    <div className="flex border-2  border-slate-800 p-1 w-full">
      <button className="flex w-full" onClick={opotacos}>
        <h1>{location}</h1>
      </button>
    </div>
  );
};

export default DropDownItems;
