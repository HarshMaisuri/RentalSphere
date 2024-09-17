package com.rentalsphere.backend.Marketplace.Controller;

import com.rentalsphere.backend.DTOs.PostDTO;
import com.rentalsphere.backend.Marketplace.Service.IService.IPostService;
import com.rentalsphere.backend.RequestResponse.Post.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PostControllerTest {
    @InjectMocks
    private PostController postController;
    @Mock
    private IPostService postService;
    @Mock
    private CreatePostRequest createPostRequest;
    @Mock
    private UpdatePostRequest updatePostRequest;
    @Mock
    private PostDTO post;
    private PostResponse postResponse;
    private GetAllPostResponse getAllPostResponse;
    private GetPostResponse getPostResponse;

    @BeforeEach
    void init(){
    }

    @Test
    void testCreatePost() throws IOException {
        postResponse = PostResponse.builder()
                .isSuccess(true)
                .message("Post created.")
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(postResponse, HttpStatus.CREATED);

        when(postService.createPost(createPostRequest)).thenReturn(postResponse);

        assertEquals(responseEntity, postController.createPost(createPostRequest));
    }

    @Test
    void testGetPostById(){
        getPostResponse = GetPostResponse.builder()
                .isSuccess(true)
                .post(post)
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(getPostResponse, HttpStatus.OK);

        when(postService.getPostById(anyLong())).thenReturn(getPostResponse);

        assertEquals(responseEntity, postController.getPostById(anyLong()));
    }

    @Test
    void testGetAllPosts(){
        getAllPostResponse = GetAllPostResponse.builder()
                .isSuccess(true)
                .posts(List.of(post))
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(getAllPostResponse, HttpStatus.OK);

        when(postService.getAllPosts()).thenReturn(getAllPostResponse);

        assertEquals(responseEntity, postController.getAllPosts());
    }

    @Test
    void testUpdatePost() throws IOException {
        postResponse = PostResponse.builder()
                .isSuccess(true)
                .message("Post updated.")
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(postResponse, HttpStatus.OK);

        when(postService.updatePost(updatePostRequest)).thenReturn(postResponse);

        assertEquals(responseEntity, postController.updatePost(updatePostRequest));
    }

    @Test
    void testDeletePost(){
        postResponse = PostResponse.builder()
                .isSuccess(true)
                .message("Post deleted.")
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(postResponse, HttpStatus.OK);

        when(postService.deletePost(anyLong())).thenReturn(postResponse);

        assertEquals(responseEntity, postController.deletePost(anyLong()));
    }

    @Test
    void testGetPostOfTenant(){
        getAllPostResponse = GetAllPostResponse.builder()
                .isSuccess(true)
                .posts(List.of(post))
                .timeStamp(new Date())
                .build();

        ResponseEntity<?> responseEntity = new ResponseEntity<>(getAllPostResponse, HttpStatus.OK);

        when(postService.getPostOfTenant("test@gmail.com")).thenReturn(getAllPostResponse);

        assertEquals(responseEntity, postController.getPostsOfTenant("test@gmail.com"));
    }
}
