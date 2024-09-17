package com.rentalsphere.backend.Announcement.Service.IService;

import com.rentalsphere.backend.Announcement.Model.Announcement;
import com.rentalsphere.backend.RequestResponse.Announcement.AnnouncementRegisterRequest;

import java.util.List;
import java.util.Optional;

public interface IAnnouncementService {

    List<Announcement> getAllAnnouncements();

    Optional<Announcement> getAnnouncementById(Long id);

    Announcement createAnnouncement(AnnouncementRegisterRequest request);

    void deleteAnnouncement(Long id);

    Announcement updateAnnouncement(Long id, Announcement newAnnouncement);
    List<Announcement> getAnnouncementsByPropertyId(Long propertyId);

    List<Announcement> getAnnouncementForTenant(String email);
}