package com.rentalsphere.backend.Lease.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Enums.LeaseStatus;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity(name = "Lease_Agreement")
@Table(name = "Lease_Agreement")
@Getter@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Lease {
    @Id@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date startDate;
    private Date endDate;
    private Double monthlyRent;
    private String leasePdf;
    @Enumerated(EnumType.STRING)
    private LeaseStatus leaseStatus;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "tenant_id", referencedColumnName = "TenantID")
    private Tenant tenant;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "PropertyApplicationID")
    private Property property;

    @Override
    public String toString(){
        return "";
    }
}
