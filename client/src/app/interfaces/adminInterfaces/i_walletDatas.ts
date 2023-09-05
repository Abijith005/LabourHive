export interface i_walletDatas {
  _id: string;
  user_id: {
    _id: string;
    name: string;
    wallet: number;
  };
  amount: number;
  accountHolder: string;
  accountNumber: string;
  ifscCode: string;
  createdAt: Date;
  status: string;
}
