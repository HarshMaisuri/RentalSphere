package com.rentalsphere.backend.RequestResponse.ViolationLog;

import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateViolationLogRequest {

    @NotNull(message = "id cannot be null")
    @Positive(message = "id must be a positive number")
    private Long id;

    @NotBlank(message = "Title cannot be blank")
    private String title;

    @NotBlank(message = "Description cannot be blank")
    private String description;

    @NotNull(message = "Date cannot be null")
    private Date date;

    private String personalComments;

    private String intensity;

    @DecimalMin(value = "0.00", inclusive = false, message = "Monetary damage must be greater than 0")
    private Double monetaryDamage;
}
