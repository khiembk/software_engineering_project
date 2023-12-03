package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.Model.Admin;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Model.User;
import Webserver.com.myserver.Util.DataBaseService;
import org.apache.juli.logging.Log;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {
    private final DataBaseService dataBaseService;
    private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
    public  LoginController(DataBaseService dataBaseService){
        this.dataBaseService = dataBaseService;
    }
    @PostMapping("/nomalUser")
    String Login(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject LoginResponse = new JSONObject();
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String UserId = jsonRequest.getString("UserId");
        String UserPass = jsonRequest.getString("UserPassword");
        List<User> LisUser = dataBaseService.SearchNomalUserById(UserId);
        if (LisUser.size()==1){
            User currentUser =LisUser.get(0);
            if (currentUser.getUserPassword().equals(HashFuntion.hash256(UserPass))){
                LoginResponse.put("code","200");
                LoginResponse.put("message","Success");
                LoginResponse.put("accessToken", JWTFactory.GenJWT(UserId));
                logger.info(LoginResponse.toString());
                return LoginResponse.toString();
            }
        }
        LoginResponse.put("code","500");
        LoginResponse.put("message","Error");
        logger.info(LoginResponse.toString());
        return LoginResponse.toString();
    }
    @PostMapping("/Root")
    String LoginRoot(@RequestBody String RequestBody){
        logger.info(RequestBody.replace("\n",""));
        JSONObject LoginResponse = new JSONObject();
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String UserId = jsonRequest.getString("UserId");
        String UserPass = jsonRequest.getString("UserPassword");
        List<Admin> LisUser = dataBaseService.SearchRootById(UserId);
        if (LisUser.size()==1){
            Admin currentUser =LisUser.get(0);
            if (currentUser.getUserPassword().equals(HashFuntion.hash256(UserPass))){
                LoginResponse.put("code","200");
                LoginResponse.put("message","Success");
                LoginResponse.put("accessToken", JWTFactory.GenJWT(UserId));
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
