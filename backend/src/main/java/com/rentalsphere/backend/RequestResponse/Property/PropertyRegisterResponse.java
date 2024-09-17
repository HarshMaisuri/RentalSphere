package com.rentalsphere.backend.RequestResponse.Property;

import com.rentalsphere.backend.RequestResponse.BasicResponse.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class PropertyRegisterResponse extends BasicResponse {
    private String message;
}
