package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.Model.User;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/UpdateUserInfo")
public class UpdateUserInforController {
    DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(UpdateUserInforController.class);
    public UpdateUserInforController(DataBaseService dataBaseService){
        this.dataBaseService= dataBaseService;
    }
    @PostMapping()
    String UpdateNomalUserInfo(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonReponse =  new JSONObject();
        String UserId = jsonRequest.getString("UserId");
        String AccessToken = jsonRequest.getString("accessToken");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsNomalUser(UserId)){
            String FamilyId = jsonRequest.getString("FamilyId");
            String PhoneNumber = jsonRequest.getString("PhoneNumber");
            String dateofBirth = jsonRequest.getString("dateOfBirth");
            dataBaseService.updateUserInfo(UserId,FamilyId,PhoneNumber,dateofBirth);
            jsonReponse.put("code","200");
            jsonReponse.put("message","success");
            logger.info(jsonReponse.toString());
            return jsonReponse.toString();
        }
        jsonReponse.put("code","504");
        jsonReponse.put("message","fail to update info");
        logger.info(jsonReponse.toString());
        return  jsonReponse.toString();
    }



}
