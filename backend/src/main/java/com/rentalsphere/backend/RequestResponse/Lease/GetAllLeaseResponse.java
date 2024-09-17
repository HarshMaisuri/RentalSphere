package com.rentalsphere.backend.RequestResponse.Lease;

import com.rentalsphere.backend.DTOs.LeaseDTO;
import com.rentalsphere.backend.RequestResponse.BasicResponse.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class GetAllLeaseResponse extends BasicResponse {
    private List<LeaseDTO> leaseDetailsList;
}
