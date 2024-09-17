package com.rentalsphere.backend.Exception.Handlers.Tenant;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class TenantExceptionHandlerTest {

    @Test
    void testHandleTenantNotFoundException() {
        // Arrange
        TenantExceptionHandler tenantExceptionHandler = new TenantExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandleTenantNotFoundExceptionResult = tenantExceptionHandler
                .handleTenantNotFoundException(new TenantNotFoundException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandleTenantNotFoundExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(404, actualHandleTenantNotFoundExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandleTenantNotFoundExceptionResult.hasBody());
        assertTrue(actualHandleTenantNotFoundExceptionResult.getHeaders().isEmpty());
    }
}
