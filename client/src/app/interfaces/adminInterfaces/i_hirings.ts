export interface i_hirings {
  _id: string;
  hiringDate: Date;
  category: string;
  totalDays: number;
  location: string;
  totalAmount: number;
  hireStatus: string;
  labour: {
    _id: string;
    name: string;
  };
  job: {
    _id: string;
    currentStatus: string;
  };
  complaint: {
    _id: string;
    complaintText: string;
  };
  paymentToLabour:string
}
