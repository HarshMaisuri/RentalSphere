package com.rentalsphere.backend.Tenant.Service.IService;

import com.rentalsphere.backend.DTOs.TenantDTO;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantRegisterRequest;
import java.util.List;

public interface ITenantService {

    public TenantResponse saveTenantApplication(TenantRegisterRequest tenantRequest);

    public List<TenantDTO> getAllTenantApplications(Long id);

    public TenantDTO getTenantApplicationById(Long id);
}