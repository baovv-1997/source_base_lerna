export interface ISuccessResponseData {
  statusCode?: number;
  message?: string;
  data?: {
    [key: string]: any;
  };
  success?: boolean;
}

export interface IDataError {
  errors?: any;
  [key: string]: any;
}

export interface IFailResponseData {
  statusCode?: number;
  message?: string;
  data?: IDataError;
  success?: boolean;
}
