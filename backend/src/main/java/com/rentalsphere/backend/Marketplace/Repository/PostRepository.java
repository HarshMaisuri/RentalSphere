package com.rentalsphere.backend.Marketplace.Repository;

import com.rentalsphere.backend.Marketplace.Model.Post;
import com.rentalsphere.backend.Tenant.Model.Tenant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findByTenant(Tenant tenant);
}
