package services;

import org.springframework.stereotype.Controller;
import org.springframework.web.client.RestTemplate;

public class CountryService{
    public String countries(String request) {
        String url = "https://restcountries.eu/rest/v2/name/" + request;

        RestTemplate restTemplate = new RestTemplate();
        String countries = restTemplate.getForObject(url, String.class);

        return countries;
    }
}
