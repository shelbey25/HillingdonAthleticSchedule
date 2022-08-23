import React from "react";
import Image from "next/image";
import Standout from "./Standout";
import { useState, useEffect } from "react";
import Link from "next/link";
import DropDown from "../components/DropDown";
import AllBets from "../components/AllBets";
import Data from "./Data"
interface Props {
  cell: string | HalfDate;
  day: string;
  month: string;
  year: string;
  ap: string;
  hour: string;
  min: string;
  setCell: any;
  cellPadding: string[];
  smId: number;
  largeCell: Booking[];
}
interface Booking {
  name: string;
  location: string;
  date: Date;
}
interface HalfDate {
  day: string;
  month: string;
  year: string;
  hour: string;
  minute: string;
  ampm: string;
}

const FormDateObject: React.FC<Props> = ({ cell, day, month, year, ap, hour, min, setCell, cellPadding, smId, largeCell }) => {

  
const setTheCellParticularly = (whereTo: string, switchValue: string) => {
    const exceptCell = largeCell.filter((indiv, index) => smId !== index)
  const theCellSp = largeCell.find((indiv, index) => smId !== index)
  const theCell = theCellSp?.date
  //day
  if (whereTo === "day") {
    try {
    if (theCell.ampm === "AM") {
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: new Date(theCell.year + "-" + theCell.month + "-" + switchValue + "T" + actualHour + ":" +  theCell.minute + ":00.000Z")}
      exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
    }
    if (theCell.ampm === "PM") {
      if (theCell.hour !== "12") {
    const actualHour = (Number(theCell.hour) + 12).toString()
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: new Date(theCell.year + "-" + theCell.month + "-" + switchValue + "T" + actualHour + ":" +  theCell.minute + ":00.000Z")}
        exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
      }
      if (theCell.hour === "12") {
    const actualHour = "00"
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: new Date(theCell.year + "-" + theCell.month + "-" + switchValue + "T" + actualHour + ":" +  theCell.minute + ":00.000Z")}
        exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
      }
    }
    } catch (error) {
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: {day: switchValue, month: theCell.month, year: theCell.year, hour: theCell.hour, minute: theCell.minute, ampm: theCell.ampm}
    exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
    }


    //month
    if (whereTo === "month") {
    try {
    if (theCell.ampm === "AM") {
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: new Date(theCell.year + "-" + switchValue + "-" + theCell.day + "T" + actualHour + ":" +  theCell.minute + ":00.000Z")}
      exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
    }
    if (theCell.ampm === "PM") {
      if (theCell.hour !== "12") {
    const actualHour = (Number(theCell.hour) + 12).toString()
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: new Date(theCell.year + "-" + switchValue + "-" + theCell.day + "T" + actualHour + ":" +  theCell.minute + ":00.000Z")}
        exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
      }
      if (theCell.hour === "12") {
    const actualHour = "00"
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: new Date(theCell.year + "-" + switchValue + "-" + theCell.day + "T" + actualHour + ":" +  theCell.minute + ":00.000Z")}
        exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
      }
    }
    } catch (error) {
    const theRow = {name: theCellSp?.name, location: theCellSp?.location, date: {day: theCell.day, month: switchValue, year: theCell.year, hour: theCell.hour, minute: theCell.minute, ampm: theCell.ampm}
    exceptCell.splice(smId, 0, theRow);
    setCell(exceptCell)
    }
  }
    
  }

  return (
    <div className="flex flex-wrap bg-slate-50 p-1 gap-x-2 w-full">
      <textarea className="flex flex-wrap bg-slate-50 w-full p-1" style={{ width: `${8}%` }}
        placeholder="DD"
        value={day}
        onChange={(e) => setTheCellParticularly([5, 7], e.target.value)} />
      <h1  style={{ width: `${2.5}%` }}>/</h1>
      <textarea className="flex flex-wrap bg-slate-50 w-full p-1" style={{ width: `${8}%` }}
        placeholder="MM"
        value={month}
        onChange={(e) => setTheCellParticularly([8, 10], e.target.value)} />
      <h1  style={{ width: `${2.5}%` }}>/</h1>
      <textarea className="flex flex-wrap bg-slate-50 w-full p-1" style={{ width: `${16}%` }}
        placeholder="YYYY"
        value={year}
        onChange={(e) => setTheCellParticularly([0, 4], e.target.value)} />
      <h1  style={{ width: `${2.5}%` }}> </h1>
      <textarea className="flex flex-wrap bg-slate-50 w-full p-1" style={{ width: `${8}%` }}
        placeholder="HOUR"
        value={hour}
        onChange={(e) => setTheCellParticularly([11, 13], e.target.value, "HOUR")} />
      <h1  style={{ width: `${2.5}%` }}>:</h1>
      <textarea className="flex flex-wrap bg-slate-50 w-full p-1" style={{ width: `${8}%` }}
        placeholder="MIN"
        value={min}
        onChange={(e) => setTheCellParticularly([14, 16], e.target.value)} />
      <h1  style={{ width: `${2.5}%` }}> </h1>
      <textarea className="flex flex-wrap bg-slate-50 w-full p-1" style={{ width: `${8}%` }}
        placeholder="AM/PM"
        value={ap}
        onChange={(e) => setTheCellParticularly([11, 13], e.target.value, "AM/PM")} />
    </div >
  );

  

};

export default FormDateObject;
