package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.JWTFactory;
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
        logger.info(RequestBody.toString().replace("\n",""));
        String UserId  = RequestBody.get("UserId");
        String AccessToken = RequestBody.get("accessToken");
        JSONObject jsonReponse = new JSONObject();
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
            String FamilyId = RequestBody.get("FamilyId");
            String Address = RequestBody.get("Address");
            String OwnerName = RequestBody.get("OwnerName");
            if (!dataBaseService.IsExistedFamily(FamilyId)){
                dataBaseService.InsertNewFamily(FamilyId,OwnerName,Address);
                jsonReponse.put("code","200");
                jsonReponse.put("message","success");
                logger.info(jsonReponse.toString());
                return jsonReponse.toString();
            }
        }
        jsonReponse.put("code","512");
        jsonReponse.put("message","bad request");
        logger.info(jsonReponse.toString());
        return jsonReponse.toString();
    }
    @PostMapping("/GetList")
    public String GetListFamily(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString().replace("\n",""));
        String UserId  = RequestBody.get("UserId");
        String AccessToken = RequestBody.get("accessToken");
        JSONObject jsonReponse = new JSONObject();
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
            jsonReponse.put("code","200");
            jsonReponse.put("message","Success");
            jsonReponse.put("data",dataBaseService.GetListFamily());
            logger.info(jsonReponse.toString());
            return jsonReponse.toString();
        }
        jsonReponse.put("code","512");
        jsonReponse.put("message","bad request");
        logger.info(jsonReponse.toString());
        return jsonReponse.toString();
    }
}
