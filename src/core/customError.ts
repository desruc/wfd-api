class CustomError extends Error {
  public name = '';

  public status = 500;

  public code = '';

  public errors: { [key: string]: string[] } = {};

  constructor(
    props: { message: string; code: string; status: number },
    errors: { [key: string]: string[] } = {}
  ) {
    super();

    const { message, code, status } = props;

    this.message = message;
    this.name = '';
    this.errors = errors;
    this.code = code;
    this.status = status;
  }
}

export default CustomError;
