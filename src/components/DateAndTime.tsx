import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import CheckBox from "./CheckBox";
import AllBets from "../components/AllBets";
import Data from "./Data";
interface Props {
  setValueModded: (value: boolean) => void;
  valueModded: boolean;
  setDay: any;
  day: string;
  setMonth: any;
  month: string;
  setYear: any;
  year: string;
  setHour: any;
  hour: string;
  setMinutes: any;
  minutes: string;
  setNightDay: any;
  nightDay: string;
  longDate: string;
  setLongDate: any;
}

const SearchLocation: React.FC<Props> = ({
  setValueModded,
  valueModded,
  setDay,
  day,
  setMonth,
  month,
  setYear,
  year,
  setHour,
  hour,
  setMinutes,
  minutes,
  setNightDay,
  nightDay,
  longDate,
  setLongDate,
}) => {
  const dayset = () => {
    setNightDay("AM");
  };
  const night = () => {
    setNightDay("PM");
  };
  const undecided = () => {
    setNightDay("Neither");
  };
  const setTimeAll = (newDate: string) => {
    console.log(newDate);
    setLongDate(newDate);
    setYear(newDate.substring(0, 4));
    setMonth(newDate.substring(5, 7));
    setDay(newDate.substring(8, 10));
    setMinutes(newDate.substring(14, 16));
    if (Number(newDate.substring(11, 13)) >= 12) {
      setNightDay("PM");
      if (Number(newDate.substring(11, 13)) !== 12) {
        setHour((Number(newDate.substring(11, 13)) - 12).toString());
      } else {
        setHour("12");
      }
    } else {
      setNightDay("AM");
      if (Number(newDate.substring(11, 13)) !== 0) {
        setHour(Number(newDate.substring(11, 13)).toString());
      } else {
        setHour("12");
      }
    }
  };
  const dateValue = () => {};
  const whenChanged = (date: string) => {
    console.log(date);
    setYear(date.substring(0, 4));
    setMonth(date.substring(5, 7));
    setDay(date.substring(8, 10));
    setVal(date);
    console.log(date.substring(0, 4));
    console.log(date.substring(5, 7));
    console.log(date.substring(8, 10));
    setValueModded(true);
  };
  const [val, setVal] = useState("2022-12-30");

  return (
    <div className="flex flex-wrap w-full items-center justify-center">
      <div className="flex w-[20%] min-w-[18rem] p-2">
        <input
          className="flex w-full justify-between gap-x-2 p-2"
          type="date"
          value={val}
          onChange={(e) => whenChanged(e.target.value)}
        ></input>
        <input
          type="checkbox"
          onClick={(e) => setValueModded(!valueModded)}
        ></input>
      </div>
    </div>
  );
};

export default SearchLocation;
