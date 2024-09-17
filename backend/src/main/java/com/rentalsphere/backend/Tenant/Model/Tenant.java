package com.rentalsphere.backend.Tenant.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.Marketplace.Model.Post;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.ViolationLog.Model.ViolationLog;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter@Setter
@Entity(name = "TenantApplications")
@Table(name = "TenantApplications")
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "TenantID")
    private Long tenantID;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "id")
    private User user;

    @NotBlank(message = "PhoneNumber cannot be blank.")
    @Column(name = "PhoneNumber", nullable = false)
    private String phoneNumber;

    @NotBlank(message = "Email Address cannot be blank.")
    @Column(name = "EmailAddress", nullable = false)
    private String emailAddress;

    @NotNull(message = "DateOfBirth cannot be blank.")
    @Column(name = "DateOfBirth", nullable = false)
    private Date dateOfBirth;

    @NotBlank(message = "SocialSecurityNumber cannot be blank.")
    @Column(name = "SocialSecurityNumber", nullable = false)
    private String socialSecurityNumber;

    @NotBlank(message = "Address cannot be blank.")
    @Column(name = "Address", nullable = false)
    private String streetAddress;

    @NotNull(message = "DesiredMoveInDate cannot be blank.")
    @Column(name = "DesiredMoveInDate", nullable = false)
    private Date desiredMoveInDate;

    @NotNull(message = "LeaseTermMonths cannot be blank.")
    @Positive(message = "LeaseTermMonths must be a positive number.")
    @Column(name = "LeaseTermMonths", nullable = false)
    private Integer leaseTermMonths;

    @NotNull(message = "NumOccupants cannot be blank.")
    @Positive(message = "NumOccupants must be a positive number.")
    @Column(name = "NumOccupants", nullable = false)
    private Integer numOccupants;

    @NotBlank(message = "CurrentEmployer cannot be blank.")
    @Column(name = "CurrentEmployer", nullable = false)
    private String currentEmployer;

    @NotNull(message = "LengthOfEmployment cannot be blank.")
    @Positive(message = "LengthOfEmployment must be a positive number.")
    @Column(name = "LengthOfEmployment", nullable = false)
    private Integer lengthOfEmployment;

//    @NotBlank(message = "ApplicationStatus cannot be blank.")
    @Column(name = "ApplicationStatus", nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicationStatus applicationStatus;

    @NotNull(message = "CreationDate cannot be blank.")
    @Column(name = "CreationDate", nullable = false)
    private Date creationDate;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "PropertyApplicationID") // This is the foreign key column in PropertyApplications table
    private Property property;

    @JsonIgnore
    @OneToMany(mappedBy = "tenant")
    private List<Lease> leaseList;

    @JsonIgnore
    @OneToMany(mappedBy = "tenant")
    private List<Post> posts;

    @OneToMany(mappedBy = "tenant")
    private List<ViolationLog> violationLogs;
}
