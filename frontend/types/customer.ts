export interface Customer {
    id: number;
    name: string;
    points: number;
    createdAt: string;
    updatedAt: string;
    price: number;
  }
  
  export interface CustomerResponse {
    success:boolean;
    statusCode:number;
    data: Customer[];
  }

  export interface CustomerDetailResponse {
    success:boolean;
    statusCode:number;
    data: Customer;
  }