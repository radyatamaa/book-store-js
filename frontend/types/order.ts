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