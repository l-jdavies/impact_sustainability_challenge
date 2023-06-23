import { fetchAllElectricity } from "@/fetch";
import React from "react";

/* fetching data in server component */
async function getElectricityData() {
  const data = await fetchAllElectricity()
  return data
}

const TablePage = async () => {
  const electricityData = await getElectricityData()
  console.log(electricityData)
  
  return (
    <>
      <h1 className="text-black">table</h1>
      
    </>
  );
};

export default TablePage;
