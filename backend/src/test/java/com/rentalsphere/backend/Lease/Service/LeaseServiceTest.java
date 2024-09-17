package com.rentalsphere.backend.Lease.Service;

import com.rentalsphere.backend.DTOs.LeaseDTO;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.LeaseStatus;
import com.rentalsphere.backend.Exception.Lease.LeaseNotFoundException;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.Lease.Repository.LeaseRepository;
import com.rentalsphere.backend.Mappers.LeaseMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Lease.*;
import com.rentalsphere.backend.Services.Cloudinary.IService.ICloudinaryService;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import com.rentalsphere.backend.User.Model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class LeaseServiceTest {

    final double monthlyRent = 2500.00;
    final int leaseTermMonth = 12;
    final int numOfOccupants = 2;
    final int numBedrooms = 2;
    @InjectMocks
    private LeaseService leaseService;
    @Mock
    private LeaseRepository leaseRepository;
    @Mock
    private TenantRepository tenantRepository;
    @Mock
    private PropertyRepository propertyRepository;
    @Mock
    private ICloudinaryService cloudinaryService;
    private LeaseRequest leaseRequest;
    private UpdateLeaseRequest updateLeaseRequest;
    @Mock
    private User user;
    @Mock
    private Tenant tenant;
    @Mock
    private Property property;
    @Mock
    private Lease lease;
    @Mock
    private LeaseDTO leaseDTO;
    @Mock
    private MockMultipartFile file;

    @BeforeEach
    void init(){
        user = User.builder()
                .id(UUID.randomUUID())
                .email("patel@gmail.com")
                .firstName("Raj")
                .lastName("Patel")
                .build();
        property = Property.builder()
                .propertyApplicationID(1L)
                .propertyManager(user)
                .emailAddress("patel@gmail.com")
                .phoneNumber("9999999999")
                .propertyAddress("some address")
                .city("some city")
                .state("some state")
                .zipCode("zip")
                .monthlyRent(monthlyRent)
                .availableMoveInDate(new Date())
                .numBedrooms(numBedrooms)
                .numBathrooms(1)
                .propertyDescription("some description")
                .applicationStatus(ApplicationStatus.APPROVED)
                .creationDate(new Date())
                .licenseNumber("licensenumber")
                .build();
        tenant = Tenant.builder()
                .tenantID(1L)
                .user(user)
                .phoneNumber("9999999999")
                .emailAddress("patel@gmail.com")
                .dateOfBirth(new Date())
                .socialSecurityNumber("1234567890")
                .streetAddress("some street")
                .desiredMoveInDate(new Date())
                .leaseTermMonths(leaseTermMonth)
                .numOccupants(numOfOccupants)
                .currentEmployer("some employer")
                .lengthOfEmployment(1)
                .applicationStatus(ApplicationStatus.APPROVED)
                .creationDate(new Date())
                .property(property)
                .build();
        lease = Lease.builder()
                .id(1L)
                .startDate(new Date())
                .endDate(new Date())
                .monthlyRent(monthlyRent)
                .leaseStatus(LeaseStatus.ACTIVE)
                .leasePdf("pdf url")
                .tenant(tenant)
                .property(property)
                .build();
        leaseRequest = new LeaseRequest("2024-03-10", "2025-03-10", monthlyRent, file, LeaseStatus.ACTIVE.name(), 1L, 1L);
        updateLeaseRequest = new UpdateLeaseRequest(1L,"2024-03-10", "2025-03-10", monthlyRent, LeaseStatus.INACTIVE);
    }

    @Test
    void testAddLease() throws IOException, ParseException {
        when(propertyRepository.findById(anyLong())).thenReturn(Optional.ofNullable(property));
        when(tenantRepository.findById(anyLong())).thenReturn(Optional.ofNullable(tenant));

        when(leaseRepository.findAllByTenant(tenant)).thenReturn(List.of(lease));
        when(leaseRepository.saveAll(any())).thenReturn(new ArrayList<>());

        when(cloudinaryService.upload(any())).thenReturn(new HashMap());
        when(leaseRepository.save(any(Lease.class))).thenReturn(lease);

        LeaseResponse leaseResponse = leaseService.addLease(leaseRequest);

        assertTrue(leaseResponse.isSuccess());
    }

    @Test
    void testPropertyNotFoundException(){
        when(propertyRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(PropertyNotFoundException.class, ()->{
            leaseService.addLease(leaseRequest);
        });
    }

    @Test
    void testAddLeaseUserNotFoundException() {
        when(propertyRepository.findById(anyLong())).thenReturn(Optional.ofNullable(property));
        when(tenantRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () ->{
            leaseService.addLease(leaseRequest);
        });
    }

    @Test
    void testGetAllLeaseForProperty(){
        when(propertyRepository.findById(anyLong())).thenReturn(Optional.ofNullable(property));
        when(leaseRepository.findAllByProperty(any(Property.class))).thenReturn(List.of(lease));
        try(MockedStatic<LeaseMapper> leaseMapper = mockStatic(LeaseMapper.class)){
            leaseMapper.when(()->LeaseMapper.convertToLeaseListDTO(anyList())).thenReturn(List.of(leaseDTO));
        }

        GetAllLeaseResponse response = leaseService.getAllLeaseForProperty(anyLong());

        assertTrue(response.isSuccess());
    }

    @Test
    void testGetAllLeaseForPropertyNotFoundException(){
        when(propertyRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(PropertyNotFoundException.class, () -> {
            leaseService.getAllLeaseForProperty(anyLong());
        });
    }

    @Test
    void testGetLeaseById(){
        mock(LeaseMapper.class);

        when(leaseRepository.findById(anyLong())).thenReturn(Optional.ofNullable(lease));
        try(MockedStatic<LeaseMapper> leaseMapper = mockStatic(LeaseMapper.class)){
            leaseMapper.when(()->LeaseMapper.convertToLeaseDTO(any(Lease.class), any(Tenant.class), any(User.class))).thenReturn(leaseDTO);
        }

        GetLeaseResponse response = leaseService.getLeaseById(anyLong());

        assertTrue(response.isSuccess());
    }

    @Test
    void testGetLeaseByIdPropertyNotFoundException(){
        when(leaseRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(PropertyNotFoundException.class, ()->{
           leaseService.getLeaseById(anyLong());
        });
    }

    @Test
    void testUpdateLease() throws ParseException {
        when(leaseRepository.findById(anyLong())).thenReturn(Optional.ofNullable(lease));
        when(leaseRepository.save(any(Lease.class))).thenReturn(lease);

        LeaseResponse response = leaseService.updateLease(updateLeaseRequest);

        assertTrue(response.isSuccess());
    }

    @Test
    void testUpdateLeaseNotFoundException(){
        when(leaseRepository.findById(anyLong())).thenReturn(Optional.empty());

        assertThrows(PropertyNotFoundException.class, ()->{
            leaseService.updateLease(updateLeaseRequest);
        });
    }

    @Test
    void testRemoveLease(){
        LeaseResponse response = leaseService.removeLease(anyLong());

        verify(leaseRepository).deleteById(anyLong());
        assertTrue(response.isSuccess());
    }

    @Test
    void testGetLeaseForTenant(){
        GetLeaseResponse expectedResponse = GetLeaseResponse.builder()
                .isSuccess(true)
                .lease(leaseDTO)
                .timeStamp(new Date())
                .build();
        GetLeaseResponse actualResponse;

        when(tenantRepository.findByEmailAddressAndApplicationStatus(anyString(), any(ApplicationStatus.class))).thenReturn(Optional.ofNullable(tenant));
        when(leaseRepository.findByTenantAndLeaseStatus(any(Tenant.class), any(LeaseStatus.class))).thenReturn(Optional.ofNullable(lease));

        try(MockedStatic<LeaseMapper> leaseMapper = mockStatic(LeaseMapper.class)){
            leaseMapper.when(()->LeaseMapper.convertToLeaseDTO(any(Lease.class), any(Tenant.class), any(User.class))).thenReturn(leaseDTO);
            actualResponse = leaseService.getLeaseForTenant("test@gmail.com");
        }

        assertEquals(expectedResponse, actualResponse);
    }

    @Test
    void testGetLeaseForTenantNotFoundException(){
        when(tenantRepository.findByEmailAddressAndApplicationStatus(anyString(), any(ApplicationStatus.class))).thenReturn(Optional.empty());

        assertThrows(TenantNotFoundException.class, ()->{
            leaseService.getLeaseForTenant("test@gmail.com");
        });
    }

    @Test
    void testGetLeaseForTenantLeaseNotFoundException(){
        when(tenantRepository.findByEmailAddressAndApplicationStatus(anyString(), any(ApplicationStatus.class))).thenReturn(Optional.of(tenant));
        when(leaseRepository.findByTenantAndLeaseStatus(any(Tenant.class), any(LeaseStatus.class))).thenReturn(Optional.empty());

        assertThrows(LeaseNotFoundException.class, ()->{
            leaseService.getLeaseForTenant("test@gmail.com");
        });
    }
}
