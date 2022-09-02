import Link from "next/link";
import MasterSheet from "../components/MasterSheet";
import { Icon } from "@iconify/react";
import MainEvents from "@/components/MainEvents";

const Settings = () => {
  return (
    <div className="flex w-full h-max bg-blue-700 p-4 min-h-screen flex-col">
      <div className="flex w-full">
        <div className="w-1/5 flex">
          <div>
            <Link href="/create">
              <div className="p-2 rounded-lg text-white hover:bg-gray-500	bg-gray-800 divide-x-4 hover:shadow hover:shadow-black border-4 hover:border-bg-gray-800 border-bg-gray-400 text-center">
                <h1>Back</h1>
              </div>
            </Link>
          </div>
        </div>
        <div className="w-3/5 justify-start flex flex-col gap-y-2">
          <h1 className="text-3xl smallTablet:text-5xl font-bold text-white font-jacobyLikes text-center">
            Settings
          </h1>
        </div>
        <div className="w-1/5 flex justify-end pr-4"></div>
      </div>
      <div className="flex w-full p-4">
        <MainEvents />
      </div>
    </div>
  );
};
export default Settings;
