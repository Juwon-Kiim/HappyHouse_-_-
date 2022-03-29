package com.ssafy.happyhouse.controller.login;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ssafy.happyhouse.controller.Controller;

public class LogoutController implements Controller {

	@Override
	public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if(request.getMethod().equals("POST")) {
			HttpSession session = request.getSession();
			session.removeAttribute("loginInfo");
			response.sendRedirect("/");
		} else {
			response.sendRedirect("/user/logout");
		}
	}
}
