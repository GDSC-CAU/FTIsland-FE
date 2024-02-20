export type BookInfoType = {
  id: number;
  title: string;
  description: string;
  category: string;
  country: string;
  totalPage: number;
  image: string;
};

export type BookContentDataType = {
  bookId: number;
  page: number;
  mainLan: string;
  subLan: string;
  korContents: string;
  mainContents: string;
  subContents: string;
  image: string;
};
