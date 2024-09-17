package com.rentalsphere.backend.Admin.Service.IService;

import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerRequests;
import com.rentalsphere.backend.RequestResponse.Admin.PropertyManagerResponse;

public interface IAdminService {
    public PropertyManagerResponse acceptRequest(String email);
    public PropertyManagerResponse rejectRequest(String email);
    public PropertyManagerRequests getAllRequests();
}
