package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.Fee;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/GetListFeeUser")
@CrossOrigin(origins = "*")
public class GetListFeeUser {
    DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(GetListFeeUser.class);
    public GetListFeeUser(DataBaseService dataBaseService){
        this.dataBaseService = dataBaseService;
    }
    @PostMapping()
    public String GetListFeeOfUser(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonResponse = new JSONObject();
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        List<UserInfo> userinfos = dataBaseService.GetListUserInfoById(UserId);
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsNomalUser(UserId) && userinfos.size() ==1){
            UserInfo cur_info = userinfos.get(0);
            List<Fee>  fees  = dataBaseService.GetListFeeByFamilyId(cur_info.getFamilyId());
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            jsonResponse.put("data",fees);
            logger.info(jsonResponse.toString());
            return jsonResponse.toString();

        }
        jsonRequest.put("code","505");
        jsonResponse.put("message","fail to get list fee");
        logger.info(jsonResponse.toString());
        return  jsonResponse.toString();
    }
    @PostMapping("/Complete")
    public String GetListFeeOfUserComplete(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonResponse = new JSONObject();
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        List<UserInfo> userinfos = dataBaseService.GetListUserInfoById(UserId);
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsNomalUser(UserId) && userinfos.size() ==1){
            UserInfo cur_info = userinfos.get(0);
            List<Fee> fees  = dataBaseService.GetListFeeByFamilyIdComplete(cur_info.getFamilyId());
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            jsonResponse.put("data",fees);
            logger.info(jsonResponse.toString());
            return jsonResponse.toString();

        }
        jsonRequest.put("code","505");
        jsonResponse.put("message","fail to get list fee");
        logger.info(jsonResponse.toString());
        return  jsonResponse.toString();
    }

    @PostMapping("/NotComplete")
    public String GetListFeeOfUserNotComplete(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonResponse = new JSONObject();
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        List<UserInfo> userinfos = dataBaseService.GetListUserInfoById(UserId);
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsNomalUser(UserId) && userinfos.size() ==1){
            UserInfo cur_info = userinfos.get(0);
            List<Fee> fees  = dataBaseService.GetListFeeByFamilyIdNotComplete(cur_info.getFamilyId());
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            jsonResponse.put("data",fees);
            logger.info(jsonResponse.toString());
            return jsonResponse.toString();

        }
        jsonRequest.put("code","505");
        jsonResponse.put("message","fail to get list fee");
        logger.info(jsonResponse.toString());
        return  jsonResponse.toString();
    }
}
