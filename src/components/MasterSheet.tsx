import React, { useCallback, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { trpc } from "@/utils/trpc";
import { Event, Sidenote, Location } from "@prisma/client";
import StringCell from "./cells/StringCell";
import DropDownCell from "./cells/DropDownCell";
import DateCell from "./cells/DateCell";
import { useDebounce } from "@/hooks/useDebounce";

const MasterSheet = () => {
  const proportion = [25, 25, 25, 25];
  const { data, refetch } = trpc.useQuery(["event.all"]);
  const addEvent = trpc.useMutation(["event.create"]);

  if (!data) return null;
  console.log("***");
  console.log(data);
  console.log("***");
  const addRow = async () => {
    await addEvent.mutateAsync();
    refetch();
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 justify-center w-full flex flex-col">
        <div className="flex w-full justify-end">
          <div className="flex justify-end" style={{ width: `${95}%` }}>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[0]}%` }}
            >
              <h1 className="flex flex-wrap">Group</h1>
            </div>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[1]}%` }}
            >
              <h1 className="flex flex-wrap">Event</h1>
            </div>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[2]}%` }}
            >
              <h1 className="flex flex-wrap">Location</h1>
            </div>
            <div
              className="flex bg-slate-200 border-2  border-slate-800 p-1"
              style={{ width: `${proportion[3]}%` }}
            >
              <h1 className="flex flex-wrap">Date and Time</h1>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          {data.map((row) => (
            <Row data={row} key={row.id} refetch={refetch} />
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center">
        <button onClick={() => addRow()}>
          <Icon
            icon="ant-design:plus-circle-twotone"
            className="w-28 h-28 text-lime-600"
          />
        </button>
      </div>
    </div>
  );
};

export default MasterSheet;

const Row: React.FC<{
  data: Event & {
    sidenote: Sidenote | null;
    location: Location | null;
  };
  refetch: () => void;
}> = ({ data, refetch }) => {
  const [row, setRow] = useState(data);
  const deleteEvent = trpc.useMutation(["event.delete"]);
  const [location, setLocation] = useState(data.sidenote?.name as string);
  const [sidenote, setSidenote] = useState(data.location?.name as string);
  const updateEvent = trpc.useMutation(["event.update"]);
  const debouncedRow = useDebounce(row, 1000);

  const removeRow = async () => {
    await deleteEvent.mutateAsync({ id: data.id });
    refetch();
  };

  const updateGroup = async (group: string) => {
    setRow((prev) => ({ ...prev, group }));
  };

  const updateDate = async (datetimedate: Date, datetimestring: string) => {
    setRow((prev) => ({ ...prev, datetimedate, datetimestring }));
  };

  // if row hasnt been modified for 1 second, fire off the mutation
  const updateRow = async () => {
    console.log("hey");
    // check if row has been modified
    console.log(location);
    if (
      row.datetimedate.getTime() === data.datetimedate.getTime() &&
      row.group === data.group &&
      location === data.location?.name &&
      sidenote === data.sidenote?.name
    ) {
      return;
    }

    console.log({ row });
    console.log({ debouncedRow });
    console.log({
      id: debouncedRow.id,
      group: debouncedRow.group,
      sidenote: sidenote as string,
      location: location as string,
      datetimestring: debouncedRow.datetimestring,
      datetimedate: debouncedRow.datetimedate,
    });
    await updateEvent.mutateAsync({
      id: debouncedRow.id,
      group: debouncedRow.group,
      sidenote: sidenote as string,
      location: location as string,
      datetimestring: debouncedRow.datetimestring,
      datetimedate: debouncedRow.datetimedate,
    });
    refetch();
  };

  useEffect(() => {
    updateRow();
  }, [debouncedRow, sidenote, location]);

  const [drop, setDrop] = useState(false);
  const [dropA, setDropA] = useState(false);
  const baseLocations = [
    "Hawks Gym",
    "HLC",
    "Iver",
    "3G Pitch",
    "Uxbridge College",
  ];
  const baseEvents = ["practice", "game", "try-out"];

  return (
    <div className="flex w-full justify-center">
      <div className="flex justify-end items-center" style={{ width: `${5}%` }}>
        <button className="p-2" onClick={removeRow}>
          <Icon
            icon="ant-design:minus-circle-twotone"
            className="w-12 h-12 text-rose-600"
          />
        </button>
      </div>
      <div className="flex justify-center" style={{ width: `${95}%` }}>
        <StringCell value={row.group} percentage={25} setValue={updateGroup} />
        <DropDownCell
          value={sidenote}
          more={row.sidenote}
          percentage={25}
          drop={dropA}
          setDrop={setDropA}
          baseLocations={baseEvents}
          setObject={setSidenote}
          dataToFetch={"sidenote"}
        />
        <DropDownCell
          value={location}
          more={row.location}
          percentage={25}
          drop={drop}
          setDrop={setDrop}
          baseLocations={baseLocations}
          setObject={setLocation}
          dataToFetch={"location"}
        />
        <DateCell
          value={row.datetimedate}
          valueS={row.datetimestring}
          percentage={25}
          setValue={updateDate}
        />
      </div>
    </div>
  );
};
