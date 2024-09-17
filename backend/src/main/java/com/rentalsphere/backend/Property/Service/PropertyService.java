package com.rentalsphere.backend.Property.Service;

import com.rentalsphere.backend.DTOs.PropertyDTO;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.EmailType;
import com.rentalsphere.backend.Enums.RentedStatus;
import com.rentalsphere.backend.Enums.Roles;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Mappers.PropertyMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.Property.Service.IService.IPropertyService;
import com.rentalsphere.backend.RequestResponse.Property.GetAllPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.GetPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterResponse;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import com.rentalsphere.backend.Services.Cloudinary.CloudinaryService;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import com.rentalsphere.backend.PropertyImages.Model.PropertyImages;
import com.rentalsphere.backend.PropertyImages.Repository.PropertyImagesRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.rentalsphere.backend.Role.Repository.RoleRepository;
import com.rentalsphere.backend.Services.Email.EmailService;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class PropertyService implements IPropertyService {

    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final UserRepository userRepository;
    @Autowired
    private final CloudinaryService cloudinaryService;
    @Autowired
    private final PropertyImagesRepository propertyImagesRepository;
    @Autowired
    private final TenantRepository tenantRepository;
    @Autowired
    private final RoleRepository roleRepository;
    @Autowired
    private final EmailService emailService;


    @Override
    public PropertyRegisterResponse savePropertyApplication(PropertyRegisterRequest propertyrequest) throws IOException, ParseException {
        Optional<User> user = userRepository.findByEmail(propertyrequest.getEmail());

        if (!user.isPresent()) {
            throw new UserNotFoundException("User does not exists.");
        }

        String message = "Request made to the Admin.";

        Property property = Property.builder()
                .propertyManager(user.get())
                .emailAddress(user.get().getEmail())
                .propertyDescription(propertyrequest.getPropertyDescription())
                .city(propertyrequest.getCity())
                .state(propertyrequest.getState())
                .monthlyRent(propertyrequest.getMonthlyRent())
                .availableMoveInDate(new SimpleDateFormat("yyyy-mm-dd").parse(propertyrequest.getAvailableMoveInDate()))
                .numBedrooms(propertyrequest.getNumBedrooms())
                .numBathrooms(propertyrequest.getNumBathrooms())
                .phoneNumber(propertyrequest.getPhoneNumber())
                .propertyAddress(propertyrequest.getPropertyAddress())
                .zipCode(propertyrequest.getZipCode())
                .licenseNumber(propertyrequest.getLicenseNumber())
                .creationDate(new Date())
                .applicationStatus(ApplicationStatus.PENDING)
                .rentedStatus(RentedStatus.NOT_RENTED)
                .build();

        if (user.get().getRoles().stream().anyMatch(role -> role.getName().equals(Roles.PROPERTY_MANAGER))) {
            property.setApplicationStatus(ApplicationStatus.APPROVED);
            message = "Property added.";
        }

        property = propertyRepository.save(property);

        List<PropertyImages> uploadedImages = new ArrayList<>();
        for (MultipartFile image : propertyrequest.getImages()) {
            uploadedImages.add(PropertyImages.builder().property(property).imageUrl((String) cloudinaryService.upload(image).get("url")).build());
        }
        propertyImagesRepository.saveAll(uploadedImages);

        return PropertyRegisterResponse.builder()
                .isSuccess(true)
                .message(message)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetAllPropertyResponse getAllPropertyApplications() {
        List<Property> properties = propertyRepository.findAllByApplicationStatusAndRentedStatus(ApplicationStatus.APPROVED, RentedStatus.NOT_RENTED);
        List<PropertyDTO> propertyDTOs = PropertyMapper.convertToPropertiesDTO(properties);
        return GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(propertyDTOs)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetAllPropertyResponse getAllPropertyForManager(String email, String status) {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new UserNotFoundException("No such user exists");
        }

        List<Property> properties = propertyRepository.findAllByPropertyManagerAndApplicationStatus(user.get(), ApplicationStatus.valueOf(status.toUpperCase()));

        List<PropertyDTO> propertyDTOs = PropertyMapper.convertToPropertiesDTO(properties);
        return GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(propertyDTOs)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetAllPropertyResponse getAllPropertyWithTenant(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        if (!user.isPresent()) {
            throw new UserNotFoundException("No such user exists");
        }

        List<Property> properties = propertyRepository.findAllByPropertyManagerAndRentedStatus(user.get(), RentedStatus.RENTED);
        List<PropertyDTO> propertyDTOs = PropertyMapper.convertToPropertiesWithTenant(properties);

        return GetAllPropertyResponse.builder()
                .isSuccess(true)
                .properties(propertyDTOs)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetPropertyResponse getProperty(Long id) {
        Optional<Property> property = propertyRepository.findById(id);
        if (!property.isPresent()) {
            throw new PropertyNotFoundException("Property with this id does not exists.");
        }
        return GetPropertyResponse.builder()
                .isSuccess(true)
                .property(PropertyMapper.convertToPropertyDTO(property.get()))
                .timeStamp(new Date())
                .build();
    }

    @Override
    public TenantResponse acceptTenantRequest(String email) {
        // Fetching given email from userRepository
        Optional<User> user = userRepository.findByEmail(email);

        // Throwing UserNotFoundException if user doesn't exist.
        if (user.isEmpty()) {
            throw new UserNotFoundException("User does not exists.");
        }

        // Changing ApplicationStatus from PENDING to APPROVAL.
        Tenant tenant = tenantRepository.findByUserAndApplicationStatus(user.get(), ApplicationStatus.PENDING);
        if (tenant == null) {
            throw new TenantNotFoundException("No such tenant exists");
        }

        Property property = propertyRepository.findByTenants(tenant);
        property.setRentedStatus(RentedStatus.RENTED);
        propertyRepository.save(property);

        List<Tenant> tenants = tenantRepository.findAllByProperty(property);
        tenants.forEach(otherTenant -> otherTenant.setApplicationStatus(ApplicationStatus.REJECTED));

        tenantRepository.saveAll(tenants);

        // Adding role of tenant to user
        user.get().getRoles().add(roleRepository.findByName(Roles.TENANT));
        userRepository.save(user.get());
        tenant.setApplicationStatus(ApplicationStatus.APPROVED);
        tenantRepository.save(tenant);

        // Notifying user through mail service
        try {
            emailService.sendEmailTemplate(EmailType.ADMIN_DECISION, user.get().getEmail(), "Request Accepted", user.get().getFirstName() + " " + user.get().getLastName(), "Congratulations, your request to become tenant has been accepted by property manager.", null);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return TenantResponse
                .builder()
                .isSuccess(true)
                .message("Request Accepted")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public TenantResponse rejectTenantRequest(String email) {
        // Fetching given email from userRepository
        Optional<User> user = userRepository.findByEmail(email);

        // Throwing UserNotFoundException if user doesn't exist.
        if (user.isEmpty()) {
            throw new UserNotFoundException("User does not exists.");
        }
        // Changing ApplicationStatus from PENDING to REJECTED.
        Tenant tenant = tenantRepository.findByUserAndApplicationStatus(user.get(), ApplicationStatus.PENDING);
        if (tenant == null) {
            throw new UserNotFoundException("User does not exists");
        }
        tenant.setApplicationStatus(ApplicationStatus.REJECTED);
        tenantRepository.save(tenant);

        // Notifying user through mail service
        try {
            emailService.sendEmailTemplate(EmailType.ADMIN_DECISION, user.get().getEmail(), "Request Rejected", user.get().getFirstName() + " " + user.get().getLastName(), "Sorry, your request to become tenant has been rejected by property manager.", null);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
        return TenantResponse
                .builder()
                .isSuccess(true)
                .message("Request Rejected")
                .timeStamp(new Date())
                .build();
    }
}
