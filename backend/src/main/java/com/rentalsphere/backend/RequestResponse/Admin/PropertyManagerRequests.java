package com.rentalsphere.backend.RequestResponse.Admin;

import com.rentalsphere.backend.RequestResponse.BasicResponse.BasicResponse;
import com.rentalsphere.backend.DTOs.PropertyManagerDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
public class PropertyManagerRequests extends BasicResponse {
    private List<PropertyManagerDTO> propertyManagerRequest;
}
