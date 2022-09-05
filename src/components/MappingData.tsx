import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import Data from "./Data";
import { trpc } from "@/utils/trpc";

export interface Match {
  schedule: string;
}
export interface LocationYesNo {
  name: string;
  value: boolean;
}

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
interface Props {
  take: number;
  search: string;
  nightDay: string;
  hour: string;
  minutes: string;
  day: string;
  year: string;
  month: string;
  check: LocationYesNo[];
  searchLocation: boolean;
  yes: boolean;
}

const MappingData: React.FC<Props> = ({
  take,
  search,
  searchLocation,
  check,
  day,
  month,
  year,
  minutes,
  hour,
  nightDay,
  yes,
}) => {
  const monthThatOpo: { [index: string]: string } = {
    "": "",
    January: "1",
    February: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12",
  };
  const { data, refetch } = trpc.useQuery([
    "event.allByDate",
    {
      take: take,
      search: search,
      year: year,
      month: month,
      day: day,
      yes: yes,
    },
  ]);
  useEffect(() => {
    console.log("-");
    console.log(yes);
    console.log(year);
    console.log(month);
    console.log(day);
    refetch();
  }, [take, yes, day, month, year]);
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
  const co = (a: any) => {
    console.log(a);
    return null;
  };
  return (
    <div className="flex flex-col w-full allign-center justify-center gap-2">
      {data && (
        <div className="flex flex-col w-full allign-center justify-center gap-2">
          <div>{co(data)}</div>
          {data
            .map((dataItem) => [
              {
                location: dataItem.location?.name,
                group: dataItem.group,
                month: monthThat[`${dataItem.datetimestring.substring(5, 7)}`],
                year: dataItem.datetimestring.substring(0, 4),
                day: dataItem.datetimestring.substring(8, 10),
                dayNight:
                  ampmThat[`${dataItem.datetimestring.substring(11, 13)}`],
                hour: hourThat[`${dataItem.datetimestring.substring(11, 13)}`],
                minute: dataItem.datetimestring.substring(14, 16),
                date: dataItem.datetimedate,
                sideNote: dataItem.sidenote?.name,
              },
            ])
            .map((dataSmall, indexofdata) => (
              <div key={data[indexofdata].id}>
                <div>
                  {co([data[indexofdata], take, yes, search, month, day, year])}
                </div>
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
                  key={data[indexofdata].id}
                />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MappingData;
