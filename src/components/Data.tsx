import React, { ObjectHTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Standout from "./Standout";
import SearchBar from "./SearchBar";
import CheckBox from "./CheckBox";
import DateAndTime from "./DateAndTime";
import type { Match } from "./AllBets";
import SearchLocation from "./SearchLocation";
import { Sidenote, Location, Event } from "@prisma/client";
import MappingData, { LocationYesNo } from "./MappingData";
import { trpc } from "@/utils/trpc";

interface smallInfo {
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

interface Props {
  take: number;
}
/*dataSet: (Event & {
    sidenote: Sidenote | null;
    location: Location | null;
  })[];*/
interface allInfo {
  id: number;
  location: string;
  group: string;
  datetimestring: string;
  datetimedate: Date;
  sidenote: string;
}
/*Remove Load Results*/
const Data: React.FC<Props> = ({ take }) => {
  const { data, refetch } = trpc.useQuery(["location.allRise"]);
  console.log("data");
  console.log(data);

  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState(false);
  const [day, setDay] = useState("30");
  const [month, setMonth] = useState("12");
  const [year, setYear] = useState("2022");
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [nightDay, setNightDay] = useState("Neither");
  const [longDate, setLongDate] = useState("2022-09-01T17:30");
  console.log("--");
  console.log(
    data?.map(
      (pieceOfData) =>
        [
          {
            name: pieceOfData.name,
            value: false,
          },
        ][0]
    )
  );
  /*const [check, setCheck] = useState([
    data?.map((pieceOfData) => [
      {
        name: pieceOfData.name,
        value: false,
      },
    ]),
  ]);
  const [locations, setLocations] = useState([
    data?.map((pieceOfData) => [
      {
        name: pieceOfData.name,
      },
    ]),
  ]);*/
  const [check, setCheck] = useState(
    data?.map(
      (pieceOfData) =>
        [
          {
            name: pieceOfData.name,
            value: false,
          },
        ][0]
    )
  );
  const [locations, setLocations] = useState(
    data?.map(
      (pieceOfData) =>
        [
          {
            name: pieceOfData.name,
          },
        ][0]
    )
  );
  const [valueModded, setValueModded] = useState(false);
  useEffect(() => {
    setLocations(
      data?.map(
        (pieceOfData) =>
          [
            {
              name: pieceOfData.name,
            },
          ][0]
      )
    );
    setCheck(
      data?.map(
        (pieceOfData) =>
          [
            {
              name: pieceOfData.name,
              value: false,
            },
          ][0]
      )
    );
  }, [data]);
  if (!data) return null;

  return (
    <div className="p-2 w-full flex flex-col items-center gap-2">
      <div className="flex w-full items-start">
        <div>Test</div>
        <div className="w-1/3">
          <SearchBar search={search} setSearch={setSearch} />
        </div>
        <div className="w-1/3">
          <SearchLocation
            searchLocation={searchLocation}
            setSearchLocation={setSearchLocation}
            check={check as { name: string; value: boolean }[]}
            setCheck={setCheck}
            locations={locations as { name: string }[]}
            setLocations={setLocations}
          />
        </div>
        <div className="w-1/3">
          <DateAndTime
            setValueModded={setValueModded}
            valueModded={valueModded}
            day={day}
            setDay={setDay}
            month={month}
            setMonth={setMonth}
            year={year}
            setYear={setYear}
            hour={hour}
            setHour={setHour}
            minutes={minutes}
            setMinutes={setMinutes}
            nightDay={nightDay}
            setNightDay={setNightDay}
            longDate={longDate}
            setLongDate={setLongDate}
          />
        </div>
      </div>
      <MappingData
        take={take}
        search={search}
        nightDay={nightDay}
        hour={hour}
        minutes={minutes}
        day={day}
        year={year}
        month={month}
        check={check as { name: string; value: boolean }[]}
        searchLocation={searchLocation}
        yes={valueModded}
      />
    </div>
  );
};

export default Data;
