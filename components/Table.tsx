import { Columns } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import { useTable, useRowSelect } from "react-table";

/* data needs to have any type, rather than ElectricityData to prevent Typescript throwing an error for react-table */
const Table = ({ columns, data }: { columns: Columns[]; data: any }) => {
  const [selectAll, setSelectAll] = useState(false);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    toggleAllRowsSelected,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      initialState: { selectedRowIds: {} },
    },
    useRowSelect // Enable row selection
  );

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectAll(false);
      toggleAllRowsSelected(false);
    } else {
      setSelectAll(true);
      toggleAllRowsSelected(true);
    }
  };

  useEffect(() => {
    // Check if all rows are selected
    const areAllRowsSelected =
      rows.length > 0 && selectedFlatRows.length === rows.length;
    setSelectAll(areAllRowsSelected);
  }, [selectedFlatRows, rows]);

  return (
    <table {...getTableProps()} className="table container">
      <thead>
        <tr>
          
          {headerGroups.map((headerGroup) =>
            headerGroup.headers.map((column, idx) => (
              <th {...column.getHeaderProps()} key={idx}>
                {column.render("Header")}
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
                <td {...cell.getCellProps()} key={idx}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
