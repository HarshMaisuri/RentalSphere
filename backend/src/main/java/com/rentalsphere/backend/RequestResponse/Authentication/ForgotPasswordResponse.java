package com.rentalsphere.backend.RequestResponse.Authentication;

import com.rentalsphere.backend.RequestResponse.BasicResponse.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class ForgotPasswordResponse extends BasicResponse {
    private String successMessage;
}
