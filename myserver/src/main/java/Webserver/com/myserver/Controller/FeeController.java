package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;

import Webserver.com.myserver.Model.Admin;

import Webserver.com.myserver.Model.Fee;

import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;


@RestController
@RequestMapping("/api/Fee")
@CrossOrigin(origins = "*")
public class AddNewFee {
    private final DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(AddNewFee.class);

    public AddNewFee(DataBaseService dataBaseService) {
        this.dataBaseService = dataBaseService;
    }

    @PostMapping("/addNewFee")
    String AddNewFee(@RequestBody HashMap<String, String> RequestBody) {
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String UserId = RequestBody.get("UserId");
            if (UserId.isEmpty()) {
                throw new RuntimeException("UserId is null");
            }
            String FeeId = RequestBody.get("FeeId");
            if (FeeId.isEmpty()) {
                throw new RuntimeException("FeeId is null");
            }
            String isRequired = RequestBody.get("isRequired");
            if(isRequired.isEmpty()){
                throw new RuntimeException("IsRequired is null");
            }
            String FeeName = RequestBody.get("FeeName");
            if (FeeName.isEmpty()) {
                throw new RuntimeException("FeeName is null");
            }
            String dateCreate = RequestBody.get("DateCreate");
            if (dateCreate.isEmpty()) {
                throw new RuntimeException("dateCreate is null");
            }
            String detail = RequestBody.get("Detail");

            if (JWTFactory.VerifyJWT(UserId, AccessToken) && dataBaseService.IsRoot(UserId) && !dataBaseService.IsExistedFee(FeeId)) {
                dataBaseService.InsertNewFee(FeeName,FeeId,dateCreate,detail,Integer.valueOf(isRequired));
                basicReponse.setMessage("Success");
                basicReponse.setCode("200");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }
        } catch (Exception exception) {

            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }
    }
    @PostMapping("/Delete")
    public String DeleteFeeById(@RequestBody HashMap<String,String> RequestBody){
        logger.info(RequestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try {
            String AccessToken = RequestBody.get("accessToken");
            if (AccessToken.isEmpty()) {
                throw new RuntimeException("AccessToken is null");
            }
            String RootId = RequestBody.get("RootId");
            if (RootId.isEmpty()) {
                throw new RuntimeException("RootId is null");
            }
            String FeeId = RequestBody.get("FeeId");
            if (FeeId.isEmpty()) {
                throw new RuntimeException("FeeId is null");
            }
            String RootPassword = RequestBody.get("RootPassword");
            if (RootPassword.isEmpty()){
                throw  new RuntimeException("RootPassword is null");
            }
            List<Admin> ListRoot = dataBaseService.SearchRootById(RootId);
            if (ListRoot.size()==1){
                if (!ListRoot.get(0).getUserPassword().equals(HashFuntion.hash256(RootPassword))){
                    throw new RuntimeException("Invalid RootPassword");
                }
            }else{
                throw new RuntimeException("Invalid RootId");
            }
            if (JWTFactory.VerifyJWT(RootId, AccessToken) && dataBaseService.IsRoot(RootId) && dataBaseService.IsExistedFee(FeeId)) {
                dataBaseService.DeleteFeeById(FeeId);
                basicReponse.setCode("200");
                basicReponse.setMessage("Success");
                logger.info(basicReponse.toString());
                return basicReponse.toString();
            } else {
                throw new RuntimeException("Invalid JWT");
            }
        } catch (Exception exception) {

            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return basicReponse.toString();
        }

    }

    @PostMapping("/getListFee")
    String GetListFee(@RequestBody HashMap<String, String> RequestBody) {
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
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && (dataBaseService.IsRoot(UserId))|| dataBaseService.IsNomalUser(UserId)) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFee());
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

    @PostMapping("/getListFee/Required")
    String GetListFeeRequired(@RequestBody HashMap<String, String> RequestBody) {
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
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && ((dataBaseService.IsRoot(UserId))|| dataBaseService.IsNomalUser(UserId))) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFeeRequired());
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

    @PostMapping("/getListFee/NotRequired")
    String GetListFeeNotRequired(@RequestBody HashMap<String, String> RequestBody) {
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
            if (JWTFactory.VerifyJWT(UserId, AccessToken) && (dataBaseService.IsRoot(UserId) || dataBaseService.IsNomalUser(UserId))) {
                JSONObject jsonResponse = new JSONObject();
                jsonResponse.put("code", "200");
                jsonResponse.put("message", "Success");
                jsonResponse.put("data", dataBaseService.GetListFeeNotRequired());
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