package com.rentalsphere.backend.RequestResponse.Authentication;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank(message = "First name cannot be blank.")
    private String firstName;
    @NotBlank(message = "Last name cannot be blank.")
    private String lastName;
    @NotBlank(message = "Email cannot be blank.")
    private String email;
    @NotBlank(message = "Password cannot be blank.")
    private String password;
}
