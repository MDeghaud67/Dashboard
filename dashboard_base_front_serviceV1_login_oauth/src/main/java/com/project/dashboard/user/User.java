package com.project.dashboard.user;

import com.project.dashboard.repository.UserRepository;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.lang.reflect.InvocationTargetException;
import java.util.Properties;

@Entity
public class User {

    //@Id
    //@GeneratedValue(strategy = GenerationType.AUTO)
    @Id @GeneratedValue Integer id;
    private String name;
    private String email;
    private String password;

    private AuthentificationProvider authentificationProvider;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public User(String name, String email, AuthentificationProvider provider) {
        this.name = name;
        this.email = email;
        this.authentificationProvider = provider;
    }

    public User() {

    }

    public AuthentificationProvider getAuthentificationProvider() {
        return authentificationProvider;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setAuthentificationProvider(AuthentificationProvider authentificationProvider) {
        this.authentificationProvider = authentificationProvider;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
