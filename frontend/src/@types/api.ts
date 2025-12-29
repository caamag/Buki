export interface Error {
  response: {
    data: {
      message: string;
      status: number;
    };
  };
}
