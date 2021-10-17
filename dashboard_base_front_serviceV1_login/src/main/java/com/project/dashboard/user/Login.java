package com.project.dashboard.user;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@Controller
@WebServlet("/signin")
public class Login extends HttpServlet {

    /*
    @RequestMapping(path = "/signinForm")
    public void sign(HttpServletRequest request, HttpServletResponse reposne) throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        System.out.println(email);
        System.out.println(password);
    }

     */
}
