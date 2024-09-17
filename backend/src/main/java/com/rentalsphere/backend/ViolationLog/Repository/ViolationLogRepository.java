package com.rentalsphere.backend.ViolationLog.Repository;

import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.ViolationLog.Model.ViolationLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ViolationLogRepository extends JpaRepository<ViolationLog, Long> {
    List<ViolationLog> findAllByProperty(Property property);
    List<ViolationLog> findByTenant(Tenant tenant);
}
