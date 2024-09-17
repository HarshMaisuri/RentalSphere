package com.rentalsphere.backend.Property.Service.IService;

import com.rentalsphere.backend.RequestResponse.Property.GetAllPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.GetPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterResponse;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;

import java.io.IOException;
import java.text.ParseException;;

public interface IPropertyService {

    public PropertyRegisterResponse savePropertyApplication(PropertyRegisterRequest property)throws IOException, ParseException;

    public GetAllPropertyResponse getAllPropertyApplications();
    public GetAllPropertyResponse getAllPropertyForManager(String email, String status);
    public GetAllPropertyResponse getAllPropertyWithTenant(String email);
    public GetPropertyResponse getProperty(Long id);
    public TenantResponse acceptTenantRequest(String email);
    public TenantResponse rejectTenantRequest(String email);
}
