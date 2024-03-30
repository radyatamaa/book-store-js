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
    book: Book;
    quantity: number;
  }

  export interface ListOrderResponse {
    success:boolean;
    statusCode:number;
    data: ListOrder[];
    error?: ErrorResponse;
  }