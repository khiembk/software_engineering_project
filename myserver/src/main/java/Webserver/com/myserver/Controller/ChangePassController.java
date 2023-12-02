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
@RequestMapping("/api/changePass")
public class ChangePassController {
    private final DataBaseService dataBaseService;
    public  ChangePassController(DataBaseService dataBaseService){
        this.dataBaseService=dataBaseService;
    }
    @PostMapping("/nomalUser")
    String Login(@RequestBody String RequestBody){
        JSONObject LoginResponse = new JSONObject();
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String UserId = jsonRequest.getString("UserId");
        String NewUserPass = jsonRequest.getString("NewPassword");
        String AccessToken = jsonRequest.getString("accessToken");
        String OldUserPass = jsonRequest.getString("OldPassword");
        List<NomalUser> LisUser = dataBaseService.SearchNomalUserById(UserId);
        if (LisUser.size()==1 && JWTFactory.VerifyJWT(UserId, AccessToken)){
            NomalUser currentUser =LisUser.get(0);
            if (currentUser.getUserPassword().equals(HashFuntion.hash256(OldUserPass))){
                dataBaseService.UpdateNomalUserPass(HashFuntion.hash256(NewUserPass),UserId);
                LoginResponse.put("code","200");
                LoginResponse.put("message","Success");
                return LoginResponse.toString();
            }
        }
        LoginResponse.put("code","500");
        LoginResponse.put("message","Error");
        return LoginResponse.toString();
    }


}
