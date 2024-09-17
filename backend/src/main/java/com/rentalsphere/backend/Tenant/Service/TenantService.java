package com.rentalsphere.backend.Tenant.Service;

import com.rentalsphere.backend.DTOs.TenantDTO;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Mappers.TenantMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import com.rentalsphere.backend.Tenant.Service.IService.ITenantService;
import com.rentalsphere.backend.User.Model.User;
import com.rentalsphere.backend.User.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TenantService implements ITenantService {

    @Autowired
    private final TenantRepository tenantRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PropertyRepository propertyRepository;

    @Override
    public TenantResponse saveTenantApplication(TenantRegisterRequest tenantRequest) {

        Optional<User> user = userRepository.findByEmail(tenantRequest.getEmailAddress());
        Optional<Property> property = propertyRepository.findById(tenantRequest.getPropertyApplicationID());

        if(user.isEmpty()){
            throw new UserNotFoundException("User does not exists.");
        }

        Tenant tenant = Tenant.builder()
                .emailAddress(tenantRequest.getEmailAddress())
                .phoneNumber(tenantRequest.getPhoneNumber())
                .dateOfBirth(tenantRequest.getDateOfBirth())
                .socialSecurityNumber(tenantRequest.getSocialSecurityNumber())
                .streetAddress(tenantRequest.getStreetAddress())
                .user(user.get())
                .property(property.get())
                .desiredMoveInDate(tenantRequest.getDesiredMoveInDate())
                .leaseTermMonths(tenantRequest.getLeaseTermMonths())
                .numOccupants(tenantRequest.getNumOccupants())
                .currentEmployer(tenantRequest.getCurrentEmployer())
                .lengthOfEmployment(tenantRequest.getLengthOfEmployment())
                .applicationStatus(ApplicationStatus.PENDING)
                .creationDate(tenantRequest.getCreationDate())
                .build();;
        tenantRepository.save(tenant);
        return TenantResponse.builder()
                .isSuccess(true)
                .message("Request made to the PM")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public List<TenantDTO> getAllTenantApplications(Long id) {
        Optional<Property> property = propertyRepository.findById(id);

        if(!property.isPresent()){
            throw new PropertyNotFoundException("No such property exists.");
        }

        List<Tenant> tenants = tenantRepository.findAllByPropertyAndApplicationStatus(property.get(), ApplicationStatus.PENDING);
        List<TenantDTO> tenantApplications = TenantMapper.convertToTenantDTOs(tenants);

        return tenantApplications;
    }

    @Override
    public TenantDTO getTenantApplicationById(Long id) {
        Optional<Tenant> tenant = tenantRepository.findById(id);

        if(!tenant.isPresent()){
            throw new TenantNotFoundException("No such tenant exists");
        }

        TenantDTO tenantDTO = TenantMapper.convertToTenantDTO(tenant.get());
        
        return tenantDTO;
    }



}
