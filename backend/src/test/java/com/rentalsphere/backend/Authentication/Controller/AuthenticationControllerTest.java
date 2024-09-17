package com.rentalsphere.backend.Authentication.Controller;

import com.rentalsphere.backend.Authentication.Service.IService.IAuthenticationService;
import com.rentalsphere.backend.RequestResponse.Authentication.*;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationControllerTest {
    @InjectMocks
    private AuthenticationController authenticationController;
    @Mock
    private IAuthenticationService authenticationService;
    @Mock
    private ResponseEntity<?> responseEntity;
    private RegisterRequest registerRequest;
    private LoginRequest loginRequest;
    private ForgotPasswordRequest forgotPasswordRequest;
    private ChangePasswordRequest changePasswordRequest;
    private AuthenticationResponse authenticationResponse;
    private ForgotPasswordResponse forgotPasswordResponse;

    @BeforeEach
    void init() {
        registerRequest = new RegisterRequest("Raj", "Patel", "raj@gmail.com", "raj@12345");
        loginRequest = new LoginRequest("raj@gmail.com", "raj@12345");
    }

    @Test
    void register() {
        authenticationResponse = AuthenticationResponse.builder()
                .isSuccess(true)
                .email(registerRequest.getEmail())
                .token("token")
                .roles(List.of("USER"))
                .timeStamp(new Date())
                .build();
        responseEntity = new ResponseEntity<>(authenticationResponse, HttpStatus.CREATED);

        when(authenticationService.register(registerRequest)).thenReturn(authenticationResponse);

        assertEquals(responseEntity, authenticationController.register(registerRequest));
    }

    @Test
    void login() {
        authenticationResponse = AuthenticationResponse.builder()
                .isSuccess(true)
                .email(loginRequest.getEmail())
                .token("token")
                .roles(List.of("USER"))
                .timeStamp(new Date())
                .build();
        responseEntity = new ResponseEntity<>(authenticationResponse, HttpStatus.CREATED);

        when(authenticationService.login(loginRequest)).thenReturn(authenticationResponse);

        assertEquals(responseEntity, authenticationController.login(loginRequest));
    }

    @Test
    void testForgotPassword() throws MessagingException {
        forgotPasswordResponse = ForgotPasswordResponse.builder()
                .isSuccess(true)
                .successMessage("email sent")
                .timeStamp(new Date())
                .build();
        responseEntity = new ResponseEntity<>(forgotPasswordResponse, HttpStatus.OK);

        when(authenticationService.forgotPassword(forgotPasswordRequest)).thenReturn(forgotPasswordResponse);

        assertEquals(responseEntity, authenticationController.forgotPassword(forgotPasswordRequest));
    }

    @Test
    void testChangePassword() throws MessagingException {
        forgotPasswordResponse = ForgotPasswordResponse.builder()
                .isSuccess(true)
                .successMessage("Password reset successful")
                .timeStamp(new Date())
                .build();
        responseEntity = new ResponseEntity<>(forgotPasswordResponse, HttpStatus.OK);

        when(authenticationService.changePassword(changePasswordRequest)).thenReturn(forgotPasswordResponse);

        assertEquals(responseEntity, authenticationController.forgotPassword(changePasswordRequest));
    }
}
