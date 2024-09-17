package com.rentalsphere.backend.Exception.Handlers.ResetPasswordToken;

import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenExpiredException;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class ResetPasswordTokenExceptionHandler {
    @ExceptionHandler(TokenNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleTokenNotFoundException(TokenNotFoundException tokenNotFoundException){
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(tokenNotFoundException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<ExceptionResponse> handleTOkenExpiredException(TokenExpiredException tokenExpiredException){
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(tokenExpiredException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
