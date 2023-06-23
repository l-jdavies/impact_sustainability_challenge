import { Columns } from "@/types";
import React from "react";
import { useTable, useRowSelect, usePagination } from "react-table";
import { Typography } from "@material-tailwind/react";
import {
  renderAmountCell,
  renderDateCell,
  renderEmissionsCell,
  renderGreenPowerCell,
  renderMeterIdCell,
  renderUsageCell,
} from "@/lib";

/* data needs to have any type, rather than ElectricityData to prevent Typescript throwing an error for react-table */
const Table = ({ columns, data }: { columns: Columns[]; data: any }) => {
  const PAGE_SIZE = 5;
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize, selectedRowIds },
    toggleAllRowsSelected,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: PAGE_SIZE, selectedRowIds: {} },
    },
    usePagination,
    useRowSelect
  );

  const formatCellData = (cell: any) => {
    switch (cell.column.id) {
      case "meterId":
        return renderMeterIdCell(cell);
      case "startDate":
      case "endDate":
        return renderDateCell(cell);
      case "usage":
        return renderUsageCell(cell);
      case "greenPower":
        return renderGreenPowerCell(cell);
      case "amountPaid":
        return renderAmountCell(cell);
      case "emissions":
        return renderEmissionsCell(cell);
      default:
        return cell.render("Cell");
    }
  };

  return (
    <div className="flex items-center flex-col justify-center p-6">
      <div className="overflow-x-auto w-full">
        <table
          {...getTableProps()}
          className="w-full table-auto text-left bg-[#FFFFFF] rounded-lg shadow-md border-2"
        >
          <thead>
            <tr>
              {headerGroups.map((headerGroup) =>
                headerGroup.headers.map((column, idx) => (
                  <th
                    {...column.getHeaderProps()}
                    key={idx}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 bg-[#F5F8FB]"
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
                        {formatCellData(cell)}
                      </Typography>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between p-5 m-5">
        <div>
          <p className="text-[#5A6170]">
            {(pageIndex + 1) * PAGE_SIZE} of {data.length} results
          </p>
        </div>
        <div className="ml-3 space-x-3">
          <button
            onClick={previousPage}
            disabled={!canPreviousPage}
            className="btn-pagination"
          >
            &lt;
          </button>
          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className="btn-pagination"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
