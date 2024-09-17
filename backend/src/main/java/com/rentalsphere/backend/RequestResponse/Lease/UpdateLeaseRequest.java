package com.rentalsphere.backend.RequestResponse.Lease;

import com.rentalsphere.backend.Enums.LeaseStatus;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.hibernate.validator.constraints.Range;

@Data
@AllArgsConstructor
public class UpdateLeaseRequest {
    @Range(min = 1, message = "id cannot be less than 1")
    private Long id;
    @NotBlank(message = "startDate cannot be blank")
    private String startDate;
    @NotBlank(message = "endDate cannot be blank")
    private String endDate;
    @NotNull(message = "monthlyRent cannot be blank")
    @DecimalMin(value = "0.00", inclusive = false, message = "Monthly rent must be greater than 0.")
    private Double monthlyRent;
    private LeaseStatus leaseStatus;
}
