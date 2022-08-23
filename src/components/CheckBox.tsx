import React, { ObjectHTMLAttributes } from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import Standout from "./Standout";
import SearchBar from "./SearchBar";
import type { Match } from "./AllBets";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
interface Props {
  check: any;
  setCheck: any;
  location: string;
  key: string;
}

const CheckBox: React.FC<Props> = ({ location, check, setCheck, key }) => {
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
      <div className="flex w-full rounded-lg align-center place-items-center hover:drop-shadow-lg hover:shadow-black items-center bg-sky-200 border-2 border-black">
        <button onClick={checkChange}>
          <div className="flex gap-x-2 items-center content-center">
            {check.map((smallCheck) => {
              if (smallCheck.name === location) {
                if (smallCheck.value) {
                  return (
                    <div className="place-content-center content-center h-full">
                      <CheckIcon className="self-center place-content-center w-11 h-11 text-green-800" />
                    </div>
                  );
                } else {
                  return (
                    <div className="content-center place-content-center">
                      <XIcon className="self-center w-11 h-11 text-red-800 place-content-center" />
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
        </button>
      </div>
    </div>
  );
};

export default CheckBox;
