import React, { useMemo } from "react";
import { useState, useEffect } from "react";
import { HomeIcon } from "@heroicons/react/solid";
import {
  GiBasketballBasket,
  GiBaseballGlove,
  GiSoccerBall,
  GiTennisRacket,
} from "react-icons/gi";
import { Icon } from "@iconify/react";
interface Props {
  info: any;
  search: string;
  check: LocationYesNo[];
  searchLocation: boolean;
  day: string;
  month: string;
  year: string;
  hour: string;
  minutes: string;
  nightDay: string;
  key: string;
}

interface LocationYesNo {
  name: string;
  value: boolean;
}

const Standout: React.FC<Props> = ({
  info,
  search,
  check,
  searchLocation,
  day,
  month,
  year,
  hour,
  minutes,
  nightDay,
  key,
}) => {
  const [ct, setCt] = useState(false);
  useEffect(() => {
    check.forEach((smallCheck) => {
      if (smallCheck.name === info.location) {
        setCt(smallCheck.value);
      }
    });
  }, [check]);

  const logo = (sport: string) => {
    return info.group.toUpperCase().includes(sport.toUpperCase());
  };
  const dayWeek: { [index: string]: string } = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday",
  };
  if (
    (info.year.toUpperCase().includes(year.toUpperCase()) || year === "") &&
    (info.month.toUpperCase().includes(month.toUpperCase()) || month === "") &&
    (info.day.toUpperCase().includes(day.toUpperCase()) || day === "") &&
    (info.hour.toUpperCase().includes(hour.toUpperCase()) || hour === "") &&
    (info.minute.toUpperCase().includes(minutes.toUpperCase()) ||
      minutes === "") &&
    (info.dayNight.toUpperCase().includes(nightDay.toUpperCase()) ||
      nightDay === "Neither")
  ) {
    if (ct || !searchLocation) {
      if (
        search === "" ||
        info.group.toUpperCase().includes(search.toUpperCase())
      ) {
        return (
          <div className="flex items-center justify-start w-full bg-white rounded-lg border-2 border-black p-2">
            <div className="flex flex-wrap items-center w-full justify-between gap-y-2">
              <div
                className="flex flex-col tablet:flex-row justify-start"
                style={{ width: `${600 / 15}%` }}
              >
                <h1 className="font-bold text-base tablet:text-xl text-start text-blue-700 font-bold">
                  {info.group}
                </h1>
                <h1 className="pl-0 inline-block align-middle pt-1 tablet:pt-0 tablet:pl-4 italic text-base tablet:text-xl text-start text-slate-500 font-bold">
                  {info.sideNote}
                </h1>
              </div>

              <div
                className="flex justify-start"
                style={{ width: `${200 / 15}%` }}
              >
                <h1 className="text-base tablet:text-xl pl-1 text-start text-blue-700 font-bold">
                  {info.month.substring(0, 3)} {info.day}
                </h1>
              </div>
              <div
                className="flex pl-8 justify-start"
                style={{ width: `${400 / 15}%` }}
              >
                <h1 className="text-base tablet:text-xl text-start text-blue-700 font-bold">
                  {dayWeek[`${info.date.getDay().toString()}`].substring(0, 3)}{" "}
                  - {info.hour}:{info.minute} {info.dayNight}
                </h1>
              </div>
              <div
                className="flex justify-start"
                style={{ width: `${300 / 15}%` }}
              >
                <h1 className="pl-1 text-base tablet:text-xl text-start text-blue-700 font-bold text-clip overflow-hidden">
                  {info.location}
                </h1>
              </div>
            </div>
          </div>
        );
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
};
export default Standout;
