package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.Fee;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/GetListFeeUser")
@CrossOrigin(origins = "*")
public class GetListFeeUser {
    DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(GetListFeeUser.class);

    public GetListFeeUser(DataBaseService dataBaseService) {
        this.dataBaseService = dataBaseService;
    }

    @PostMapping()
    public String GetListFeeOfUser(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            List<UserInfo> userinfos = dataBaseService.GetListUserInfoById(UserId);
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && dataBaseService.IsNomalUser(UserId) && userinfos.size() == 1) {
                UserInfo cur_info = userinfos.get(0);
                List<Fee> fees = dataBaseService.GetListFeeByFamilyId(cur_info.getFamilyId());
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", fees);
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();

            } else {
                throw new RuntimeException("Invalid JWT");
            }
        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

    @PostMapping("/Complete")
    public String GetListFeeOfUserComplete(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            List<UserInfo> userinfos = dataBaseService.GetListUserInfoById(UserId);
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && dataBaseService.IsNomalUser(UserId) && userinfos.size() == 1) {
                UserInfo cur_info = userinfos.get(0);
                List<Fee> fees = dataBaseService.GetListFeeByFamilyIdComplete(cur_info.getFamilyId());
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", fees);
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();

            } else {
                throw new RuntimeException("Invalid JWT");
            }
        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

    @PostMapping("/NotComplete")
    public String GetListFeeOfUserNotComplete(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            List<UserInfo> userinfos = dataBaseService.GetListUserInfoById(UserId);
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && dataBaseService.IsNomalUser(UserId) && userinfos.size() == 1) {
                UserInfo cur_info = userinfos.get(0);
                if (!dataBaseService.IsExistedFamily(cur_info.getFamilyId())){
                    throw  new RuntimeException("Invalid FamilyId");
                }
                List<Fee> fees = dataBaseService.GetListFeeByFamilyIdNotComplete(cur_info.getFamilyId());
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", fees);
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();

            } else {
                throw new RuntimeException("Invalid JWT");
            }
        } catch (Exception exception) {
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
}
