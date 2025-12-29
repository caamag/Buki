export interface Error {
  response: {
    data: {
      message: string;
      statusCode: number;
    };
  };
}
