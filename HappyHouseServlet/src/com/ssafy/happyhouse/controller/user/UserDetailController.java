package com.ssafy.happyhouse.controller.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.happyhouse.controller.Controller;
import com.ssafy.happyhouse.dao.UserDao;
import com.ssafy.happyhouse.dao.UserDaoImpl;
import com.ssafy.happyhouse.dto.User;

public class UserDetailController implements Controller {
	
	private UserDao repository = UserDaoImpl.getUserDao();
	
	@Override
	public void process(HttpServletRequest request, HttpServletResponse response) {
		String userID = request.getParameter("userID");
		String userPW = request.getParameter("userPW");
		String userName = request.getParameter("userName");
		String address = request.getParameter("address");
		String email = request.getParameter("email");
		String contact = request.getParameter("contact");
		String joinDate = request.getParameter("joinDate");
		
		User user = new User(userID, userPW, userName, email, address, contact, joinDate);
	}

}
