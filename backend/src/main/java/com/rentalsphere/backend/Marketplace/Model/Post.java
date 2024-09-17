package com.rentalsphere.backend.Marketplace.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Enums.AvailabilityStatus;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "Marketplace_Post")
@Table(name = "Marketplace_Post")
@Builder
@Getter@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Post {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private Double price;
    private String imageUrl;
    @Enumerated(EnumType.STRING)
    private AvailabilityStatus availabilityStatus;
    private Date creationDate;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "tenant_id", referencedColumnName = "TenantID")
    private Tenant tenant;

    @PrePersist
    protected void onCreate(){
        creationDate = new Date();
    }
}
