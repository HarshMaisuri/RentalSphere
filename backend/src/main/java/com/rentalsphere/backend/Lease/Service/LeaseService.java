package com.rentalsphere.backend.Lease.Service;

import com.rentalsphere.backend.DTOs.LeaseDTO;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.LeaseStatus;
import com.rentalsphere.backend.Exception.Lease.LeaseNotFoundException;
import com.rentalsphere.backend.Exception.Property.PropertyNotFoundException;
import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.Exception.User.UserNotFoundException;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.Lease.Repository.LeaseRepository;
import com.rentalsphere.backend.Lease.Service.IService.ILeaseService;
import com.rentalsphere.backend.Mappers.LeaseMapper;
import com.rentalsphere.backend.Property.Model.Property;
import com.rentalsphere.backend.Property.Repository.PropertyRepository;
import com.rentalsphere.backend.RequestResponse.Lease.*;
import com.rentalsphere.backend.Services.Cloudinary.IService.ICloudinaryService;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LeaseService implements ILeaseService {
    private final LeaseRepository leaseRepository;
    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;
    private final ICloudinaryService cloudinaryService;

    @Override
    public LeaseResponse addLease(LeaseRequest request) throws IOException, ParseException {
        Optional<Property> property = propertyRepository.findById(request.getPropertyId());
        Optional<Tenant> tenant = tenantRepository.findById(request.getTenantId());

        if(!property.isPresent()){
            throw new PropertyNotFoundException("no such property exists");
        }

        if(!tenant.isPresent()){
            throw new UserNotFoundException("user does not exists");
        }

        List<Lease> leaseList = leaseRepository.findAllByTenant(tenant.get());
        leaseList.forEach(lease -> lease.setLeaseStatus(LeaseStatus.INACTIVE));
        leaseRepository.saveAll(leaseList);

        Map pdf = cloudinaryService.upload(request.getLeasePdf());

        Lease lease = Lease.builder()
                .startDate(new SimpleDateFormat("yyyy-mm-dd").parse(request.getStartDate()))
                .endDate(new SimpleDateFormat("yyyy-mm-dd").parse(request.getEndDate()))
                .monthlyRent(request.getMonthlyRent())
                .leaseStatus(LeaseStatus.ACTIVE)
                .leasePdf((String) pdf.get("url"))
                .property(property.get())
                .tenant(tenant.get())
                .build();
        leaseRepository.save(lease);

        return LeaseResponse.builder()
                .isSuccess(true)
                .message("lease added.")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetAllLeaseResponse getAllLeaseForProperty(Long id) {
        Optional<Property> property = propertyRepository.findById(id);

        if(!property.isPresent()){
            throw new PropertyNotFoundException("No such property exists");
        }

        List<Lease> leaseList = leaseRepository.findAllByProperty(property.get());
        List<LeaseDTO> leaseDTOS = LeaseMapper.convertToLeaseListDTO(leaseList);
        return GetAllLeaseResponse.builder()
                .isSuccess(true)
                .leaseDetailsList(leaseDTOS)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetLeaseResponse getLeaseById(Long id) {
        Optional<Lease> lease = leaseRepository.findById(id);

        if(!lease.isPresent()){
            throw new PropertyNotFoundException("no such lease exists");
        }

        LeaseDTO leaseDTO = LeaseMapper.convertToLeaseDTO(lease.get(), lease.get().getTenant(), lease.get().getTenant().getUser());

        return GetLeaseResponse.builder()
                .isSuccess(true)
                .lease(leaseDTO)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public LeaseResponse updateLease(UpdateLeaseRequest request) throws ParseException {
        Optional<Lease> lease = leaseRepository.findById(request.getId());

        if(!lease.isPresent()){
            throw new PropertyNotFoundException("no such lease exists");
        }

        lease.get().setStartDate(new SimpleDateFormat("yyyy-MM-dd").parse(request.getStartDate()));
        lease.get().setEndDate(new SimpleDateFormat("yyyy-MM-dd").parse(request.getEndDate()));
        lease.get().setMonthlyRent(request.getMonthlyRent());
        lease.get().setLeaseStatus(request.getLeaseStatus());
        leaseRepository.save(lease.get());

        return LeaseResponse.builder()
                .isSuccess(true)
                .message("lease updated.")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public LeaseResponse removeLease(Long id) {
        leaseRepository.deleteById(id);
        return LeaseResponse.builder()
                .isSuccess(true)
                .message("lease removed.")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetLeaseResponse getLeaseForTenant(String email) {
        Optional<Tenant> tenant = tenantRepository.findByEmailAddressAndApplicationStatus(email, ApplicationStatus.APPROVED);

        if(!tenant.isPresent()){
            throw new TenantNotFoundException("No such tenant exists.");
        }

        Optional<Lease> lease = leaseRepository.findByTenantAndLeaseStatus(tenant.get(), LeaseStatus.ACTIVE);

        if(!lease.isPresent()){
            throw new LeaseNotFoundException("No lease found.");
        }

        LeaseDTO leaseDTO = LeaseMapper.convertToLeaseDTO(lease.get(), lease.get().getTenant(), lease.get().getTenant().getUser());

        return GetLeaseResponse.builder()
                .isSuccess(true)
                .lease(leaseDTO)
                .timeStamp(new Date())
                .build();
    }
}
