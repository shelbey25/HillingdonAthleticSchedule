import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import AllBets from "../components/AllBets";
import Data from "./Data";
import { trpc } from "@/utils/trpc";
interface Props {
  cell: string | Sm;
  proportion: number;
  idDatabase: number;
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
  proportion,
  idDatabase,
  smIndex,
  cellPadding,
}) => {
  const modifyAnEvent = trpc.useMutation(["modify-event"]);
  const setTheCellParticularly = async (cellP: number, switchValue: string) => {
    if (cellP === 0) {
      await modifyAnEvent.mutate({
        id: idDatabase,
        group: switchValue,
        sidenote: cellPadding[1] as string,
        location: cellPadding[2] as string,
        datetimedate: new Date((cellPadding[3] as Sm).date),
        datetimestring: (cellPadding[3] as Sm).string,
      });
    } else if (cellP === 1) {
      await modifyAnEvent.mutate({
        id: idDatabase,
        group: cellPadding[0] as string,
        sidenote: switchValue,
        location: cellPadding[2] as string,
        datetimedate: new Date((cellPadding[3] as Sm).date),
        datetimestring: (cellPadding[3] as Sm).string,
      });
    } else if (cellP === 2) {
      await modifyAnEvent.mutate({
        id: idDatabase,
        group: cellPadding[0] as string,
        sidenote: cellPadding[1] as string,
        location: switchValue,
        datetimedate: new Date((cellPadding[3] as Sm).date),
        datetimestring: (cellPadding[3] as Sm).string,
      });
    } else {
      await modifyAnEvent.mutate({
        id: idDatabase,
        group: cellPadding[0] as string,
        sidenote: cellPadding[1] as string,
        location: cellPadding[2] as string,
        datetimedate: new Date(switchValue),
        datetimestring: switchValue,
      });
    }
  };
  if (typeof cell === "string") {
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
