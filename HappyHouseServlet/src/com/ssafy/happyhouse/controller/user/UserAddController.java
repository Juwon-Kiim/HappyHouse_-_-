package com.ssafy.happyhouse.controller.user;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.happyhouse.controller.Controller;
import com.ssafy.happyhouse.dao.UserDao;

public class UserAddController implements Controller {
	
	private UserDao repository = UserDaoImpl.getUserDao();

	@Override
	public void process(HttpServletRequest request, HttpServletResponse response) {
		// TODO Auto-generated method stub
		String userId = request.getParameter("userId");
		String userPW = request.getParameter("userPW");
		String userName = request.getParameter("userName");
		String email = request.getParameter("address");
		String contact = request.getParameter("contact");
		String joinDate = request.getParameter("joinDate");
		
		User user = new User(userId, userPW, userName, email, contact, joinDate);
		
		repository.save(user);
	}

}
