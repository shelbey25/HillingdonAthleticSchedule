import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import AllBets from "../components/AllBets";
import Data from "./Data";
interface Props {
  search: string;
  setSearch: any;
}

const SearchBar: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <form className="flex justify-center w-full p-2">
      <input
        className="bg-sky-200 text-blue-700 font-bold hover:shadow hover:shadow-black rounded-sm p-2 w-1/2 border-2 border-black"
        type="text"
        placeholder="Search Groups"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
