package Webserver.com.myserver.Model;

import java.util.Date;

public class Fee {
    private int Money;
    private String FeeId;
    private  String FeeName;
    private Date DateCreate;
    private String Detail;

    public void setDateCreate(Date dateCreate) {
        DateCreate = dateCreate;
    }

    public Date getDateCreate() {
        return DateCreate;
    }

    public int getMoney() {
        return Money;
    }

    public String getFeeId() {
        return FeeId;
    }

    public String getDetail() {
        return Detail;
    }

    public String getFeeName() {
        return FeeName;
    }

    public void setFeeId(String feeId) {
        FeeId = feeId;
    }

    public void setDetail(String detail) {
        Detail = detail;
    }

    public void setFeeName(String feeName) {
        FeeName = feeName;
    }

    public void setMoney(int money) {
        Money = money;
    }

}
