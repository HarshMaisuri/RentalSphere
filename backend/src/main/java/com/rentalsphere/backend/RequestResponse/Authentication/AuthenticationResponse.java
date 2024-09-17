package com.rentalsphere.backend.RequestResponse.Authentication;

import com.rentalsphere.backend.RequestResponse.BasicResponse.BasicResponse;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class AuthenticationResponse extends BasicResponse {
    private String email;
    private String token;
    private List<String> roles;
}
