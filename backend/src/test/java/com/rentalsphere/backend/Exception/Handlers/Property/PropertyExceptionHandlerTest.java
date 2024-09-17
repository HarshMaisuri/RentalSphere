package com.rentalsphere.backend.Exception.Handlers.Property;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class PropertyExceptionHandlerTest {

    @Test
    void testHandlePropertyNotFoundException() {
        // Arrange
        PropertyExceptionHandler propertyExceptionHandler = new PropertyExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandlePropertyNotFoundExceptionResult = propertyExceptionHandler
                .handlePropertyNotFoundException(new PropertyNotFoundException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandlePropertyNotFoundExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(404, actualHandlePropertyNotFoundExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandlePropertyNotFoundExceptionResult.hasBody());
        assertTrue(actualHandlePropertyNotFoundExceptionResult.getHeaders().isEmpty());
    }
}
