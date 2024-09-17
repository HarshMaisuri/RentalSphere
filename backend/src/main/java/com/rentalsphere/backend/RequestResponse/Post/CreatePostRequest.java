package com.rentalsphere.backend.RequestResponse.Post;

import com.rentalsphere.backend.Enums.AvailabilityStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
public class CreatePostRequest {
    private String email;
    private String title;
    private String description;
    private Double price;
    private MultipartFile image;
}
