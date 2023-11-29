package Webserver.com.myserver.Util;

import org.springframework.stereotype.Component;

@Component
public class DataBaseService {
   private final  DataBaseConnect dataBaseConnect;
    public DataBaseService(DataBaseConnect dataBaseConnect) {
        this.dataBaseConnect = dataBaseConnect;
    }
    public void addUserToDataBase(String UserName, String UserPass, String UserId){
        dataBaseConnect.insertUserData(UserName,UserPass,UserId);
    }

}
