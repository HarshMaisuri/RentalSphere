package com.rentalsphere.backend.Announcement.Service;

import com.rentalsphere.backend.Announcement.Model.Announcement;
import com.rentalsphere.backend.Announcement.Repository.AnnouncementRepository;
import com.rentalsphere.backend.Announcement.Service.IService.IAnnouncementService;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Announcement.AnnouncementRegisterRequest;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnnouncementService implements IAnnouncementService {

    @Autowired
    private final AnnouncementRepository announcementRepository;
    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final TenantRepository tenantRepository;

    @Override
    public List<Announcement> getAllAnnouncements() {
        return announcementRepository.findAll();
    }

    @Override
    public Optional<Announcement> getAnnouncementById(Long id) {
        return announcementRepository.findById(id);
    }

    @Override
    public Announcement createAnnouncement(AnnouncementRegisterRequest request) {

        Date currentDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());
        Property property = propertyRepository.findById(request.getPropertyId())
                .orElseThrow(() -> new IllegalArgumentException("Property not found"));

        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .property(property)
                .content(request.getContent())
                .announcementDate(currentDate)
                .build();
        return announcementRepository.save(announcement);
    }

    @Override
    public void deleteAnnouncement(Long id) {
        announcementRepository.deleteById(id);
    }

    @Override
    public Announcement updateAnnouncement(Long id, Announcement newAnnouncement) {
        Optional<Announcement> optionalAnnouncement = announcementRepository.findById(id);
        Property property = propertyRepository.findById(newAnnouncement.getProperty().getPropertyApplicationID())
                .orElseThrow(() -> new IllegalArgumentException("Property not found"));

        if (optionalAnnouncement.isPresent()) {
            Announcement existingAnnouncement = optionalAnnouncement.get();
            existingAnnouncement.setTitle(newAnnouncement.getTitle());
            existingAnnouncement.setContent(newAnnouncement.getContent());
            existingAnnouncement.setAnnouncementDate(newAnnouncement.getAnnouncementDate());
            existingAnnouncement.setProperty(property);
            return announcementRepository.save(existingAnnouncement);
        } else {
            throw new RuntimeException("Announcement not found with id: " + id);
        }
    }

    @Override
    public List<Announcement> getAnnouncementsByPropertyId(Long propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);
        if(property.isEmpty()){
            throw new PropertyNotFoundException("Property with this id does not exists.");
        }

        return announcementRepository.findByProperty(property.get());
    }

    @Override
    public List<Announcement> getAnnouncementForTenant(String email) {
        Optional<Tenant> tenant = tenantRepository.findByEmailAddressAndApplicationStatus(email, ApplicationStatus.APPROVED);

        if(!tenant.isPresent()){
            throw new UserNotFoundException("No such tenant exists.");
        }

        Optional<Property> property = propertyRepository.findById(tenant.get().getProperty().getPropertyApplicationID());

        if(!property.isPresent()){
            throw new PropertyNotFoundException("No such property exists.");
        }

        return announcementRepository.findByProperty(property.get());
    }
}