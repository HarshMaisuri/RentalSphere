package com.rentalsphere.backend.Mappers;

import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.DTOs.PropertyManagerDTO;

public class UserMapper {
    public static PropertyManagerDTO convertToPropertyManagerDTO(User user, Property property){
        return new PropertyManagerDTO(
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                property.getPhoneNumber(),
                property.getLicenseNumber(),
                property.getCreationDate()
        );
    }
}
