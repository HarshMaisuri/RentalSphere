package com.rentalsphere.backend.RequestResponse.BasicResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public abstract class BasicResponse {
    private boolean isSuccess;
    private Date timeStamp;
}
