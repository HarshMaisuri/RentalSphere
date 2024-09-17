package com.rentalsphere.backend.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyManagerDTO {
    private String email;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String licenseNumber;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date requestDate;
}
