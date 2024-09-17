package com.rentalsphere.backend.Mappers;

import com.rentalsphere.backend.DTOs.PostDTO;
import com.rentalsphere.backend.Marketplace.Model.Post;

import java.util.ArrayList;
import java.util.List;

public class PostMapper {
    public static PostDTO convertToPostDTO(Post post){
        return new PostDTO(
                post.getId(),
                post.getTitle(),
                post.getDescription(),
                post.getPrice(),
                post.getImageUrl(),
                post.getAvailabilityStatus(),
                post.getCreationDate(),
                post.getTenant().getUser().getFirstName() + " " + post.getTenant().getUser().getLastName(),
                post.getTenant().getEmailAddress(),
                post.getTenant().getPhoneNumber()
        );
    }

    public static List<PostDTO> convertToPostDTOs(List<Post> posts){
        List<PostDTO> postDTOs = new ArrayList<>();
        for(Post post: posts){
            postDTOs.add(convertToPostDTO(post));
        }
        return postDTOs;
    }
}
