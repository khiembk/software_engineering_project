package Webserver.com.myserver.HelperFunction;
import com.eatthepath.otp.TimeBasedOneTimePasswordGenerator;
import java.util.Base64;
import java.nio.ByteBuffer;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public class TOTPGenerator {
    public static String generateTOTP(String secretKey, String UserId) {
        return  null;
    }
    public static  boolean VerifyTOTP(String otp, String UserId){
        return false;
    }

    private static byte[] getBase32DecodedBytes(String base32) {
        return Base64.getDecoder().decode(base32);
    }

}
