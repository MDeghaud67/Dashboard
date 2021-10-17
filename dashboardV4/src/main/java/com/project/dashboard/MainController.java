package com.project.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import services.DeezerService;

//@CrossOrigin(origins = "http://localhost:3000")
@Controller
@RequestMapping(path = "")
public class MainController {

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
        //User test = new User("erhytgj,thjg", "jeofhz", "hujkejz");
        //userRepository.save(test);
        return userRepository.findAll();
    }

    @GetMapping(path = "/service/deezer/artist")
    public String Arstist(@RequestParam("value") String value) {
        return DeezerService.Songs(value);
    }
}
