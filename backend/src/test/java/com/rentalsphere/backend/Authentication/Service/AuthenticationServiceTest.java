package com.rentalsphere.backend.Authentication.Service;

import com.rentalsphere.backend.Authentication.Service.IService.IAuthenticationService;
import com.rentalsphere.backend.Configuration.JwtService;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenExpiredException;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenNotFoundException;
import com.rentalsphere.backend.Exception.User.InvalidCredentialsException;
import com.rentalsphere.backend.Exception.User.SamePasswordException;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.RequestResponse.Authentication.*;
import com.rentalsphere.backend.Role.Model.Role;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.Services.Email.IService.IEmailService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {

    @InjectMocks
    private AuthenticationService authenticationService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private UserRepository userRepository;
    @Mock
    private User user;
    private User anotherUser;
    @Mock
    private RegisterRequest registerRequest;
    @Mock
    private LoginRequest loginRequest;
    @Mock
    private ForgotPasswordRequest forgotPasswordRequest;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private RoleRepository roleRepository;
    @Mock
    private IEmailService emailService;
    @Mock
    private JwtService jwtService;
    private ForgotPasswordResponse forgotPassRespExpected;
    private ForgotPasswordResponse changePassRespExpected;
    private ChangePasswordRequest changePasswordRequest;
    private Role role;

    @BeforeEach
    void init(){
        role = new Role(UUID.randomUUID(), Roles.USER, null);
        user = User.builder()
                .email("raj@gmail.com")
                .password("raj@123")
                .firstName("Raj")
                .lastName("Patel")
                .passwordResetToken("token")
                .tokenExpiryDate(new Date(new Date().getTime() + 1000))
                .roles(List.of(role))
                .build();
        anotherUser = User.builder()
                .email("raj123anoth@gmail.com")
                .password("raj@123")
                .firstName("Raj")
                .lastName("Patel")
                .build();
        registerRequest = new RegisterRequest("Raj", "Patel", "raj@gmail.com", "raj@1235");
        loginRequest = new LoginRequest("raj@gmail.com", "raj@123");
        forgotPasswordRequest = new ForgotPasswordRequest("raj@gmail.com");
        changePasswordRequest = new ChangePasswordRequest("token","raj@gmail.com","raj@12345");
        forgotPassRespExpected = ForgotPasswordResponse.builder()
                .isSuccess(true)
                .successMessage("email sent")
                .timeStamp(new Date())
                .build();
        changePassRespExpected = ForgotPasswordResponse.builder()
                .isSuccess(true)
                .successMessage("Password reset successful")
                .timeStamp(new Date())
                .build();
    }

    @Test
    void testRegister(){
        when(userRepository.findByEmail(registerRequest.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(registerRequest.getPassword())).thenReturn(registerRequest.getPassword());
        when(roleRepository.findByName(Roles.USER)).thenReturn(role);
        when(userRepository.save(any(User.class))).thenReturn(user);
        when(jwtService.generateToken(any(User.class))).thenReturn("token");

        AuthenticationResponse response = authenticationService.register(registerRequest);

        assertTrue(response.isSuccess());
    }

    @Test
    void testRegisterUserAlreadyExistsException(){
        when(userRepository.findByEmail(registerRequest.getEmail())).thenReturn(Optional.of(user));

        assertThrows(UserAlreadyExistsException.class, () ->{
           authenticationService.register(registerRequest);
        });
    }

    @Test
    void testLogin(){
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(loginRequest.getPassword(), loginRequest.getPassword())).thenReturn(true);
        when(jwtService.generateToken(any(User.class))).thenReturn("token");

        AuthenticationResponse response = authenticationService.login(loginRequest);

        assertTrue(response.isSuccess());
    }

    @Test
    void testLoginNoSuchUserExistsException(){
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.empty());

        assertThrows(InvalidCredentialsException.class, ()->{
           authenticationService.login(loginRequest);
        });
    }

    @Test
    void testLoginInvalidCredentialsException(){
        when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
        when(passwordEncoder.matches(loginRequest.getPassword(), loginRequest.getPassword())).thenReturn(false);

        assertThrows(InvalidCredentialsException.class, ()->{
            authenticationService.login(loginRequest);
        });
    }

    @Test
    void testForgotPassword() throws MessagingException {
        when(userRepository.findByEmail(forgotPasswordRequest.getEmail())).thenReturn(Optional.of(user));

        ForgotPasswordResponse forgotPasswordResponseActual = authenticationService.forgotPassword(forgotPasswordRequest);

        assertEquals(forgotPassRespExpected, forgotPasswordResponseActual);
    }

    @Test
    void forgotPasswordResponseExpectedUserNotFoundException(){
        when(userRepository.findByEmail(forgotPasswordRequest.getEmail())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
            authenticationService.forgotPassword(forgotPasswordRequest);
        });
    }

    @Test
    void testChangePassword(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(user));
        when(passwordEncoder.encode(anyString())).thenReturn("raj@12345");

        ForgotPasswordResponse changePasswordResponseActual = authenticationService.changePassword(changePasswordRequest);

        assertEquals(changePassRespExpected, changePasswordResponseActual);
    }

    @Test
    void testChangePasswordUserNotFoundException(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
            authenticationService.changePassword(changePasswordRequest);
        });
    }

    @Test
    void testChangePasswordTokenNotFoundException(){
        user.setPasswordResetToken("");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        assertThrows(TokenNotFoundException.class, ()->{
           authenticationService.changePassword(changePasswordRequest);
        });
    }

    @Test
    void testChangePasswordInvalidToken(){
        user.setPasswordResetToken("another token");

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        assertThrows(TokenNotFoundException.class, ()->{
            authenticationService.changePassword(changePasswordRequest);
        });
    }

    @Test
    void testChangePasswordTokenExpired(){
        user.setTokenExpiryDate(new Date());
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        assertThrows(TokenExpiredException.class, ()->{
            authenticationService.changePassword(changePasswordRequest);
        });
    }

    @Test
    void testSamePasswordException(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.ofNullable(user));
        when(passwordEncoder.encode(anyString())).thenReturn("raj@123");

        assertThrows(SamePasswordException.class, ()->{
           authenticationService.changePassword(changePasswordRequest);
        });
    }
}
