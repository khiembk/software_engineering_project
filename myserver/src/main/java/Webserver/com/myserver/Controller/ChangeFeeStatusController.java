package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.Model.Fee;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/CompleteFee")
public class ChangeFeeStatusController {
    DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(ChangeFeeStatusController.class);
    public ChangeFeeStatusController(DataBaseService dataBaseService){
        this.dataBaseService= dataBaseService;
    }
    @PostMapping()
    public String CompleteFee(@RequestBody HashMap<String, String> requestBody){
        logger.info(requestBody.toString().replace("\n",""));
        String UserId = requestBody.get("UserId");
        String accessToken = requestBody.get("accessToken");
        String FeeId = requestBody.get("FeeId");
        JSONObject response=  new JSONObject();
        if (JWTFactory.VerifyJWT(UserId,accessToken) && dataBaseService.IsRoot(UserId) ){
            List<Fee> fees = dataBaseService.GetFeeById(FeeId);
            if (fees.size()==1){
                dataBaseService.CompleteFeeById(FeeId);
                response.put("code","200");
                response.put("message","Success");
                logger.info(response.toString());
                return response.toString();
            }
        }
        response.put("code","500");
        response.put("message","Internal server error");
        logger.info(response.toString());
        return  response.toString();
    }
}
