  export interface Book {
    id: number;
    title: string;
    writer: string;
    cover_image: string;
    price: number;
    tags: string[];
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