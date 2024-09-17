package com.rentalsphere.backend.RequestResponse.Lease;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Range;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
public class LeaseRequest {
    @NotBlank(message = "startDate cannot be blank")
    private String startDate;
    @NotBlank(message = "endDate cannot be blank")
    private String endDate;
    @NotNull(message = "monthlyRent cannot be blank")
    @DecimalMin(value = "0.00", inclusive = false, message = "Monthly rent must be greater than 0.")
    private Double monthlyRent;
    private MultipartFile leasePdf;
    private String applicationStatus;
    @Range(min = 1, message = "propertyId cannot be 0 or negative")
    private Long propertyId;
    @Range(min = 1, message = "tenantId cannot be 0 or negative")
    private Long tenantId;
}
