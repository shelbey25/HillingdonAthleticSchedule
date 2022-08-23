import Link from "next/link";
import MasterSheet from "../components/MasterSheet";

const Create = () => {
  return (
    <div className="flex w-full h-max bg-blue-700 p-4 min-h-screen">
      <div className="flex flex-col items-center justify-start w-full">
        <div className="flex w-full justify-between items-start">
          <div className="w-1/5 flex"></div>
          <div className="w-3/5 justify-center flex flex-col gap-y-2">
            <h1 className="text-3xl smallTablet:text-5xl font-bold text-white font-jacobyLikes text-center">
              Hillingdon
            </h1>
            <h1 className="text-3xl smallTablet:text-5xl font-bold text-white font-jacobyLikes text-center">
              Master Schedule
            </h1>
            <h1 className="text-3xl smallTablet:text-5xl font-bold text-white font-jacobyLikes text-center">
              2022-2023
            </h1>
          </div>
          <div className="w-1/5 flex justify-end">
            <Link href="/">
              <a className="p-2 rounded-lg text-white hover:bg-gray-500	bg-gray-800 divide-x-4 hover:shadow hover:shadow-black border-4 hover:border-bg-gray-800 border-bg-gray-400">
                Main
              </a>
            </Link>
          </div>
        </div>
        <div className="flex p-4 w-full items-center justify-center">
          <MasterSheet />
        </div>
      </div>
    </div>
  );
};
export default Create;
