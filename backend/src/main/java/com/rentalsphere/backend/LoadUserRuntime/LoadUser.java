package com.rentalsphere.backend.LoadUserRuntime;

import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Role.Model.Role;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.User.Repository.UserRepository;
import com.rentalsphere.backend.User.Model.User;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@Configuration
public class LoadUser {
    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder){
        return args -> {
            Role adminRole = new Role();
            adminRole.setName(Roles.ADMIN);
            Role userRole = new Role();
            userRole.setName(Roles.USER);
            Role tenantRole = new Role();
            tenantRole.setName(Roles.TENANT);
            Role propertyManagerRole = new Role();
            propertyManagerRole.setName(Roles.PROPERTY_MANAGER);

            if(roleRepository.findAll().size() != 0) {
                return;
            }
            roleRepository.saveAll(Arrays.asList(adminRole, userRole, tenantRole, propertyManagerRole));


            User admin = new User();
            admin.setFirstName("admin");
            admin.setLastName("admin");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("Admin@12345"));
            admin.setRoles(Arrays.asList(adminRole));

            User propertyManager = new User();
            propertyManager.setFirstName("Property");
            propertyManager.setLastName("Manager");
            propertyManager.setEmail("pm@gmail.com");
            propertyManager.setPassword(passwordEncoder.encode("PM@12345"));
            propertyManager.setRoles(Arrays.asList(userRole, propertyManagerRole));

            if(userRepository.findByEmail(admin.getEmail()).isPresent() && userRepository.findByEmail(propertyManager.getEmail()).isPresent()){
                return;
            }
            userRepository.save(admin);
            userRepository.save(propertyManager);
        };
    }
}
