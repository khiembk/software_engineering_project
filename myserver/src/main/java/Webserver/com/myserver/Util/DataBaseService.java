package Webserver.com.myserver.Util;

import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.*;
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
    public List<Fee> GetListFeeComplete(){
        return dataBaseConnect.GetListFeeComplete();
    }
    public List<Fee> GetListFeeNotComplete(){
        return dataBaseConnect.GetListFeeNotComplete();
    }

    public List<Fee> GetListFeeByFamilyId(String FamilyId){

        return dataBaseConnect.GetListFeeByFamilyId(FamilyId);
    }
    public List<Fee> GetListFeeByFamilyIdNotComplete(String FamilyId){
        return dataBaseConnect.getListFeeByFamilyIdAndNotComplete(FamilyId);
    }
    public List<Fee> GetListFeeByFamilyIdComplete(String FamilyId){
        return dataBaseConnect.getListFeeByFamilyIdAndComplete(FamilyId);
    }
    public List<Admin> GetListRootById(String UserId){
        return dataBaseConnect.searchRootById(UserId);
    }
    public void UpdatePassRoot(String UserId,String NewPass){
        dataBaseConnect.UpdateRootPass(NewPass,UserId);
    }
    public boolean IsNomalUser(String UserId){
        List<User> uses = dataBaseConnect.searchNomalUserById(UserId);
        if (uses.size()==1){
            return  true;
        }
        return false;
    }
    public List<UserInfo> GetListUserInfoByFamilyId(String familyId){
        return dataBaseConnect.ListUserInforByFamilyId(familyId);
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
    public List<Family> GetListFamily(){
        return dataBaseConnect.getListFamily();
    }
    public void InsertNewFamily(String FamilyId, String OwnerName, String Address){
        dataBaseConnect.InsertNewFamily(FamilyId,OwnerName,Address);
    }
    public boolean IsExistedFamily(String FamilyId){
        List<Family> families= dataBaseConnect.getListFamilyById(FamilyId);
        if (families.size() > 0){
            return true;
        }
        return false;
    }
    public List<Fee> GetFeeById(String feeId){
        return dataBaseConnect.searchFeeById(feeId);
    }
    public List<UserInfo> GetListUserInfo(){
        return dataBaseConnect.ListUserInfor();
    }
    public List<UserInfo> GetListUserInfoById(String UserId){
        return dataBaseConnect.ListUserInforById(UserId);
    }
    public void UpdateNomalUserPass(String newPass, String UseId){
        dataBaseConnect.UpdateNomalUserPass(UseId,newPass);
    }
    public void InsertNewFee(int money,String FeeName,String FeeId,String dateCreate,String detail,String FamilyId){
        dataBaseConnect.insertNewFee(money,FeeName,FeeId,dateCreate,detail,FamilyId);
    }
    public void CompleteFeeById(String FeeId){
        dataBaseConnect.CompleteFeeById(FeeId);
    }
    public void DeleteUserById(String UserId){
        dataBaseConnect.DeleteNomalUserById(UserId);
    }
}
