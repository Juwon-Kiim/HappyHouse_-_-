<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!doctype html>
<html lang="en">

<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"
        integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

    <title>Hello, world!</title>
    <style>
        .login {
            max-width: 800px;
            min-width: 400px;
            height: 600px;
            margin: auto;
            background-color: white;
            padding: 64px
        }

        .form-control {
            padding: 10px;
        }

        .login-contatiner {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            margin-bottom: 5px;
        }

        .btn-social-login {
            transition: all .2s;
            outline: 0;
            border: 1px solid transparent;
            padding: .5rem !important;
            border-radius: 50%;
            color: #fff;
        }

        .btn-social-login:focus {
            box-shadow: 0 0 0 .2rem rgba(0, 123, 255, .25);
        }

        .text-dark {
            color: #343a40 !important;
        }

        .social-login.container {
            margin-top: 30px;
        }

        .col {
            text-align: center;
        }

        form {
            margin: auto auto;
            width: 75%;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
        }

        .form-label {
            font-weight: bold;
        }

        .btn {
            font-weight: bold;
        }
    </style>

</head>

<body>
    <div class="login">
        <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">아이디</label>
                <input type="email" class="form-control" id="id" aria-describedby="id" placeholder="아이디 입력">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">비밀번호</label>
                <input type="password" class="form-control" id="pwd" placeholder="비밀번호 입력">
            </div>
            <div class="login-contatiner">
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1">
                    <label class="form-check-label" for="IDcheck1">아이디 저장</label>
                </div>
                <div class="util-contatiner">
                    <span><a href="./signup.html">회원가입</a></span>
                    <span>&nbsp&nbsp</span>
                    <span><a href="./login_find_password.html">비밀번호 찾기</a></span>
                </div>
            </div>
            <div></div>
            <div class="mb-3 d-grid gap-2">
                <button type="button" class="btn btn-primary" onclick="location.href='/user/login'">로그인</button>
            </div>
        </form>
    </div>

    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js"
        integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js"
        integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
        crossorigin="anonymous"></script>
</body>

</html>