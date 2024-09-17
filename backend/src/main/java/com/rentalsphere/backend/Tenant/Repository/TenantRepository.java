package com.rentalsphere.backend.Tenant.Repository;

import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
    // This interface extends JpaRepository to inherit basic CRUD operations for Tenant entity.
    Tenant findByUserAndApplicationStatus(User user, ApplicationStatus applicationStatus);
    Optional<Tenant> findByEmailAddressAndApplicationStatus(String email, ApplicationStatus applicationStatus);
    List<Tenant> findAllByProperty(Property property);
    List<Tenant> findAllByPropertyAndApplicationStatus(Property property, ApplicationStatus applicationStatus);
}
