import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import CheckBox from "./CheckBox";
import AllBets from "../components/AllBets";
import Data from "./Data";
import {
  ArrowCircleRightIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";

interface Props {
  searchLocation: boolean;
  setSearchLocation: any;
  check: any;
  setCheck: any;
  locations: any;
  setLocations: any;
}

const SearchLocation: React.FC<Props> = ({
  searchLocation,
  setSearchLocation,
  check,
  setCheck,
  locations,
  setLocations,
}) => {
  const setTheSearch = () => {
    const smallCheck = [];
    for (let i = check.length - 1; i > -1; i = i - 1) {
      const temp = { name: check[i].name, value: false };
      smallCheck.splice(0, 0, temp);
    }
    setCheck(smallCheck);
    setSearchLocation(!searchLocation);
  };

  return (
    <div className="flex flex-col w-full items-center gap-y-4">
      <div>
        <button onClick={setTheSearch} className="flex items-center gap-x-4">
          <div className="flex items-center gap-x-4 bg-sky-200 rounded-lg pr-8 pl-4 pt-2 pb-2 border-2 border-black hover:drop-shadow-lg hover:shadow-black">
            {searchLocation ? (
              <div className="place-items-center flex">
                <button onClick={setTheSearch}>
                  <ArrowCircleDownIcon className="h-14 w-14 text-blue-700" />
                </button>
              </div>
            ) : (
              <div className="place-items-center flex">
                <button onClick={setTheSearch}>
                  <ArrowCircleRightIcon className="h-14 w-14 text-blue-700" />
                </button>
              </div>
            )}
            <button
              onClick={setTheSearch}
              className="text-center text-blue-700 font-bold"
            >
              Search Location
            </button>
          </div>
        </button>
      </div>

      {searchLocation ? (
        <div className="flex justify-center">
          <div className="flex flex-wrap justify-center w-full grid desktop:grid-cols-7 laptop:grid-cols-6 inbetween:grid-cols-5 tablet:grid-cols-4 smallTablet:grid-cols-3 miniTablet:grid-cols-2 grid-cols-2 gap-4">
            {locations.map((location) => (
              <CheckBox
                location={location.name}
                check={check}
                setCheck={setCheck}
                key={location.name}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchLocation;
