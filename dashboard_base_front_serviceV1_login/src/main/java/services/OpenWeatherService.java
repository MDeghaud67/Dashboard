package services;

import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class OpenWeatherService {
    public String meteo(String city) {
        String url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + "b531638b2a006e43ac3789eefd126049";

        RestTemplate restTemplate = new RestTemplate();
        String meteo = restTemplate.getForObject(url, String.class);


        return meteo;
    }
}
