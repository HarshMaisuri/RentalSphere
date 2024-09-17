package com.rentalsphere.backend.Exception.Handlers.User;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.rentalsphere.backend.Exception.User.InvalidCredentialsException;
import com.rentalsphere.backend.Exception.User.SamePasswordException;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class UserExceptionHandlerTest {

    @Test
    void testHandleUserAlreadyExistsException() {
        // Arrange
        UserExceptionHandler userExceptionHandler = new UserExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandleUserAlreadyExistsExceptionResult = userExceptionHandler
                .handleUserAlreadyExistsException(new UserAlreadyExistsException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandleUserAlreadyExistsExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(409, actualHandleUserAlreadyExistsExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandleUserAlreadyExistsExceptionResult.hasBody());
        assertTrue(actualHandleUserAlreadyExistsExceptionResult.getHeaders().isEmpty());
    }


    @Test
    void testHandleInvalidCredentialsException() {
        // Arrange
        UserExceptionHandler userExceptionHandler = new UserExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandleInvalidCredentialsExceptionResult = userExceptionHandler
                .handleInvalidCredentialsException(new InvalidCredentialsException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandleInvalidCredentialsExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(409, actualHandleInvalidCredentialsExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandleInvalidCredentialsExceptionResult.hasBody());
        assertTrue(actualHandleInvalidCredentialsExceptionResult.getHeaders().isEmpty());
    }


    @Test
    void testHandleUserNotFoundException() {
        // Arrange
        UserExceptionHandler userExceptionHandler = new UserExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandleUserNotFoundExceptionResult = userExceptionHandler
                .handleUserNotFoundException(new UserNotFoundException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandleUserNotFoundExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(404, actualHandleUserNotFoundExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandleUserNotFoundExceptionResult.hasBody());
        assertTrue(actualHandleUserNotFoundExceptionResult.getHeaders().isEmpty());
    }


    @Test
    void testHandleSamePassswordException() {
        // Arrange
        UserExceptionHandler userExceptionHandler = new UserExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandleSamePassswordExceptionResult = userExceptionHandler
                .handleSamePassswordException(new SamePasswordException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandleSamePassswordExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(400, actualHandleSamePassswordExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandleSamePassswordExceptionResult.hasBody());
        assertTrue(actualHandleSamePassswordExceptionResult.getHeaders().isEmpty());
    }
}
