import React from "react";

const today = new Date();
const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

const TodaysClassesSchedule = () => {
  return (
    <div className="w-full">
      <div className="my-10 mb-6 flex w-full min-w-full items-center justify-between">
        <h2 className="font-poppinsBlack mb-2 text-2xl font-semibold text-brandBlack">
          Today's Classes
        </h2>
        <button className="rounded-full border-2 bg-transparent px-4 py-2 text-gray-600">
          View All
        </button>
      </div>

      <div className="flex w-full justify-between">
        <div className="mb-4 flex w-fit items-center justify-between gap-2 bg-[#F2F2F7]">
          <span className="text-lg">{weekday}</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primaryBrand text-center font-bold text-white">
            22
          </span>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default TodaysClassesSchedule;
