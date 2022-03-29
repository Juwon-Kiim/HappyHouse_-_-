package com.ssafy.happyhouse.controller.user;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ssafy.happyhouse.controller.Controller;
import com.ssafy.happyhouse.dao.UserDao;
import com.ssafy.happyhouse.dao.UserDaoImpl;
import com.ssafy.happyhouse.dto.User;

public class UserDetailController implements Controller {
	
	private UserDao repository = UserDaoImpl.getUserDao();
	
	@Override
	public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userID = request.getParameter("userID");
		User user = repository.findById(userID);
		request.getRequestDispatcher("/user/user_detail.jsp").forward(request, response);
	}

}
