package com.rentalsphere.backend.Lease.Service.IService;

import com.rentalsphere.backend.DTOs.LeaseDTO;
import com.rentalsphere.backend.Lease.Model.Lease;
import com.rentalsphere.backend.RequestResponse.Lease.*;

import java.io.IOException;
import java.text.ParseException;

public interface ILeaseService {
    public LeaseResponse addLease(LeaseRequest request) throws IOException, ParseException;
    public GetAllLeaseResponse getAllLeaseForProperty(Long id);
    public GetLeaseResponse getLeaseById(Long id);
    public LeaseResponse updateLease(UpdateLeaseRequest request) throws ParseException;
    public LeaseResponse removeLease(Long id);
    public GetLeaseResponse getLeaseForTenant(String email);
}
