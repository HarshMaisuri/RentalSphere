package com.rentalsphere.backend.Mappers;
import com.rentalsphere.backend.DTOs.LeaseDTO;
import com.rentalsphere.backend.Enums.LeaseStatus;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class LeaseMapperTest {

    @Test
    public void testConvertToLeaseDTO() {
        // Arrange
        Lease lease = new Lease();
        lease.setId(1L);
        lease.setStartDate(new Date(124, 2, 1)); // March 1, 2024
        lease.setEndDate(new Date(125, 2, 1));   // March 1, 2025
        lease.setMonthlyRent(1200.0);
        lease.setLeasePdf("sample_lease.pdf");
        lease.setLeaseStatus(LeaseStatus.ACTIVE);

        Tenant tenant = new Tenant();
        tenant.setDateOfBirth(new Date(90, 4, 15)); // May 15, 1990
        tenant.setPhoneNumber("1234567890");
        tenant.setStreetAddress("123 Main St");
        tenant.setNumOccupants(2);

        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");

        // Act
        LeaseDTO leaseDTO = LeaseMapper.convertToLeaseDTO(lease, tenant, user);

        // Assert
        assertEquals(1L, leaseDTO.getLeaseId().longValue());
        assertEquals("John", leaseDTO.getFirstName());
        assertEquals("Doe", leaseDTO.getLastName());
        assertEquals("john@example.com", leaseDTO.getEmail());
        assertEquals(new Date(90, 4, 15), leaseDTO.getDateOfBirth());
        assertEquals("1234567890", leaseDTO.getPhoneNumber());
        assertEquals("123 Main St", leaseDTO.getStreetAddress());
        assertEquals(new Date(124, 2, 1), leaseDTO.getStartDate());
        assertEquals(new Date(125, 2, 1), leaseDTO.getEndDate());
        assertEquals(1200.0, leaseDTO.getMonthlyRent());
        assertEquals(2, leaseDTO.getNumOccupants());
        assertEquals("sample_lease.pdf", leaseDTO.getLeasePdfUrl());
        assertEquals(LeaseStatus.ACTIVE, leaseDTO.getLeaseStatus());
    }

    @Test
    public void testConvertToLeaseListDTO() {
        // Arrange
        Lease lease1 = new Lease();
        lease1.setId(1L);

        Lease lease2 = new Lease();
        lease2.setId(2L);

        List<Lease> leaseList = new ArrayList<>();
        leaseList.add(lease1);
        leaseList.add(lease2);

        Tenant tenant1 = new Tenant();
        tenant1.setDateOfBirth(new Date(90, 4, 15)); // May 15, 1990

        Tenant tenant2 = new Tenant();
        tenant2.setDateOfBirth(new Date(85, 9, 20)); // October 20, 1985

        User user1 = new User();
        user1.setFirstName("John");
        user1.setLastName("Doe");
        user1.setEmail("john@example.com");

        User user2 = new User();
        user2.setFirstName("Jane");
        user2.setLastName("Smith");
        user2.setEmail("jane@example.com");

        lease1.setTenant(tenant1);
        lease1.getTenant().setUser(user1);

        lease2.setTenant(tenant2);
        lease2.getTenant().setUser(user2);

        List<LeaseDTO> leaseDTOList = LeaseMapper.convertToLeaseListDTO(leaseList);

        assertEquals(2, leaseDTOList.size());
        assertEquals(1L, leaseDTOList.get(0).getLeaseId());
        assertEquals(2L, leaseDTOList.get(1).getLeaseId());
    }
}
