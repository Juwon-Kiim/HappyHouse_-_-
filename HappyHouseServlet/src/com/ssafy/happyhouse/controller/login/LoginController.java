package com.ssafy.happyhouse.controller.login;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ssafy.happyhouse.controller.Controller;
import com.ssafy.happyhouse.dao.UserDao;
import com.ssafy.happyhouse.dao.UserDaoImpl;
import com.ssafy.happyhouse.dto.User;
import com.ssafy.happyhouse.service.LoginService;
import com.ssafy.happyhouse.service.LoginServiceImpl;

public class LoginController implements Controller {
	
	private LoginService service = new LoginServiceImpl();

	@Override
	public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		if(request.getMethod().equals("POST")) {
			String userID = request.getParameter("userID");
			String userPW = request.getParameter("userPW");
			
			User user = service.login(userID, userPW);
			
			if(user != null) {
				HttpSession session = request.getSession();
				session.setAttribute("loginInfo", user);
				response.sendRedirect("/");
			}
		} else {
			response.sendRedirect("/user/login");
		}
	}
}
