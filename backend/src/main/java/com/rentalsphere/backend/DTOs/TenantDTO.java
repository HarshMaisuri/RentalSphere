package com.rentalsphere.backend.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TenantDTO {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date dateOfBirth;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date desiredMoveInDate;
    private Integer numOccupants;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date ApplicationDate;
}
