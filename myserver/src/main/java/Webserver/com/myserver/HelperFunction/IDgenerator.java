package Webserver.com.myserver.HelperFunction;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class IDgenerator {
    public static String GenId(String input){
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDate = currentDate.format(formatter);
        return formattedDate+"_"+input+"_"+getAutoIncrementedNumber();
    }
    private static int callCounter = 0;

    public static synchronized int getAutoIncrementedNumber() {
        return ++callCounter;
    }

}
