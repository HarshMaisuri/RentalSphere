package com.rentalsphere.backend.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rentalsphere.backend.Enums.AvailabilityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.Date;

@Data
@AllArgsConstructor
public class PostDTO {
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String imageUrl;
    private AvailabilityStatus availabilityStatus;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date creationDate;
    private String tenantName;
    private String tenantEmail;
    private String tenantPhone;
}
