package com.rentalsphere.backend.Authentication.Controller;

import com.rentalsphere.backend.Authentication.Service.IService.IAuthenticationService;
import com.rentalsphere.backend.RequestResponse.Authentication.*;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/auth")
public class AuthenticationController{
    @Autowired
    private final IAuthenticationService authenticationService;

    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponse> register(@Valid @RequestBody RegisterRequest request){
        return new ResponseEntity<>(authenticationService.register(request), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody LoginRequest request){
        return new ResponseEntity<>(authenticationService.login(request), HttpStatus.CREATED);
    }

    @PostMapping(path = "/forgotpassword")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) throws MessagingException {
        return new ResponseEntity<>(authenticationService.forgotPassword(request), HttpStatus.OK);
    }

    @PostMapping(path = "/changepassword")
    public ResponseEntity<ForgotPasswordResponse> forgotPassword(@Valid @RequestBody ChangePasswordRequest request) throws MessagingException {
        return new ResponseEntity<>(authenticationService.changePassword(request), HttpStatus.OK);
    }
}
