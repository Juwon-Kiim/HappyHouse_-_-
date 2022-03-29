package com.ssafy.happyhouse.service;

import com.ssafy.happyhouse.dao.UserDao;
import com.ssafy.happyhouse.dao.UserDaoImpl;
import com.ssafy.happyhouse.dto.User;

public interface LoginService {
	
	User login(String userID, String userPW);
	
}
