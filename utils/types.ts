export interface Company {
  id: number;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  numUsers: number;
  numProducts: number;
  percentage: number;
  userId: number;
}

export interface CompanyWithUser {
  id: number;
  createdAt: string;
  updatedAt: string;
  companyName: string;
  numUsers: number;
  numProducts: number;
  percentage: number;
  userId: number;
  user: {
    id: number;
    email: string;
    name: string;
    userImage: null | string;
    role: string;
  };
}

export interface Companies {
  data: Company[];
}

export interface User {
  id: number;
  email: string;
  name: string;
  userImage: null | string;
  role: string;
  companies: [
    {
      id: number;
      createdAt: string;
      updatedAt: string;
      companyName: string;
      numUsers: number;
      numProducts: number;
      percentage: number;
      userId: number;
    }
  ];
}
