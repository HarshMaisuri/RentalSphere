package com.rentalsphere.backend.Exception.Property;

public class PropertyNotFoundException extends RuntimeException{
    public PropertyNotFoundException(String message){
        super(message);
    }
}
