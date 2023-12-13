package Webserver.com.myserver.HelperFunction;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;
import javax.mail.MessagingException;

public class EmailGenerator {
    public static void sendEmailWithTemplate(String recipientEmail, String subject, String template) {
        // Sender's credentials
        String senderEmail = "devbachkhoak66@gmail.com";
        String senderPassword = "backkhoahanoi";

        // SMTP server configuration
        String smtpHost = "smtp.gmail.com";
        String smtpPort = "587";

        // Email content
        String emailBody = "<html><body>" +
                "<h1>Hello!</h1>" +
                "<p>This is the content of the email template.</p>" +
                "<p>You can customize it with your own HTML content.</p>" +
                "</body></html>";

        try {
            // Set the SMTP properties
            Properties props = new Properties();
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");
            props.put("mail.smtp.host", smtpHost);
            props.put("mail.smtp.port", smtpPort);

            // Create a session with the SMTP server
            Session session = Session.getInstance(props, new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(senderEmail, senderPassword);
                }
            });

            // Create the email message
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress(senderEmail));
            message.setRecipient(Message.RecipientType.TO, new InternetAddress(recipientEmail));
            message.setSubject(subject);
            message.setContent(emailBody, "text/html");

            // Send the email
            Transport.send(message);
            System.out.println("Email sent successfully!");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        String recipientEmail = "trankhiem2003@gmail.com";
        String subject = "Testing email with template";

        // You can replace the template with the actual content of your email
        String template = "<html><body>" +
                "<h1>Hello!</h1>" +
                "<p>This is the content of the email template.</p>" +
                "<p>You can customize it with your own HTML content.</p>" +
                "</body></html>";

        sendEmailWithTemplate(recipientEmail, subject, template);
    }
}
