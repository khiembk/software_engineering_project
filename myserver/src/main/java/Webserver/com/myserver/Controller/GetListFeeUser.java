package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/GetListFeeUser")
public class GetListFeeUser {
    DataBaseService dataBaseService;
    public GetListFeeUser(DataBaseService dataBaseService){
        this.dataBaseService = dataBaseService;
    }
    @PostMapping()
    public String GetListFeeOfUser(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonResponse = new JSONObject();
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");

        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsNomalUser(UserId)){

        }
        jsonRequest.put("code","505");
        jsonResponse.put("message","fail to get list fee");
        return  jsonResponse.toString();
    }
}
