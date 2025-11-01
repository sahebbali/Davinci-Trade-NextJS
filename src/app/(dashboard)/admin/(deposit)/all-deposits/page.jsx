// import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import DateRangeFilter from "@/components/DateRangeFilter";
import { getAllDepositsHistoryAdmin } from "@/lib/actions/deposit.action";
import ProofImageModal from "@/components/ProofImageModal";
import DepositStatusSelect from "@/components/DepositStatusSelect";
// import Image from "next/image";

export const metadata = {
  title: "Deposit History | Dashboard",
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
const DepositHistoryPage = async ({ searchParams }) => {
  const params = await searchParams; // 👈 await this first!

  const page = params.page ? parseInt(params.page) : 1;
  const search = params.search || "";
  const fromDate = params.fromDate || null;
  const toDate = params.toDate || null;
  const limit = 10;
  console.log({ page, limit });
  // ✅ Fetch deposits from server action
  const res = await getAllDepositsHistoryAdmin(
    page,
    limit,
    search,
    fromDate,
    toDate
  );
  // console.log({ res });
  const deposits = res.success ? res.data : [];
  const total = res.success ? res.total : 0;

  const columns = [
    { header: "Sl", accessor: "sl" },
    { header: "User ID", accessor: "userId" },
    { header: "fullName", accessor: "fullName" },
    { header: "Amount", accessor: "amount" },
    { header: "Proof", accessor: "proof" },
    { header: "Transaction ID", accessor: "transactionId" },
    { header: "Date", accessor: "date" },
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
      <td className="whitespace-nowrap">${item.amount}</td>
      <td>
        {item.proofPic?.imageUrl && (
          <ProofImageModal src={item.proofPic.imageUrl} alt="Proof" />
        )}
      </td>
      <td className="whitespace-nowrap">{item.transactionId}</td>
      <td className="whitespace-nowrap">
        {new Date(item.createdAt).toDateString()}
      </td>
      <td>
        <DepositStatusSelect
          id={item.depositId}
          currentStatus={item.status}
          type="deposit"
        />
      </td>
    </tr>
  );

  // const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="bg-white p-4 rounded-md flex-1 mt-1">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <h1 className="text-lg font-semibold">Deposit History ({total})</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <TableSearch />
          <DateRangeFilter />
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={deposits} />
      </div>

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination page={page} count={total} />
      </div>
    </div>
  );
};

export default DepositHistoryPage;
