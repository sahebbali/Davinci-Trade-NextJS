"use client";

import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import Link from "next/link";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

const LevelPage = () => {
  // ✅ Use the hook instead of accessing props
  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);

  const [currentLevel, setCurrentLevel] = useState(1);
  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  const limit = 10;

  // Dummy table columns
  const columns = [
    { header: "Sl", accessor: "sl" },
    { header: "User ID", accessor: "userId" },
    { header: "Full Name", accessor: "fullName" },
    { header: "Sponsor ID", accessor: "sponsorId" },
    { header: "Level", accessor: "level" },
    { header: "Joining Date", accessor: "joiningDate" },
    { header: "Activation Date", accessor: "activationDate" },
  ];

  // Dummy data
  const allData = [
    {
      sl: 1,
      userId: "USR001",
      fullName: "John Doe",
      sponsorId: "SPN001",
      level: 1,
      joiningDate: "2024-01-05",
      activationDate: "2024-01-10",
    },
    {
      sl: 2,
      userId: "USR002",
      fullName: "Jane Smith",
      sponsorId: "SPN002",
      level: 1,
      joiningDate: "2024-01-12",
      activationDate: "2024-01-18",
    },
    {
      sl: 3,
      userId: "USR003",
      fullName: "Michael Johnson",
      sponsorId: "SPN003",
      level: 2,
      joiningDate: "2024-02-02",
      activationDate: "2024-02-06",
    },
    {
      sl: 4,
      userId: "USR004",
      fullName: "Emily Davis",
      sponsorId: "SPN004",
      level: 1,
      joiningDate: "2024-02-10",
      activationDate: "2024-02-15",
    },
    {
      sl: 5,
      userId: "USR005",
      fullName: "William Brown",
      sponsorId: "SPN005",
      level: 2,
      joiningDate: "2024-03-01",
      activationDate: "2024-03-05",
    },
    {
      sl: 6,
      userId: "USR006",
      fullName: "Sophia Wilson",
      sponsorId: "SPN006",
      level: 1,
      joiningDate: "2024-03-08",
      activationDate: "2024-03-12",
    },
    {
      sl: 7,
      userId: "USR007",
      fullName: "Liam Taylor",
      sponsorId: "SPN007",
      level: 2,
      joiningDate: "2024-03-15",
      activationDate: "2024-03-20",
    },
    {
      sl: 8,
      userId: "USR008",
      fullName: "Olivia Anderson",
      sponsorId: "SPN008",
      level: 1,
      joiningDate: "2024-04-01",
      activationDate: "2024-04-06",
    },
    {
      sl: 9,
      userId: "USR009",
      fullName: "James Thomas",
      sponsorId: "SPN009",
      level: 2,
      joiningDate: "2024-04-10",
      activationDate: "2024-04-14",
    },
    {
      sl: 10,
      userId: "USR010",
      fullName: "Isabella Martinez",
      sponsorId: "SPN010",
      level: 1,
      joiningDate: "2024-04-20",
      activationDate: "2024-04-25",
    },
    {
      sl: 11,
      userId: "USR011",
      fullName: "Ethan White",
      sponsorId: "SPN011",
      level: 2,
      joiningDate: "2024-05-01",
      activationDate: "2024-05-05",
    },
    {
      sl: 12,
      userId: "USR012",
      fullName: "Mia Harris",
      sponsorId: "SPN012",
      level: 1,
      joiningDate: "2024-05-07",
      activationDate: "2024-05-12",
    },
    {
      sl: 13,
      userId: "USR013",
      fullName: "Alexander Scott",
      sponsorId: "SPN013",
      level: 2,
      joiningDate: "2024-05-15",
      activationDate: "2024-05-20",
    },
    {
      sl: 14,
      userId: "USR014",
      fullName: "Charlotte Young",
      sponsorId: "SPN014",
      level: 1,
      joiningDate: "2024-06-01",
      activationDate: "2024-06-06",
    },
    {
      sl: 15,
      userId: "USR015",
      fullName: "Benjamin King",
      sponsorId: "SPN015",
      level: 2,
      joiningDate: "2024-06-10",
      activationDate: "2024-06-15",
    },
    {
      sl: 16,
      userId: "USR016",
      fullName: "Amelia Wright",
      sponsorId: "SPN016",
      level: 1,
      joiningDate: "2024-06-20",
      activationDate: "2024-06-25",
    },
    {
      sl: 17,
      userId: "USR017",
      fullName: "Lucas Green",
      sponsorId: "SPN017",
      level: 2,
      joiningDate: "2024-07-01",
      activationDate: "2024-07-05",
    },
    {
      sl: 18,
      userId: "USR018",
      fullName: "Harper Baker",
      sponsorId: "SPN018",
      level: 1,
      joiningDate: "2024-07-10",
      activationDate: "2024-07-14",
    },
    {
      sl: 19,
      userId: "USR019",
      fullName: "Daniel Adams",
      sponsorId: "SPN019",
      level: 2,
      joiningDate: "2024-07-18",
      activationDate: "2024-07-22",
    },
    {
      sl: 20,
      userId: "USR020",
      fullName: "Evelyn Nelson",
      sponsorId: "SPN020",
      level: 1,
      joiningDate: "2024-08-01",
      activationDate: "2024-08-05",
    },
  ];

  // Filter by level
  const filteredData = allData.filter((item) => item.level === currentLevel);
  const total = filteredData.length;

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const renderRow = (item, index) => (
    <tr
      key={item.userId}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        {(page - 1) * limit + (index + 1)}
      </td>
      <td className="">{item.userId}</td>
      <td className="">{item.fullName}</td>
      <td className="">{item.sponsorId}</td>
      <td className="">{item.level}</td>
      <td className="">{item.joiningDate}</td>
      <td className="">{item.activationDate}</td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-lg font-semibold">
          Level Partner ({total}) - Level {currentLevel}
        </h1>
        <TableSearch />
      </div>

      {/* Level Buttons */}
      <div className="flex gap-2 mb-4">
        {levels.map((level) => (
          <Link
            key={level}
            href={`?page=1`} // reset to page 1 on level change
            onClick={() => setCurrentLevel(level)}
            className={`px-2 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
              currentLevel === level
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-800 hover:bg-blue-200"
            }`}
          >
            Level {level}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={paginatedData} />
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination page={page} count={total} />
      </div>
    </div>
  );
};

export default LevelPage;
