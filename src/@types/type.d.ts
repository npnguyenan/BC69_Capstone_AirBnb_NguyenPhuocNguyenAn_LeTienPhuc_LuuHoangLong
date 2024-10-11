type HttpResponse<T> = {
  statusCode: number;
  content: T;
  dateTime: string;
};
