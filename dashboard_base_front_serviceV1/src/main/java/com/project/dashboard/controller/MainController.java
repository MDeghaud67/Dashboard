package com.project.dashboard.controller;

import com.project.dashboard.repository.UserRepository;
import com.project.dashboard.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.DeezerService;
import services.GoogleService;
import services.GouvService;
import services.OpenWeatherService;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(path = "")
public class MainController {

    DeezerService DeezerService = new DeezerService();
    OpenWeatherService OpenWeatherService = new OpenWeatherService();
    GouvService GouvService = new GouvService();
    GoogleService GoogleService = new GoogleService();

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/add")
    public @ResponseBody String addNewUser(@RequestParam String name, @RequestParam String email, @RequestParam String password) {

        User n = new User(name, email, password);
        userRepository.save(n);
        return "Saved";
    }

    @GetMapping(path="/all")
    public @ResponseBody Iterable<User> getAllUsers() {
        // This returns a JSON or XML with the users
        return userRepository.findAll();
    }

    @RequestMapping(path = "/service/deezer/artist")
    public @ResponseBody String Artist(@RequestParam("value") String value) {

        return DeezerService.Songs(value);
    }

    @RequestMapping(path = "/service/weather")
    public @ResponseBody String MeteoCity(@RequestParam("city") String city) {

        return OpenWeatherService.Meteo(city);
    }

    @RequestMapping(path = "/service/gouv")
    public @ResponseBody String Ferie(String zone, String annee) {

        return GouvService.JourFerie(zone, annee);
    }

    @RequestMapping(path = "/service/calendar")
    public @ResponseBody String Calendar(String calendarId) {

        return GoogleService.Calendar(calendarId);
    }

    @GetMapping(path="/")
    public String Index() {
        return "index";
    }
}
