package com.ssafy.happyhouse.dao;

import java.util.List;

import com.ssafy.happyhouse.dto.User;

public interface UserDao {
   User save(User user);      // 회원정보 저장(가입)
   User findById(String id); // id 회원정보 조회
   List<User> findALL();      //모든 회원정보 조회
   int UpdateUser(User updateParam); // 회원정보 수정
   int deleteUser(String id); // 회원정보 삭제(탈퇴)
}