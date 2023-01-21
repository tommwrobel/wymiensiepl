package pl.wymiensie.server.controller;

import com.amazonaws.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.wymiensie.server.model.AwsS3UploadUrl;
import pl.wymiensie.server.service.AwsS3Service;

import java.util.UUID;

@RestController
public class AwsS3Controller {
    private final AwsS3Service awsS3Service;

    public AwsS3Controller(AwsS3Service awsS3Service) {
        this.awsS3Service = awsS3Service;
    }

    @GetMapping("/generate-upload-url")
    public ResponseEntity<AwsS3UploadUrl> generateUploadUrl() {

        String objectKey = "book-covers/" + UUID.randomUUID();
        String preSignedUrl = awsS3Service.generatePreSignedUrl(objectKey, "wymiensiepl", HttpMethod.PUT);

        return ResponseEntity.ok(new AwsS3UploadUrl(preSignedUrl, objectKey));
    }
}
