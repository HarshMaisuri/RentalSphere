package com.rentalsphere.backend.Exception.Handlers.Lease;

import com.rentalsphere.backend.Exception.Lease.LeaseNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class LeaseExceptionHandler {
    @ExceptionHandler(LeaseNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleLeaseNotFoundException(LeaseNotFoundException leaseNotFoundException){
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(leaseNotFoundException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
}
