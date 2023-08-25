export interface i_userProfile {
  _id: string;
  job_id:{
    _id:string,
    currentStatus:string
  };
  client_id: string;
  labour_id: {
    _id: string;
    name: string;
  };
  hiringDate: Date;
  category: string;
  startDate: Date;
  hireStatus: string;
  
}
