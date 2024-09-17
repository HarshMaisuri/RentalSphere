package com.rentalsphere.backend.Exception.Handlers.Validation;

import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@ControllerAdvice
public class ValidationExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
        BindingResult result =exception.getBindingResult();
        List<FieldError> fieldErrors = result.getFieldErrors();
        List<String> errors = new ArrayList<>();
        for (FieldError error: fieldErrors){
            errors.add(error.getDefaultMessage());
        }
        ExceptionResponse response = ExceptionResponse.builder()
                .errorMessage("Validation Failed.")
                .isSuccess(false)
                .fieldErrors(errors)
                .timeStamp(new Date())
                .build();
        return handleExceptionInternal(exception, response, headers, status, request);
    }
}
