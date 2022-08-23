import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropDown from "../components/DropDown";
import CheckBox from "./CheckBox";
import AllBets from "../components/AllBets";
import Data from "./Data";
interface Props {
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

  return (
    <div className="flex flex-wrap w-full items-center justify-center">
      <div className="flex p-2 w-[33%] min-w-[20rem] justify-between">
        <input
          className="flex w-[47.5%] bg-sky-200 hover:shadow hover:shadow-black rounded-sm p-2 border-2 border-black text-blue-700 font-bold"
          type="text"
          placeholder="Hour"
          value={hour}
          onChange={(e) => setHour(e.target.value)}
        />
        <h1 className="text-4xl text-white flex w-[5%] text-center justify-center">
          :
        </h1>
        <input
          className="flex w-[47.5%] bg-sky-200 hover:shadow hover:shadow-black rounded-sm p-2 border-2 border-black text-blue-700 font-bold"
          type="text"
          placeholder="Minutes"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />
      </div>

      <div className="flex p-2 w-[14%] min-w-[15rem] allign-center justify-between">
        <button
          onClick={dayset}
          className={nightDay === "AM" ? "font-bold" : "font-normal"}
        >
          <div className="rounded-lg bg-sky-200 border-black border-2 p-2 hover:shadow hover:shadow-black">
            <div className="text-blue-700">AM</div>
          </div>
        </button>
        <button
          onClick={night}
          className={nightDay === "PM" ? "font-bold" : "font-normal"}
        >
          <div className="rounded-lg p-2 bg-sky-200 border-black border-2 hover:shadow hover:shadow-black">
            <div className="text-blue-700">PM</div>
          </div>
        </button>
        <button
          onClick={undecided}
          className={nightDay === "Neither" ? "font-bold" : "font-normal"}
        >
          <div className="rounded-lg p-2 bg-sky-200 border-black border-2 hover:shadow hover:shadow-black">
            <div className="text-blue-700">Either</div>
          </div>
        </button>
      </div>

      <div className="flex w-[47%] min-w-[20rem] p-2">
        <form className="flex w-full justify-between gap-x-2">
          <input
            className="bg-sky-200 hover:shadow hover:shadow-black rounded-sm p-2 border-2 border-black flex w-1/3 text-blue-700 font-bold"
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            className="bg-sky-200 hover:shadow hover:shadow-black rounded-sm p-2 border-2 border-black flex w-1/3 text-blue-700 font-bold"
            type="text"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          <input
            className="bg-sky-200 hover:shadow hover:shadow-black rounded-sm p-2 border-2 border-black flex w-1/3 text-blue-700 font-bold"
            type="text"
            placeholder="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </form>
      </div>
    </div>
  );
};

export default SearchLocation;
