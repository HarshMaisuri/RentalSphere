package com.rentalsphere.backend.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rentalsphere.backend.Enums.LeaseStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LeaseDTO {
    private Long leaseId;
    private String firstName;
    private String lastName;
    private String email;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date dateOfBirth;
    private String phoneNumber;
    private String streetAddress;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date startDate;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date endDate;
    private Double monthlyRent;
    private Integer numOccupants;
    private String leasePdfUrl;
    private LeaseStatus leaseStatus;
}
