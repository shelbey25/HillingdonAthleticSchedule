import { useState, useEffect } from "react";
import Link from "next/link";
import AllBets from "../components/AllBets";
import Master from "../components/Master";
import { trpc } from "@/utils/trpc";

export default function IndexPage() {
  /*if (isLoading) {
    return <div>Loading</div>;
  }
  if (data) {
    return <div>{data.greeting}</div>;
  }*/
  return (
    <div className="flex items-start w-screen h-max min-h-screen bg-blue-700 pt-4">
      <div className="flex flex-col items-center justify-start w-full">
        <div className="flex w-full justify-between items-start">
          <div className="w-1/5 flex"></div>
          <div className="w-3/5 justify-center flex flex-col gap-y-2">
            <h1 className="text-3xl smallTablet:text-5xl font-bold text-white font-jacobyLikes text-center">
              School Name
            </h1>
            <h1 className="text-3xl smallTablet:text-5xl font-bold text-white font-jacobyLikes text-center">
              Sports And Activities
            </h1>
            <h1 className="text-3xl smallTablet:text-5xl font-bold text-white font-jacobyLikes text-center">
              2022-2023
            </h1>
          </div>
          <div className="w-1/5 flex justify-end pr-4">
            <Master />
          </div>
        </div>
        <div className="w-full">
          <h1>Test</h1>
          <AllBets />
        </div>
      </div>
    </div>
  );
}
