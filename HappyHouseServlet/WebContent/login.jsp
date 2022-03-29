<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Happy House | �α���</title>
        <!-- Favicon-->
        <link rel="icon" type="image/x-icon" href="assets/favicon.ico" />
        <!-- Font Awesome icons (free version)-->
        <script
            src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"
            crossorigin="anonymous"
        ></script>
        <!-- Google fonts-->
        <link
            href="https://fonts.googleapis.com/css?family=Montserrat:400,700"
            rel="stylesheet"
            type="text/css"
        />
        <link
            href="https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700"
            rel="stylesheet"
            type="text/css"
        />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="css/styles.css" rel="stylesheet" />
        <link href="css/title-font.css" rel="stylesheet" />
    </head>
    <body id="page-top">
        <!-- �׺���̼�-->
        <nav
            w3-include-html="partition/nav.html"
            class="navbar navbar-expand-lg navbar-dark fixed-top"
            id="mainNav"
        ></nav>
        <!-- ���-->
        <header w3-include-html="partition/header.html" class="masthead"></header>

        <!-- �α��� - ����� ������ ������ �ʾ����Ƿ� button type�� button���� ����Ѵ�.-->
        <div class="row justify-content-center">
            <div class="col-md-4 m-3 p-3">
                <div class="title-font">�α���</div>
                <form class="form-check row g-3" action="login">
                    <div class="col-auto">
                        <label for="memberId" class="form-label">ID</label>
                        <input
                            type="email"
                            class="form-control"
                            id="memberId"
                            placeholder="���̵� �Է����ּ���"
                        />
                    </div>
                    <div class="col-auto">
                        <label for="memberPwd" class="form-label">Password</label>
                        <input
                            type="password"
                            class="form-control"
                            id="memberPwd"
                            placeholder="��й�ȣ�� �Է����ּ���"
                        />
                    </div>
                    <div class="col-12">
                        <button id="login-btn" type="button" class="btn btn-primary">LOGIN</button>
                    </div>
                </form>
            </div>
        </div>
        <!-- Ǫ��-->
        <footer w3-include-html="partition/footer.html" class="footer py-4"></footer>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>

        <script src="js/partition.js"></script>
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <!-- * *                               SB Forms JS                               * *-->
        <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
        <!-- �α��� JS ���� -->
        <script src="js/login.js"></script>

        <script src="js/nav.js"></script>
    </body>
</html>