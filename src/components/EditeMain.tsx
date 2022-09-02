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
import SettingsCell from "./cells/SettingsCell";
import { trpc } from "@/utils/trpc";
import { Icon } from "@iconify/react";
interface Props {}

const EditeMain: React.FC<Props> = ({}) => {
  const { data, refetch } = trpc.useQuery(["location.allRise"]);
  const addLocoToco = trpc.useMutation(["location.create"]);
  const deleteLoci = trpc.useMutation(["location.deleteUsYeetus"]);
  if (!data) return null;
  const addRow = async () => {
    await addLocoToco.mutateAsync();
    refetch();
  };
  const removeRow = async (numBum: number) => {
    await deleteLoci.mutateAsync({ id: numBum });
    refetch();
  };
  return (
    <div className="flex flex-col w-full items-start grid-cols-4 grid justify-center justify-items-center">
      {data?.map((locationA, miceroo) => (
        <div className="flex w-full p-1" key={miceroo}>
          <button className="pr-2" onClick={() => removeRow(locationA.id)}>
            <Icon
              icon="ant-design:minus-circle-twotone"
              className="w-8 h-8 text-rose-600"
            />
          </button>
          <SettingsCell
            value={locationA.name}
            refetch={refetch}
            numBum={locationA.id}
          />
        </div>
      ))}
      <button
        onClick={() => addRow()}
        className="w-full h-full justify-start p-1"
      >
        <Icon
          icon="ant-design:plus-circle-twotone"
          className="w-8 h-8 text-lime-600"
        />
      </button>
    </div>
  );
};

export default EditeMain;
