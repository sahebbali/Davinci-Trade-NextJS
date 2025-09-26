// import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
// import { getUserDepositHistory } from "@/lib/actions/deposit.action";

const LevelOnePage = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 10;
  console.log({ page, limit });

  const total = 20;

  const columns = [
    { header: "Sl", accessor: "sl" },
    { header: "User ID", accessor: "userId" },
    { header: "Full Name", accessor: "fullName" },
    { header: "Joining Date", accessor: "joiningDate" },
    { header: "Activation Date", accessor: "activationDate" },
  ];

  const data = [
    {
      sl: 1,
      userId: "USR001",
      fullName: "John Doe",
      joiningDate: "2024-01-05",
      activationDate: "2024-01-10",
    },
    {
      sl: 2,
      userId: "USR002",
      fullName: "Jane Smith",
      joiningDate: "2024-01-12",
      activationDate: "2024-01-18",
    },
    {
      sl: 3,
      userId: "USR003",
      fullName: "Michael Johnson",
      joiningDate: "2024-02-02",
      activationDate: "2024-02-06",
    },
    {
      sl: 4,
      userId: "USR004",
      fullName: "Emily Davis",
      joiningDate: "2024-02-10",
      activationDate: "2024-02-15",
    },
    {
      sl: 5,
      userId: "USR005",
      fullName: "William Brown",
      joiningDate: "2024-03-01",
      activationDate: "2024-03-05",
    },
    {
      sl: 6,
      userId: "USR006",
      fullName: "Sophia Wilson",
      joiningDate: "2024-03-08",
      activationDate: "2024-03-12",
    },
    {
      sl: 7,
      userId: "USR007",
      fullName: "Liam Taylor",
      joiningDate: "2024-03-15",
      activationDate: "2024-03-20",
    },
    {
      sl: 8,
      userId: "USR008",
      fullName: "Olivia Anderson",
      joiningDate: "2024-04-01",
      activationDate: "2024-04-06",
    },
    {
      sl: 9,
      userId: "USR009",
      fullName: "James Thomas",
      joiningDate: "2024-04-10",
      activationDate: "2024-04-14",
    },
    {
      sl: 10,
      userId: "USR010",
      fullName: "Isabella Martinez",
      joiningDate: "2024-04-20",
      activationDate: "2024-04-25",
    },
    {
      sl: 11,
      userId: "USR011",
      fullName: "Ethan White",
      joiningDate: "2024-05-01",
      activationDate: "2024-05-05",
    },
    {
      sl: 12,
      userId: "USR012",
      fullName: "Mia Harris",
      joiningDate: "2024-05-07",
      activationDate: "2024-05-12",
    },
    {
      sl: 13,
      userId: "USR013",
      fullName: "Alexander Scott",
      joiningDate: "2024-05-15",
      activationDate: "2024-05-20",
    },
    {
      sl: 14,
      userId: "USR014",
      fullName: "Charlotte Young",
      joiningDate: "2024-06-01",
      activationDate: "2024-06-06",
    },
    {
      sl: 15,
      userId: "USR015",
      fullName: "Benjamin King",
      joiningDate: "2024-06-10",
      activationDate: "2024-06-15",
    },
    {
      sl: 16,
      userId: "USR016",
      fullName: "Amelia Wright",
      joiningDate: "2024-06-20",
      activationDate: "2024-06-25",
    },
    {
      sl: 17,
      userId: "USR017",
      fullName: "Lucas Green",
      joiningDate: "2024-07-01",
      activationDate: "2024-07-05",
    },
    {
      sl: 18,
      userId: "USR018",
      fullName: "Harper Baker",
      joiningDate: "2024-07-10",
      activationDate: "2024-07-14",
    },
    {
      sl: 19,
      userId: "USR019",
      fullName: "Daniel Adams",
      joiningDate: "2024-07-18",
      activationDate: "2024-07-22",
    },
    {
      sl: 20,
      userId: "USR020",
      fullName: "Evelyn Nelson",
      joiningDate: "2024-08-01",
      activationDate: "2024-08-05",
    },
  ];

  const renderRow = (item, index) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        {(page - 1) * limit + (index + 1)}
        {/* 12 */}
      </td>
      <td className="whitespace-nowrap">{item.userId}</td>
      <td className="whitespace-nowrap">{item.fullName}</td>
      <td className="whitespace-nowrap">${item.joiningDate}</td>
      <td className="whitespace-nowrap">${item.activationDate}</td>
    </tr>
  );

  // const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-lg font-semibold">Deposit History ({total})</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={data} />
      </div>

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination page={page} count={total} />
      </div>
    </div>
  );
};

export default LevelOnePage;
