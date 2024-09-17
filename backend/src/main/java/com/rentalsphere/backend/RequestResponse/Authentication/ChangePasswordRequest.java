package com.rentalsphere.backend.RequestResponse.Authentication;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {
    @NotBlank(message = "token cannot be blank!")
    private String token;
    @NotBlank(message = "email cannot be blank!")
    private String email;
    @NotBlank(message = "new password cannot be blank!")
    private String newPassword;
}
