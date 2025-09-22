// import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getUserDepositHistory } from "@/lib/actions/deposit.action";
import ProofImageModal from "@/components/ProofImageModal";

type Deposit = {
  _id: string;
  userId: string;
  fullName: string;
  amount: number;
  proofPic?: { imageUrl?: string; publicUrl?: string };
  transactionId: string;
  status: "Pending" | "Approved" | "Rejected";
};

const DepositHistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  // ✅ Await searchParams first
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  // ✅ Fetch deposits from server action
  const res = await getUserDepositHistory();
  console.log({ res });
  const deposits: Deposit[] = res.success ? res.data : [];

  const columns = [
    { header: "User ID", accessor: "userId" },
    { header: "fullName", accessor: "fullName" },
    { header: "Amount", accessor: "amount" },
    { header: "Proof", accessor: "proof" },
    { header: "Transaction ID", accessor: "transactionId" },
    { header: "Status", accessor: "status" },
  ];

  const renderRow = (item: Deposit) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4 whitespace-nowrap">{item.userId}</td>
      <td className="whitespace-nowrap">{item.fullName}</td>
      <td className="whitespace-nowrap">${item.amount}</td>
      <td>
        {item.proofPic?.imageUrl && (
          <ProofImageModal src={item.proofPic.imageUrl} alt="Proof" />
        )}
      </td>
      <td className="whitespace-nowrap">{item.transactionId}</td>
      <td>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            item.status.toLowerCase() === "approved"
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

  // const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const count = deposits.length;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-lg font-semibold">Deposit History ({count})</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <TableSearch />
        </div>
      </div>

      {/* TABLE WRAPPER */}
      <div className="overflow-x-auto">
        <Table columns={columns} renderRow={renderRow} data={deposits} />
      </div>

      {/* PAGINATION */}
      <div className="mt-4">
        <Pagination page={page} count={count} />
      </div>
    </div>
  );
};

export default DepositHistoryPage;
