import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropDown from "../components/DropDown";
import AllBets from "../components/AllBets";
import Data from "./Data";
interface Props {}

const Master: React.FC<Props> = ({}) => {
  return (
    <Link href="/create">
      <a className="p-2 rounded-lg text-white hover:bg-gray-500	bg-gray-800 divide-x-4 hover:shadow hover:shadow-black border-4 hover:border-bg-gray-800 border-bg-gray-400 text-center">
        Admin
      </a>
    </Link>
  );
};

export default Master;
