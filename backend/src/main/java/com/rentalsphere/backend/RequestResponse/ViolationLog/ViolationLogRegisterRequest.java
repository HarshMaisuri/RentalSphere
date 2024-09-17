package com.rentalsphere.backend.RequestResponse.ViolationLog;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class ViolationLogRegisterRequest {

    @NotBlank(message = "Title cannot be blank.")
    private String title;

    @NotBlank(message = "Description cannot be blank.")
    private String description;

    @NotNull(message = "Date cannot be null.")
    private Date date;

    private String personalComments;

    private String intensity;

    private Double monetaryDamage;

    private Long propertyId;
    private Long tenantId;
}
