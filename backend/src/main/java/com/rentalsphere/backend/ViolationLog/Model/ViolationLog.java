package com.rentalsphere.backend.ViolationLog.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import jakarta.persistence.*;
import java.util.Date;

@Getter@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ViolationLog")
public class ViolationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Title cannot be blank.")
    @Column(name = "title", nullable = false)
    private String title;

    @NotBlank(message = "Description cannot be blank.")
    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    private String description;

    @NotNull(message = "Date cannot be null.")
    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "personal_comments", columnDefinition = "TEXT")
    private String personalComments;

    @Column(name = "intensity")
    private String intensity;

    @Column(name = "monetary_damage")
    private Double monetaryDamage;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "tenant_id", referencedColumnName = "TenantID")
    private Tenant tenant;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "PropertyApplicationID")
    private Property property;
}

