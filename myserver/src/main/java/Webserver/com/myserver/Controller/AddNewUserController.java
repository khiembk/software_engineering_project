package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Model.User;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class AddNewUserController {
    private final  DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(AddNewUserController.class);
    public AddNewUserController(DataBaseService dataBaseService){
        this.dataBaseService=dataBaseService;
    }
    @PostMapping ("/addUser")
    String AddNewUser(@RequestBody HashMap<String,String> RequestBody){

        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String rootId = RequestBody.get("RootId");
            if (rootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            String accessToken = RequestBody.get("accessToken");
            if (accessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }
            String UserName = RequestBody.get("UserName");
            if (UserName.isEmpty()){
                throw new RuntimeException("UserName is null");
            }
            String UserId =RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            if (JWTFactory.VerifyJWT(rootId,accessToken) && dataBaseService.IsRoot(rootId)){
                dataBaseService.addUserToDataBase(UserName, HashFuntion.hash256("mypass"), UserId);
                String FamilyId = RequestBody.get("FamilyId");
                String PhoneNumber = RequestBody.get("PhoneNumber");
                String dateofBirth = RequestBody.get("dateOfBirth");
                if (dateofBirth.isEmpty() || PhoneNumber.isEmpty() || FamilyId.isEmpty()){
                    throw new RuntimeException("User not enough info");
                }
                dataBaseService.updateUserInfo(UserId,FamilyId,PhoneNumber,dateofBirth);

                basicReponse.setMessage("Success");
                basicReponse.setCode("200");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
        }else{
                throw new RuntimeException("Invalid JWT");
            }
    }catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
}
   @PostMapping("/GetListUser")
    String GetListUser(@RequestBody String RequestBody){
        logger.info(RequestBody);
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonReponse = new JSONObject();
        String UserId = jsonRequest.getString("UserId");
        String AccessToken = jsonRequest.getString("accessToken");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
              jsonReponse.put("code","200");
              jsonReponse.put("message","Success");
              jsonReponse.put("data",dataBaseService.GetListUserInfo());
              return jsonReponse.toString();
        }
        jsonReponse.put("code","500");
        jsonReponse.put("message","Internal server Error");
        logger.info(jsonReponse.toString());
        return jsonReponse.toString();
   }
    @PostMapping("/GetUserInfo")
    String GetUserInfo(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonReponse = new JSONObject();
        String UserId = jsonRequest.getString("UserId");
        String AccessToken = jsonRequest.getString("accessToken");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsNomalUser(UserId)){
            jsonReponse.put("code","200");
            jsonReponse.put("message","Success");
            jsonReponse.put("data",dataBaseService.GetListUserInfoById(UserId));
            logger.info(jsonReponse.toString());
            return jsonReponse.toString();
        }
        jsonReponse.put("code","500");
        jsonReponse.put("message","Internal server Error");
        return jsonReponse.toString();
    }

    @PostMapping("/GetUserInfoByFamilyId")
    String GetUserInfoById(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonReponse = new JSONObject();
        String UserId = jsonRequest.getString("UserId");
        String AccessToken = jsonRequest.getString("accessToken");
        List<UserInfo> userInfos = dataBaseService.GetListUserInfoById(UserId);
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsNomalUser(UserId) && userInfos.size()==1){
            String familyId = userInfos.get(0).getFamilyId();
            jsonReponse.put("code","200");
            jsonReponse.put("message","Success");
            jsonReponse.put("data",dataBaseService.GetListUserInfoByFamilyId(familyId));
            logger.info(jsonReponse.toString());
            return jsonReponse.toString();
        }
        jsonReponse.put("code","500");
        jsonReponse.put("message","Internal server Error");
        return jsonReponse.toString();
    }

}
