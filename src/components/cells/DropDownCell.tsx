import { Sidenote, Location } from "@prisma/client";
import { modifyRouteRegex } from "next/dist/lib/load-custom-routes";
import React, { FC, useEffect, useState } from "react";
import { GiModernCity } from "react-icons/gi";
import DropDownItems from "./dropdown/DropDownItems";
import DropDownSearch from "./dropdown/DropDownSearch";

const DropDownCell: FC<{
  percentage: number;
  value: string | undefined;
  more: Location | Sidenote | null;
  drop: boolean;
  setDrop: (value: boolean) => void;
  baseLocations: string[];
  setObject: (value: string) => void;
  dataToFetch: "location" | "sidenote";
}> = ({
  percentage,
  value,
  more,
  drop,
  setDrop,
  baseLocations,
  setObject,
  dataToFetch,
}) => {
  const changeClick = () => {
    setDrop(!drop);
    setOtherDrop(false);
  };
  const clickerDos = () => {
    setOtherDrop(!otherDrop);
  };
  const putItHere = () => {
    if (value === "" || value === undefined) {
      return "Select Location";
    } else {
      return value;
    }
  };
  const [otherDrop, setOtherDrop] = useState(false);
  return (
    <div
      className="flex flex-wrap bg-slate-50 border-2  border-slate-800 p-1 flex-col"
      style={{ width: `${percentage}%` }}
    >
      <button
        className="flex w-full border-2 border-slate-400 hover:border-slate-800 p-2"
        onClick={changeClick}
      >
        <h1>{putItHere()}</h1>
      </button>
      <div className="w-full flex ">
        <div className="flex overflow-auto w-1/2 max-h-40 ">
          {drop && (
            <div className="flex w-full flex-col">
              {baseLocations.map((baseLocation, indexT) => (
                <DropDownItems
                  key={indexT}
                  setObject={setObject}
                  more={more}
                  drop={drop}
                  setDrop={setDrop}
                  setOtherDrop={setOtherDrop}
                  location={baseLocation}
                />
              ))}
              <div className="flex border-2  border-slate-800 p-1 w-full">
                <button
                  className="flex w-full justify-between"
                  onClick={clickerDos}
                >
                  <h1>Other</h1>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="flex overflow-auto w-1/2 max-h-40">
          {otherDrop && (
            <DropDownSearch
              setObject={setObject}
              changeClick={changeClick}
              more={more}
              dataToFetch={dataToFetch}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDownCell;
