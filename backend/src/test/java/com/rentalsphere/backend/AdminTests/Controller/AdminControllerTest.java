package com.rentalsphere.backend.AdminTests.Controller;
import com.rentalsphere.backend.Admin.Controller.AdminController;
import com.rentalsphere.backend.Admin.Service.AdminService;
import com.rentalsphere.backend.Admin.Service.IService.IAdminService;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerRequests;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
public class AdminControllerTest {
    @Mock
    private IAdminService adminService;

    @InjectMocks
    private AdminController adminController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testAcceptRequest() {
        String email = "test@example.com";
        PropertyManagerResponse expectedResponse = new PropertyManagerResponse(); // Assume this is a valid response object.
        when(adminService.acceptRequest(email)).thenReturn(expectedResponse);

        ResponseEntity<PropertyManagerResponse> response = adminController.acceptRequest(email);

        verify(adminService, times(1)).acceptRequest(email);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testRejectRequest() {
        String email = "test@example.com";
        PropertyManagerResponse expectedResponse = new PropertyManagerResponse(); // Assume this is a valid response object.
        when(adminService.rejectRequest(email)).thenReturn(expectedResponse);

        ResponseEntity<PropertyManagerResponse> response = adminController.rejectRequest(email);

        verify(adminService, times(1)).rejectRequest(email);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedResponse, response.getBody());
    }

    @Test
    void testGetAllRequests() {
        PropertyManagerRequests expectedRequests = new PropertyManagerRequests(); // Assume this is a valid requests object.
        when(adminService.getAllRequests()).thenReturn(expectedRequests);

        ResponseEntity<PropertyManagerRequests> response = adminController.getAllRequests();

        verify(adminService, times(1)).getAllRequests();
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(expectedRequests, response.getBody());
    }
}
