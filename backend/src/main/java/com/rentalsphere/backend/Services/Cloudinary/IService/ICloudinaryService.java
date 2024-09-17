package com.rentalsphere.backend.Services.Cloudinary.IService;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

public interface ICloudinaryService {
    public Map upload(MultipartFile file) throws IOException;
}
