package com.project.dashboard.controller;

import com.project.dashboard.repository.UserRepository;
import com.project.dashboard.security.CustomOAuth2User;
import com.project.dashboard.user.AuthenticationProvider;
import com.project.dashboard.user.CustomUserDetails;
import com.project.dashboard.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import services.DeezerService;
import services.GoogleService;
import services.GouvService;
import services.OpenWeatherService;

import java.util.List;

@RestController
@RequestMapping(path = "/home")
public class MainController {

    DeezerService DeezerService = new DeezerService();
    OpenWeatherService OpenWeatherService = new OpenWeatherService();
    GouvService GouvService = new GouvService();
    GoogleService GoogleService = new GoogleService();

    private User user;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/register")
    public User addNewUser(@RequestBody User registreUser) {

        if (userRepository.findByName(registreUser.getName()) == null) {
            System.out.println("enregistrement");

            User n = new User(registreUser.getName(), registreUser.getLastName(), registreUser.getEmail(), registreUser.getPassword());

            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String encodedPassword = encoder.encode(n.getPassword());
            n.setPassword(encodedPassword);
            n.setAuthenticationProvider(AuthenticationProvider.LOCAL);

            userRepository.save(n);
            return n;
        } else {
            System.out.println("erreur");
            // Erreur user déjà existant
            return null;
        }
    }

    @GetMapping(path="/list_users")// Requête de base
    List<User> list_users() { //String
        return userRepository.findAll();
    }

    @RequestMapping(path = "/service/deezer/artist")
    public @ResponseBody String artist(@RequestParam("value") String value) {

        this.user.setDeezerService(value);
        this.userRepository.save(user);

        return DeezerService.songs(value);
    }

    @RequestMapping(path = "/service/weather")
    public String meteoCity(@RequestParam("city") String city) {

        System.out.println("weather dans la ville " + city);
        this.user.setOpenWeatherService(city);
        this.userRepository.save(user);
        return OpenWeatherService.meteo(city);
    }

    @RequestMapping(path = "/service/gouv")
    public String ferie(@RequestParam("annee") String annee) {

        System.out.println("jour férié année: " + annee);
        this.user.setGouvService(annee);
        this.userRepository.save(user);
        return GouvService.jourFerie(annee);
    }

    @RequestMapping(path = "/service/calendar")
    public @ResponseBody String calendar(@RequestParam("calendarId") String calendarId) {

        System.out.println("calendarId: " + calendarId);

        this.user.setGoogleService(calendarId);
        this.userRepository.save(user);
        return GoogleService.calendarEvent(calendarId);
    }

    @RequestMapping(path = "/home")
    public @ResponseBody User home(@AuthenticationPrincipal CustomUserDetails user,@AuthenticationPrincipal  CustomOAuth2User oAuth2User) {

        // user local
        if (user != null) {
            System.out.println("user: " + user.getUsername());
            this.user = userRepository.findByName(user.getUsername());
            return userRepository.findByName(user.getUsername());
        }

        System.out.println("getAuthorities: " + oAuth2User.getAuthorities());

        // user oauth
        if (oAuth2User != null) {
            System.out.println("oAuth2User:" + oAuth2User.getName());
            if (userRepository.findByName(oAuth2User.getName()) != null) {
                this.user = userRepository.findByName(oAuth2User.getName());
                return this.user;
            } else {
                User n = new User(oAuth2User.getName(), oAuth2User.getEmail(), AuthenticationProvider.GOOGLE);
                userRepository.save(n);
                this.user = n;
                return userRepository.findByName(n.getName());
            }
        }
        return null;
    }

    @PutMapping(path = "/sauv/deezer")
    public void sauvDeezerDb(@RequestBody String dataDeezer) {

        System.out.println("sauvegarde data deezer " + dataDeezer);
        //System.out.println(dataDeezer.getName());

        this.user.setDataDeezer(dataDeezer);

        userRepository.save(this.user);
        //this.user = dataDeezer;
        //this.userRepository.save(this.user);
        //return this.user.getDataDeezer();
    }

    @PutMapping(path = "/delete/deezer")
    public void deleteDeezerDb(@RequestBody String dataDeezer) {

        System.out.println("delete data deezer et remplacement par: " + dataDeezer);

        this.user.delDataDeezer(dataDeezer);
        userRepository.save(this.user);

    }
}

