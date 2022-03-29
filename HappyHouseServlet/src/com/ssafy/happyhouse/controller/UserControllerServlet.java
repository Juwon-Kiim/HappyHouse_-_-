package com.ssafy.happyhouse.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.happyhouse.controller.user.UserAddController;
import com.ssafy.happyhouse.controller.user.UserDeleteController;
import com.ssafy.happyhouse.controller.user.UserDetailController;
import com.ssafy.happyhouse.controller.user.UserEditController;

@WebServlet("/user")
public class UserControllerServlet extends HttpServlet {
	
	private Map<String, Controller> uriMappingMap = new HashMap<String, Controller>();

	public UserControllerServlet() {
		uriMappingMap.put("/user/add", new UserAddController());
		uriMappingMap.put("/user/edit", new UserEditController());
		uriMappingMap.put("/user", new UserDetailController());
		uriMappingMap.put("/user/delete", new UserDeleteController());
	}
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		Controller controller = uriMappingMap.get(request.getRequestURI());
		
		controller.process(request, response);
	}
}
