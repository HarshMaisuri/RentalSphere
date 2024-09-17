package com.rentalsphere.backend.Property.Service;

import com.rentalsphere.backend.DTOs.PropertyDTO;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.RentedStatus;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Mappers.PropertyMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Property.GetAllPropertyResponse;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
public class PropertyServiceTest {
    @InjectMocks
    private PropertyService propertyService;
    @Mock
    private PropertyRepository propertyRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private Property property;
    @Mock
    private User user;
    private PropertyDTO dummyProperty;

    @BeforeEach
    void init(){
        this.dummyProperty = new PropertyDTO();
        dummyProperty.setPropertyId(123L);
        dummyProperty.setPropertyManagerName("John Doe");
        dummyProperty.setContactEmail("john.doe@example.com");
        dummyProperty.setPhoneNumber("123-456-7890");
        dummyProperty.setPropertyDescription("Spacious apartment with great views");
        dummyProperty.setPropertyAddress("123 Main St");
        dummyProperty.setCity("Exampleville");
        dummyProperty.setState("XY");
        dummyProperty.setZipCode("12345");
        dummyProperty.setMonthlyRent(1500.0);
        dummyProperty.setAvailableMoveInDate(new Date()); // Current date
        dummyProperty.setNumBathrooms(2);
        dummyProperty.setNumBedrooms(3);
        List<String> imageURLs = new ArrayList<>();
        imageURLs.add("https://example.com/image1.jpg");
        imageURLs.add("https://example.com/image2.jpg");
        dummyProperty.setImageURLs(imageURLs);
    }

    @Test
    void testGetAllPropertyApplications(){
        GetAllPropertyResponse expectedResponse = GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(List.of(dummyProperty))
                .timeStamp(new Date())
                .build();

        GetAllPropertyResponse response;

        when(propertyRepository.findAllByApplicationStatusAndRentedStatus(any(ApplicationStatus.class), any(RentedStatus.class))).thenReturn(List.of(property));

        try(MockedStatic<PropertyMapper> propertyMapper = mockStatic(PropertyMapper.class)){
            propertyMapper.when(()->PropertyMapper.convertToPropertiesDTO(anyList())).thenReturn(List.of(dummyProperty));
            response = propertyService.getAllPropertyApplications();
        }

        assertEquals(expectedResponse, response);
    }

    @Test
    void testGetAllPropertyForManager(){
        GetAllPropertyResponse expectedResponse = GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(List.of(dummyProperty))
                .timeStamp(new Date())
                .build();

        GetAllPropertyResponse response;

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(propertyRepository.findAllByPropertyManagerAndApplicationStatus(any(User.class), any(ApplicationStatus.class))).thenReturn(List.of(property));

        try(MockedStatic<PropertyMapper> propertyMapper = mockStatic(PropertyMapper.class)){
            propertyMapper.when(()->PropertyMapper.convertToPropertiesDTO(anyList())).thenReturn(List.of(dummyProperty));
            response = propertyService.getAllPropertyForManager("test@gmail.com", ApplicationStatus.PENDING.name());
        }

        assertEquals(expectedResponse, response);
    }

    @Test
    void testGetAllPropertyForManagerNotFoundException(){
        when(userRepository.findByEmail("test@gmail.com")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
           propertyService.getAllPropertyForManager("test@gmail.com", ApplicationStatus.PENDING.name());
        });
    }

    @Test
    void testGetAllPropertyWithTenant(){
        GetAllPropertyResponse expectedResponse = GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(List.of(dummyProperty))
                .timeStamp(new Date())
                .build();
        GetAllPropertyResponse response;

        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        when(propertyRepository.findAllByPropertyManagerAndRentedStatus(any(User.class), any(RentedStatus.class))).thenReturn(List.of(property));

        try(MockedStatic<PropertyMapper> propertyMapper = mockStatic(PropertyMapper.class)){
            propertyMapper.when(()->PropertyMapper.convertToPropertiesWithTenant(anyList())).thenReturn(List.of(dummyProperty));
            response = propertyService.getAllPropertyWithTenant("test@gmail.com");
        }

        assertEquals(expectedResponse, response);
    }

    @Test
    void testGetAllPropertyWithTenantNotFoundException(){
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, ()->{
           propertyService.getAllPropertyWithTenant("test@gmail.com");
        });
    }
}
