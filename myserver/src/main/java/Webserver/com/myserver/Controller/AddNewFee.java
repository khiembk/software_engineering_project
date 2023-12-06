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
@RequestMapping("/api/Fee")
@CrossOrigin(origins = "*")
public class AddNewFee {
    private final DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(AddNewFee.class);
    public AddNewFee(DataBaseService dataBaseService){
        this.dataBaseService= dataBaseService;
    }
    @PostMapping("/addNewFee")
    String AddNewFee(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isBlank()){
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isBlank()){
                throw new RuntimeException("UserId is null");
            }
            String FeeId = RequestBody.get("FeeId");
            if (FeeId.isBlank()){
                throw new RuntimeException("FeeId is null");
            }
            int Money = Integer.valueOf(RequestBody.get("Money"));
            if (Money==0){
                throw new RuntimeException("Money is null");
            }
            String FeeName = RequestBody.get("FeeName");
            if (FeeName.isBlank()){
                throw new RuntimeException("FeeName is null");
            }
            String dateCreate = RequestBody.get("DateCreate");
            if (dateCreate.isBlank()){
                throw new RuntimeException("dateCreate is null");
            }
            String detail = RequestBody.get("Detail");
            String familyId = RequestBody.get("FamilyId");
            if (familyId.isBlank()){
                throw new RuntimeException("familyId is null");
            }
            if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId) && !dataBaseService.IsExistedFee(FeeId)){
                dataBaseService.InsertNewFee(Money,FeeName,FeeId,dateCreate,detail,familyId);
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code","200");
                jsonResponse.put("message","Success");
                logger.info(jsonResponse.toString());
                return jsonResponse.toString();
            }else {
                throw new RuntimeException("Invalid role or JWT");
            }
        }catch (Exception exception){
            BasicReponse basicReponse =  new BasicReponse();
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }

    @PostMapping("/getListFee")
    String GetListFee(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            jsonResponse.put("data",dataBaseService.GetListFee());
            logger.info(jsonResponse.toString());
            return jsonResponse.toString();
        }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("code","502");
        jsonResponse.put("message","Invalid JWT");
        logger.info(jsonResponse.toString());
        return jsonResponse.toString();
    }
    @PostMapping("/getListFee/Complete")
    String GetListFeeComplete(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            jsonResponse.put("data",dataBaseService.GetListFeeComplete());
            logger.info(jsonResponse.toString());
            return jsonResponse.toString();
        }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("code","502");
        jsonResponse.put("message","Invalid JWT");
        logger.info(jsonResponse.toString());
        return jsonResponse.toString();
    }
    @PostMapping("/getListFee/NotComplete")
    String GetListFeeNotComplete(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            jsonResponse.put("data",dataBaseService.GetListFeeNotComplete());
            logger.info(jsonResponse.toString());
            return jsonResponse.toString();
        }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("code","502");
        jsonResponse.put("message","Invalid JWT");
        logger.info(jsonResponse.toString());
        return jsonResponse.toString();
    }



}
