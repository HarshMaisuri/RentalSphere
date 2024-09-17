package com.rentalsphere.backend.Exception.Handlers.Tenant;

import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class TenantExceptionHandler {
    @ExceptionHandler(TenantNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleTenantNotFoundException(TenantNotFoundException tenantNotFoundException){
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(tenantNotFoundException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
