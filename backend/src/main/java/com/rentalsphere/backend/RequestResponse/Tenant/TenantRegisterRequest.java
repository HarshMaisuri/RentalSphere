package com.rentalsphere.backend.RequestResponse.Tenant;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class TenantRegisterRequest {

    @NotBlank(message = "Email Address cannot be blank.")
    @Column(name = "EmailAddress", nullable = false)
    private String emailAddress;

    @NotBlank(message = "PhoneNumber cannot be blank.")
    private String phoneNumber;

    @NotNull(message = "DateOfBirth cannot be blank.")
    private Date dateOfBirth;

    @NotBlank(message = "SocialSecurityNumber cannot be blank.")
    private String socialSecurityNumber;

    @NotBlank(message = "Address cannot be blank.")
    private String streetAddress;

//    @NotBlank(message = "PropertyListingID cannot be blank.")
//    @Column(name = "PropertyApplicationID", nullable = false)
//    private Property PropertyApplicationID;

    private Long propertyApplicationID;

    @NotNull(message = "DesiredMoveInDate cannot be blank.")
    private Date desiredMoveInDate;

    @NotNull(message = "LeaseTermMonths cannot be blank.")
    @Positive(message = "LeaseTermMonths must be a positive number.")
    private Integer leaseTermMonths;

    @NotNull(message = "NumOccupants cannot be blank.")
    @Positive(message = "NumOccupants must be a positive number.")
    private Integer numOccupants;

    @NotBlank(message = "CurrentEmployer cannot be blank.")
    private String currentEmployer;

    @NotNull(message = "LengthOfEmployment cannot be blank.")
    @Positive(message = "LengthOfEmployment must be a positive number.")
    private Integer lengthOfEmployment;

//    @NotBlank(message = "ApplicationStatus cannot be blank.")
//    private String applicationStatus;

    @NotNull(message = "CreationDate cannot be blank.")
    private Date creationDate;

}
