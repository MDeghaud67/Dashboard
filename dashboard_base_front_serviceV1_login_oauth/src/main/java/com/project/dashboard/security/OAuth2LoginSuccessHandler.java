package com.project.dashboard.security;

import com.project.dashboard.repository.UserRepository;
import com.project.dashboard.user.AuthentificationProvider;
import com.project.dashboard.user.User;
import lombok.SneakyThrows;
import org.apache.tomcat.util.compat.JrePlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Autowired
    private UserRepository userService;

    @SneakyThrows
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String email = oAuth2User.getEmail();
        String name = oAuth2User.getName();

        User user = userService.findByEmail(email);

        if (user == null) {
            // register as a new user
            user = new User(name, email, AuthentificationProvider.GOOGLE);
            userService.save(user);
        } else {
            // update existing user
            user.setName(name);
            user.setAuthentificationProvider(AuthentificationProvider.GOOGLE);
            userService.save(user);
        }

        System.out.println("Customer's email: " + email);
        response.sendRedirect("/home");
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
