package com.rentalsphere.backend.AdminTests.Service;

import com.rentalsphere.backend.Admin.Service.AdminService;
import com.rentalsphere.backend.Admin.Service.IService.IAdminService;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerRequests;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerResponse;
import com.rentalsphere.backend.Role.Model.Role;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.Services.Email.EmailService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.*;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

public class AdminServiceTest {

    @Mock
    private PropertyRepository propertyRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private AdminService adminService;
    @Mock
    User user;
    @Mock
    Role role;
    @Mock
    Roles roles;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAcceptRequest() {
        User user = new User();
        user.setEmail("user@example.com");
        user.setRoles(new ArrayList<>());

        Property property = new Property();
        property.setApplicationStatus(ApplicationStatus.PENDING);

        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.of(user));
        when(roleRepository.findByName(Roles.PROPERTY_MANAGER)).thenReturn(new Role());
        when(propertyRepository.findByPropertyManagerAndApplicationStatus(user, ApplicationStatus.PENDING)).thenReturn(property);

        PropertyManagerResponse response = adminService.acceptRequest("user@example.com");

        assertEquals("Request Accepted", response.getMessage());
        assertEquals(ApplicationStatus.APPROVED, property.getApplicationStatus());
        verify(userRepository).save(user);
        verify(propertyRepository).save(property);
    }

    @Test
    void testAcceptRequestPropertyManager(){
        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(user.getRoles()).thenReturn(new ArrayList<>(Arrays.asList(role)));
        when(role.getName()).thenReturn(Roles.PROPERTY_MANAGER);
        assertThrows(UserAlreadyExistsException.class, () -> adminService.acceptRequest(user.getEmail()),"User is already a Property Manager");
    }

    @Test
    void testRejectNonExistentUser() {
        when(userRepository.findByEmail("user@example.com")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> adminService.acceptRequest("user@example.com"));
    }

    @Test
    void testRejectRequest() {
        User user = new User();
        user.setEmail("user@example.com");

        Property property = new Property();
        property.setApplicationStatus(ApplicationStatus.PENDING);

        when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
        when(propertyRepository.findByPropertyManagerAndApplicationStatus(user, ApplicationStatus.PENDING)).thenReturn(property);

        PropertyManagerResponse response = adminService.rejectRequest(user.getEmail());
        assertNotNull(response);
        assertEquals("Request Rejected", response.getMessage());
        assertEquals(ApplicationStatus.REJECTED, property.getApplicationStatus());
        verify(propertyRepository).save(property);
    }

    @Test
    void testNonExistentUserThrowsException() {
        String email = "nonexistent@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> adminService.rejectRequest(email));
    }




    @Test
    void testGetAllRequestsNoProperties() {
        when(propertyRepository.findAllByApplicationStatus(ApplicationStatus.PENDING)).thenReturn(Collections.emptyList());
        when(userRepository.findAllById(anySet())).thenReturn(Collections.emptyList());

        PropertyManagerRequests result = adminService.getAllRequests();

        assertNotNull(result);
        assertTrue(result.getPropertyManagerRequest().isEmpty());
        assertNotNull(result.getTimeStamp());

        verify(propertyRepository).findAllByApplicationStatus(ApplicationStatus.PENDING);
        verify(userRepository, never()).findAllById(anySet());
    }

}
