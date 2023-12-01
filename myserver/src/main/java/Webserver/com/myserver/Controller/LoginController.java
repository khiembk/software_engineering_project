package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final DataBaseService dataBaseService;
    public  LoginController(DataBaseService dataBaseService){
        this.dataBaseService = dataBaseService;
    }
    @PostMapping()
    String Login(@RequestBody String RequestBody){
        JSONObject LoginResponse = new JSONObject();
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String UserId = jsonRequest.getString("UserId");
        String UserPass = jsonRequest.getString("UserPassword");
        List<NomalUser> LisUser = dataBaseService.SearchNomalUserById(UserId);
        if (LisUser.size()==1){
            NomalUser currentUser =LisUser.get(0);
            if (currentUser.getUserPassword().equals(HashFuntion.hash256(UserPass))){
                LoginResponse.put("code","200");
                LoginResponse.put("message","Success");
                LoginResponse.put("accessToken", JWTFactory.GenJWT(UserId));
                return LoginResponse.toString();
            }
        }
        LoginResponse.put("code","500");
        LoginResponse.put("message","Error");
        return LoginResponse.toString();
    }
}
