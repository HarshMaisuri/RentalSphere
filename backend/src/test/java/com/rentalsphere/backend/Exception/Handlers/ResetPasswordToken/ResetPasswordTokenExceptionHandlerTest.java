package com.rentalsphere.backend.Exception.Handlers.ResetPasswordToken;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenExpiredException;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class ResetPasswordTokenExceptionHandlerTest {

    @Test
    void testHandleTokenNotFoundException() {
        // Arrange
        ResetPasswordTokenExceptionHandler resetPasswordTokenExceptionHandler = new ResetPasswordTokenExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandleTokenNotFoundExceptionResult = resetPasswordTokenExceptionHandler
                .handleTokenNotFoundException(new TokenNotFoundException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandleTokenNotFoundExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(404, actualHandleTokenNotFoundExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandleTokenNotFoundExceptionResult.hasBody());
        assertTrue(actualHandleTokenNotFoundExceptionResult.getHeaders().isEmpty());
    }


    @Test
    void testHandleTokenExpiredException() {
        // Arrange
        ResetPasswordTokenExceptionHandler resetPasswordTokenExceptionHandler = new ResetPasswordTokenExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandleTOkenExpiredExceptionResult = resetPasswordTokenExceptionHandler
                .handleTOkenExpiredException(new TokenExpiredException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandleTOkenExpiredExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(400, actualHandleTOkenExpiredExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandleTOkenExpiredExceptionResult.hasBody());
        assertTrue(actualHandleTOkenExpiredExceptionResult.getHeaders().isEmpty());
    }
}
