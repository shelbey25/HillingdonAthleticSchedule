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
import EditeMain from "./EditeMain";
interface Props {}

const MainEvents: React.FC<Props> = ({}) => {
  const [droppers1, setDroppers1] = useState(false);
  const ehh = () => {
    setDroppers1(!droppers1);
  };
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <div className="flex flex-col w-full bg-slate-200 justify-between rounded-lg items-center">
        <button
          className="flex w-full bg-slate-800 justify-between rounded-lg items-center"
          onClick={ehh}
        >
          <h1 className="p-2 text-white">Set Main Locations</h1>

          <div>
            {droppers1 ? (
              <ArrowCircleDownIcon className="h-14 w-14 text-blue-700 p-2 text-white" />
            ) : (
              <ArrowCircleRightIcon className="h-14 w-14 text-blue-700 p-2 text-white" />
            )}
          </div>
        </button>
        <div className="w-full flex">
          {droppers1 ? (
            <div className="flex w-full p-4">
              <EditeMain />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MainEvents;
