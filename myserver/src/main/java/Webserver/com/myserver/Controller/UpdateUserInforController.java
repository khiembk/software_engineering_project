package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
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
public class UpdateUserInforController {
    DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(UpdateUserInforController.class);
    public UpdateUserInforController(DataBaseService dataBaseService){
        this.dataBaseService= dataBaseService;
    }
    @PostMapping("/UpdateUserInfo")
    String UpdateNomalUserInfo(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try{
            String RootId = RequestBody.get("RootId");
            if (RootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }

            String FamilyId = RequestBody.get("FamilyId");
            if (FamilyId.isEmpty()){
                throw new RuntimeException("FamilyId is null");
            }
            String PhoneNumber = RequestBody.get("PhoneNumber");
            if (PhoneNumber.isEmpty()){
                throw new RuntimeException("PhoneNumber is null");
            }
            String dateOfBirth = RequestBody.get("dateOfBirth");
            if (dateOfBirth.isEmpty()){
                throw new RuntimeException("dateOfBirth is null");
            }
            if (JWTFactory.VerifyJWT(RootId,AccessToken) && dataBaseService.IsNomalUser(UserId) && dataBaseService.IsRoot(RootId)){
                dataBaseService.updateUserInfo(UserId,FamilyId,PhoneNumber,dateOfBirth);
                basicReponse.setCode("200");
                basicReponse.setMessage("Success");
                logger.info(basicReponse.toString());

                return basicReponse.toString();
            }else{
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return  basicReponse.toString();
        }
    }
    @PostMapping("/DeleteUser")
    String DeleteUser(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try{
            String RootId = RequestBody.get("RootId");
            if (RootId.isEmpty()){
                throw new RuntimeException("RootId is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }

            if (JWTFactory.VerifyJWT(RootId,AccessToken) && dataBaseService.IsNomalUser(UserId) && dataBaseService.IsRoot(RootId)){
                dataBaseService.DeleteUserById(UserId);
                basicReponse.setCode("200");
                basicReponse.setMessage("Success");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
            }else{
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return  basicReponse.toString();
        }
    }


}
