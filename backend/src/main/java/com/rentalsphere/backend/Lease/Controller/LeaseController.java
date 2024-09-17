package com.rentalsphere.backend.Lease.Controller;

import com.rentalsphere.backend.Lease.Service.IService.ILeaseService;
import com.rentalsphere.backend.RequestResponse.Lease.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping(path = "/api/v1/lease")
@RequiredArgsConstructor
public class LeaseController {
    private final ILeaseService leaseService;

    @PostMapping(path = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<LeaseResponse> addLease(@Valid @ModelAttribute LeaseRequest request) throws IOException, ParseException {
        return new ResponseEntity<>(leaseService.addLease(request), HttpStatus.CREATED);
    }

    @GetMapping(path = "/property/{id}")
    public ResponseEntity<GetAllLeaseResponse> getAllLeaseForProperty(@PathVariable Long id){
        return new ResponseEntity<>(leaseService.getAllLeaseForProperty(id), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<GetLeaseResponse> getLeaseById(@PathVariable Long id){
        return new ResponseEntity<>(leaseService.getLeaseById(id), HttpStatus.OK);
    }

    @PutMapping(path = "/", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<LeaseResponse> updateLease(@Valid @ModelAttribute UpdateLeaseRequest request) throws ParseException {
        return new ResponseEntity<>(leaseService.updateLease(request), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<LeaseResponse> removeLease(@PathVariable Long id){
        return new ResponseEntity<>(leaseService.removeLease(id), HttpStatus.OK);
    }

    @GetMapping(path = "/tenant/{email}")
    public ResponseEntity<GetLeaseResponse> getLeaseForTenant(@PathVariable String email){
        return new ResponseEntity<>(leaseService.getLeaseForTenant(email), HttpStatus.OK);
    }
}
