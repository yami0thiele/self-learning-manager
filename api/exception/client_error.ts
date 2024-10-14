export class ClientError extends Error {
	public status = 400;
}

export class BadRequestError extends ClientError {
	public status = 400;
}

export class NotFoundError extends ClientError {
	public status = 404;
}
