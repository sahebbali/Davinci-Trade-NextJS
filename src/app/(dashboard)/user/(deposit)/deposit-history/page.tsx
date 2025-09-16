import Image from "next/image";
// import FormContainer from "@/components/FormContainer";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
// import { headers } from "next/headers";

type Deposit = {
  id: number;
  userId: string;
  name: string;
  amount: number;
  proofImage: string;
  transactionId: string;
  status: "Pending" | "Approved" | "Rejected";
};

const DepositHistoryPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  // Dummy data
  const deposits: Deposit[] = [
    {
      id: 1,
      userId: "USR001",
      name: "John Doe",
      amount: 500,
      proofImage: "/images/proof1.jpg",
      transactionId: "TXN123456",
      status: "Pending",
    },
    {
      id: 2,
      userId: "USR002",
      name: "Jane Smith",
      amount: 1200,
      proofImage: "/images/proof2.jpg",
      transactionId: "TXN789012",
      status: "Approved",
    },
    {
      id: 3,
      userId: "USR003",
      name: "Alice Johnson",
      amount: 750,
      proofImage: "/images/proof3.jpg",
      transactionId: "TXN345678",
      status: "Rejected",
    },
  ];

  const columns = [
    { header: "User ID", accessor: "userId" },
    { header: "Name", accessor: "name" },
    { header: "Amount", accessor: "amount" },
    { header: "Proof", accessor: "proof" },
    { header: "Transaction ID", accessor: "transactionId" },
    { header: "Status", accessor: "status" },
  ];

  const renderRow = (item: Deposit) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="p-4 whitespace-nowrap">{item.userId}</td>
      <td className="whitespace-nowrap">{item.name}</td>
      <td className="whitespace-nowrap">${item.amount}</td>
      <td>
        <Image
          src={item.proofImage}
          alt="Proof"
          width={50}
          height={50}
          className="rounded-md border"
        />
      </td>
      <td className="whitespace-nowrap">{item.transactionId}</td>
      <td>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${
            item.status === "Approved"
              ? "bg-green-100 text-green-600"
              : item.status === "Rejected"
              ? "bg-red-100 text-red-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {item.status}
        </span>
      </td>
    </tr>
  );

  // Pagination (dummy)
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
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
