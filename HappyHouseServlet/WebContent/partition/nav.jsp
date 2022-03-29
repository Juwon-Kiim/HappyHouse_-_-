<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div class="container">
    <a class="navbar-brand" href="/">HAPPY HOUSE</a>
    <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
    >
        Menu
        <i class="fas fa-bars ms-1"></i>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav text-uppercase ms-auto py-4 py-lg-0">
            <li class="nav-item"><a class="nav-link" href="getArticleList.html">공지사항</a></li>
            <li class="nav-item"><a class="nav-link" href="getFavStore.html">주변 상가</a></li>
            <li class="nav-item">
                <a class="nav-link" href="addFavoritePlace.html">관심 지역 설정</a>
            </li>
            <li class="nav-item"><a class="nav-link" href="getFavPolution.html">관심 지역 환경</a></li>
            <li class="nav-item">
                <div class="dropdown">
                    <a
                        class="nav-link"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        ⫶
                    </a>
                    <ul class="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuLink">
                        <li id="anchor-join-link" class="nav-item" style="display: none">
                            <a class="nav-link" href="join.html">Sign Up</a>
                        </li>
                        <li id="anchor-login-link" class="nav-item" style="display: none">
                            <a class="nav-link" href="login.html">Login</a>
                        </li>
                        <li id="anchor-find-link" class="nav-item" style="display: none">
                            <a class="nav-link" href="findPassword.html">비밀번호 찾기</a>
                        <li id="anchor-member-link" class="nav-item" style="display: none">
                            <a class="nav-link" href="getMember.html">회원정보</a>
                        </li>
                        <li id="anchor-logout-link" class="nav-item" style="display: none">
                            <a class="nav-link" href="logout.html">Logout</a>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</div>
