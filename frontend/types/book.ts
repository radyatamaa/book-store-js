  export interface Book {
    id: number;
    description: string;
    title: string;
    writer: string;
    cover_image: string;
    price: number;
    tags: string[];
    total_price: number;
    qty: number;
  }
  
  export interface BookResponse {
    success:boolean;
    statusCode:number;
    data: BookData;
  }

  export interface BookData {
    rows:Book[];
    count:number;
  }