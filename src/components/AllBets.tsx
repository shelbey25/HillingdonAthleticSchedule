import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import Data from "./Data";
import { trpc } from "@/utils/trpc";
interface Props {}

export interface Match {
  schedule: string;
}

interface allInfo {
  location: string;
  group: string;
  month: string;
  year: string;
  day: string;
  dayNight: string;
  hour: string;
  minute: string;
  date: Date;
  sideNote: string;
}

const AllBets: React.FC<Props> = ({}) => {
  const [data2, setData2] = useState([
    {
      location: "Farmer Gym",
      group: "JV Boys Basketball",
      month: "April",
      year: "2023",
      day: "20",
      dayNight: "AM",
      hour: "3",
      minute: "05",
      date: new Date("2023-04-20"),
      sideNote: "practice",
    },
    {
      location: "Blue Gym",
      group: "Varsity Boys Basketball",
      month: "May",
      year: "2023",
      day: "10",
      dayNight: "AM",
      hour: "3",
      minute: "05",
      date: new Date("2023-05-10"),
      sideNote: "game",
    },
    {
      location: "Weight Room",
      group: "JV Boys Baseball",
      month: "April",
      year: "2023",
      day: "11",
      dayNight: "PM",
      hour: "4",
      minute: "15",
      date: new Date("2023-04-11"),
      sideNote: "practice",
    },
    {
      location: "Primrose Hill",
      group: "Freshman Frisbee",
      month: "April",
      year: "2023",
      day: "2",
      dayNight: "PM",
      hour: "4",
      minute: "15",
      date: new Date("2023-04-02"),
      sideNote: "try-out",
    },
    {
      location: "Primrose Hill",
      group: "JV Girls Soccer",
      month: "April",
      year: "2023",
      day: "11",
      dayNight: "PM",
      hour: "4",
      minute: "15",
      date: new Date("2023-04-11"),
      sideNote: "try-out",
    },
    {
      location: "Paddington Rec",
      group: "Varsity Boys Tennis",
      month: "April",
      year: "2023",
      day: "13",
      dayNight: "PM",
      hour: "4",
      minute: "15",
      date: new Date("2023-04-13"),
      sideNote: "try-out",
    },
    {
      location: "Paddington Rec",
      group: "Varsity Rowing",
      month: "August",
      year: "2022",
      day: "21",
      dayNight: "PM",
      hour: "4",
      minute: "15",
      date: new Date("2022-08-21"),
      sideNote: "try-out",
    },
  ]);
  const daysMonth: { [index: string]: number } = {
    January: 0,
    February: 31,
    March: 59,
    April: 90,
    May: 120,
    June: 151,
    July: 181,
    August: 212,
    September: 243,
    October: 273,
    November: 304,
    December: 334,
  };
  const sortedData = [...data2].sort(
    (firstItem, secondItem) =>
      firstItem.date.getTime() - secondItem.date.getTime()
  );
  const { data, refetch } = trpc.useQuery(["event.all-date"]);
  return (
    <div className="flex flex-col w-full allign-center justify-center">
      {data && (
        <div className="w-full">
          <Data dataSet={data} />
        </div>
      )}
    </div>
  );
};

export default AllBets;
