package com.ssafy.happyhouse.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface Controller {
	void process(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException;
}
