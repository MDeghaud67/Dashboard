package services;

import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

@Controller
public class GouvService {
    public String jourFerie(String annee) {
        String url = "https://calendrier.api.gouv.fr/jours-feries/metropole/" + annee + ".json";

        RestTemplate restTemplate = new RestTemplate();
        String list = restTemplate.getForObject(url, String.class);


        return list;
    }
}
