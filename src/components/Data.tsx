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
  dataSet: (Event & {
    sidenote: Sidenote | null;
    location: Location | null;
  })[];
}

interface allInfo {
  id: number;
  location: string;
  group: string;
  datetimestring: string;
  datetimedate: Date;
  sidenote: string;
}

const Data: React.FC<Props> = ({ dataSet }) => {
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
  const monthThat: { [index: string]: string } = {
    "1": "January",
    "2": "February",
    "3": "March",
    "4": "April",
    "5": "May",
    "6": "June",
    "7": "July",
    "8": "August",
    "9": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };
  const hourThat: { [index: string]: string } = {
    "00": "12",
    "01": "1",
    "02": "2",
    "03": "3",
    "04": "4",
    "05": "5",
    "06": "6",
    "07": "7",
    "08": "8",
    "09": "9",
    "10": "10",
    "11": "11",
    "12": "12",
    "13": "1",
    "14": "2",
    "15": "3",
    "16": "4",
    "17": "5",
    "18": "6",
    "19": "7",
    "20": "8",
    "21": "9",
    "22": "10",
    "23": "11",
  };
  const ampmThat: { [index: string]: string } = {
    "00": "am",
    "01": "am",
    "02": "am",
    "03": "am",
    "04": "am",
    "05": "am",
    "06": "am",
    "07": "am",
    "08": "am",
    "09": "am",
    "10": "am",
    "11": "am",
    "12": "pm",
    "13": "pm",
    "14": "pm",
    "15": "pm",
    "16": "pm",
    "17": "pm",
    "18": "pm",
    "19": "pm",
    "20": "pm",
    "21": "pm",
    "22": "pm",
    "23": "pm",
  };
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

      {dataSet
        .map((dataItem) => [
          {
            location: dataItem.location?.name,
            group: dataItem.group,
            month: monthThat[`${dataItem.datetimestring.substring(5, 7)}`],
            year: dataItem.datetimestring.substring(0, 4),
            day: dataItem.datetimestring.substring(8, 10),
            dayNight: ampmThat[`${dataItem.datetimestring.substring(11, 13)}`],
            hour: hourThat[`${dataItem.datetimestring.substring(11, 13)}`],
            minute: dataItem.datetimestring.substring(14, 16),
            date: dataItem.datetimedate,
            sideNote: dataItem.sidenote?.name,
          },
        ])
        .map((dataSmall, indexofdata) => (
          <Standout
            info={dataSmall[0] as smallInfo}
            search={search}
            check={check}
            searchLocation={searchLocation}
            day={day}
            month={month}
            year={year}
            minutes={minutes}
            hour={hour}
            nightDay={nightDay}
            key={dataSet[indexofdata].id}
          />
        ))}
    </div>
  );
};

export default Data;
