"use client";

import { useState } from "react";
import { DateRange } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export default function DateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // read previous range from URL (if any)
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: searchParams.get("fromDate")
        ? new Date(searchParams.get("fromDate"))
        : new Date(),
      endDate: searchParams.get("toDate")
        ? new Date(searchParams.get("toDate"))
        : new Date(),
      key: "selection",
    },
  ]);

  const handleApply = () => {
    const params = new URLSearchParams(searchParams);
    const fromDate = range[0].startDate.toISOString().split("T")[0];
    const toDate = range[0].endDate.toISOString().split("T")[0];
    params.set("fromDate", fromDate);
    params.set("toDate", toDate);
    params.set("page", 1); // reset pagination
    router.push(`?${params.toString()}`);
    setShowPicker(false);
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("fromDate");
    params.delete("toDate");
    router.push(`?${params.toString()}`);
    setShowPicker(false);
  };

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="px-4 py-2 bg-lamaYellow rounded text-sm font-semibold cursor-pointer"
      >
        {searchParams.get("fromDate") && searchParams.get("toDate")
          ? `${searchParams.get("fromDate")} → ${searchParams.get("toDate")}`
          : "Select Date Range"}
      </button>

      {/* Date Range Popup */}
      {showPicker && (
        <div className="absolute right-0 z-50 bg-white p-3 shadow-lg rounded-md mt-2">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={range}
            rangeColors={["#facc15"]} // yellow theme
          />
          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={handleClear}
              className="px-3 py-1 text-sm border rounded"
            >
              Clear
            </button>
            <button
              onClick={handleApply}
              className="px-3 py-1 text-sm bg-lamaYellow rounded font-semibold"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
