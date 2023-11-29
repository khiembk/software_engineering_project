package Webserver.com.myserver.Controller;

import Webserver.com.myserver.Model.NomalUser;
import com.fasterxml.jackson.databind.util.JSONPObject;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AddNewUserController {
    @PostMapping ("/addUser")
    String AddNewUser(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String UserName = jsonRequest.getString("UserName");
        String UserId = jsonRequest.getString("UserId");
        NomalUser nomalUser = new NomalUser();
        nomalUser.setUserName(UserName);
        nomalUser.setUserId(UserId);
        nomalUser.setUserPassword("mypass");
        return nomalUser.toString();
    }
}
