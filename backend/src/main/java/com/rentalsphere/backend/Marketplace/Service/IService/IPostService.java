package com.rentalsphere.backend.Marketplace.Service.IService;

import com.rentalsphere.backend.RequestResponse.Post.*;

import java.io.IOException;

public interface IPostService {
    public PostResponse createPost(CreatePostRequest request) throws IOException;
    public GetPostResponse getPostById(Long id);
    public GetAllPostResponse getAllPosts();
    public PostResponse updatePost(UpdatePostRequest request) throws IOException;
    public PostResponse deletePost(Long id);
    public GetAllPostResponse getPostOfTenant(String email);
}
