package com.ssafy.happyhouse.controller.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.happyhouse.controller.Controller;
import com.ssafy.happyhouse.dao.UserDao;
import com.ssafy.happyhouse.dao.UserDaoImpl;

public class UserDeleteController implements Controller {
	
	private UserDao repository = UserDaoImpl.getUserDao();
	
	@Override
	public void process(HttpServletRequest request, HttpServletResponse response) {
		String userID = request.getParameter("userID");
		
		repository.deleteUser(userID);
	}

}
