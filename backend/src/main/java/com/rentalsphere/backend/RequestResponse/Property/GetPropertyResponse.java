package com.rentalsphere.backend.RequestResponse.Property;

import com.rentalsphere.backend.DTOs.PropertiesDTO;
import com.rentalsphere.backend.DTOs.PropertyDTO;
import com.rentalsphere.backend.RequestResponse.BasicResponse.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class GetPropertyResponse extends BasicResponse {
    private PropertyDTO property;
}
