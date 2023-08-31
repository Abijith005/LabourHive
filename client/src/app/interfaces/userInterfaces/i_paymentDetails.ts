export interface i_paymentDetails {
  job_id?: string|null;
  labour_id: string;
  labourName: string;
  wage: string;
  category: string;
  totalAmount: number;
  startDate: Date;
  endDate: Date;
  totalDays: number;
  location: string;
  offeredWage?: number | null;
  coordinates: number[];
  jobDescription?:string
}
