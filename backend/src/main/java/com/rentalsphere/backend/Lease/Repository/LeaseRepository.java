package com.rentalsphere.backend.Lease.Repository;

import com.rentalsphere.backend.Enums.LeaseStatus;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LeaseRepository extends JpaRepository<Lease, Long> {
    public List<Lease> findAllByTenant(Tenant tenant);
    public List<Lease> findAllByProperty(Property property);
    public Optional<Lease> findByTenantAndLeaseStatus(Tenant tenant, LeaseStatus leaseStatus);
}
