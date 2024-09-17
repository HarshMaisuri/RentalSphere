package com.rentalsphere.backend.Tenant.Controller;

import com.rentalsphere.backend.DTOs.TenantDTO;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import com.rentalsphere.backend.Tenant.Service.TenantService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/tenantapplications")
public class TenantController {
    @Autowired
    private final TenantService tenantService;

    @PostMapping("/register")
    public ResponseEntity<TenantResponse> createTenantApplication(@Valid @RequestBody TenantRegisterRequest request) {
        TenantResponse tenant = tenantService.saveTenantApplication(request);
        return new ResponseEntity<>(tenant, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TenantDTO> getTenantApplicationById(@PathVariable Long id) {
        return new ResponseEntity<>(tenantService.getTenantApplicationById(id), HttpStatus.OK);
    }

    @GetMapping("/property/{id}")
    public ResponseEntity<List<TenantDTO>> getAllTenantApplications(@PathVariable Long id) {
        List<TenantDTO> tenants = tenantService.getAllTenantApplications(id);
        return new ResponseEntity<>(tenants, HttpStatus.OK);
    }
}
