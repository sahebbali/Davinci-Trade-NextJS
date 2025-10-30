// import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import ProofImageModal from "@/components/ProofImageModal";
import { getAllUser } from "@/lib/actions/user.actions";

export const metadata = {
  title: "All Member | Admin Dashboard",
  description:
    "View your wallet balances, track income, investments, and manage all your financial activities in one place.",
  keywords: [
    "wallet dashboard",
    "investment tracker",
    "earnings summary",
    "user balance",
    "crypto income",
  ],
};
const AllMembersPage = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const search = searchParams.search ? searchParams.search : "";
  console.log({ search });
  const limit = 10;
  // console.log({ page, limit });
  // ✅ Fetch deposits from server action
  const res = await getAllUser(page, limit, search);
  // console.log({ res });
  const allUser = res.success ? res.data : [];
  const total = res.success ? res.total : 0;

  // console.log({ allUser });
  const columns = [
    { header: "Sl", accessor: "sl" },
    { header: "User ID", accessor: "userId" },
    { header: "fullName", accessor: "fullName" },
    { header: "sponsorId", accessor: "sponsorId" },
    { header: "sponsorName", accessor: "sponsorName" },

    { header: "Status", accessor: "status" },
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
      <td className="whitespace-nowrap">${item.sponsorId}</td>
      <td className="whitespace-nowrap">{item.sponsorName}</td>
      <td>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            item.isActive
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.isActive ? "Active" : "Inactive"}
        </span>
      </td>
    </tr>
  );

  // const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-2">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-lg font-semibold">All Member ({total})</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={allUser} />
      </div>

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination page={page} count={total} />
      </div>
    </div>
  );
};

export default AllMembersPage;
