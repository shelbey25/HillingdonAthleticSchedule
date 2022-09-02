import { useDebounce } from "@/hooks/useDebounce";
import { trpc } from "@/utils/trpc";
import React, { FC, useEffect, useState } from "react";

const SettingsCell: FC<{
  value: string;
  refetch: () => void;
  numBum: number;
}> = ({ value, refetch, numBum }) => {
  const [blanko, setBlanko] = useState(value);
  const debouncedRow = useDebounce(blanko, 1000);
  const modLoco = trpc.useMutation(["location.update"]);
  const fillerBill = async () => {
    try {
      await modLoco.mutateAsync({ id: numBum, name: blanko, important: true });
      refetch();
    } catch (e) {
      console.log("yolo");
    }
  };
  useEffect(() => {
    fillerBill();
  }, [debouncedRow]);
  return (
    <div className="flex flex-wrap bg-slate-50 border-2  border-slate-800 p-1">
      <input
        className="flex flex-wrap bg-slate-50 w-full p-1"
        placeholder="Location"
        value={blanko}
        onChange={(e) => setBlanko(e.target.value)}
      />
    </div>
  );
};

export default SettingsCell;
