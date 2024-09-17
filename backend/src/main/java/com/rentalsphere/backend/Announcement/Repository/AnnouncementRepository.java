package com.rentalsphere.backend.Announcement.Repository;


import com.rentalsphere.backend.Announcement.Model.Announcement;
import com.rentalsphere.backend.Property.Model.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByProperty(Property propertyApplication);
}
