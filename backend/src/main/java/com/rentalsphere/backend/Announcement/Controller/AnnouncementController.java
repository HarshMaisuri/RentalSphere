package com.rentalsphere.backend.Announcement.Controller;

import com.rentalsphere.backend.Announcement.Model.Announcement;
import com.rentalsphere.backend.Announcement.Service.IService.IAnnouncementService;
import com.rentalsphere.backend.RequestResponse.Announcement.AnnouncementRegisterRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/announcements")
public class AnnouncementController {

    @Autowired
    private final IAnnouncementService announcementService;

    @GetMapping
    public ResponseEntity<List<Announcement>> getAllAnnouncements() {
        List<Announcement> announcements = announcementService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Announcement> getAnnouncementById(@PathVariable Long id) {
        Optional<Announcement> announcement = announcementService.getAnnouncementById(id);
        return announcement.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Announcement> createAnnouncement(@RequestBody AnnouncementRegisterRequest announcement) {
        Announcement createdAnnouncement = announcementService.createAnnouncement(announcement);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAnnouncement);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Announcement> updateAnnouncement(@PathVariable Long id, @RequestBody Announcement newAnnouncement) {
        Announcement updatedAnnouncement = announcementService.updateAnnouncement(id, newAnnouncement);
        return ResponseEntity.ok(updatedAnnouncement);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long id) {
        announcementService.deleteAnnouncement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<Announcement>> getAnnouncementsByPropertyId(@PathVariable Long propertyId) {
        List<Announcement> announcements = announcementService.getAnnouncementsByPropertyId(propertyId);
        return ResponseEntity.ok(announcements);
    }

    @GetMapping("/tenant/{email}")
    public ResponseEntity<List<Announcement>> getAnnouncementForTenant(@PathVariable String email){
        return new ResponseEntity<>(announcementService.getAnnouncementForTenant(email), HttpStatus.OK);
    }
}
