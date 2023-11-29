package Webserver.com.myserver.Util;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
@Component
public class DataBaseConnect {
    private final JdbcTemplate jdbcTemplate;
    public DataBaseConnect(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    String  insertUser = "INSERT INTO login (UserName, UserPassword, UserId) VALUES (?, ?,?)";
    public  void insertUserData(String UserName, String UserPassword , String UserId) {

        jdbcTemplate.update(insertUser, UserName, UserPassword,UserId);
    }
}
