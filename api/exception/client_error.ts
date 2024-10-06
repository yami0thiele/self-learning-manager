export class ClientError extends Error {
  public status: number = 400;
}

export class BadRequestError extends ClientError {
  public status: number = 400;
}

export class NotFoundError extends ClientError {
  public status: number = 404;
}
