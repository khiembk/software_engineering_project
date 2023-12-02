package Webserver.com.myserver.Controller;

import Webserver.com.myserver.HelperFunction.HashFuntion;
import Webserver.com.myserver.HelperFunction.JWTFactory;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Util.DataBaseConnect;
import Webserver.com.myserver.Util.DataBaseService;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/Fee")
public class AddNewFee {
    private final DataBaseService dataBaseService;
    public AddNewFee(DataBaseService dataBaseService){
        this.dataBaseService= dataBaseService;
    }
    @PostMapping("/addNewFee")
    String AddNewFee(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        String FeeId = jsonRequest.getString("FeeId");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId) && !dataBaseService.IsExistedFee(FeeId)){
            int Money = Integer.valueOf(jsonRequest.getString("Money"));
            String FeeName = jsonRequest.getString("FeeName");
            String dateCreate = jsonRequest.getString("DateCreate");
            String detail = jsonRequest.getString("Detail");
            String famimyId = jsonRequest.getString("FamilyId");
            dataBaseService.InsertNewFee(Money,FeeName,FeeId,dateCreate,detail,famimyId);
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            return jsonResponse.toString();
        }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("code","502");
        jsonResponse.put("message","Invalid JWT");
        return jsonResponse.toString();
    }

    @PostMapping("/getListFee")
    String GetListFee(@RequestBody String RequestBody){
        JSONObject jsonRequest = new JSONObject(RequestBody);
        String AccessToken = jsonRequest.getString("accessToken");
        String UserId = jsonRequest.getString("UserId");
        if (JWTFactory.VerifyJWT(UserId,AccessToken) && dataBaseService.IsRoot(UserId)){
            JSONObject jsonResponse = new JSONObject();
            jsonResponse.put("code","200");
            jsonResponse.put("message","Success");
            jsonResponse.put("data",dataBaseService.GetListFee());
            return jsonResponse.toString();
        }
        JSONObject jsonResponse = new JSONObject();
        jsonResponse.put("code","502");
        jsonResponse.put("message","Invalid JWT");
        return jsonResponse.toString();
    }



}
