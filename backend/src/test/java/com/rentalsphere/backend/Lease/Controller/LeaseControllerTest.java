package com.rentalsphere.backend.Lease.Controller;

import com.rentalsphere.backend.DTOs.LeaseDTO;
import com.rentalsphere.backend.Enums.LeaseStatus;
import com.rentalsphere.backend.Lease.Service.IService.ILeaseService;
import com.rentalsphere.backend.Lease.Service.LeaseService;
import com.rentalsphere.backend.RequestResponse.Lease.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class LeaseControllerTest {

    final double monthlyRent = 2500.00;
    @InjectMocks
    private LeaseController leaseController;
    @Mock
    private ILeaseService leaseService;
    @Mock
    private MockMultipartFile file;
    @Mock
    private LeaseDTO leaseDTO;
    private LeaseRequest leaseRequest;
    private UpdateLeaseRequest updateLeaseRequest;
    private LeaseResponse leaseResponse;
    private GetAllLeaseResponse getAllLeaseResponse;
    private GetLeaseResponse getLeaseResponse;

    @BeforeEach
    void init(){
        leaseRequest = new LeaseRequest("2024-03-10", "2025-03-10", monthlyRent, file, LeaseStatus.ACTIVE.name(), 1L, 1L);
        updateLeaseRequest = new UpdateLeaseRequest(1L,"2024-03-10", "2025-03-10", monthlyRent, LeaseStatus.INACTIVE);
    }

    @Test
    void testAddLease() throws IOException, ParseException {
        leaseResponse = LeaseResponse.builder()
                .isSuccess(true)
                .message("lease added.")
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(leaseResponse, HttpStatus.CREATED);

        when(leaseService.addLease(leaseRequest)).thenReturn(leaseResponse);

        assertEquals(responseEntity, leaseController.addLease(leaseRequest));
    }

    @Test
    void testGetAllLeaseForProperty(){
        getAllLeaseResponse = GetAllLeaseResponse.builder()
                .isSuccess(true)
                .leaseDetailsList(List.of(leaseDTO))
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(getAllLeaseResponse, HttpStatus.OK);

        when(leaseService.getAllLeaseForProperty(anyLong())).thenReturn(getAllLeaseResponse);

        assertEquals(responseEntity, leaseController.getAllLeaseForProperty(anyLong()));
    }

    @Test
    void testGetLeaseById(){
        getLeaseResponse = GetLeaseResponse.builder()
                .isSuccess(true)
                .lease(leaseDTO)
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(getLeaseResponse, HttpStatus.OK);

        when(leaseService.getLeaseById(anyLong())).thenReturn(getLeaseResponse);

        assertEquals(responseEntity, leaseController.getLeaseById(anyLong()));
    }

    @Test
    void testUpdateLease() throws ParseException {
        leaseResponse = LeaseResponse.builder()
                .isSuccess(true)
                .message("lease updated.")
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(leaseResponse, HttpStatus.OK);

        when(leaseService.updateLease(updateLeaseRequest)).thenReturn(leaseResponse);

        assertEquals(responseEntity, leaseController.updateLease(updateLeaseRequest));
    }

    @Test
    void testRemoveLease(){
        leaseResponse = LeaseResponse.builder()
                .isSuccess(true)
                .message("lease removed.")
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(leaseResponse, HttpStatus.OK);

        when(leaseService.removeLease(anyLong())).thenReturn(leaseResponse);

        assertEquals(responseEntity, leaseController.removeLease(anyLong()));
    }

    @Test
    void testGetLeaseForTenant(){
        getLeaseResponse = GetLeaseResponse.builder()
                .isSuccess(true)
                .lease(leaseDTO)
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(getLeaseResponse, HttpStatus.OK);

        when(leaseService.getLeaseForTenant(anyString())).thenReturn(getLeaseResponse);

        assertEquals(responseEntity, leaseController.getLeaseForTenant(anyString()));
    }
}
