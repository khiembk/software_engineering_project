package Webserver.com.myserver.Util;
import Webserver.com.myserver.Model.Admin;
import Webserver.com.myserver.Model.NomalUser;
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
    public  void insertUserData(String UserName, String UserPassword , String UserId) {
        jdbcTemplate.update(insertUser, UserName, UserPassword,UserId);
    }
    public List<NomalUser> searchNomalUserById(String UserId){
        return jdbcTemplate.query(SEARCH_USER_BY_ID_SQL,new Object[]{UserId}, new BeanPropertyRowMapper<>(NomalUser.class));
    }
    public List<Admin> searchRootById(String UserId){
        return jdbcTemplate.query(SEARCH_ROOT_BY_ID_SQL,new Object[]{UserId}, new BeanPropertyRowMapper<>(Admin.class));
    }
    public void UpdateNomalUserPass(String UserId, String newPass){
        jdbcTemplate.update(UPDATE_PASS_USER_BY_ID_SQL,newPass,UserId);
    }
}
