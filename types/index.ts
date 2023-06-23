export type ElectricityData = {
  location: string
  meterId: string
  startDate: string
  endDate: string
  provider: string
  usageKwh: number
  greenPower: number
  amountPaid: number
  emissions: number
}