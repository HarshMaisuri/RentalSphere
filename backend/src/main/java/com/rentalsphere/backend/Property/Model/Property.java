package com.rentalsphere.backend.Property.Model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.RentedStatus;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.PropertyImages.Model.PropertyImages;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;

import java.util.Date;
import java.util.List;


    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    @Getter@Setter
    @Table(name = "PropertyApplications")
    @Entity(name = "PropertyApplications")
    public class Property {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "PropertyApplicationID")
        private Long propertyApplicationID;

        @JsonIgnore
        @ManyToOne
        @JoinColumn(name = "manager_id", referencedColumnName = "id")
        // This is the foreign key column in PropertyApplications table
        private User propertyManager;

        @NotBlank(message = "Email address cannot be blank.")
        @Pattern(regexp = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$", message = "Valid email required.")
        @Column(name = "EmailAddress", nullable = false)
        private String emailAddress;
        //
        @NotBlank(message = "Phone number cannot be blank.")
        @Column(name = "PhoneNumber", nullable = false)
        private String phoneNumber;
        //
        @NotBlank(message = "Property address cannot be blank.")
        @Column(name = "PropertyAddress", nullable = false)
        private String propertyAddress;
        //
        @NotBlank(message = "City cannot be blank.")
        @Column(name = "City", nullable = false)
        private String city;
        //
        @NotBlank(message = "State cannot be blank.")
        @Column(name = "State", nullable = false)
        private String state;
        //
        @NotBlank(message = "ZIP code cannot be blank.")
        @Column(name = "ZIPCode", nullable = false)
        private String zipCode;
        //
        @NotNull(message = "Monthly rent cannot be null.")
        @DecimalMin(value = "0.00", inclusive = false, message = "Monthly rent must be greater than 0.")
        @Column(name = "MonthlyRent", nullable = false)
        private Double monthlyRent;
        //
        @NotNull(message = "Available move-in date cannot be null.")
        @Column(name = "AvailableMoveInDate", nullable = false)
        private Date availableMoveInDate;
        //
        @NotNull(message = "Number of bedrooms cannot be null.")
        @Min(value = 1, message = "Number of bedrooms must be at least 1.")
        @Column(name = "NumBedrooms", nullable = false)
        private Integer numBedrooms;
        //
        @NotNull(message = "Number of bathrooms cannot be null.")
        @Min(value = 1, message = "Number of bathrooms must be at least 1.")
        @Column(name = "NumBathrooms", nullable = false)
        private Integer numBathrooms;
        //
        @Column(name = "PropertyDescription", columnDefinition = "TEXT")
        private String propertyDescription;
        //
        @Column(name = "ApplicationStatus", nullable = false)
        @Enumerated(EnumType.STRING)
        private ApplicationStatus applicationStatus;
        @Column(name = "RentedStatus", nullable = false)
        @Enumerated(EnumType.STRING)
        private RentedStatus rentedStatus;
        //
        @NotNull(message = "Creation date cannot be null.")
        @Column(name = "CreationDate", nullable = false)
        private Date creationDate;
        //
        @NotBlank(message = "License number cannot be blank.")
        @Column(name = "LicenseNumber", nullable = false)
        private String licenseNumber;
        //
        @JsonIgnore
        @OneToMany(mappedBy = "property")
        private List<Tenant> tenants;
        //
        @JsonIgnore
        @OneToMany(mappedBy = "property")
        private List<PropertyImages> propertyImages;
        //
        @JsonIgnore
        @OneToMany(mappedBy = "property")
        private List<Lease> leaseList;

        @Override
        public String toString() {
            return "";
        }
    }
