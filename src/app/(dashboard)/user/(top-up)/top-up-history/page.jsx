// import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getPackageBuyInfo } from "@/lib/actions/packageBuyInfoActions";

const TOPUPHistoryPage = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 10;
  // console.log({ page, limit });
  const res = await getPackageBuyInfo(page, limit);
  // console.log({ res });
  const data = res.success ? res.data : [];
  const total = res.success ? res.total : 0;

  // console.log({ data });
  const columns = [
    { header: "Sl", accessor: "sl" },
    { header: "User ID", accessor: "userId" },
    { header: "Full Name", accessor: "fullName" },
    { header: "Amount", accessor: "packageAmount" },
    { header: "Activation Date", accessor: "date" },
    { header: "Status", accessor: "status" },
  ];

  // const data = [
  //   {
  //     sl: 1,
  //     userId: "AB050820250001",
  //     fullName: "John Doe",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 2,
  //     userId: "AB050820250002",
  //     fullName: "Jane Smith",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 3,
  //     userId: "AB050820250003",
  //     fullName: "Michael Johnson",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 4,
  //     userId: "AB050820250004",
  //     fullName: "Emily Davis",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 5,
  //     userId: "AB050820250005",
  //     fullName: "David Brown",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 6,
  //     userId: "AB050820250006",
  //     fullName: "Sophia Wilson",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 7,
  //     userId: "AB050820250007",
  //     fullName: "Daniel Miller",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 8,
  //     userId: "AB050820250008",
  //     fullName: "Olivia Taylor",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 9,
  //     userId: "AB050820250009",
  //     fullName: "James Anderson",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  //   {
  //     sl: 10,
  //     userId: "AB050820250010",
  //     fullName: "Ava Thomas",
  //     amount: 1000,
  //     activationDate: "2024-06-15",
  //   },
  // ];

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
      <td className="whitespace-nowrap">${item.packageAmount}</td>
      <td className="whitespace-nowrap">
        {new Date(item.date).toDateString()}
      </td>
      <td>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            item.status.toLowerCase() === "success"
              ? "bg-green-100 text-green-600"
              : item.status.toLowerCase() === "rejected"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status}
        </span>
      </td>
    </tr>
  );

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

export default TOPUPHistoryPage;
