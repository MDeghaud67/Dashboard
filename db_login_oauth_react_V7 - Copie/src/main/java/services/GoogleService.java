package services;

import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class GoogleService {
    public String calendarEvent(String calendarId) {
        String url = "https://www.googleapis.com/calendar/v3/calendars/" + calendarId/* + "events"*/;

        RestTemplate restTemplate = new RestTemplate();
        String metadata = restTemplate.getForObject(url, String.class);

        return metadata;
    }
}
