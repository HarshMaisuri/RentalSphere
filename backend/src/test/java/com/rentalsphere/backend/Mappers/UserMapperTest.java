package com.rentalsphere.backend.Mappers;

import com.rentalsphere.backend.DTOs.PropertyManagerDTO;
import com.rentalsphere.backend.Mappers.UserMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.User.Model.User;
import org.apache.commons.lang3.time.DateUtils;
import org.junit.jupiter.api.Test;

import java.util.Calendar;
import java.util.Date;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class UserMapperTest {

    @Test
    public void testConvertToPropertyManagerDTO() {
        // Arrange
        User user = createDummyUser();
        Property property = createDummyProperty();

        // Act
        PropertyManagerDTO propertyManagerDTO = UserMapper.convertToPropertyManagerDTO(user, property);

        // Assert
        assertEquals("john.doe@example.com", propertyManagerDTO.getEmail());
        assertEquals("John", propertyManagerDTO.getFirstName());
        assertEquals("Doe", propertyManagerDTO.getLastName());
        assertEquals("1234567890", propertyManagerDTO.getPhoneNumber());
        assertEquals("ABCD1234", propertyManagerDTO.getLicenseNumber());
        assertEquals(DateUtils.truncate(propertyManagerDTO.getRequestDate(), Calendar.SECOND),
                DateUtils.truncate(new Date(), Calendar.SECOND));
    }

    private User createDummyUser() {
        User user = new User();
        user.setEmail("john.doe@example.com");
        user.setFirstName("John");
        user.setLastName("Doe");
        // Set other properties for user if needed
        return user;
    }

    private Property createDummyProperty() {
        Property property = new Property();
        property.setPhoneNumber("1234567890");
        property.setLicenseNumber("ABCD1234");
        property.setCreationDate(new Date());
        // Set other properties for property if needed
        return property;
    }
}

