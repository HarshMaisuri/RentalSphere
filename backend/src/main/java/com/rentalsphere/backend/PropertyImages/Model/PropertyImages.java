package com.rentalsphere.backend.PropertyImages.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Property.Model.Property;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "PropertyImages")
@Entity(name = "PropertyImages")
public class PropertyImages {
    @Id@GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "property_id", referencedColumnName = "propertyApplicationID")
    private Property property;
    @NotBlank(message = "image url cannot be blank.")
    private String imageUrl;

    @Override
    public String toString(){
        return "";
    }
}
