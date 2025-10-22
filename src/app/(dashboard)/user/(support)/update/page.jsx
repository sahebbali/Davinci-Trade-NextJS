// import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { getAllSupportTickets } from "@/lib/actions/support.action";

const UpdatePage = async ({ searchParams }) => {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const limit = 10;
  //   console.log({ page, limit });
  // ✅ Fetch deposits from server action
  const res = await getAllSupportTickets(page, limit);
  // console.log({ res });
  const deposits = res.success ? res.data : [];
  const total = res.success ? res.total : 0;

  const columns = [
    { header: "Sl", accessor: "sl" },

    { header: "purpose", accessor: "Title" },
    { header: "question", accessor: "Description" },
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

      <td className="whitespace-nowrap">{item.purpose}</td>
      <td className="whitespace-nowrap">{item.question}</td>
    </tr>
  );

  // const page = searchParams.page ? parseInt(searchParams.page) : 1;

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP BAR */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h1 className="text-lg font-semibold">
          System Update History ({total})
        </h1>
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
        <Pagination page={page} count={total} />
      </div>
    </div>
  );
};

export default UpdatePage;
