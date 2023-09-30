export interface AuthorDto {
  id?: number;
  name: string;
}

export interface PublisherDto {
  id?: number;
  name: string;
}

export interface BookDto {
  id: number;
  author: AuthorDto;
  bookName: string;
  description: string;
  publisher: PublisherDto;
  buyPrice: number;
  publishYear: string;
  cover: string;
  category: string
}

export interface BookPurchaseDto {
  book: BookDto;
  purchaseType: 'BUY' | 'RENT_2_WEEKS' | 'RENT_MONTH' | 'RENT_2_MONTH'
}
