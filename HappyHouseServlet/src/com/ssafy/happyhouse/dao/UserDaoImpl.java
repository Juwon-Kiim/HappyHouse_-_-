package com.ssafy.happyhouse.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ssafy.happyhouse.dto.User;
import com.ssafy.happyhouse.util.DBUtil;

public class UserDaoImpl implements UserDao{

   private DBUtil dbUtil = DBUtil.getInstance();
   
   private static UserDao userDao = new UserDaoImpl();
   
   public static UserDao getUserDao() {
      return userDao;
   }
   
   @Override
   public User save(User user) {
      Connection conn = null;
      PreparedStatement pstmt = null;
      try {
         conn = dbUtil.getConnection();
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
      } catch(SQLException e) {
         e.printStackTrace();
      }
      finally {
         dbUtil.close(pstmt, conn);
      }
      return null;
   }

   @Override
   public User findById(String id) {
      User user = null;
      Connection conn=null;
      PreparedStatement pstmt = null;
      ResultSet rs = null;
      try {
         conn = dbUtil.getConnection();
         StringBuilder findUser = new StringBuilder();
         findUser.append("select userID, userPW, userName, email, address, contact, joinDate \n");
         findUser.append("from user \n");
         findUser.append("where userID=? \n");
         pstmt = conn.prepareStatement(findUser.toString());
         pstmt.setString(1, id);
         rs=pstmt.executeQuery();
         if(rs.next()) {
            user = new User(
                  rs.getString("userID"),
                  rs.getString("userPW"),
                  rs.getString("userName"),
                  rs.getString("email"),
                  rs.getString("address"),
                  rs.getString("contact"),
                  rs.getString("joinDate")
                  );
         }
      } catch(SQLException e) {
         e.printStackTrace();
      } 
      finally {
         dbUtil.close(rs, pstmt, conn);
      }
      return user;
   }

   @Override
   public List<User> findALL() {
      List<User> list = new ArrayList<User>();
      Connection conn = null;
      PreparedStatement pstmt = null;
      ResultSet rs = null;
      try {
         conn = dbUtil.getConnection();
         StringBuilder listUser = new StringBuilder();
         listUser.append("select userID, userPW, userName, email, address, contact, joinDate \n");
         listUser.append("from user \n");
         pstmt = conn.prepareStatement(listUser.toString());
         rs=pstmt.executeQuery();
         while(rs.next()) {
            User user = new User(
                     rs.getString("userID"),
                     rs.getString("userPW"),
                     rs.getString("userName"),
                     rs.getString("email"),
                     rs.getString("address"),
                     rs.getString("contact"),
                     rs.getString("joinDate")
                  );
            list.add(user);
         }
      } catch(SQLException e) {
         e.printStackTrace();
      } finally {
         dbUtil.close(rs, pstmt, conn);
      }
      return null;
   }

   @Override
   public int UpdateUser(User updateParam) {
      Connection conn = null;
      PreparedStatement pstmt = null;
      try {
         conn = dbUtil.getConnection();
         StringBuilder updateUser = new StringBuilder();
         updateUser.append("update user \n");
         updateUser.append("set userID=?, userPW=?, userName=?, email=?, address=?, contact=? \n");
         pstmt=conn.prepareStatement(updateUser.toString());
         pstmt.setString(1, updateParam.getUserID());
         pstmt.setString(2, updateParam.getUserPW());
         pstmt.setString(3, updateParam.getUserName());
         pstmt.setString(4, updateParam.getEmail());
         pstmt.setString(5, updateParam.getAddress());
         pstmt.setString(6, updateParam.getContact());
         return pstmt.executeUpdate();
      } catch(SQLException e) {
         e.printStackTrace();
      } finally {
         dbUtil.close(pstmt, conn);
      }
      return 0;
   }

   @Override
   public int deleteUser(String id){
      Connection conn = null;
      PreparedStatement pstmt = null;
      try {
         conn = dbUtil.getConnection();
         StringBuilder deleteUser = new StringBuilder();
         deleteUser.append("delete from user \n");
         deleteUser.append("where userID=?");
         pstmt = conn.prepareStatement(deleteUser.toString());
         pstmt.setString(1, id);
         return pstmt.executeUpdate();
      } catch(SQLException e) {
         e.printStackTrace();
      } finally {
         dbUtil.close(pstmt, conn);
      }
      return 0;
   }
}