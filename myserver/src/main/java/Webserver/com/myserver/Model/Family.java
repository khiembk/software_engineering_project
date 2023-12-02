package Webserver.com.myserver.Model;
public class Family {
    private  String FamimyId;
    private String Address;

    public String getAddress() {
        return Address;
    }

    public String getFamimyId() {
        return FamimyId;
    }

    public void setFamimyId(String famimyId) {
        FamimyId = famimyId;
    }

    public void setAddress(String address) {
        Address = address;
    }
}
