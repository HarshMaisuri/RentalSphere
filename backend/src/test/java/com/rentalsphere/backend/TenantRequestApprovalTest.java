package com.rentalsphere.backend;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Property.Service.PropertyService;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import com.rentalsphere.backend.Services.Email.EmailService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import com.rentalsphere.backend.Role.Model.Role;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TenantRequestApprovalTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private EmailService emailService;

    @InjectMocks
    private PropertyService propertyService;

//    @Test
//    public void testAcceptTenantRequest() throws MessagingException {
//
//        String email = "abc@gmail.com";
//        User user = new User();
//        user.setEmail(email);
//
//
//        Role tenantRole = new Role();
//        tenantRole.setName(Roles.USER);
//        roleRepository.save(tenantRole);
//
//
//        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
//
//
//        when(roleRepository.findByName(Roles.TENANT)).thenReturn(tenantRole);
//
//
//        TenantResponse response = propertyService.acceptTenantRequest(email);
//
//
//        verify(userRepository, times(1)).findByEmail(email);
//
//
//        verify(roleRepository, times(1)).findByName(Roles.TENANT);
//
//        assertTrue(response.isSuccess());
//        assertEquals("Request Accepted", response.getMessage());
//        assertNotNull(response.getTimeStamp());
//
//
//        verify(emailService, times(1)).sendEmailTemplate(
//                any(),
//                eq(email),
//                eq("Request Accepted"),
//                any(),
//                eq("Congratulations, your request to become a tenant has been accepted by the property manager."),
//                any()
//        );
//    }

    @Test
    public void testAcceptTenantRequest_UserNotFound() {
        // Mocking new user data and UserRepository
        String email = "newuser@example.com";
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // Calling the method under test and expecting UserNotFoundException
        assertThrows(UserNotFoundException.class, () -> propertyService.acceptTenantRequest(email));

        // Verifying Repository interactions
        verify(userRepository, times(1)).findByEmail(email);
        verifyNoInteractions(roleRepository);
        verifyNoInteractions(emailService);
    }
}



