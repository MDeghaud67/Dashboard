package services;

import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class DeezerService {

    public String Songs(String artist) {
        String url = "https://api.deezer.com/search?q=" + artist;

        RestTemplate restTemplate = new RestTemplate();
        String songs = restTemplate.getForObject(url, String.class);

        return songs;
    }
}