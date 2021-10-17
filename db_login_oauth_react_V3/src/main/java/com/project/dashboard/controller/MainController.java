package com.project.dashboard.controller;

import com.project.dashboard.repository.UserRepository;
import com.project.dashboard.security.CustomOAuth2User;
import com.project.dashboard.user.AuthenticationProvider;
import com.project.dashboard.user.CustomUserDetails;
import com.project.dashboard.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    @PostMapping(path = "/add")
    public @ResponseBody String addNewUser(@RequestParam String name, @RequestParam String email, @RequestParam String password) {

        User n = new User(name, email, password);
        userRepository.save(n);
        return "Saved";
    }

    //@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/list_users")// Requête de base
    List<User> list_users(Principal principal) { //String
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
        System.out.println(city);
        //this.user.setOpenWeatherService(city);
        //this.userRepository.save(user);
        return OpenWeatherService.meteo(city);
    }

    @RequestMapping(path = "/service/gouv")
    public @ResponseBody String ferie(String zone, String annee) {

        this.user.setGouvService(zone + "&" + annee);
        this.userRepository.save(user);
        return GouvService.jourFerie(zone, annee);
    }

    @RequestMapping(path = "/service/calendar")
    public @ResponseBody String calendar(String calendarId) {

        this.user.setGoogleService(calendarId);
        this.userRepository.save(user);
        return GoogleService.calendarEvent(calendarId);
    }

    @RequestMapping(path = "/home")
    public User home(@AuthenticationPrincipal CustomUserDetails user,@AuthenticationPrincipal  OAuth2User oAuth2User) {

        if (user != null) {
            System.out.println("user:" + user);
            this.user = userRepository.findByName(user.getUsername());
            return userRepository.findByName(user.getUsername());
        } else if (oAuth2User != null) {
            System.out.println("oAuth2User:" + oAuth2User);
            this.user = userRepository.findByName(oAuth2User.getName());
            return userRepository.findByName(oAuth2User.getName());
        }
        return null;
    }

    @GetMapping(path = "/register") //click sur registration
    public String showSignupForm(Model model) {
        model.addAttribute("user", new User());
        return "signup_form"; //renvoi sur la page d'inscription
    }

    @PostMapping("/process_registration") //depuis le form de sign_up.html
    public String processRegistration(User user) {
        this.user = user;
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        user.setAuthenticationProvider(AuthenticationProvider.LOCAL);
        userRepository.save(user);

        return "register_success";
    }

    /*
    @GetMapping(path = "/")
    public String accueilDash() {
        return "accueil";
    }

     */
}

