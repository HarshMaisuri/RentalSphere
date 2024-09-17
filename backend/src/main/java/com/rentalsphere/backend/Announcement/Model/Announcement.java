// PMAnnouncement.java
package com.rentalsphere.backend.Announcement.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Property.Model.Property;
import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Getter@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Announcement")
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "PropertyApplicationID")
    private Property property;

    @Column(name = "title")
    private String title;

    @Column(name = "content")
    private String content;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "announcement_date")
    private Date announcementDate;

    public Announcement(long l, String title, String content, Date date) {
    }
}
