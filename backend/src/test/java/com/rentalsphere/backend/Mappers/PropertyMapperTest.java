package com.rentalsphere.backend.Mappers;
import com.rentalsphere.backend.DTOs.PropertyDTO;
import com.rentalsphere.backend.Mappers.PropertyMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PropertyMapperTest {

    @Test
    public void testConvertToPropertiesDTO() {
        List<Property> properties = createDummyProperties();

        List<PropertyDTO> propertyDTOs = PropertyMapper.convertToPropertiesDTO(properties);

        assertEquals(2, propertyDTOs.size());
    }

//    @Test
//    public void testConvertToPropertiesWithTenant() {
//        // Arrange
//        List<Property> properties = createDummyProperties();
//
//        // Act
//        List<PropertyDTO> propertyDTOs = PropertyMapper.convertToPropertiesWithTenant(properties);
//
//        // Assert
//        assertEquals(2, propertyDTOs.size());
//        // Add minimal assertions here for readability
//    }

    private List<Property> createDummyProperties() {
        List<Property> properties = new ArrayList<>();

        // Property 1
        Property property1 = new Property();
        property1.setPropertyApplicationID(1L);
        property1.setPropertyManager(createDummyUser("John", "Doe"));
        property1.setEmailAddress("john@example.com");
        property1.setPhoneNumber("1234567890");
        property1.setPropertyImages(new ArrayList<>()); // Ensure propertyImages is not null
        property1.setTenants(new ArrayList<>()); // Ensure tenants is not null
        // Set other properties for property1

        // Property 2
        Property property2 = new Property();
        property2.setPropertyApplicationID(2L);
        property2.setPropertyManager(createDummyUser("Jane", "Smith"));
        property2.setEmailAddress("jane@example.com");
        property2.setPhoneNumber("9876543210");
        property2.setPropertyImages(new ArrayList<>()); // Ensure propertyImages is not null
        property2.setTenants(new ArrayList<>()); // Ensure tenants is not null
        // Set other properties for property2

        properties.add(property1);
        properties.add(property2);

        return properties;
    }


    private User createDummyUser(String firstName, String lastName) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        return user;
    }
}
