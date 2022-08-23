import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import AllBets from "../components/AllBets";
import Data from "./Data";
import Cell from "./Cell";
import { Icon } from "@iconify/react";

interface Booking {
  name: string;
  sideNote: string;
  location: string;
  date: Sm;
}
interface Sm {
  date: Date;
  string: string;
}

const MasterSheet = () => {
  const [cells, setCells] = useState<Booking[]>([
    {
      name: "Varsity Boys Basketball",
      sideNote: "try-out",
      location: "Farmer Gym",
      date: {
        date: new Date("2022-04-13T12:15:00.000Z"),
        string: "2022-04-13T12:15:00.000",
      },
    },
    {
      name: "JV Boys Basketball",
      sideNote: "try-out",
      location: "Blue Gym",
      date: {
        date: new Date("2024-04-13T12:15:00.000Z"),
        string: "2024-04-13T12:15:00.000",
      },
    },
  ]);
  const proportion = [25, 25, 25, 25];
  console.log(cells);
  const addACell = () => {
    setCells([
      ...cells,
      {
        name: "",
        sideNote: "",
        location: "",
        date: {
          date: new Date("2099-12-30T12:15:00.000Z"),
          string: "2022-12-30T12:15:00.000",
        },
      },
    ]);
  };

  const removeACell = (smId: number) => {
    const exceptCell = cells.filter((indiv, index) => smId !== index);
    setCells(exceptCell);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 justify-center w-full flex flex-col">
        <div className="flex w-full justify-end">
          <div className="flex justify-end" style={{ width: `${95}%` }}>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[0]}%` }}
            >
              <h1 className="flex flex-wrap">Group</h1>
            </div>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[1]}%` }}
            >
              <h1 className="flex flex-wrap">Event</h1>
            </div>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[2]}%` }}
            >
              <h1 className="flex flex-wrap">Location</h1>
            </div>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[3]}%` }}
            >
              <h1 className="flex flex-wrap">Date and Time</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {cells
            .map((row) => [row.name, row.sideNote, row.location, row.date])
            .map((rowType, smId) => (
              <div className="flex w-full justify-center" key={smId}>
                <div
                  className="flex justify-end items-center"
                  style={{ width: `${5}%` }}
                >
                  <button className="p-2" onClick={() => removeACell(smId)}>
                    <Icon
                      icon="ant-design:minus-circle-twotone"
                      className="w-12 h-12 text-rose-600"
                    />
                  </button>
                </div>
                <div
                  className="flex justify-center"
                  style={{ width: `${95}%` }}
                >
                  {rowType.map((cell, index) => (
                    <Cell
                      cell={cell}
                      key={index}
                      setCell={setCells}
                      proportion={proportion[index]}
                      largeCell={cells}
                      smId={smId}
                      smIndex={index}
                      cellPadding={rowType}
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button onClick={() => addACell()}>
          <Icon
            icon="ant-design:plus-circle-twotone"
            className="w-28 h-28 text-lime-600"
          />
        </button>
      </div>
    </div>
  );
};

export default MasterSheet;
