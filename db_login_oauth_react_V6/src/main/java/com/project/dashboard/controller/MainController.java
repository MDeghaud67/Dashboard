package com.project.dashboard.controller;

import com.project.dashboard.repository.UserRepository;
import com.project.dashboard.security.CustomOAuth2User;
import com.project.dashboard.user.AuthenticationProvider;
import com.project.dashboard.user.CustomUserDetails;
import com.project.dashboard.user.User;
import org.apache.catalina.Group;
import org.aspectj.weaver.ast.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.StreamingHttpOutputMessage;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.ServletWebRequest;
import services.DeezerService;
import services.GoogleService;
import services.GouvService;
import services.OpenWeatherService;

import javax.servlet.http.HttpServletRequest;
import javax.swing.*;
import java.io.Serializable;
import java.net.URI;
import java.net.URISyntaxException;
import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@RequestMapping("/")
//@CrossOrigin(origins = "http://localhost:3000")//com avec le front
//@Controller
@RestController
//@SessionAttributes("user") //pas utilisé
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
    public String ferie(@RequestParam("zone") String zone, @RequestParam("annee") String annee) {

        this.user.setGouvService(zone + "&" + annee);
        this.userRepository.save(user);
        return GouvService.jourFerie(zone, annee);
    }

    @RequestMapping(path = "/service/calendar")
    public @ResponseBody String calendar(@RequestParam("calendarId") String calendarId) {

        System.out.println("calendarId: " + calendarId);

        this.user.setGoogleService(calendarId);
        this.userRepository.save(user);
        return GoogleService.calendarEvent(calendarId);
    }

    @RequestMapping(path = "/home")
    public User home(@AuthenticationPrincipal CustomUserDetails user,@AuthenticationPrincipal  CustomOAuth2User oAuth2User) {

        // user local
        if (user != null) {
            System.out.println("user:" + user.getUsername());
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
}

