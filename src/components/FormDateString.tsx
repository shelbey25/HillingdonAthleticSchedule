import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropDown from "../components/DropDown";
import AllBets from "../components/AllBets";
import Data from "./Data";
interface Props {
  cell: string | HalfDate;
  day: string;
  month: string;
  year: string;
  ap: string;
  hour: string;
  min: string;
  setCell: any;
  cellPadding: string[];
  smId: number;
  largeCell: Booking[];
}
interface Booking {
  name: string;
  location: string;
  date: Date;
}
interface HalfDate {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  ampm: string;
}

const FormDateString: React.FC<Props> = ({
  cell,
  day,
  month,
  year,
  ap,
  hour,
  min,
  setCell,
  cellPadding,
  smId,
  largeCell,
}) => {
  const setTheCellParticularly = (
    datePortion: number[],
    switchValue: string,
    cellId?: string
  ) => {
    const exceptCell = largeCell.filter((indiv, index) => smId !== index);
    const theCellSp = largeCell.find((indiv, index) => smId !== index);
    const theCell = theCellSp?.date.toISOString();
    if (typeof cellId !== "undefined") {
      if (cellId === "HOUR") {
        if (ap === "AM") {
          const theRow = {
            name: cellPadding[0],
            location: cellPadding[1],
            date: new Date(
              theCell?.substring(0, datePortion[0]) +
                switchValue +
                theCell?.substring(datePortion[1], theCell.length)
            ),
          };
          exceptCell.splice(smId, 0, theRow);
          setCell(exceptCell);
        }
        if (ap === "PM") {
          const theRow = {
            name: cellPadding[0],
            location: cellPadding[1],
            date: new Date(
              theCell?.substring(0, datePortion[0]) +
                (Number(switchValue) - 12).toString() +
                theCell?.substring(datePortion[1], theCell.length)
            ),
          };
          exceptCell.splice(smId, 0, theRow);
          setCell(exceptCell);
        }
      }
      if (cellId === "AM/PM") {
        if (switchValue === "PM") {
          const theRow = {
            name: cellPadding[0],
            location: cellPadding[1],
            date: new Date(
              theCell?.substring(0, datePortion[0]) +
                (Number(theCell?.substring(11, 13)) + 12).toString() +
                theCell?.substring(datePortion[1], theCell.length)
            ),
          };
          exceptCell.splice(smId, 0, theRow);
          setCell(exceptCell);
        }
        if (switchValue === "AM") {
          const theRow = {
            name: cellPadding[0],
            location: cellPadding[1],
            date: new Date(
              theCell?.substring(0, datePortion[0]) +
                (Number(theCell?.substring(11, 13)) + 12).toString() +
                theCell?.substring(datePortion[1], theCell.length)
            ),
          };
          exceptCell.splice(smId, 0, theRow);
          setCell(exceptCell);
        }
      }
    } else {
      const theRow = {
        name: cellPadding[0],
        location: cellPadding[1],
        date: new Date(
          theCell?.substring(0, datePortion[0]) +
            switchValue +
            theCell?.substring(datePortion[1], theCell.length)
        ),
      };
      exceptCell.splice(smId, 0, theRow);
      setCell(exceptCell);
    }
  };

  return (
    <div className="flex flex-wrap bg-slate-50 p-1 gap-x-2 w-full">
      <textarea
        className="flex flex-wrap bg-slate-50 w-full p-1"
        style={{ width: `${8}%` }}
        placeholder="DD"
        value={day}
        onChange={(e) => setTheCellParticularly([5, 7], e.target.value)}
      />
      <h1 style={{ width: `${2.5}%` }}>/</h1>
      <textarea
        className="flex flex-wrap bg-slate-50 w-full p-1"
        style={{ width: `${8}%` }}
        placeholder="MM"
        value={month}
        onChange={(e) => setTheCellParticularly([8, 10], e.target.value)}
      />
      <h1 style={{ width: `${2.5}%` }}>/</h1>
      <textarea
        className="flex flex-wrap bg-slate-50 w-full p-1"
        style={{ width: `${16}%` }}
        placeholder="YYYY"
        value={year}
        onChange={(e) => setTheCellParticularly([0, 4], e.target.value)}
      />
      <h1 style={{ width: `${2.5}%` }}> </h1>
      <textarea
        className="flex flex-wrap bg-slate-50 w-full p-1"
        style={{ width: `${8}%` }}
        placeholder="HOUR"
        value={hour}
        onChange={(e) =>
          setTheCellParticularly([11, 13], e.target.value, "HOUR")
        }
      />
      <h1 style={{ width: `${2.5}%` }}>:</h1>
      <textarea
        className="flex flex-wrap bg-slate-50 w-full p-1"
        style={{ width: `${8}%` }}
        placeholder="MIN"
        value={min}
        onChange={(e) => setTheCellParticularly([14, 16], e.target.value)}
      />
      <h1 style={{ width: `${2.5}%` }}> </h1>
      <textarea
        className="flex flex-wrap bg-slate-50 w-full p-1"
        style={{ width: `${8}%` }}
        placeholder="AM/PM"
        value={ap}
        onChange={(e) =>
          setTheCellParticularly([11, 13], e.target.value, "AM/PM")
        }
      />
    </div>
  );
};

export default FormDateString;
