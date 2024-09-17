package com.rentalsphere.backend.Exception.Tenant;

public class TenantNotFoundException extends RuntimeException {
    public TenantNotFoundException(String message){
        super(message);
    }
}
