import { Book } from "./book";

export interface CreateOrderRequest {
    customerId: number;
    bookId: number;
    quantity: number;
  }


  export interface CreateOrderResponse {
    success:boolean;
    statusCode:number;
    data: CreateOrderRequest;
    error?: ErrorResponse;
  }

  export interface ErrorResponse {
    message: string;
  }


  export interface DeleteOrderResponse {
    success:boolean;
    statusCode:number;
    data: number;
    error?: ErrorResponse;
  }

  export interface ListOrder {
    id: number;
    customerId: number;
    bookId: number;
    quantity: number;
    book_data:string;
  }

  export interface OrderData {
    rows:ListOrder[];
    count:number;
  }

  export interface ListOrderResponse {
    success:boolean;
    statusCode:number;
    data: OrderData;
    error?: ErrorResponse;
  }