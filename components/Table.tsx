import { Columns } from "@/types";
import React, { useState } from "react";
import { useTable, useRowSelect } from "react-table";
import { Typography } from "@material-tailwind/react";

/* data needs to have any type, rather than ElectricityData to prevent Typescript throwing an error for react-table */
const Table = ({ columns, data }: { columns: Columns[]; data: any }) => {
  const [selectAll, setSelectAll] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    toggleAllRowsSelected,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { selectedRowIds: {} },
    },
    useRowSelect
  );

  return (
    <div className="flex items-center justify-center p-6">
      <table
        {...getTableProps()}
        className="w-3/4 h-3/4 table-auto text-left bg-[#FFFFFF] rounded-lg shadow-md"
      >
        <thead>
          <tr>
            {headerGroups.map((headerGroup) =>
              headerGroup.headers.map((column, idx) => (
                <th
                  {...column.getHeaderProps()}
                  key={idx}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold leading-none opacity-70"
                  >
                    {column.render("Header")}
                  </Typography>
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={idx}>
                {row.cells.map((cell, idx) => (
                  <td
                    {...cell.getCellProps()}
                    key={idx}
                    className="p-4 border-b border-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {cell.render("Cell")}
                    </Typography>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
