import { trpc } from "@/utils/trpc";
import React, { FC, useState } from "react";
import { Icon } from "@iconify/react";
import OtherOption from "./OtherOption";
import { Sidenote, Location } from "@prisma/client";

const DropDownSearch: FC<{
  setObject: (value: string) => void;
  changeClick: () => void;
  more: Location | Sidenote | null;
}> = ({ setObject, changeClick, more }) => {
  // okay shelbe this isnt the way to write a component like this. lemme help you out.
  // we are going to use something called generics. also why are you handling the updates here???
  const { data, refetch } = trpc.useQuery(["location.all"]);
  const [search, setSearch] = useState("");
  const addMenu = async () => {
    changeClick();
    setObject(search);
    refetch();
  };
  return (
    <div className="flex border-2 border-slate-800 p-1 w-full gap-y-1 flex-col">
      <input
        className="font-bold rounded-sm p-2 border-2 border-black flex w-full h-1/4"
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="flex w-full h-3/4 overflow-auto flex-col">
        {data && (
          <div>
            {data.map((location) => (
              <div>
                <OtherOption location={location.name} search={search} />
              </div>
            ))}
          </div>
        )}
        <button
          className="flex w-full bg-lime-300 p-1 justify-between border-2 border-slate-800"
          onClick={addMenu}
        >
          <h1>Add</h1>
          <Icon
            icon="ant-design:plus-circle-twotone"
            className="w-6 h-6 text-lime-800"
          />
        </button>
      </div>
    </div>
  );
};

export default DropDownSearch;
