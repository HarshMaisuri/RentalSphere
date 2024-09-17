package com.rentalsphere.backend.Exception.Lease;

public class LeaseNotFoundException extends RuntimeException{
    public LeaseNotFoundException(String message){
        super(message);
    }
}
