export class CustomException extends Error {
  status: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.status = statusCode;
    this.name = "CustomException";
  }
}

export class WrongCredentialsException extends CustomException {
  constructor() {
    super(406, "Invalid credentials");
  }
}

export class NotFoundUserException extends CustomException {
  constructor() {
    super(403, "Please login or create an account");
  }
}

export class UnauthorizedUserException extends CustomException {
  constructor() {
    super(401, "You are not authorized");
  }
}

export class ServerErrorException extends CustomException {
  constructor() {
    super(500, "Operation unsuccessful");
  }
}

export class AlreadyExistingUserException extends CustomException {
  constructor() {
    super(400, "User already exists");
  }
}

export class RateLimitExceededException extends CustomException {
  constructor() {
    super(429, "Too many access attempts, please try again after 15 minutes");
  }
}
