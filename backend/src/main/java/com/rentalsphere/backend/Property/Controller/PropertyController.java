package com.rentalsphere.backend.Property.Controller;

import com.rentalsphere.backend.Property.Service.IService.IPropertyService;
import com.rentalsphere.backend.RequestResponse.Property.GetAllPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.GetPropertyResponse;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Property.PropertyRegisterResponse;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/v1/property")
public class PropertyController {
    @Autowired
    private final IPropertyService propertyService;

    @PostMapping(path = "/register", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<PropertyRegisterResponse> createPropertyApplication(@Valid @ModelAttribute PropertyRegisterRequest request) throws IOException, ParseException {
        return new ResponseEntity<>(propertyService.savePropertyApplication(request), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GetPropertyResponse> getPropertyApplicationById(@PathVariable Long id) {
        return new ResponseEntity<>(propertyService.getProperty(id), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<GetAllPropertyResponse> getAllPropertyForManager(@RequestParam String email, @RequestParam String status){
        return new ResponseEntity<>(propertyService.getAllPropertyForManager(email, status), HttpStatus.OK);
    }

    @GetMapping("/rented/{email}")
    public ResponseEntity<GetAllPropertyResponse> getAllPropertyWithTenant(@PathVariable String email){
        return new ResponseEntity<>(propertyService.getAllPropertyWithTenant(email), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<GetAllPropertyResponse> getAllPropertyApplications() {
        return new ResponseEntity<>(propertyService.getAllPropertyApplications(), HttpStatus.OK);
    }

    @PostMapping(path = "/approve/{email}")
    public ResponseEntity<TenantResponse> acceptTenantRequest(@PathVariable String email){
        return new ResponseEntity<>(propertyService.acceptTenantRequest(email), HttpStatus.OK);
    }

    @PostMapping(path = "/reject/{email}")
    public ResponseEntity<TenantResponse> rejectTenantRequest(@PathVariable String email){
        return new ResponseEntity<>(propertyService.rejectTenantRequest(email), HttpStatus.OK);
    }
}
