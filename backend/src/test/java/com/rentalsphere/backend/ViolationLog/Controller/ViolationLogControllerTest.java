package com.rentalsphere.backend.ViolationLog.Controller;

import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogResponse;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterResponse;
import com.rentalsphere.backend.ViolationLog.Model.ViolationLog;
import com.rentalsphere.backend.ViolationLog.Service.IService.IViolationLogService;
import com.rentalsphere.backend.ViolationLog.Service.ViolationLogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ViolationLogControllerTest {

    @Mock
    private IViolationLogService violationLogService;

    @InjectMocks
    private ViolationLogController violationLogController;

    private ViolationLogRegisterRequest registerRequest;
    private UpdateViolationLogRequest updateRequest;

    @BeforeEach
    void setUp() {
        violationLogService = mock(ViolationLogService.class);
        violationLogController = new ViolationLogController(violationLogService);
        registerRequest = new ViolationLogRegisterRequest();
        updateRequest = new UpdateViolationLogRequest();
    }

    @Test
    void testGetAllViolationLogs() {
        // Setup
        List<ViolationLog> violationLogs = Collections.singletonList(new ViolationLog());
        when(violationLogService.getAllViolationLogs()).thenReturn(violationLogs);

        // Execute
        ResponseEntity<List<ViolationLog>> response = violationLogController.getAllViolationLogs();

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(violationLogs, response.getBody());
    }

    @Test
    void testGetViolationLogById_ExistingId() {
        // Setup
        Long id = 1L;
        ViolationLog violationLog = new ViolationLog();
        when(violationLogService.getViolationLogById(id)).thenReturn(Optional.of(violationLog));

        // Execute
        ResponseEntity<ViolationLog> response = violationLogController.getViolationLogById(id);

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(violationLog, response.getBody());
    }

    @Test
    void testGetViolationLogById_NonExistingId() {
        // Setup
        Long id = 1L;
        when(violationLogService.getViolationLogById(id)).thenReturn(Optional.empty());

        // Execute
        ResponseEntity<ViolationLog> response = violationLogController.getViolationLogById(id);

        // Verify
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertNull(response.getBody());
    }

    @Test
    void testCreateViolationLog() {
        // Setup
        ViolationLogRegisterResponse registerResponse = new ViolationLogRegisterResponse();
        when(violationLogService.createViolationLog(registerRequest)).thenReturn(registerResponse);

        // Execute
        ResponseEntity<ViolationLogRegisterResponse> response = violationLogController.createViolationLog(registerRequest);

        // Verify
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(registerResponse, response.getBody());
    }

    @Test
    void testUpdateViolationLog() {
        // Setup
        UpdateViolationLogResponse updateResponse = new UpdateViolationLogResponse();
        when(violationLogService.updateViolationLog(updateRequest)).thenReturn(updateResponse);

        // Execute
        ResponseEntity<UpdateViolationLogResponse> response = violationLogController.updateViolationLog(updateRequest);

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(updateResponse, response.getBody());
    }

    @Test
    void testDeleteViolationLog() {
        // Setup
        Long id = 1L;

        // Execute
        ResponseEntity<Void> response = violationLogController.deleteViolationLog(id);

        // Verify
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        verify(violationLogService, times(1)).deleteViolationLog(id);
    }

    @Test
    void testGetViolationLogsByPropertyId() {
        // Setup
        Long propertyId = 1L;
        List<ViolationLog> violationLogs = Collections.singletonList(new ViolationLog());
        when(violationLogService.getAllViolationLogsByPropertyId(propertyId)).thenReturn(violationLogs);

        // Execute
        ResponseEntity<List<ViolationLog>> response = violationLogController.getViolationLogsByPropertyId(propertyId);

        // Verify
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(violationLogs, response.getBody());
    }
}
