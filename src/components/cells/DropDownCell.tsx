import { trpc } from "@/utils/trpc";
import { Sidenote, Location } from "@prisma/client";
import { modifyRouteRegex } from "next/dist/lib/load-custom-routes";
import React, { FC, useEffect, useState } from "react";
import { GiModernCity } from "react-icons/gi";
import DropDownItems from "./dropdown/DropDownItems";
import DropDownSearch from "./dropdown/DropDownSearch";
import DropDownTypeDos from "./dropdown/DropDownTypeDos";
import DropDownTypeUno from "./dropdown/DropDownTypeUno";

const DropDownCell: FC<{
  percentage: number;
  value: string | undefined;
  more: Location | Sidenote | null;
  drop: boolean;
  setDrop: (value: boolean) => void;
  setObject: (value: string) => void;
  dataToFetch: "location" | "sidenote";
}> = ({ percentage, value, more, drop, setDrop, setObject, dataToFetch }) => {
  const changeClick = () => {
    setDrop(!drop);
    setOtherDrop(false);
  };
  const clickerDos = () => {
    setOtherDrop(!otherDrop);
  };
  const putItHere = () => {
    if (value === "*$#*/**" || value === undefined) {
      return "Select Location";
    } else {
      return value;
    }
  };
  const [otherDrop, setOtherDrop] = useState(false);
  if (dataToFetch === "location") {
    const { data: data2, refetch: refetch2 } = trpc.useQuery([
      "location.allRisePopular",
    ]);
    if (!data2) return null;
    return (
      <DropDownTypeUno
        value={value}
        more={more}
        percentage={percentage}
        drop={drop}
        setDrop={setDrop}
        setObject={setObject}
        dataToFetch={dataToFetch}
        data={data2}
      />
    );
  }
  if (dataToFetch === "sidenote") {
    const data2 = ["practice", "game", "try-out"];
    return (
      <DropDownTypeDos
        value={value}
        more={more}
        percentage={percentage}
        drop={drop}
        setDrop={setDrop}
        setObject={setObject}
        dataToFetch={dataToFetch}
        data={data2}
      />
    );
  }
  return <div>Hello</div>;
};

export default DropDownCell;
