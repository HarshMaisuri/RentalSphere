package com.rentalsphere.backend.ViolationLog.Service;


import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogResponse;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterResponse;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import com.rentalsphere.backend.ViolationLog.Model.ViolationLog;
import com.rentalsphere.backend.ViolationLog.Repository.ViolationLogRepository;
import com.rentalsphere.backend.ViolationLog.Service.IService.IViolationLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ViolationLogService implements IViolationLogService {

    @Autowired
    private final ViolationLogRepository violationLogRepository;
    @Autowired
    private final PropertyRepository propertyRepository;
    @Autowired
    private final TenantRepository tenantRepository;

    @Override
    public List<ViolationLog> getAllViolationLogs() {
        return violationLogRepository.findAll();
    }

    @Override
    public Optional<ViolationLog> getViolationLogById(Long id) {
        return violationLogRepository.findById(id);
    }

    @Override
    public ViolationLogRegisterResponse createViolationLog(ViolationLogRegisterRequest request) {

        Optional<Property> property = propertyRepository.findById(request.getPropertyId());
        Optional<Tenant> tenant = tenantRepository.findById(request.getTenantId());
        Date currentDate = Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant());

        if(!property.isPresent()){
            throw new PropertyNotFoundException("No such property exists");
        }
        if(!tenant.isPresent()){
            throw new TenantNotFoundException("No such tenant exists");
        }
       // Create a new ViolationLog object from the request
        ViolationLog violationLog = ViolationLog.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .date(currentDate)
                .personalComments(request.getPersonalComments())
                .intensity(request.getIntensity())
                .monetaryDamage(request.getMonetaryDamage())
                .property(property.get())
                .tenant(tenant.get())
                .build();

        violationLogRepository.save(violationLog);

        return ViolationLogRegisterResponse.builder()
                .isSuccess(true)
                .message("Violation Log Added")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public void deleteViolationLog(Long id) {
        violationLogRepository.deleteById(id);
    }

    @Override
    public UpdateViolationLogResponse updateViolationLog(UpdateViolationLogRequest request) {
        // Check if the violationLog exists in the database
        Optional<ViolationLog> optionalViolationLog = violationLogRepository.findById(request.getId());

        if (optionalViolationLog.isPresent()) {
            // Update the existing violationLog object with the new information
            ViolationLog violationLog = optionalViolationLog.get();
            violationLog.setTitle(request.getTitle());
            violationLog.setDescription(request.getDescription());
            violationLog.setPersonalComments(request.getPersonalComments());
            violationLog.setIntensity(request.getIntensity());
            violationLog.setMonetaryDamage(request.getMonetaryDamage());

            violationLogRepository.save(violationLog);

            return UpdateViolationLogResponse.builder()
                    .isSuccess(true)
                    .message("Violation Log Updated")
                    .timeStamp(new Date())
                    .build();
        } else {
            // Throw an exception if the violationLog does not exist
            throw new RuntimeException("ViolationLog not found with id: " + request.getId());
        }
    }

    @Override
    public List<ViolationLog> getAllViolationLogsByPropertyId(Long propertyId) {
        Optional<Property> property = propertyRepository.findById(propertyId);

        if(!property.isPresent()){
            throw new PropertyNotFoundException("No such property exists");
        }

        return violationLogRepository.findAllByProperty(property.get());
    }

    @Override
    public List<ViolationLog> getAllViolationLogForTenant(String email){
        Optional<Tenant> tenant = tenantRepository.findByEmailAddressAndApplicationStatus(email, ApplicationStatus.APPROVED);

        if(!tenant.isPresent()){
            throw new TenantNotFoundException("No such tenant exists.");
        }

        List<ViolationLog> violationLogs = violationLogRepository.findByTenant(tenant.get());

        return violationLogs;
    }
}
