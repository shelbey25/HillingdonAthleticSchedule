import React, { ObjectHTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Standout from "./Standout";
import SearchBar from "./SearchBar";
import type { Match } from "./AllBets";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
interface Props {
  check: LocationYesNo[];
  setCheck: any;
  location: string;
}
interface LocationYesNo {
  name: string;
  value: boolean;
}

const CheckBox: React.FC<Props> = ({ location, check, setCheck }) => {
  const checkChange = () => {
    const smallCheck = check.filter((indiv) => indiv.name !== location);
    for (let i = 0; i < check.length; i++) {
      if (location === check[i].name) {
        const temp = { name: check[i].name, value: !check[i].value };
        smallCheck.splice(i, 0, temp);
      }
    }
    setCheck(smallCheck);
  };
  return (
    <div className="flex space-x-2">
      <div className="flex w-full rounded-lg align-center place-items-center items-center bg-sky-200 border-2 border-black">
        <div className="flex gap-x-2 items-center content-center">
          {check.map((smallCheck, indic) => {
            if (smallCheck.name === location) {
              if (smallCheck.value) {
                return (
                  <div
                    className="place-content-center flex content-center h-full justify-center items-center rounded-xl p-1 h-full"
                    key={indic}
                  >
                    <button
                      onClick={checkChange}
                      className="flex w-full hover:drop-shadow-lg hover:shadow-black"
                    >
                      <input
                        type="checkbox"
                        className="w-7 h-7 rounded-xl"
                      ></input>
                    </button>
                  </div>
                );
              } else {
                return (
                  <div
                    className="content-center flex place-content-center justify-center items-center p-1 rounded-xl h-full"
                    key={indic}
                  >
                    <button
                      onClick={checkChange}
                      className="flex w-full hover:drop-shadow-lg hover:shadow-black"
                    >
                      <input
                        type="checkbox"
                        className="w-7 h-7 rounded-xl"
                      ></input>
                    </button>
                  </div>
                );
              }
            }
          })}
          <div className="flex justify-center items-center place-content-center place-items-center">
            <h1 className="text-center pr-1 text-blue-700 font-bold text-sm">
              {location}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckBox;
