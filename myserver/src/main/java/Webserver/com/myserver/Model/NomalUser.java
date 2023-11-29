package Webserver.com.myserver.Model;

import org.json.JSONObject;

public class NomalUser extends User{
     private String FamilyId;

     @Override
     public String toString() {
          JSONObject jsonObject =  new JSONObject();
          jsonObject.put("UserName",this.getUserName());
          jsonObject.put("UserPassWord",this.getUserPassword());
          jsonObject.put("UserId", this.getUserId());
          return  jsonObject.toString();
     }
}
