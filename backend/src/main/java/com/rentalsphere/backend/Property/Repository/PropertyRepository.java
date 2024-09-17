package com.rentalsphere.backend.Property.Repository;

import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.RentedStatus;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Long> {

    // This interface extends JpaRepository to inherit basic CRUD operations for Property entity.
    Property findByPropertyManagerAndApplicationStatus(User user, ApplicationStatus applicationStatus);
    List<Property> findAllByPropertyManagerAndApplicationStatus(User user, ApplicationStatus applicationStatus);
    List<Property> findAllByApplicationStatus(ApplicationStatus applicationStatus);
    List<Property> findAllByApplicationStatusAndRentedStatus(ApplicationStatus applicationStatus, RentedStatus rentedStatus);
    List<Property> findAllByPropertyManagerAndRentedStatus(User user, RentedStatus rentedStatus);
    Property findByTenants(Tenant tenant);
}

