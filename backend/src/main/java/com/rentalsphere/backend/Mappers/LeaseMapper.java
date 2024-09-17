package com.rentalsphere.backend.Mappers;

import com.rentalsphere.backend.DTOs.LeaseDTO;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;

import java.util.ArrayList;
import java.util.List;

public class LeaseMapper {
    public static LeaseDTO convertToLeaseDTO(Lease lease, Tenant tenant, User user) {
        return new LeaseDTO(
                lease.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getEmail(),
                tenant.getDateOfBirth(),
                tenant.getPhoneNumber(),
                tenant.getStreetAddress(),
                lease.getStartDate(),
                lease.getEndDate(),
                lease.getMonthlyRent(),
                tenant.getNumOccupants(),
                lease.getLeasePdf(),
                lease.getLeaseStatus()
        );
    }

    public static List<LeaseDTO> convertToLeaseListDTO(List<Lease> leaseList){
        List<LeaseDTO> leaseDTOS = new ArrayList<>();
        for (Lease lease: leaseList){
            leaseDTOS.add(convertToLeaseDTO(lease, lease.getTenant(), lease.getTenant().getUser()));
        }
        return leaseDTOS;
    }
}
