package com.project.dashboard.security;

import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user =  super.loadUser(userRequest);

        System.out.println("user : " + user);

        OAuth2AccessToken tok = userRequest.getAccessToken();
        System.out.println("token : " + tok);

        ClientRegistration clientRegistration = userRequest.getClientRegistration();
        System.out.println("client registration : " + clientRegistration);

        return new CustomOAuth2User(user);
    }
}
