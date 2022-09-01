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
import MappingData from "./MappingData";

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

const Data: React.FC<Props> = ({ take }) => {
  const [search, setSearch] = useState("");
  const [searchLocation, setSearchLocation] = useState(false);
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [hour, setHour] = useState("");
  const [minutes, setMinutes] = useState("");
  const [nightDay, setNightDay] = useState("Neither");
  const [longDate, setLongDate] = useState("2022-09-01T17:30");
  const [check, setCheck] = useState([
    { name: "Farmer Gym", value: false },
    { name: "Blue Gym", value: false },
    { name: "Soccer Fields", value: false },
    { name: "Swimming Pool", value: false },
    { name: "Paddington Rec", value: false },
    { name: "Primrose Hill", value: false },
    { name: "Weight Room", value: false },
  ]);
  const [locations, setLocations] = useState([
    { name: "Farmer Gym" },
    { name: "Blue Gym" },
    { name: "Soccer Fields" },
    { name: "Swimming Pool" },
    { name: "Paddington Rec" },
    { name: "Primrose Hill" },
    { name: "Weight Room" },
  ]);
  const [valueModded, setValueModded] = useState(false);
  return (
    <div className="p-2 w-full flex flex-col items-center gap-2">
      <SearchBar search={search} setSearch={setSearch} />

      <SearchLocation
        searchLocation={searchLocation}
        setSearchLocation={setSearchLocation}
        check={check}
        setCheck={setCheck}
        locations={locations}
        setLocations={setLocations}
      />

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
      <MappingData
        take={take}
        search={search}
        nightDay={nightDay}
        hour={hour}
        minutes={minutes}
        day={day}
        year={year}
        month={month}
        check={check}
        searchLocation={searchLocation}
        yes={valueModded}
      />
    </div>
  );
};

export default Data;
