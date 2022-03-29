package com.ssafy.happyhouse.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/user")
public class UserControllerServlet extends HttpServlet {
	
	private Map<String, Controller> uriMappingMap = new HashMap<String, Controller>();

	public UserControllerServlet() {
		uriMappingMap.put("/user/add", userAddController());
		uriMappingMap.put("/user/edit", userEditController());
		uriMappingMap.put("/user", userDetailController());
		uriMappingMap.put("/user/delete", userDeleteController());
	}
	
	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}
}
