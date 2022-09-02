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
interface Props {}

const MainEvents: React.FC<Props> = ({}) => {
  return (
    <div className="flex flex-wrap w-full items-center justify-center">
      <button className="flex w-full bg-slate-800 justify-between rounded-lg items-center">
        <h1 className="p-2 text-white">Set Main Locations</h1>
        <ArrowCircleDownIcon className="h-14 w-14 text-blue-700 p-2 text-white" />
      </button>
    </div>
  );
};

export default MainEvents;
