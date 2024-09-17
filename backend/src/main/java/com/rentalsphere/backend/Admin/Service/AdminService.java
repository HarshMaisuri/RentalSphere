package com.rentalsphere.backend.Admin.Service;

import com.rentalsphere.backend.Admin.Service.IService.IAdminService;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.EmailType;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.User.UserAlreadyExistsException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerRequests;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerResponse;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.Services.Email.EmailService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import com.rentalsphere.backend.DTOs.PropertyManagerDTO;
import com.rentalsphere.backend.Mappers.UserMapper;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminService implements IAdminService {
    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final EmailService emailService;

    @Override
    public PropertyManagerResponse acceptRequest(String email){
        Optional<User> user = userRepository.findByEmail(email);

        if(!user.isPresent()){
            throw new UserNotFoundException("User does not exists.");
        }

        boolean isPropertyManager = user.get().getRoles().stream().anyMatch(role -> role.getName().equals(Roles.PROPERTY_MANAGER));

        if(isPropertyManager){
            throw new UserAlreadyExistsException("User is already a Property Manager");
        }

        user.get().getRoles().add(roleRepository.findByName(Roles.PROPERTY_MANAGER));
        userRepository.save(user.get());
        Property property = propertyRepository.findByPropertyManagerAndApplicationStatus(user.get(), ApplicationStatus.PENDING);
        if(property == null){
            throw new UserNotFoundException("User does not exists");
        }
        property.setApplicationStatus(ApplicationStatus.APPROVED);
        propertyRepository.save(property);
        try {
            emailService.sendEmailTemplate(EmailType.ADMIN_DECISION, user.get().getEmail(), "Request Accepted", user.get().getFirstName() + " " + user.get().getLastName(), "Congratulations, your request to become property manager has been accepted by Admin.", null);
        }catch (MessagingException e){
            e.printStackTrace();
        }
        return PropertyManagerResponse
                .builder()
                .isSuccess(true)
                .message("Request Accepted")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public PropertyManagerResponse rejectRequest(String email) {
        Optional<User> user = userRepository.findByEmail(email);

        if(!user.isPresent()){
            throw new UserNotFoundException("User does not exists.");
        }

        Property property = propertyRepository.findByPropertyManagerAndApplicationStatus(user.get(), ApplicationStatus.PENDING);
        if(property == null){
            throw new UserNotFoundException("User does not exists");
        }
        property.setApplicationStatus(ApplicationStatus.REJECTED);
        propertyRepository.save(property);
        try {
            emailService.sendEmailTemplate(EmailType.ADMIN_DECISION, user.get().getEmail(), "Request Rejected", user.get().getFirstName() + " " + user.get().getLastName(), "Unfortunately, your request to become a Property manager has been rejected by Admin.", null);
        }catch (MessagingException e){
            e.printStackTrace();
        }

        return PropertyManagerResponse
                .builder()
                .isSuccess(true)
                .message("Request Rejected")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public PropertyManagerRequests getAllRequests() {
        List<Property> pendingProperties = propertyRepository.findAllByApplicationStatus(ApplicationStatus.PENDING);
        List<UUID> ids = new ArrayList<>();
        for(Property property: pendingProperties){
            ids.add(property.getPropertyManager().getId());
        }
        List<User> users = userRepository.findAllById(ids);
        List<PropertyManagerDTO> propertyManagerDTOS = new ArrayList<>();
        for(User user: users){
               propertyManagerDTOS.add(UserMapper.convertToPropertyManagerDTO(user, user.getProperties().get(0)));
        }

        return PropertyManagerRequests.builder()
                .isSuccess(true)
                .propertyManagerRequest(propertyManagerDTOS)
                .timeStamp(new Date())
                .build();
    }
}
