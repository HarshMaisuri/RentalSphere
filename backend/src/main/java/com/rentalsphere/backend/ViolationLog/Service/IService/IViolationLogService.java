package com.rentalsphere.backend.ViolationLog.Service.IService;

import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogResponse;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterResponse;
import com.rentalsphere.backend.ViolationLog.Model.ViolationLog;

import java.util.List;
import java.util.Optional;

public interface IViolationLogService {

    List<ViolationLog> getAllViolationLogs();

    Optional<ViolationLog> getViolationLogById(Long id);

    ViolationLogRegisterResponse createViolationLog(ViolationLogRegisterRequest request);

    void deleteViolationLog(Long id);

    UpdateViolationLogResponse updateViolationLog(UpdateViolationLogRequest request);

    List<ViolationLog> getAllViolationLogsByPropertyId(Long propertyId);

    List<ViolationLog> getAllViolationLogForTenant(String email);
}