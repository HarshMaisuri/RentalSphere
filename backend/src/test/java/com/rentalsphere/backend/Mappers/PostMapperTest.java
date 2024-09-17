package com.rentalsphere.backend.Mappers;
import com.rentalsphere.backend.DTOs.PostDTO;
import com.rentalsphere.backend.Enums.AvailabilityStatus;
import com.rentalsphere.backend.Marketplace.Model.Post;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.User.Model.User;
import org.junit.jupiter.api.Test;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PostMapperTest {

    @Test
    public void testConvertToPostDTO() {

        Post post = new Post();
        post.setId(1L);
        post.setTitle("Luxurious Apartment");
        post.setDescription("Spacious apartment with breathtaking view");
        post.setPrice(1500.0);
        post.setImageUrl("apartment.jpg");
        post.setAvailabilityStatus(AvailabilityStatus.AVAILABLE);
        post.setCreationDate(new Date());

        Tenant tenant = new Tenant();
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        tenant.setUser(user);
        tenant.setEmailAddress("john@example.com");
        tenant.setPhoneNumber("1234567890");
        post.setTenant(tenant);

        PostDTO postDTO = PostMapper.convertToPostDTO(post);

        assertEquals(1L, postDTO.getId());
        assertEquals("Luxurious Apartment", postDTO.getTitle());
        assertEquals("John Doe", postDTO.getTenantName());
        assertEquals("john@example.com", postDTO.getTenantEmail());
        assertEquals("1234567890", postDTO.getTenantPhone());
    }

    @Test
    public void testConvertToPostDTOs() {

        List<Post> posts = new ArrayList<>();
        posts.add(createDummyPostWithNonNullTenant());
        posts.add(createDummyPostWithNonNullTenant());

        List<PostDTO> postDTOs = PostMapper.convertToPostDTOs(posts);

        assertEquals(2, postDTOs.size());
    }

    private Post createDummyPostWithNonNullTenant() {
        Post post = new Post();
        post.setId(1L);
        post.setTitle("Luxurious Apartment");
        post.setDescription("Spacious apartment with breathtaking view");
        post.setPrice(1500.0);
        post.setImageUrl("apartment.jpg");
        post.setAvailabilityStatus(AvailabilityStatus.AVAILABLE);
        post.setCreationDate(new Date());

        Tenant tenant = new Tenant();
        User user = new User();
        user.setFirstName("John");
        user.setLastName("Doe");
        user.setEmail("john@example.com");
        tenant.setUser(user);
        tenant.setEmailAddress("john@example.com");
        tenant.setPhoneNumber("1234567890");
        post.setTenant(tenant);

        return post;
    }
}

