package Webserver.com.myserver.Controller;
import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Model.User;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AddNewUserController {
    private final  DataBaseService dataBaseService;
    public AddNewUserController(DataBaseService dataBaseService){
        this.dataBaseService=dataBaseService;
    }
    @PostMapping ("/addUser")
    String AddNewUser(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String rootId = jsonRequest.getString("RootId");
        String accessToken = jsonRequest.getString("accessToken");
        if (JWTFactory.VerifyJWT(rootId,accessToken) && dataBaseService.IsRoot(rootId)){
        String UserName = jsonRequest.getString("UserName");
        String UserId = jsonRequest.getString("UserId");
        List<User> findSameId = dataBaseService.SearchNomalUserById(UserId);
        if (!findSameId.isEmpty()){
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("code","501");
            jsonResponse.put("message","query fail");
            return jsonResponse.toString();
        }
        NomalUser nomalUser = new NomalUser();
        nomalUser.setUserName(UserName);
        nomalUser.setUserId(UserId);
        nomalUser.setUserPassword(HashFuntion.hash256("mypass"));
        dataBaseService.addUserToDataBase(UserName, nomalUser.getUserPassword(), nomalUser.getUserId());
        return nomalUser.toString();
    }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("code","502");
        jsonResponse.put("message","Invalid JWT");
        return jsonResponse.toString();
}
   @PostMapping("/GetListUser")
    String GetListUser(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        JSONObject jsonReponse = new JSONObject();
        String UserId = jsonRequest.getString("UserId");
        String AccessToken = jsonRequest.getString("accsessToken");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){}
        jsonReponse.put("code","500");
        jsonReponse.put("message","Internal server Error");
        return jsonReponse.toString();
   }
}
