export interface Transaction {
  transactionNo: string;
  sender: string;
  date: Date;
  status: 'pending' | 'received';
  amount: number;
  to: string;
  type: 'payout' | 'payment' | 'refund';
}
