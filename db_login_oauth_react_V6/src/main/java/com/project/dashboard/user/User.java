package com.project.dashboard.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class User {

    //@Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Id @GeneratedValue Integer id;
    private String name;
    private String lastName;
    private String email;
    private String password;

    private AuthenticationProvider authenticationProvider;

    //Session
    private String deezerService;
    private String googleService;
    private String gouvService;
    private String openWeatherService;
    private String nomSession;

    private int nbDeezerService = 0;
    private int nbGoogleService = 0;
    private int nbGouvService = 0;
    private int nbOpenWeatherService = 0;

    private boolean sessionOuverte = false;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public User(String name, String lastName,String email, String password) {
        this.name = name;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public User(String name, String email, AuthenticationProvider provider) {
        this.name = name;
        this.email = email;
        this.authenticationProvider = provider;
    }

    public User() {

    }

    public boolean isSessionOuverte() {
        return sessionOuverte;
    }

    public String getDeezerService() {
        return deezerService;
    }

    public String getGoogleService() {
        return googleService;
    }

    public String getGouvService() {
        return gouvService;
    }

    public String getOpenWeatherService() {
        return openWeatherService;
    }

    public String getNomSession() {
        return nomSession;
    }

    public int getNbDeezerService() {
        return nbDeezerService;
    }

    public int getNbGoogleService() {
        return nbGoogleService;
    }

    public int getNbGouvService() {
        return nbGouvService;
    }

    public int getNbOpenWeatherService() {
        return nbOpenWeatherService;
    }

    public AuthenticationProvider getAuthenticationProvider() {
        return authenticationProvider;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }


    public void setSessionOuverte(boolean sessionOuverte) {
        this.sessionOuverte = sessionOuverte;
    }

    public void setDeezerService(String deezerService) {
        nbDeezerService++;
        this.deezerService += "," + deezerService;
    }

    public void setGoogleService(String googleService) {
        nbGoogleService++;
        this.googleService += "," + googleService;
    }

    public void setGouvService(String gouvService) {
        nbGouvService++;
        this.gouvService += "," + gouvService;
    }

    public void setOpenWeatherService(String openWeatherService) {
        nbOpenWeatherService++;
        this.openWeatherService += "," + openWeatherService;
    }

    public void setNomSession(String nomSession) {
        this.nomSession = nomSession;
    }

    public void setNbDeezerService(int nbDeezerService) {
        this.nbDeezerService = nbDeezerService;
    }

    public void setNbGoogleService(int nbGoogleService) {
        this.nbGoogleService = nbGoogleService;
    }

    public void setNbGouvService(int nbGouvService) {
        this.nbGouvService = nbGouvService;
    }

    public void setNbOpenWeatherService(int nbOpenWeatherService) {
        this.nbOpenWeatherService = nbOpenWeatherService;
    }

    public void setAuthenticationProvider(AuthenticationProvider authenticationProvider) {
        this.authenticationProvider = authenticationProvider;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
