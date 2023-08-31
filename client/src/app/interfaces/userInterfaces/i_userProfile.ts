export interface i_userProfile {
  _id: string;
  job?: {
    _id: string,
    currentStatus: string
  };
  client_id: string;
  labour: {
    _id: string;
    name: string;
  };
  review: {
    _id: string
  };
  hiringDate: Date;
  category: string;
  startDate: Date;
  hireStatus: string;
  totalAmount: number;
  totalDays: number,
  complaint:{
    _id:string
  }


}