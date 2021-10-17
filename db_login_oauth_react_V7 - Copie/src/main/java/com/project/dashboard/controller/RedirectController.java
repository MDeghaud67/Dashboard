package com.project.dashboard.controller;

import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController {
    @GetMapping("/private")
    public String redirectToRoot() {
        return "redirect:/";
    }
}
