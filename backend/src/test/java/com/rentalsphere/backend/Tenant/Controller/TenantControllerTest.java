package com.rentalsphere.backend.Tenant.Controller;

import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rentalsphere.backend.DTOs.TenantDTO;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantRegisterRequest;
import com.rentalsphere.backend.RequestResponse.Tenant.TenantResponse;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;

import com.rentalsphere.backend.Tenant.Service.TenantService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.aot.DisabledInAotMode;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {TenantController.class})
@ExtendWith(SpringExtension.class)
@DisabledInAotMode
class TenantControllerTest {
  @Autowired
  private TenantController tenantController;

  @MockBean
  private TenantService tenantService;


  @Test
  void testGetTenantApplicationById() throws Exception {
    // Arrange
    when(tenantService.getTenantApplicationById(Mockito.<Long>any())).thenReturn(new TenantDTO());
    MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/api/v1/tenantapplications/{id}", 1L);

    // Act and Assert
    MockMvcBuilders.standaloneSetup(tenantController)
            .build()
            .perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
            .andExpect(MockMvcResultMatchers.content()
                    .string(
                            "{\"id\":null,\"name\":null,\"email\":null,\"phoneNumber\":null,\"dateOfBirth\":null,\"desiredMoveInDate\":null,"
                                    + "\"numOccupants\":null,\"ApplicationDate\":null,\"applicationDate\":null}"));
  }


  @Test
  void testCreateTenantApplication() throws Exception {
    // Arrange
    when(tenantService.saveTenantApplication(Mockito.<TenantRegisterRequest>any()))
            .thenReturn(new TenantResponse("Not all who wander are lost"));

    TenantRegisterRequest tenantRegisterRequest = new TenantRegisterRequest();
    tenantRegisterRequest
            .setCreationDate(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
    tenantRegisterRequest.setCurrentEmployer("Current Employer");
    tenantRegisterRequest
            .setDateOfBirth(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
    tenantRegisterRequest
            .setDesiredMoveInDate(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
    tenantRegisterRequest.setEmailAddress("42 Main St");
    tenantRegisterRequest.setLeaseTermMonths(1);
    tenantRegisterRequest.setLengthOfEmployment(3);
    tenantRegisterRequest.setNumOccupants(10);
    tenantRegisterRequest.setPhoneNumber("6625550144");
    tenantRegisterRequest.setPropertyApplicationID(1L);
    tenantRegisterRequest.setSocialSecurityNumber("42");
    tenantRegisterRequest.setStreetAddress("42 Main St");
    String content = (new ObjectMapper()).writeValueAsString(tenantRegisterRequest);
    MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.post("/api/v1/tenantapplications/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(content);

    // Act
    ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(tenantController)
            .build()
            .perform(requestBuilder);

    // Assert
    actualPerformResult.andExpect(MockMvcResultMatchers.status().isCreated())
            .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
            .andExpect(MockMvcResultMatchers.content()
                    .string("{\"timeStamp\":null,\"message\":\"Not all who wander are lost\",\"success\":false}"));
  }


  @Test
  void testGetAllTenantApplications() throws Exception {
    // Arrange
    when(tenantService.getAllTenantApplications(Mockito.<Long>any())).thenReturn(new ArrayList<>());
    MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
            .get("/api/v1/tenantapplications/property/{id}", 1L);

    // Act and Assert
    MockMvcBuilders.standaloneSetup(tenantController)
            .build()
            .perform(requestBuilder)
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
            .andExpect(MockMvcResultMatchers.content().string("[]"));
  }
}
