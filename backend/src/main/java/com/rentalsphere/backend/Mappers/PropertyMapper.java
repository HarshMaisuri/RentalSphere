package com.rentalsphere.backend.Mappers;

import com.rentalsphere.backend.DTOs.PropertiesDTO;
import com.rentalsphere.backend.DTOs.PropertyDTO;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PropertyMapper {
    public static List<PropertyDTO> convertToPropertiesDTO(List<Property> properties) {
        List<PropertyDTO> propertyDTOs = new ArrayList<>();
        properties.forEach(property -> {
            propertyDTOs.add(convertToPropertyDTO(property));
        });
        return propertyDTOs;
    }

    public static PropertyDTO convertToPropertyDTO(Property property) {
        return new PropertyDTO(
                property.getPropertyApplicationID(),
                property.getPropertyManager().getFirstName() + " " + property.getPropertyManager().getLastName(),
                property.getEmailAddress(),
                property.getPhoneNumber(),
                property.getPropertyDescription(),
                property.getPropertyAddress(),
                property.getCity(),
                property.getState(),
                property.getZipCode(),
                property.getMonthlyRent(),
                property.getAvailableMoveInDate(),
                property.getNumBathrooms(),
                property.getNumBedrooms(),
                property.getPropertyImages().stream().map(image -> image.getImageUrl()).collect(Collectors.toList())
        );
    }

    public static List<PropertyDTO> convertToPropertiesWithTenant(List<Property> properties) {
        List<PropertyDTO> propertyDTOs = new ArrayList<>();
        properties.forEach(property -> {
            Tenant tenant = property.getTenants().get(0);
            User user = tenant.getUser();
            propertyDTOs.add(new PropertyDTO(
                            property.getPropertyApplicationID(),
                            property.getPropertyAddress(),
                            user.getFirstName() + " " + user.getLastName(),
                            tenant
                    )
            );
        });
        return propertyDTOs;
    }
}
