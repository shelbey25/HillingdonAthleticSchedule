import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import AllBets from "../components/AllBets";
import Data from "./Data";
import Cell from "./Cell";
import { Icon } from "@iconify/react";
import { trpc } from "@/utils/trpc";

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
/*{
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
    }, */
const MasterSheet = () => {
  const [cells, setCells] = useState<Booking[]>([]);
  const proportion = [25, 25, 25, 25];
  const { data, refetch } = trpc.useQuery(["returnEvents"]);
  const addAnEvent = trpc.useMutation(["add-event"]);
  const removeAnEvent = trpc.useMutation(["remove-event"]);
  if (!data) return null;
  console.log({ data });

  const addACell = async () => {
    await addAnEvent.mutate();
    refetch();
  };

  const removeACell = async (smId: number) => {
    await removeAnEvent.mutate({ id: smId });
    refetch();
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
          {data
            .map((row) => [
              row.group,
              row.sidenote,
              row.location,
              {
                date: row.datetimedate,
                string: row.datetimestring,
              },
            ])
            .map((rowType, smId) => (
              <div className="flex w-full justify-center" key={smId}>
                <div
                  className="flex justify-end items-center"
                  style={{ width: `${5}%` }}
                >
                  <button
                    className="p-2"
                    onClick={() => removeACell(data[smId].id)}
                  >
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
                      proportion={proportion[index]}
                      idDatabase={data[smId].id}
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
