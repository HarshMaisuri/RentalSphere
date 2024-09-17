package com.rentalsphere.backend.Authentication.Service.IService;

import com.rentalsphere.backend.RequestResponse.Authentication.*;
import jakarta.mail.MessagingException;

public interface IAuthenticationService {
    public AuthenticationResponse register(RegisterRequest request);

    public AuthenticationResponse login(LoginRequest request);
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) throws MessagingException;
    public ForgotPasswordResponse changePassword(ChangePasswordRequest request);
}
