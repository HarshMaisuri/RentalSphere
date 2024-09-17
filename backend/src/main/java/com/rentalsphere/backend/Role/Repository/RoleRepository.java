package com.rentalsphere.backend.Role.Repository;

import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Role.Model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface RoleRepository extends JpaRepository<Role, UUID> {
    Role findByName(Roles role);
}
