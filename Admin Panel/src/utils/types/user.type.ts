export interface Register {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  isAgree: boolean;
}

export interface VerifyEmailForm {
  email: string;
  otp?: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  fullname: string;
  image: string;
  email: string;
  username: string;
  phone: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isAdmin: boolean;
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  isSuperAdmin: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
  role: "User" | "Admin";
}

export interface UpdateUserInfo {
  tronWalletAddress?: string;
  evmWalletAddress?: string;
  title?: string;
  profilePictureURL?: string;
  languages?: [
    {
      language: string;
      level: string;
    },
  ];
  skills?: [string];
  introduction?: string;
  isOnboarded?: boolean;
  education?: {
    school: string;
    startDate: Date | null;
    endDate: Date | null;
    industry: string;
    degree: string;
    description: string;
  };
  certificate?: {
    name: string;
    issueDate: Date | null;
    expiryDate: Date | null;
    codeId: string;
  };
}

export interface UpdateUserPassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateUserEmail {
  oldEmail: string;
  email: string;
  confirmEmail: string;
  password: string;
  otp: string;
}

export interface GetOtpForm {
  email: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  withdrawsFiat: number;
}

export interface CoinType {
  name: string;
  symbol: string;
  icon: string;
  coinNameId: string;
  isToken: boolean;
  contractAddress: string;
  decimal: number;
  price: number;
  priceFormer: number;
  networkId: {
    name: string;
    symbol: string;
    chainId: 1;
    nativeCoinAddress: string;
    logoUrl: string;
    rpcUrl: string;
    isMainnet: boolean;
    networkName: string;
    networkType: string;
    isDeleted: boolean;
    isActive: boolean;
    id: string;
  };
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  priceChange: number;
  id: string;
}

export enum TRANSACTIONENUM {
  DEPOSIT = "Deposit",
  SWAP = "Swap",
  WITHDRAW = "Withdraw",
  WITHDRAW_FIAT = "Withdraw Fiat",
}

export interface UserTransaction {
  userId: string;
  walletId: string;
  fromAddress: string;
  toAddress: string;
  coinId: string;
  type: TRANSACTIONENUM;
  amount: 34;
  swappedAmount: number;
  swappedPrice: number;
  trxHash: string;
  trxUrl: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  status: string;
  createdAt: string;
  balance: number;
  user: {
    fullname: string;
    email: string;
    id: string;
    accountNumber: string;
    accountName: string;
  };
  coin: {
    name: string;
    symbol: string;
    icon: string;
    network: {
      name: string;
      symbol: string;
      id: string;
    };
    id: string;
  };
  currency: {
    name: string;
    symbol: string;
  };
  id: string;
}

export interface ListedUser {
  fullname: string;
  image: string;
  email: string;
  username: string;
  phone: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  isAdmin: false;
  isSuperAdmin: false;
  isVerified: true;
  isActive: true;
  isDeleted: false;
  createdAt: string;
  updatedAt: string;
  id: string;
  role: "User" | "Admin";
}

export interface UserWalletDetail {
  wallet: {
    userId: string;
    evmAddress: string;
    evmKey: string;
    tronAddress: string;
    tronKey: string;
    btcAddress: string;
    btcKey: string;
    currentSwappedBalance: number;
    totalWithdrawnAmount: number;
    createdAt: string;
    updatedAt: string;
    id: string;
    totalBalanceInLocalCurrency: number;
    totalBalanceInUsd: number;
    localCurrency: any;
    usdCurrency: any;
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
  balance: Array<{
    coinId: string;
    address: string;
    balance: number;
    networkId: string;
    id: string;
    name: string;
    symbol: string;
    logoUrl: string;
    networkName: string;
    networkSymbol: string;
    networkLogoUrl: string;
    price: number;
    balanceNaira: number;
  }>;
}
