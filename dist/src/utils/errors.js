"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RateLimitExceededException = exports.AlreadyExistingUserException = exports.ServerErrorException = exports.UnauthorizedUserException = exports.NotFoundUserException = exports.WrongCredentialsException = exports.CustomException = void 0;
class CustomException extends Error {
    constructor(statusCode, message) {
        super(message);
        this.status = statusCode;
        this.name = "CustomException";
    }
}
exports.CustomException = CustomException;
class WrongCredentialsException extends CustomException {
    constructor() {
        super(406, "Invalid credentials");
    }
}
exports.WrongCredentialsException = WrongCredentialsException;
class NotFoundUserException extends CustomException {
    constructor() {
        super(403, "Please login or create an account");
    }
}
exports.NotFoundUserException = NotFoundUserException;
class UnauthorizedUserException extends CustomException {
    constructor() {
        super(401, "You are not authorized");
    }
}
exports.UnauthorizedUserException = UnauthorizedUserException;
class ServerErrorException extends CustomException {
    constructor() {
        super(500, "Operation unsuccessful");
    }
}
exports.ServerErrorException = ServerErrorException;
class AlreadyExistingUserException extends CustomException {
    constructor() {
        super(400, "User already exists");
    }
}
exports.AlreadyExistingUserException = AlreadyExistingUserException;
class RateLimitExceededException extends CustomException {
    constructor() {
        super(429, "Too many access attempts, please try again after 15 minutes");
    }
}
exports.RateLimitExceededException = RateLimitExceededException;
