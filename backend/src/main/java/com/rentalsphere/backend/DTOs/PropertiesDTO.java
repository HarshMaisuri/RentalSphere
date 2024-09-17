package com.rentalsphere.backend.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PropertiesDTO {
    private Long propertyId;
    private String contactEmail;
    private String propertyDescription;
    private String phoneNumber;
    private Double monthlyRent;
    private Integer numBedrooms;
    private Integer numBathrooms;
    private String imageURL;
}
