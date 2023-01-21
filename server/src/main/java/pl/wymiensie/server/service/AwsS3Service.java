package pl.wymiensie.server.service;

import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;

@Service
public class AwsS3Service {

    private final AmazonS3 amazonS3;

    public AwsS3Service(AmazonS3 amazonS3) {
        this.amazonS3 = amazonS3;
    }

    public String generatePreSignedUrl(String objectKey,
                                       String bucketName,
                                       HttpMethod httpMethod) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, 5);

        GeneratePresignedUrlRequest gPUR = new GeneratePresignedUrlRequest(bucketName, objectKey);
        gPUR.setExpiration(calendar.getTime());
        gPUR.setMethod(httpMethod);

        return amazonS3.generatePresignedUrl(gPUR).toString();
    }
}
