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

export interface i_hireDatas{
  _id: string,
  job_id: string,
  client_id: {
    _id: string,
    name:string
  },
  labour_id: {
    _id: string,
    name:string
  },
  hiringDate: Date,
  category:string,
  startDate:Date,
  endDate: Date,
  totalAmount: number,
  hireStatus: string,
  paymentToLabour: string,
}
