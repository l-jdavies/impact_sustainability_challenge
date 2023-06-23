import { Columns } from "@/types";
import React, { useState } from "react";
import { useTable, useRowSelect, usePagination } from "react-table";
import { Typography } from "@material-tailwind/react";

/* data needs to have any type, rather than ElectricityData to prevent Typescript throwing an error for react-table */
const Table = ({ columns, data }: { columns: Columns[]; data: any }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, selectedRowIds },
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 25, selectedRowIds: {} },
    },
    usePagination,
    useRowSelect
  );

  // Custom rendering function for the "Meter ID" column
  const renderMeterIdCell = (cell: any) => {
    const meterId = cell.value;
    return <span>NMI {meterId}</span>;
  };

  return (
    <div className="flex items-center flex-col justify-center p-6">
      <table
        {...getTableProps()}
        className="overflow-scroll w-3/4 h-3/4 table-auto text-left bg-[#FFFFFF] rounded-lg shadow-md"
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
          {page.map((row, idx) => {
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
                      {cell.column.id === "meterId" // Check if it's the "Meter ID" column
                        ? renderMeterIdCell(cell) // Custom rendering for "Meter ID" column
                        : cell.render("Cell")}
                    </Typography>
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="flex justify-between p-5 m-5">
        <div>
          <p className="text-[#5A6170]">
            {(pageIndex + 1) * pageSize} of {data.length} results
          </p>
        </div>
        <div className="ml-3 bg-[#FFFFFF] space-x-3 mx-2 px-1 text-[#5A6170] rounded-md border">
          <button onClick={previousPage} disabled={!canPreviousPage}>
            &lt;
          </button>
          <button onClick={nextPage} disabled={!canNextPage}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
