package com.ssafy.happyhouse.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import com.ssafy.happyhouse.dto.User;

public class UserDaoImpl implements UserDao{

	private static UserDao userDao = new UserDaoImpl();
	
	public static UserDao getUserDao() {
		return userDao;
	}
	
	@Override
	public User save(User user) throws SQLException {
		Connection conn = null;
		PreparedStatement pstmt = null;
		try {
			conn = __.getConnection();
			StringBuilder saveUser = new StringBuilder();
			saveUser.append("insert into user (userID, userPW, userName, email, address, contact, joinDate) \n");
			saveUser.append("values (?, ?, ?, ?, ?, ?, now())");
			pstmt=conn.prepareStatement(saveUser.toString());
			pstmt.setString(1, user.getUserID());
			pstmt.setString(2, user.getUserPW());
			pstmt.setString(3, user.getUserName());
			pstmt.setString(4, user.getEmail());
			pstmt.setString(5, user.getAddress());
			pstmt.setString(6, user.getContact());
			pstmt.executeUpdate();
			return user;
		} finally {
			__.close(pstmt, conn);
		}
		return user;
	}

	@Override
	public User findById(String id) {
		User user = null;
		Connection conn=null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		try {
			conn = __.getConnection();
			StringBuilder findUser = new StringBuilder();
			findUser.append("select userID, userPW, userName, email, address, contact \n");
			findUser.append("from user \n");
			findUser.append("where userID=? \n");
			pstmt = conn.prepareStatement(findUser.toString());
			pstmt.setString(1, id);
			rs=pstmt.executeQuery();
			if(rs.next()) {
				user = new User();
				user.setUserID(rs.getString("userID"));
				user.setUserPW(rs.getString("userPW"));
				user.setUserPW(rs.getString("userName"));
				user.setUserPW(rs.getString("email"));
				user.setUserPW(rs.getString("address"));
				user.setUserPW(rs.getString("contact"));
			}
		}
		return null;
	}

	@Override
	public List<User> findALL() {
		return null;
	}

	@Override
	public int UpdateUser(User updateParam) {
		return 0;
	}

	@Override
	public int deleteUser(String id) {
		return 0;
	}

}
