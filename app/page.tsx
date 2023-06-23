"use client";
import Table from "@/components/Table";
import { fetchAllElectricity } from "@/fetch";
import { ElectricityData } from "@/types";
import React, { useEffect, useMemo, useState } from "react";

const TablePage = () => {
  const [electricityData, setElectricityData] = useState<ElectricityData[]>();

  useEffect(() => {
    const getElectricityData = async () => {
      try {
        const data = await fetchAllElectricity();
        setElectricityData(data);
      } catch (error) {
        console.error("Error fetching electricity data:", error);
      }
    };

    getElectricityData();
  }, []);

  const columns = useMemo(
    () => [
      { Header: "Location", accessor: "location" },
      { Header: "Meter ID", accessor: "meterId" },
      { Header: "Start Date", accessor: "startDate" },
      { Header: "End Date", accessor: "endDate" },
      { Header: "Provider", accessor: "provider" },
      { Header: "Usage (kWh)", accessor: "usageKwh" },
      { Header: "Green Power", accessor: "greenPower" },
      { Header: "Amount Paid", accessor: "amountPaid" },
      { Header: "Emissions", accessor: "emissions" },
    ],
    []
  );

  return (
    <>
      {electricityData ? (
        <Table columns={columns} data={electricityData} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default TablePage;
