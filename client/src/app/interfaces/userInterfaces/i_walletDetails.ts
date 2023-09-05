export interface i_walletDetails {
  _id: string;
  hire_id?: {
    id: string;
    client_id: {
      id: string;
      name: string;
    };
  };
  user_id: {
    _id: string;
    wallet: number;
  };
  amount: number;
  transaction: string;
  balance: number;
  action: string;
  createdAt: Date;
}
