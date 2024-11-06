export interface IResponse<T> {
  data: T;
  message: string;
}

export interface IResponseWithPagination<T> {
  data: {
    items: T[];
    total: number;
    page: number;
    totalPage: number;
  };
  message: string;
}
