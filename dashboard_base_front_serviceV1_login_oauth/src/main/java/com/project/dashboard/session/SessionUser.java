package com.project.dashboard.session;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class SessionUser {

    @Id @GeneratedValue Integer id;
    private String deezerService;
    private String googleService;
    private String gouvService;
    private String openWeatherService;
    private String nomSession;

    private int nbDeezerService = 0;
    private int nbGoogleService = 0;
    private int nbGouvService = 0;
    private int nbOpenWeatherService = 0;

    public SessionUser(String deezerService, String googleService, String gouvService, String openWeatherService) {

        if (deezerService == null) {
            this.deezerService = "";
        } else {
            this.deezerService = deezerService;
        }

        if (googleService == null) {
            this.googleService = "";
        } else {
            this.googleService = googleService;
        }

        if (gouvService == null) {
            this.gouvService = "";
        } else {
            this.gouvService = gouvService;
        }

        if (openWeatherService == null) {
            this.openWeatherService = "";
        } else {
            this.openWeatherService = openWeatherService;
        }
    }

    public SessionUser() {

    }

    public SessionUser(String nomSession) {
        this.nomSession = nomSession;
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

    public Integer getId() {
        return id;
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


    public void setNomSession(String nomSession) {
        this.nomSession = nomSession;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDeezerService(String deezerService) {
        nbDeezerService++;
        this.deezerService += deezerService;
    }

    public void setGoogleService(String googleService) {
        nbGoogleService++;
        this.googleService += googleService;
    }

    public void setGouvService(String gouvService) {
        nbGouvService++;
        this.gouvService += gouvService;
    }

    public void setOpenWeatherService(String openWeatherService) {
        nbOpenWeatherService++;
        this.openWeatherService += openWeatherService;
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
}
