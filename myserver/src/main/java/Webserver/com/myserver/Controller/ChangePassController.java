package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.Model.User;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/changePass")
@CrossOrigin(origins = "*")
public class ChangePassController {
    private final DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(ChangePassController.class);
    public  ChangePassController(DataBaseService dataBaseService){
        this.dataBaseService=dataBaseService;
    }
    @PostMapping("/nomalUser")
    String Login(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject LoginResponse = new JSONObject();
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String UserId = jsonRequest.getString("UserId");
        String NewUserPass = jsonRequest.getString("NewPassword");
        String AccessToken = jsonRequest.getString("accessToken");
        String OldUserPass = jsonRequest.getString("OldPassword");
        List<User> LisUser = dataBaseService.SearchNomalUserById(UserId);
        if (LisUser.size()==1 && JWTFactory.VerifyJWT(UserId, AccessToken)){
            User currentUser =LisUser.get(0);
            if (currentUser.getUserPassword().equals(HashFuntion.hash256(OldUserPass))){
                dataBaseService.UpdateNomalUserPass(HashFuntion.hash256(NewUserPass),UserId);
                LoginResponse.put("code","200");
                LoginResponse.put("message","Success");
                logger.info(LoginResponse.toString());
                return LoginResponse.toString();
            }
        }
        LoginResponse.put("code","500");
        LoginResponse.put("message","Error");
        logger.info(LoginResponse.toString());
        return LoginResponse.toString();
    }


}
