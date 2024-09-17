package com.rentalsphere.backend.Exception.User;

public class InvalidCredentialsException extends RuntimeException {
    public InvalidCredentialsException(String message) {
        super(message);

    }
}
