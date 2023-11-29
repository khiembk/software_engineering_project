package Webserver.com.myserver.Model;

import Webserver.com.myserver.HelperFunction.HashFuntion;

public abstract class User {
    private String UserId;
    private String UserName;
    private String UserPassword;


    public String getUserId() {
        return UserId;
    }

    public String getUserName() {
        return UserName;
    }

    public void setUserId(String userId) {
        UserId = userId;
    }



    public String getUserPassword() {
        return UserPassword;
    }

    public void setUserName(String userName) {
        UserName = userName;
    }

    public void setUserPassword(String userPassword) {
        UserPassword = HashFuntion.hash256(userPassword);
    }
    public String changePass(String curentPass, String newpass){
        String result = "setPassFailed";
        if (HashFuntion.hash256(curentPass).equals(this.UserPassword)){
            setUserPassword(newpass);
            result = "setPassSucess";
        }
        return  result;
    }
}
