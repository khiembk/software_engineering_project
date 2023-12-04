package Webserver.com.myserver.Util;
import Webserver.com.myserver.HelperObject.UserInfo;
import Webserver.com.myserver.Model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Component
public class DataBaseConnect {
    private final JdbcTemplate jdbcTemplate;
    public DataBaseConnect(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    String  insertUser = "INSERT INTO login (UserName, UserPassword, UserId) VALUES (?, ?,?)";
    private static final String SEARCH_USER_BY_ID_SQL = "SELECT * FROM login WHERE UserId = ?";
    private static final String UPDATE_PASS_USER_BY_ID_SQL = "UPDATE login SET UserPassword = ? WHERE UserId = ?";
    private static final String SEARCH_ROOT_BY_ID_SQL = "SELECT * FROM admin WHERE UserId = ?";
    private static final String INSERT_FEE_BY_ID_SQL = "INSERT INTO fee (Money,FeeName, FeeId, DateCreate, Detail,FamilyId, IsComplete) VALUES (?,?,?,?,?,?,?)";
    private static final String SEARCH_FEE_BY_ID_SQL = "SELECT * FROM fee WHERE FeeId = ?";
    private static final String GET_lIST_FEE_SQL = "SELECT * FROM fee";

    private static final String GET_lIST_FAMILY_SQL = "SELECT * FROM family";
    private static final String GET_lIST_FAMILY_BY_ID_SQL = "SELECT * FROM family WHERE FamilyId = ?";
    private static final String UPDATE_FEE_STATUS_SQL = "UPDATE fee SET IsComplete = ? WHERE FeeId = ?";
    private static final String GET_lIST_FEE_BY_FAMILY_ID_SQL = "SELECT * FROM fee WHERE FamilyId = ?";
    private static final String GET_LIST_FEE_BY_FAMILY_ID_AND_NOT_COMPLETE_SQL =
            "SELECT * FROM fee WHERE FamilyId = ? AND IsComplete = 0";
    private static final String GET_LIST_FEE_NOT_COMPLETE_SQL =
            "SELECT * FROM fee WHERE  IsComplete = 0";
    private static final String GET_LIST_FEE_COMPLETE_SQL =
            "SELECT * FROM fee WHERE  IsComplete = 1";
    private static final String GET_LIST_FEE_BY_FAMILY_ID_AND_COMPLETE_SQL =
            "SELECT * FROM fee WHERE FamilyId = ? AND IsComplete = 1";
    private static final String GET_lIST_USER_SQL = "SELECT * FROM nomal_user_info";

    private static final String GET_lIST_USER_BY_ID_SQL = "SELECT * FROM nomal_user_info WHERE UserId = ?";
    private  static  final  String INSERT_USER_INFO_NAME_ID = "INSERT INTO nomal_user_info (UserName, UserId) VALUES (?, ?)";

    private  static  final  String INSERT_NEW_FAMILY = "INSERT INTO family (FamilyId , OwnerName, Address) VALUES ( ?, ?, ?)";
    private  static  final  String UPDATE_USER_INFO_BY_ID = "UPDATE nomal_user_info SET FamilyId = ?, PhoneNumber = ? , DateOfBirth = ?  WHERE UserId = ?";
    public  void insertUserData(String UserName, String UserPassword , String UserId) {
        jdbcTemplate.update(insertUser, UserName, UserPassword,UserId);
        jdbcTemplate.update(INSERT_USER_INFO_NAME_ID,UserName,UserId);
    }
    public void InsertNewFamily(String FammilyId, String OwnerName, String Address){
        jdbcTemplate.update(INSERT_NEW_FAMILY,FammilyId,OwnerName,Address);
    }
    public List<Family> getListFamily(){
        return jdbcTemplate.query(GET_lIST_FAMILY_SQL,new BeanPropertyRowMapper<>(Family.class));
    }
    public List<Family> getListFamilyById(String FamilyId){
        return jdbcTemplate.query(GET_lIST_FAMILY_BY_ID_SQL,new Object[]{FamilyId},new BeanPropertyRowMapper<>(Family.class));
    }
    public List<Fee> getListFeeByFamilyIdAndNotComplete(String familyId) {
        return jdbcTemplate.query(GET_LIST_FEE_BY_FAMILY_ID_AND_NOT_COMPLETE_SQL,
                new Object[]{familyId},
                new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<Fee> getListFeeByFamilyIdAndComplete(String familyId) {
        return jdbcTemplate.query(GET_LIST_FEE_BY_FAMILY_ID_AND_COMPLETE_SQL,
                new Object[]{familyId},
                new BeanPropertyRowMapper<>(Fee.class));
    }


    public void CompleteFeeById(String FeeId){
        jdbcTemplate.update(UPDATE_FEE_STATUS_SQL,1,FeeId);
    }
    public void  updateUserInfor(String UserId, String FalimyId, String PhoneNumber, String DateOfbirth){
        jdbcTemplate.update(UPDATE_USER_INFO_BY_ID,FalimyId,PhoneNumber,DateOfbirth,UserId);
    }
    public void insertNewFee( int money , String FeeName, String FeeId , String DateCreate ,String Detail,String FamilyId){
        jdbcTemplate.update(INSERT_FEE_BY_ID_SQL,money,FeeName,FeeId,DateCreate,Detail,FamilyId,0);
    }
    public List<Fee> searchFeeById(String feeId){
        return jdbcTemplate.query(SEARCH_FEE_BY_ID_SQL,new Object[]{feeId},new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<UserInfo> ListUserInfor(){
        return  jdbcTemplate.query(GET_lIST_USER_SQL,new BeanPropertyRowMapper<>(UserInfo.class));
    }

    public List<UserInfo> ListUserInforById(String UserId){
        return  jdbcTemplate.query(GET_lIST_USER_BY_ID_SQL,new Object[]{UserId},new BeanPropertyRowMapper<>(UserInfo.class));
    }
    public List<Fee> GetListFee(){
       return  jdbcTemplate.query(GET_lIST_FEE_SQL,new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<Fee> GetListFeeComplete(){
        return  jdbcTemplate.query(GET_LIST_FEE_COMPLETE_SQL,new BeanPropertyRowMapper<>(Fee.class));
    }
    public List<Fee> GetListFeeNotComplete(){
        return  jdbcTemplate.query(GET_LIST_FEE_NOT_COMPLETE_SQL,new BeanPropertyRowMapper<>(Fee.class));
    }

    public List<Fee> GetListFeeByFamilyId(String FamilyId){
        return  jdbcTemplate.query(GET_lIST_FEE_BY_FAMILY_ID_SQL,new Object[]{FamilyId},new BeanPropertyRowMapper<>(Fee.class));
    }

    public List<User> searchNomalUserById(String UserId){
        return jdbcTemplate.query(SEARCH_USER_BY_ID_SQL,new Object[]{UserId}, new BeanPropertyRowMapper<>(User.class));
    }
    public List<Admin> searchRootById(String UserId){
        return jdbcTemplate.query(SEARCH_ROOT_BY_ID_SQL,new Object[]{UserId}, new BeanPropertyRowMapper<>(Admin.class));
    }
    public void UpdateNomalUserPass(String UserId, String newPass){
        jdbcTemplate.update(UPDATE_PASS_USER_BY_ID_SQL,newPass,UserId);
    }
}
