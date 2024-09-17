package com.rentalsphere.backend.RequestResponse.Post;

import com.rentalsphere.backend.DTOs.PostDTO;
import com.rentalsphere.backend.RequestResponse.BasicResponse.BasicResponse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class GetPostResponse extends BasicResponse {
    private PostDTO post;
}
