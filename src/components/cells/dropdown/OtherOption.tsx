import { trpc } from "@/utils/trpc";
import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";

const OtherOption: FC<{ location: String; search: String }> = ({
  location,
  search,
}) => {
  if (
    (search === "" || location.toUpperCase().includes(search.toUpperCase())) &&
    location !== ""
  ) {
    return (
      <div className="flex border-2 border-slate-800 p-1 w-full">
        <button className="flex w-full">
          <h1>{location}</h1>
        </button>
      </div>
    );
  } else {
    return null;
  }
};

export default OtherOption;
