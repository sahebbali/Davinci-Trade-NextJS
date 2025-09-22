import React from "react";

/**
 * Table Component
 * Props:
 *  - columns: Array of column definitions { header, accessor, className? }
 *  - data: Array of data objects
 *  - renderRow: Function to render each row (item, index) => JSX
 */
const Table = ({ columns, data, renderRow }) => {
  return (
    <table className="w-full mt-4 border-collapse">
      {/* Table Head */}
      <thead>
        <tr className="text-left text-gray-500 text-sm border-b">
          {columns.map((col) => (
            <th key={col.accessor} className={col.className || "px-4 py-2"}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>

      {/* Table Body */}
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={item._id || index}>
            {renderRow(item, index)}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
