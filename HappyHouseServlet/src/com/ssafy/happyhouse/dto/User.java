package com.ssafy.happyhouse.dto;

public class User {
	private String userID;
	private String userPW;
	private String userName;
	private String email;
	private String address;
	private String contact;
	private String joinDate;
	
	public User(String userID, String userPW, String userName, String email, String address, String contact,
			String joinDate) {
		this.userID = userID;
		this.userPW = userPW;
		this.userName = userName;
		this.email = email;
		this.address = address;
		this.contact = contact;
		this.joinDate = joinDate;
	}
	
	public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getUserPW() {
		return userPW;
	}
	public void setUserPW(String userPW) {
		this.userPW = userPW;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}
	
}
