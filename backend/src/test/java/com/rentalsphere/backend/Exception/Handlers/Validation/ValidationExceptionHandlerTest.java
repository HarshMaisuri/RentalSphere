package com.rentalsphere.backend.Exception.Handlers.Validation;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.context.request.ServletWebRequest;

class ValidationExceptionHandlerTest {

    @Test
    void testHandleMethodArgumentNotValid() {
        // Arrange
        ValidationExceptionHandler validationExceptionHandler = new ValidationExceptionHandler();
        MethodArgumentNotValidException exception = mock(MethodArgumentNotValidException.class);
        when(exception.getBindingResult()).thenReturn(new BindException("Target", "Object Name"));
        HttpHeaders headers = new HttpHeaders();
        HttpServletResponse response = mock(HttpServletResponse.class);
        when(response.isCommitted()).thenReturn(true);

        // Act
        ResponseEntity<Object> actualHandleMethodArgumentNotValidResult = validationExceptionHandler
                .handleMethodArgumentNotValid(exception, headers, null,
                        new ServletWebRequest(new MockHttpServletRequest(), response));

        // Assert
        verify(response).isCommitted();
        verify(exception).getBindingResult();
        assertNull(actualHandleMethodArgumentNotValidResult);
    }
}
