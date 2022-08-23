import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import AllBets from "../components/AllBets";
import Data from "./Data";
interface Props {
  cell: string | Sm;
  key: number;
  setCell: any;
  proportion: number;
  largeCell: Booking[];
  smId: number;
  smIndex: number;
  cellPadding: (string | Sm)[];
}
interface Booking {
  name: string;
  sideNote: string;
  location: string;
  date: Sm;
}
interface HalfDate {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  ampm: string;
}
interface Sm {
  date: Date;
  string: string;
}

const Cell: React.FC<Props> = ({
  cell,
  key,
  setCell,
  proportion,
  largeCell,
  smId,
  smIndex,
  cellPadding,
}) => {
  const setTheCellParticularly = (cellP: number, switchValue: string) => {
    const exceptCell = largeCell.filter((indiv, index) => smId !== index);
    const theRow = {
      name: cellPadding[0],
      sideNote: cellPadding[1],
      location: cellPadding[2],
      date: {
        date: new Date(cellPadding[3].date),
        string: cellPadding[3].string,
      },
    };
    if (cellP === 0) {
      theRow.name = switchValue;
    } else if (cellP === 1) {
      theRow.sideNote = switchValue;
    } else if (cellP === 2) {
      theRow.location = switchValue;
    } else {
      theRow.date = { date: new Date(switchValue), string: switchValue };
    }
    exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell);
  };
  if (smIndex !== 3) {
    return (
      <div
        className="flex flex-wrap bg-slate-50 border-2  border-slate-800 p-1"
        style={{ width: `${proportion}%` }}
      >
        <textarea
          className="flex flex-wrap bg-slate-50 w-full p-1"
          placeholder="Empty"
          value={cell}
          onChange={(e) => setTheCellParticularly(smIndex, e.target.value)}
        />
      </div>
    );
  } else {
    return (
      <div
        className="flex flex-wrap bg-slate-50 border-2  border-slate-800 p-1 items-start"
        style={{ width: `${proportion}%` }}
      >
        <input
          className="flex flex-wrap bg-slate-50 w-full p-1"
          type="datetime-local"
          value={cell.string}
          onChange={(e) => setTheCellParticularly(3, e.target.value)}
        />
      </div>
    );
  }
};

export default Cell;
