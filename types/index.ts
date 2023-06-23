export type ElectricityData = {
  location: string;
  meterId: string;
  startDate: string;
  endDate: string;
  provider: string;
  usageKwh: number;
  greenPower: number;
  amountPaid: number;
  emissions: number;
};

export type Columns = {
  id?: string;
  Header?: string | React.FC<{ getToggleAllRowsSelectedProps: any }>;
  Cell?: React.FC<{ row: any }>;
  accessor: string;
};
