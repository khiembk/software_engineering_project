package Webserver.com.myserver.Controller;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

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
        String UserName = jsonRequest.getString("UserName");
        String UserId = jsonRequest.getString("UserId");
        NomalUser nomalUser = new NomalUser();
        nomalUser.setUserName(UserName);
        nomalUser.setUserId(UserId);
        nomalUser.setUserPassword("mypass");
        dataBaseService.addUserToDataBase(UserName, nomalUser.getUserPassword(), nomalUser.getUserId());
        return nomalUser.toString();
    }
}
