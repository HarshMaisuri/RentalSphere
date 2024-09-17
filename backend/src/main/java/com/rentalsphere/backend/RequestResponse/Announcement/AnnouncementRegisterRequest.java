package com.rentalsphere.backend.RequestResponse.Announcement;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AnnouncementRegisterRequest {

    @NotBlank(message = "Title cannot be blank.")
    private String title;

    @NotBlank(message = "Content cannot be blank.")
    private String content;

    private Date announcementDate;

    @NotNull(message = "Property ID cannot be blank.")
    private Long propertyId;

    public AnnouncementRegisterRequest(String title, String content) {
    }
}