package com.rentalsphere.backend.Exception.Handlers.User;

import com.rentalsphere.backend.Exception.User.InvalidCredentialsException;
import com.rentalsphere.backend.Exception.User.SamePasswordException;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class UserExceptionHandler {
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ExceptionResponse> handleUserAlreadyExistsException(UserAlreadyExistsException userAlreadyExistsException){
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(userAlreadyExistsException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }


    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ExceptionResponse> handleInvalidCredentialsException(InvalidCredentialsException invalidCredentialsException) {
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(invalidCredentialsException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handleUserNotFoundException(UserNotFoundException userNotFoundException){
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(userNotFoundException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(SamePasswordException.class)
    public ResponseEntity<ExceptionResponse> handleSamePassswordException(SamePasswordException samePasswordException){
        ExceptionResponse response = ExceptionResponse.builder()
                .isSuccess(false)
                .errorMessage(samePasswordException.getMessage())
                .timeStamp(new Date())
                .build();
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
