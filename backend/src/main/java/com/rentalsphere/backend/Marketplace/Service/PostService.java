package com.rentalsphere.backend.Marketplace.Service;

import com.rentalsphere.backend.DTOs.PostDTO;
import com.rentalsphere.backend.Enums.ApplicationStatus;
import com.rentalsphere.backend.Enums.AvailabilityStatus;
import com.rentalsphere.backend.Exception.Post.PostNotFoundException;
import com.rentalsphere.backend.Exception.Tenant.TenantNotFoundException;
import com.rentalsphere.backend.Mappers.PostMapper;
import com.rentalsphere.backend.Marketplace.Model.Post;
import com.rentalsphere.backend.Marketplace.Repository.PostRepository;
import com.rentalsphere.backend.Marketplace.Service.IService.IPostService;
import com.rentalsphere.backend.RequestResponse.Post.*;
import com.rentalsphere.backend.Services.Cloudinary.IService.ICloudinaryService;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import com.rentalsphere.backend.Tenant.Repository.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService implements IPostService {
    @Autowired
    private final PostRepository postRepository;
    @Autowired
    private final TenantRepository tenantRepository;
    @Autowired
    private final ICloudinaryService cloudinaryService;

    @Override
    public PostResponse createPost(CreatePostRequest request) throws IOException {
        Optional<Tenant> tenant = tenantRepository.findByEmailAddressAndApplicationStatus(request.getEmail(), ApplicationStatus.APPROVED);

        if(!tenant.isPresent()){
            throw new TenantNotFoundException("tenant profile does not exist");
        }

        Map image = cloudinaryService.upload(request.getImage());

        Post post = Post.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .price(request.getPrice())
                .imageUrl((String) image.get("url"))
                .availabilityStatus(AvailabilityStatus.AVAILABLE)
                .tenant(tenant.get())
                .build();
        postRepository.save(post);

        return PostResponse.builder()
                .isSuccess(true)
                .message("Post created.")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetPostResponse getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);

        if(!post.isPresent()){
            throw new PostNotFoundException("no such post exists.");
        }

        PostDTO postDTO = PostMapper.convertToPostDTO(post.get());

        return GetPostResponse.builder()
                .isSuccess(true)
                .post(postDTO)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetAllPostResponse getAllPosts() {
        List<Post> posts = postRepository.findAll();

        List<PostDTO> postDTOs = PostMapper.convertToPostDTOs(posts);

        return GetAllPostResponse.builder()
                .isSuccess(true)
                .posts(postDTOs)
                .timeStamp(new Date())
                .build();
    }

    @Override
    public PostResponse updatePost(UpdatePostRequest request) throws IOException {
        Optional<Post> post = postRepository.findById(request.getId());

        if(!post.isPresent()){
            throw new PostNotFoundException("no such post exists");
        }

        post.get().setTitle(request.getTitle());
        post.get().setDescription(request.getDescription());
        post.get().setPrice(request.getPrice());
        post.get().setAvailabilityStatus(request.getAvailabilityStatus());
        if(request.getUpdatedImage() != null){
            Map image = cloudinaryService.upload(request.getUpdatedImage());
            post.get().setImageUrl((String) image.get("url"));
        }
        return PostResponse.builder()
                .isSuccess(true)
                .message("Post updated.")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public PostResponse deletePost(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if(!post.isPresent()){
            throw new PostNotFoundException("no such post exists.");
        }

        postRepository.deleteById(id);
        return PostResponse.builder()
                .isSuccess(true)
                .message("Post deleted.")
                .timeStamp(new Date())
                .build();
    }

    @Override
    public GetAllPostResponse getPostOfTenant(String email) {
        Optional<Tenant> tenant = tenantRepository.findByEmailAddressAndApplicationStatus(email, ApplicationStatus.APPROVED);

        if(!tenant.isPresent()){
            throw new TenantNotFoundException("NO such tenant exists");
        }

        List<Post> posts = postRepository.findByTenant(tenant.get());
        List<PostDTO> postDTOs = PostMapper.convertToPostDTOs(posts);

        return GetAllPostResponse.builder()
                .isSuccess(true)
                .posts(postDTOs)
                .timeStamp(new Date())
                .build();
    }
}
