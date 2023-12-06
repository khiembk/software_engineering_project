package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.BasicReponse;
import Webserver.com.myserver.Model.Fee;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/CompleteFee")
@CrossOrigin(origins = "*")
public class ChangeFeeStatusController {
    DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(ChangeFeeStatusController.class);
    public ChangeFeeStatusController(DataBaseService dataBaseService){
        this.dataBaseService= dataBaseService;
    }
    @PostMapping()
    public String CompleteFee(@RequestBody HashMap<String, String> requestBody){
        logger.info(requestBody.toString());
        BasicReponse basicReponse = new BasicReponse();
        try{
            String UserId = requestBody.get("UserId");
            if (UserId.isEmpty()){
                throw  new RuntimeException("UserId is null");
            }
            String accessToken = requestBody.get("accessToken");
            if (accessToken.isEmpty()){
                throw new RuntimeException("AccessToken is null");
            }
            String FeeId = requestBody.get("FeeId");
            if (JWTFactory.VerifyJWT(UserId,accessToken) && dataBaseService.IsRoot(UserId) ){
                List<Fee> fees = dataBaseService.GetFeeById(FeeId);
                if (fees.size()==1){
                    dataBaseService.CompleteFeeById(FeeId);
                    JSONObject response=  new JSONObject();
                    response.put("code","200");
                    response.put("message","Success");
                    logger.info(response.toString());
                    return response.toString();
                }else{
                    throw  new RuntimeException("Invalid FeeId");
                }
            }else {
                throw new RuntimeException("Invalid JWT");
            }
        }
        catch (Exception exception){
            basicReponse.setCode("500");
            basicReponse.setMessage(exception.getMessage());
            logger.info(basicReponse.toString());
            return  basicReponse.toString();

        }
    }
}
