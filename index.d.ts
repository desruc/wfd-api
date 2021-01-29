declare namespace Express {
  export interface Response {
    success(payload: {
      data?: any;
      status?: number;
      message?: string;
      meta?: { [key: string]: any };
    }): void;
  }

  export interface Request {
    pagination: {
      page: number;
      skip: number;
      limit: number;
    };
    user: {
      sub: string;
    };
  }
}
