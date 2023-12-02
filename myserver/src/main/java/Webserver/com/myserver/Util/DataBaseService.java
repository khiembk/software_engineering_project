package Webserver.com.myserver.Util;

import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.Admin;
import Webserver.com.myserver.Model.Fee;
import Webserver.com.myserver.Model.NomalUser;
import Webserver.com.myserver.Model.User;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Objects;

@Component
public class DataBaseService {
   private final  DataBaseConnect dataBaseConnect;
    public DataBaseService(DataBaseConnect dataBaseConnect) {
        this.dataBaseConnect = dataBaseConnect;
    }
    public void addUserToDataBase(String UserName, String UserPass, String UserId){
        dataBaseConnect.insertUserData(UserName,UserPass,UserId);
    }
    public List<User> SearchNomalUserById(String UserId){
        return  dataBaseConnect.searchNomalUserById(UserId);
    }
    public List<Admin> SearchRootById(String UserId){
        return dataBaseConnect.searchRootById(UserId);
    }
    public boolean IsRoot(String UserId){
        List<Admin> Admins = dataBaseConnect.searchRootById(UserId);
        if(Admins.size()==1){
            return  true;
        }
        return false;
    }
    public List<Fee> GetListFee(){
        return dataBaseConnect.GetListFee();
    }
    public boolean IsNomalUser(String UserId){
        List<User> uses = dataBaseConnect.searchNomalUserById(UserId);
        if (uses.size()==1){
            return  true;
        }
        return false;
    }
    public void updateUserInfo(String UserId, String FamilyId, String PhoneNumber, String DateOfbirth){
        dataBaseConnect.updateUserInfor(UserId,FamilyId,PhoneNumber,DateOfbirth);
    }
    public  boolean IsExistedFee(String feeId){
        List<Fee> fees = dataBaseConnect.searchFeeById(feeId);
        if (fees.size()>0){
            return true;
        }
        return false;
    }
    public List<UserInfo> GetListUserInfo(){
        return dataBaseConnect.ListUserInfor();
    }
    public void UpdateNomalUserPass(String newPass, String UseId){
        dataBaseConnect.UpdateNomalUserPass(UseId,newPass);
    }
    public void InsertNewFee(int money,String FeeName,String FeeId,String dateCreate,String detail){
        dataBaseConnect.insertNewFee(money,FeeName,FeeId,dateCreate,detail);
    }
}
