package com.rentalsphere.backend.Authentication.Service;

import com.rentalsphere.backend.Authentication.Service.IService.IAuthenticationService;
import com.rentalsphere.backend.Configuration.JwtService;
import com.rentalsphere.backend.Enums.EmailType;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenExpiredException;
import com.rentalsphere.backend.Exception.ResetPasswordToken.TokenNotFoundException;
import com.rentalsphere.backend.Exception.User.InvalidCredentialsException;
import com.rentalsphere.backend.Exception.User.SamePasswordException;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.RequestResponse.Authentication.*;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.Services.Email.IService.IEmailService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthenticationService implements IAuthenticationService {
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final AuthenticationManager authenticationManager;
    @Autowired
    private final IEmailService emailService;

    private final static int EXPIRY_TIME = 60 * 60 * 1000;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        if(userRepository.findByEmail(request.getEmail()).isPresent()){
            throw new UserAlreadyExistsException("User with same email already exists");
        }
        User user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roles(Arrays.asList(roleRepository.findByName(Roles.USER)))
                .build();
        userRepository.save(user);
        List<String> userRoles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());
        String token = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .isSuccess(true)
                .email(user.getEmail())
                .token(token)
                .roles(userRoles)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public AuthenticationResponse login(LoginRequest request){
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(()->
                new InvalidCredentialsException("No registered user with this email")
        );

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Incorrect Password");
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )

        );

        List<String> userRoles = user.getRoles().stream().map(role -> role.getName().name()).collect(Collectors.toList());
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .isSuccess(true)
                .email(user.getEmail())
                .token(jwtToken)
                .roles(userRoles)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public ForgotPasswordResponse forgotPassword(ForgotPasswordRequest request) throws MessagingException {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if(!user.isPresent()){
            throw new UserNotFoundException("No such user exists");
        }

        String token = UUID.randomUUID().toString();

        user.get().setPasswordResetToken(token);
        long currentTime = new Date().getTime();
        user.get().setTokenExpiryDate(new Date(currentTime + EXPIRY_TIME));

        userRepository.save(user.get());
        emailService.sendEmailTemplate(EmailType.PASSWORD_RESET, user.get().getEmail(), "Forgot Password", user.get().getFirstName() + " " + user.get().getLastName(), "Here is your password reset link ", token);

        return ForgotPasswordResponse
                .builder()
                .isSuccess(true)
                .successMessage("email sent")
                .timeStamp(new Date())
                .build();
    }

    @Override
    @Transactional
    public ForgotPasswordResponse changePassword(ChangePasswordRequest request) {
        Optional<User> user = userRepository.findByEmail(request.getEmail());

        if(!user.isPresent()){
            throw new UserNotFoundException("No such user exists");
        }

        String token = user.get().getPasswordResetToken();

        if(!token.equals(request.getToken())){
            throw new TokenNotFoundException("Invalid password reset token");
        }

        if(!new Date().before(user.get().getTokenExpiryDate())){
            user.get().setPasswordResetToken(null);
            userRepository.save(user.get());
            throw new TokenExpiredException("Token is expired");
        }

        if(passwordEncoder.encode(request.getNewPassword()).equals(user.get().getPassword())){
            throw new SamePasswordException("New password cannot be same as old password");
        }
        user.get().setPasswordResetToken(null);
        user.get().setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user.get());

        return ForgotPasswordResponse
                .builder()
                .isSuccess(true)
                .successMessage("Password reset successful")
                .timeStamp(new Date())
                .build();
    }
}
