package com.rentalsphere.backend.Services.Cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.rentalsphere.backend.Services.Cloudinary.IService.ICloudinaryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CloudinaryService implements ICloudinaryService {
    private final Cloudinary cloudinary;

    /**
     * method to store files in cloudinary
     * @return - url of the file
     */
    @Override
    public Map upload(MultipartFile file) throws IOException {
        Map options = ObjectUtils.asMap("public_id", "RentalSphere/" + file.getOriginalFilename() + "-" + UUID.randomUUID());
        return this.cloudinary.uploader().upload(file.getBytes(), options);
    }
}
