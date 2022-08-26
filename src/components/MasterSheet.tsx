import React from "react";
import { Icon } from "@iconify/react";
import { trpc } from "@/utils/trpc";
import { Event } from "@prisma/client";
import StringCell from "./cells/StringCell";
import DateCell from "./cells/DateCell";

const MasterSheet = () => {
  const proportion = [25, 25, 25, 25];
  const { data, refetch } = trpc.useQuery(["event.all"]);
  const addEvent = trpc.useMutation(["event.create"]);

  if (!data) return null;
  console.log({ data });

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

const Row: React.FC<{ data: Event; refetch: () => void }> = ({
  data,
  refetch,
}) => {
  const deleteEvent = trpc.useMutation(["event.delete"]);
  const updateEvent = trpc.useMutation(["event.update"]);

  const removeRow = async () => {
    await deleteEvent.mutateAsync({ id: data.id });
    refetch();
  };

  const updateGroup = async (group: string) => {
    await updateEvent.mutateAsync({ ...data, group });
    refetch();
  };

  const updateLocation = async (location: string) => {
    await updateEvent.mutateAsync({ ...data, location });
    refetch();
  };

  const updateSidenote = async (sidenote: string) => {
    await updateEvent.mutateAsync({ ...data, sidenote });
    refetch();
  };

  const updateDate = async (date: Date) => {
    console.log(date);
    await updateEvent.mutateAsync({ ...data, datetimedate: date });
    refetch();
  };

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
        <StringCell value={data.group} percentage={25} setValue={updateGroup} />
        <StringCell
          value={data.sidenote}
          percentage={25}
          setValue={updateSidenote}
        />
        <StringCell
          value={data.location}
          percentage={25}
          setValue={updateLocation}
        />
        <DateCell
          value={data.datetimedate}
          percentage={25}
          setValue={updateDate}
        />
      </div>
    </div>
  );
};
