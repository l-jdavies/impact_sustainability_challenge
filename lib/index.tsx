// Custom rendering function for the "Meter ID" column
export const renderMeterIdCell = (cell: any) => {
  const meterId = cell.value;
  return <span>NMI {meterId}</span>;
};

export const renderDateCell = (cell: any) => {
  const date = new Date(cell.value);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return <span>{formattedDate}</span>;
};

export const renderUsageCell = (cell: any) => {
  const usage = cell.value;
  return <span>{usage} kWh</span>;
};

export const renderGreenPowerCell = (cell: any) => {
  const power = cell.value;
  return <span>{power} %</span>;
};

export const renderAmountCell = (cell: any) => {
  const amount = cell.value;
  return <span>${amount}</span>;
};

export const renderEmissionsCell = (cell: any) => {
  const emission = cell.value;
  return <span>{emission} tCO2e</span>;
};
