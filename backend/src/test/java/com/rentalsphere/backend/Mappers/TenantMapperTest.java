package com.rentalsphere.backend.Mappers;

import com.rentalsphere.backend.DTOs.TenantDTO;
import com.rentalsphere.backend.Mappers.TenantMapper;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TenantMapperTest {

    @Test
    public void testConvertToTenantDTO() {

        Tenant tenant = createDummyTenant();

        TenantDTO tenantDTO = TenantMapper.convertToTenantDTO(tenant);

        assertEquals(1L, tenantDTO.getId());
        assertEquals("John Doe", tenantDTO.getName());
        assertEquals("john.doe@example.com", tenantDTO.getEmail());
        assertEquals("1234567890", tenantDTO.getPhoneNumber());
    }

    @Test
    public void testConvertToTenantDTOs() {

        List<Tenant> tenants = createDummyTenants();

        List<TenantDTO> tenantDTOs = TenantMapper.convertToTenantDTOs(tenants);

        assertEquals(2, tenantDTOs.size());
        assertEquals("John Doe", tenantDTOs.get(0).getName());
        assertEquals("jane.smith@example.com", tenantDTOs.get(1).getEmail());
    }

    private Tenant createDummyTenant() {
        Tenant tenant = new Tenant();
        tenant.setTenantID(1L);
        tenant.setUser(createDummyUser("John", "Doe"));
        tenant.setEmailAddress("john.doe@example.com");
        tenant.setPhoneNumber("1234567890");
        return tenant;
    }

    private List<Tenant> createDummyTenants() {
        List<Tenant> tenants = new ArrayList<>();
        tenants.add(createDummyTenant());
        tenants.add(createDummyTenant("Jane", "Smith", "jane.smith@example.com", "9876543210"));
        return tenants;
    }

    private Tenant createDummyTenant(String firstName, String lastName, String email, String phoneNumber) {
        Tenant tenant = new Tenant();
        tenant.setTenantID(2L); // Different ID for distinction
        tenant.setUser(createDummyUser(firstName, lastName));
        tenant.setEmailAddress(email);
        tenant.setPhoneNumber(phoneNumber);
        return tenant;
    }

    private User createDummyUser(String firstName, String lastName) {
        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        return user;
    }
}
