package Webserver.com.myserver.Model;

import java.util.Date;

public class Fee {
    private int Money;
    private String FeeId;
    private  String FeeName;
    private String DateCreate;
    private String Detail;
    private String FamilyId;
    private  boolean IsComplete;

    public void setDateCreate(String dateCreate) {
        DateCreate = dateCreate;
    }

    public String getDateCreate() {
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

    public String getFamilyId() {
        return FamilyId;
    }

    public void setFamilyId(String familyId) {
        FamilyId = familyId;
    }

    public boolean isComplete() {
        return IsComplete;
    }

    public void setComplete(boolean complete) {
        IsComplete = complete;
    }
}
