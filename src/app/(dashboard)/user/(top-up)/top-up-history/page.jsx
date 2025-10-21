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
    { header: "Amount", accessor: "amount" },
    { header: "Activation Date", accessor: "activationDate" },
  ];

  const data = [
    {
      sl: 1,
      userId: "AB050820250001",
      fullName: "John Doe",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 2,
      userId: "AB050820250002",
      fullName: "Jane Smith",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 3,
      userId: "AB050820250003",
      fullName: "Michael Johnson",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 4,
      userId: "AB050820250004",
      fullName: "Emily Davis",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 5,
      userId: "AB050820250005",
      fullName: "David Brown",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 6,
      userId: "AB050820250006",
      fullName: "Sophia Wilson",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 7,
      userId: "AB050820250007",
      fullName: "Daniel Miller",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 8,
      userId: "AB050820250008",
      fullName: "Olivia Taylor",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 9,
      userId: "AB050820250009",
      fullName: "James Anderson",
      amount: 1000,
      activationDate: "2024-06-15",
    },
    {
      sl: 10,
      userId: "AB050820250010",
      fullName: "Ava Thomas",
      amount: 1000,
      activationDate: "2024-06-15",
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
      <td className="whitespace-nowrap">${item.amount}</td>
      <td className="whitespace-nowrap">${item.activationDate}</td>
    </tr>
  );

  // const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-lg font-semibold">TOP Up History ({total})</h1>
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
