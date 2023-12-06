package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

@RestController
@RequestMapping("/api/Family")
@CrossOrigin(origins = "*")
public class FamilyController {
    DataBaseService dataBaseService;
    public FamilyController(DataBaseService dataBaseService){
        this.dataBaseService = dataBaseService;
    }
    private static final Logger logger = LoggerFactory.getLogger(FamilyController.class);
    @PostMapping("/Add")
    public String AddNewFamily(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String UserId  = RequestBody.get("UserId");
            if(UserId.isEmpty()){
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
            String Address = RequestBody.get("Address");
            if (Address.isEmpty()){
                throw new RuntimeException("Address is null");
            }
            String OwnerName = RequestBody.get("OwnerName");
            if (OwnerName.isEmpty()){
                throw new RuntimeException("OwnerName is null");
            }
            if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){

                if (!dataBaseService.IsExistedFamily(FamilyId)){
                    dataBaseService.InsertNewFamily(FamilyId,OwnerName,Address);
                    basicReponse.setCode("200");
                    basicReponse.setMessage("Success");
                    logger.info(basicReponse.toString());
                    return basicReponse.toString();
                }else{
                    throw new RuntimeException("Invalid FamilyId");
                }
            }else {
                throw  new RuntimeException("Invalid JWT");
            }
        }catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/GetList")
    public String GetListFamily(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        try {
            String UserId  = RequestBody.get("UserId");
            if (UserId.isEmpty()){
                throw new RuntimeException("UserId is null");
            }
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }

            if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
                JSONObject jsonReponse = new JSONObject();
                jsonReponse.put("code","200");
                jsonReponse.put("message","Success");
                jsonReponse.put("data",dataBaseService.GetListFamily());
                logger.info(jsonReponse.toString());
                return jsonReponse.toString();
            }else {
                throw new RuntimeException("Invalid JWT");
            }
        }catch (Exception exception){
            BasicReponse basicReponse = new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }

    }
}
