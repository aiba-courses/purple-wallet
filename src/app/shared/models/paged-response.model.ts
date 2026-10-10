import { IHTTPResponseModel } from './http-response.model';

export interface IPagedResponseModel<T> extends IHTTPResponseModel<T> {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }
}
