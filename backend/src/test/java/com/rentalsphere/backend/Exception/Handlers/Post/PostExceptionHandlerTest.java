package com.rentalsphere.backend.Exception.Handlers.Post;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import com.rentalsphere.backend.Exception.Post.PostNotFoundException;
import com.rentalsphere.backend.RequestResponse.Exception.ExceptionResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.ResponseEntity;

class PostExceptionHandlerTest {
    /**
     * Method under test:
     * {@link PostExceptionHandler#handlePostNotFoundException(PostNotFoundException)}
     */
    @Test
    void testHandlePostNotFoundException() {
        // Arrange
        PostExceptionHandler postExceptionHandler = new PostExceptionHandler();

        // Act
        ResponseEntity<ExceptionResponse> actualHandlePostNotFoundExceptionResult = postExceptionHandler
                .handlePostNotFoundException(new PostNotFoundException("An error occurred"));

        // Assert
        ExceptionResponse body = actualHandlePostNotFoundExceptionResult.getBody();
        assertEquals("An error occurred", body.getErrorMessage());
        assertNull(body.getFieldErrors());
        assertEquals(404, actualHandlePostNotFoundExceptionResult.getStatusCodeValue());
        assertFalse(body.isSuccess());
        assertTrue(actualHandlePostNotFoundExceptionResult.hasBody());
        assertTrue(actualHandlePostNotFoundExceptionResult.getHeaders().isEmpty());
    }
}
