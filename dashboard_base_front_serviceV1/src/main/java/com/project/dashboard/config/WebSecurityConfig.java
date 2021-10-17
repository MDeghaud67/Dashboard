package com.project.dashboard;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.social.security.SpringSocialConfigurer;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	protected void configure() throws Exception {
		// Pages do not require login
        http.authorizeRequests().antMatchers("/", "/signup", "/login", "/logout").permitAll();
 
        http.authorizeRequests().antMatchers("/userInfo").access("hasRole('" + AppRole.ROLE_USER + "')");
        
     // For ADMIN only.
        http.authorizeRequests().antMatchers("/admin").access("hasRole('" + AppRole.ROLE_ADMIN + "')");
        
     // Form Login config
        http.authorizeRequests().and().formLogin()
	     // Submit URL of login page.
	        .loginProcessingUrl("/j_spring_security_check") // Submit URL
	        .loginPage("/login")//
	        .defaultSuccessUrl("/userInfo")//
	        .failureUrl("/login?error=true")//
	        .usernameParameter("username")//
	        .passwordParameter("password");
        
     // Logout Config
        http.authorizeRequests().and().logout().logoutUrl("/logout").logoutSuccessUrl("/");
	}
}
