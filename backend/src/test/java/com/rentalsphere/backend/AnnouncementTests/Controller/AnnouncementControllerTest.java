package com.rentalsphere.backend.AnnouncementTests.Controller;

import com.rentalsphere.backend.Announcement.Controller.AnnouncementController;
import com.rentalsphere.backend.Announcement.Model.Announcement;
import com.rentalsphere.backend.Announcement.Repository.AnnouncementRepository;
import com.rentalsphere.backend.Announcement.Service.AnnouncementService;
import com.rentalsphere.backend.Announcement.Service.IService.IAnnouncementService;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Announcement.AnnouncementRegisterRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AnnouncementControllerTest {

    @Mock
    private IAnnouncementService announcementService;
    @Mock
    private PropertyRepository propertyRepository;
    @Mock
    private AnnouncementRepository announcementRepository;
    @InjectMocks
    private AnnouncementController announcementController;

    private AnnouncementRegisterRequest registerRequest;

    @BeforeEach
    void setUp() {
        propertyRepository = mock(PropertyRepository.class);
        announcementRepository = mock(AnnouncementRepository.class);
        announcementService = mock(AnnouncementService.class);
        announcementController = new AnnouncementController(announcementService);
        registerRequest = new AnnouncementRegisterRequest();
    }

    @Test
    void testGetAllAnnouncements() {
        // Setup
        List<Announcement> announcements = Collections.singletonList(new Announcement());
        when(announcementService.getAllAnnouncements()).thenReturn(announcements);

        // Execute
        ResponseEntity<List<Announcement>> response = announcementController.getAllAnnouncements();

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(announcements, response.getBody());
    }

    @Test
    void testGetAnnouncementById_ExistingId() {
        // Setup
        Long id = 1L;
        Announcement announcement = new Announcement();
        when(announcementService.getAnnouncementById(id)).thenReturn(Optional.of(announcement));

        // Execute
        ResponseEntity<Announcement> response = announcementController.getAnnouncementById(id);

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(announcement, response.getBody());
    }

    @Test
    void testGetAnnouncementById_NonExistingId() {
        // Setup
        Long id = 1L;
        when(announcementService.getAnnouncementById(id)).thenReturn(Optional.empty());

        // Execute
        ResponseEntity<Announcement> response = announcementController.getAnnouncementById(id);

        // Verify
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testCreateAnnouncement() {
        // Setup
        Announcement createdAnnouncement = new Announcement();
        when(announcementService.createAnnouncement(registerRequest)).thenReturn(createdAnnouncement);

        // Execute
        ResponseEntity<Announcement> response = announcementController.createAnnouncement(registerRequest);

        // Verify
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(createdAnnouncement, response.getBody());
    }

    @Test
    void testUpdateAnnouncement() {
        // Setup
        Long id = 1L;
        Announcement updatedAnnouncement = new Announcement();
        when(announcementService.updateAnnouncement(id, updatedAnnouncement)).thenReturn(updatedAnnouncement);

        // Execute
        ResponseEntity<Announcement> response = announcementController.updateAnnouncement(id, updatedAnnouncement);

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updatedAnnouncement, response.getBody());
    }

    @Test
    void testDeleteAnnouncement() {
        // Setup
        Long id = 1L;

        // Execute
        ResponseEntity<Void> response = announcementController.deleteAnnouncement(id);

        // Verify
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(announcementService, times(1)).deleteAnnouncement(id);
    }

    @Test
    void testGetAnnouncementsByPropertyId() {
        // Setup
        Long propertyId = 1L;
        List<Announcement> announcements = Collections.singletonList(new Announcement());
        when(announcementService.getAnnouncementsByPropertyId(propertyId)).thenReturn(announcements);

        // Execute
        ResponseEntity<List<Announcement>> response = announcementController.getAnnouncementsByPropertyId(propertyId);

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(announcements, response.getBody());
    }

    @Test
    void testGetAnnouncementForTenant() {
        // Setup
        String email = "test@example.com";
        List<Announcement> announcements = Collections.singletonList(new Announcement());
        when(announcementService.getAnnouncementForTenant(email)).thenReturn(announcements);

        // Execute
        ResponseEntity<List<Announcement>> response = announcementController.getAnnouncementForTenant(email);

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(announcements, response.getBody());
    }

    @Test
    void testGetAnnouncementsByPropertyId_PropertyNotFound() {
        Long propertyId = 1L;
        when(propertyRepository.findById(propertyId)).thenReturn(Optional.empty());

        // Simulate throwing PropertyNotFoundException
        doThrow(new PropertyNotFoundException("Property not found")).when(announcementService).getAnnouncementsByPropertyId(propertyId);

        // Act & Assert
        assertThrows(PropertyNotFoundException.class, () -> announcementService.getAnnouncementsByPropertyId(propertyId));
    }

}


