package com.rentalsphere.backend.Role.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.User.Model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
@Entity(name = "roles")
public class Role {
    @Id@GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Enumerated(EnumType.STRING)
    @Column(unique = true)
    private Roles name;
    @JsonIgnore
    @ManyToMany(mappedBy = "roles")
    private List<User> users;
}
