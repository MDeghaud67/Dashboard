package com.project.dashboard.controller;

import com.project.dashboard.repository.UserRepository;
import com.project.dashboard.user.User;
import org.apache.catalina.connector.Request;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import services.DeezerService;
import services.GoogleService;
import services.GouvService;
import services.OpenWeatherService;

import java.security.Principal;
import java.util.List;


//@CrossOrigin(origins = "http://localhost:3000") //com avec le front
@Controller
//@RequestMapping(path = "")
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

    @GetMapping(path="/list_users")//all
    public String viewUsersList(Model model) {
        List<User> listUsers = userRepository.findAll();
        model.addAttribute("listUsers", listUsers);

        return "users";
    }

    @RequestMapping(path = "/service/deezer/artist")
    public @ResponseBody String artist(@RequestParam("value") String value) {

        return DeezerService.songs(value);
    }

    @RequestMapping(path = "/service/weather")
    public @ResponseBody String meteoCity(@RequestParam("city") String city) {

        System.out.println(OpenWeatherService.getClass().getName());
        return OpenWeatherService.meteo(city);
    }

    @RequestMapping(path = "/service/gouv")
    public @ResponseBody String ferie(String zone, String annee) {

        return GouvService.jourFerie(zone, annee);
    }

    @RequestMapping(path = "/service/calendar")
    public @ResponseBody String calendar(String calendarId) {

        return GoogleService.calendarEvent(calendarId);
    }

    @RequestMapping(path = "")
    public String home() {
        return "home";
    }

    @GetMapping(path = "/register") //click sur registration
    public String showSignupForm(Model model) {
        model.addAttribute("user", new User());
        return "signup_form"; //renvoi sur la page d'inscription
    }

    @PostMapping("/process_registration") //depuis le form de sign_up.html
    public String processRegistration(User user) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        userRepository.save(user);
        return "register_success";
    }

    /*
    @PostMapping("/logout")
    public String logout(Principal principal) {
        String name = principal.getName();
        return "home";
    }

     */

    /*
    @GetMapping(path="/")
    public String Index() {
        return "index";
    }

     */

    /*
    @RequestMapping(path = "/login/connection")
    public String connection(@RequestParam("pEmail") String pEmail, @RequestParam("pPassword") String pPassword) {

        String email = pEmail;
        String password = pPassword;

        if (userRepository.findByEmail(email) || userRepository.findByPassword(password)) {
            // pas de compte dans la db
            return "singin"; // redirection vers la page d'inscritpion
        } else {
            return "home"; // logger, redirection vers la page principal dashboard
        }
    }

    @RequestMapping(path = "/signin")
    public String signin(String name, String email, String password) { // a voir @RequestParam

        User n = new User(name, email, password);
        userRepository.save(n);
        return "home"; // enregistrer, redirection vers la page principal
    }

     */

    /*
    @RequestMapping(path = "/signin")
    public void signin(String name, String email, String password) { // a voir @RequestParam
        User n = new User(name, email, password);
        userRepository.save(n);
        //return "home"; // enregistrer, redirection vers la page principal
    }

     */
}

