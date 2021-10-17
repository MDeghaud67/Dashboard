package com.project.dashboard.security;

import com.project.dashboard.repository.UserRepository;
import com.project.dashboard.user.AuthenticationProvider;
import com.project.dashboard.user.User;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
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

        String loginName = oAuth2User.getLogin();
        System.out.println(loginName);

        User user = userService.findByEmail(email);

        if (user == null) {
            // register as a new user
            user = new User(name, email, AuthenticationProvider.GOOGLE);
        } else {
            // update existing user
            user.setName(name);
            user.setAuthenticationProvider(AuthenticationProvider.GOOGLE);
        }
        userService.save(user);

        String session = request.getRequestedSessionId();
        //String session = request.getPathInfo();

        System.out.println("session id : " + session);

        System.out.println("Customer's email: " + email);
        response.sendRedirect("/home");
        super.onAuthenticationSuccess(request, response, authentication);
    }
}
