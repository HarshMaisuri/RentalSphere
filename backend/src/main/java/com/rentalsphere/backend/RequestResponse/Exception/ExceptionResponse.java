package com.rentalsphere.backend.RequestResponse.Exception;

import com.fasterxml.jackson.annotation.JsonInclude;
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
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ExceptionResponse extends BasicResponse {
    private String errorMessage;
    private List<String> fieldErrors;
}
