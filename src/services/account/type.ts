export interface User {
    rowId: string;
    username: string;
    firstName: string;
    middleName: string;
    lastName: string;
    accountType: string;
    phoneNumber: string;
}

export interface Account {
  rowId: string;
  accountNumber: string;
  accountName: string;
  user: User;
  balance: number;
  currency: string;
}

export interface AccountSummary{
  rowId: string;
  account: Account;
  totalDeposits: number;
  totalWithdrawals: number;
  lastTransactionAt: string;
  status: string;
}

export interface AccountResponse {
    data: Account;
    message: string;
    status: string;
}

export interface AccountSummaryResponse {
    data: AccountSummary[];
    message: string;
    status: string;
}

export interface DepositRequest {
    method: string;
    amount: number;
    accountDetails: string;
}
export interface DepositResponse {
    message: string;
    newBalance: string;
}
export interface ApiDepositResponse {
    data: DepositResponse;
    message: string;
    status: string;
}