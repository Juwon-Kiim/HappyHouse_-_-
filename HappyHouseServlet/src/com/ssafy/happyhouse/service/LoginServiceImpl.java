package com.ssafy.happyhouse.service;

import java.sql.SQLException;

import com.ssafy.happyhouse.dao.UserDao;
import com.ssafy.happyhouse.dao.UserDaoImpl;
import com.ssafy.happyhouse.dto.User;

public class LoginServiceImpl implements LoginService {
	
	private UserDao repository = UserDaoImpl.getUserDao();
	
	@Override
	public User login(String userID, String userPW) {
		User user = repository.findById(userID);
		if(user == null || !user.getUserPW().equals(userPW)) {
			return null;
		}
		return user;
	}

}
