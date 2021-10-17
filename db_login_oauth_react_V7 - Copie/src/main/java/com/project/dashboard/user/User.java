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

    private int nbDeezerService = 0;
    private int nbGoogleService = 0;
    private int nbGouvService = 0;
    private int nbOpenWeatherService = 0;

    private String dataDeezer = "";
    private String dataWeather = "";
    private String dataGouv = "";

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

    public String getDataDeezer() {
        return dataDeezer;
    }

    public String getDataWeather() {
        return dataWeather;
    }

    public String getDataGouv() {
        return dataGouv;
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

    public void setDataDeezer(String dataDeezer) {

        if (this.dataDeezer.length() <= 2) {
            this.dataDeezer = "[" + dataDeezer + "]";
        } else {
            int last = this.dataDeezer.lastIndexOf("\"");
            StringBuilder sb = new StringBuilder(this.dataDeezer);
            sb.insert(last + 2, "," + dataDeezer);
            this.dataDeezer = sb.toString();
        }
    }

    public void delDataDeezer(String dataDeezer) {

        this.dataDeezer = dataDeezer;
    }

    public void setDataWeather(String dataWeather) {
        this.dataWeather = dataWeather;
    }

    public void setDataGouv(String dataGouv) {
        this.dataGouv = dataGouv;
    }
}
