package com.rentalsphere.backend.Exception.User;

public class SamePasswordException extends RuntimeException{
    public SamePasswordException(String message) {
        super(message);
    }
}
