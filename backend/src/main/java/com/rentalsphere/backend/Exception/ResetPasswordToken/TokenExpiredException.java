package com.rentalsphere.backend.Exception.ResetPasswordToken;

public class TokenExpiredException extends RuntimeException{
    public TokenExpiredException(String message) {
        super(message);
    }
}
