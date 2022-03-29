package com.ssafy.happyhouse.dao;

import java.sql.SQLException;
import java.util.List;

import com.ssafy.happyhouse.dto.User;

public interface UserDao {
	User save(User user) throws SQLException;      // 회원정보 저장(가입)
	User findById(String id) throws SQLException; // id 회원정보 조회
	List<User> findALL() throws SQLException;		//모든 회원정보 조회
	int UpdateUser(User updateParam) throws SQLException; // 회원정보 수정
	int deleteUser(String id) throws SQLException; // 회원정보 삭제(탈퇴)
}
