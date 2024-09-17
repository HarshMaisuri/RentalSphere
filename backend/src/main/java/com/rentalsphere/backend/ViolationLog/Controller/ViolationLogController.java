package com.rentalsphere.backend.ViolationLog.Controller;

import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.UpdateViolationLogResponse;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterRequest;
import com.rentalsphere.backend.RequestResponse.ViolationLog.ViolationLogRegisterResponse;
import com.rentalsphere.backend.ViolationLog.Model.ViolationLog;
import com.rentalsphere.backend.ViolationLog.Service.IService.IViolationLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/violationlog")
@RequiredArgsConstructor
public class ViolationLogController {
    @Autowired
    private final IViolationLogService violationLogService;

    @GetMapping("/")
    public ResponseEntity<List<ViolationLog>> getAllViolationLogs() {
        return ResponseEntity.ok(violationLogService.getAllViolationLogs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ViolationLog> getViolationLogById(@PathVariable Long id) {
        Optional<ViolationLog> violationLog = violationLogService.getViolationLogById(id);
        return violationLog.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/")
    public ResponseEntity<ViolationLogRegisterResponse> createViolationLog(@Valid @RequestBody ViolationLogRegisterRequest request) {
        ViolationLogRegisterResponse response = violationLogService.createViolationLog(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/")
    public ResponseEntity<UpdateViolationLogResponse> updateViolationLog(@Valid @RequestBody UpdateViolationLogRequest request) {
        UpdateViolationLogResponse response = violationLogService.updateViolationLog(request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteViolationLog(@PathVariable Long id) {
        violationLogService.deleteViolationLog(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/property/{propertyId}")
    public ResponseEntity<List<ViolationLog>> getViolationLogsByPropertyId(@PathVariable Long propertyId) {
        List<ViolationLog> violationLogs = violationLogService.getAllViolationLogsByPropertyId(propertyId);
        return ResponseEntity.ok(violationLogs);
    }

    @GetMapping("/tenant/{email}")
    public ResponseEntity<List<ViolationLog>> getAllViolationLogForTenant(@PathVariable String email){
        return new ResponseEntity<>(violationLogService.getAllViolationLogForTenant(email), HttpStatus.OK);
    }
}
