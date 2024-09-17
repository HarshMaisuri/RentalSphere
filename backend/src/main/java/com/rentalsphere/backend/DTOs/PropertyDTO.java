package com.rentalsphere.backend.DTOs;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import lombok.*;

import java.util.Date;
import java.util.List;

@Getter@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PropertyDTO {
    private Long propertyId;
    private String propertyManagerName;
    private String contactEmail;
    private String phoneNumber;
    private String propertyDescription;
    private String propertyAddress;
    private String city;
    private String state;
    private String zipCode;
    private Double monthlyRent;
    @JsonFormat(pattern = "MMMM dd, yyyy")
    private Date availableMoveInDate;
    private Integer numBathrooms;
    private Integer numBedrooms;
    private List<String> imageURLs;
    private String tenantName;
    private Tenant tenant;

    public PropertyDTO(Long propertyId, String propertyAddress, String tenantName, Tenant tenant) {
        this.propertyId = propertyId;
        this.propertyAddress = propertyAddress;
        this.tenantName = tenantName;
        this.tenant = tenant;
    }

    public PropertyDTO(Long propertyId, String propertyManagerName, String contactEmail, String phoneNumber, String propertyDescription, String propertyAddress, String city, String state, String zipCode, Double monthlyRent, Date availableMoveInDate, Integer numBathrooms, Integer numBedrooms, List<String> imageURLs) {
        this.propertyId = propertyId;
        this.propertyManagerName = propertyManagerName;
        this.contactEmail = contactEmail;
        this.phoneNumber = phoneNumber;
        this.propertyDescription = propertyDescription;
        this.propertyAddress = propertyAddress;
        this.city = city;
        this.state = state;
        this.zipCode = zipCode;
        this.monthlyRent = monthlyRent;
        this.availableMoveInDate = availableMoveInDate;
        this.numBathrooms = numBathrooms;
        this.numBedrooms = numBedrooms;
        this.imageURLs = imageURLs;
    }
}
