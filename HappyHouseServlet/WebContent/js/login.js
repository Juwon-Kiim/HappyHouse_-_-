// 쿠키 설정하는 함수(쿠키의 key, value, 만료날짜)
var setCookie = function (key, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);
    // 설정 일수만큼 현재시간에 만료값으로 지정
    var cookie_value = escape(value) + (days == null ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = key + "=" + cookie_value;
};

// 쿠키 가져오는 함수)쿠키의 key
var getCookie = function (key) {
    var value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

// 로그인 된 상태로 로그인 페이지에 들어오면 비정상적 접근이다..
window.onload = function () {
    if (getCookie("id") != null) {
        alert("비정상적인 접근입니다! 메인 페이지로 돌아가겠습니다!");
        window.location.href = "/";
    }
};

// 아이디와 비밀번호를 치고 로그인 버튼을 누를 경우 로그인을 한다.
let btn = document.querySelector("#login-btn");

btn.addEventListener("click", function () {
    let member = {
        id: document.querySelector("#memberId").value,
        password: document.querySelector("#memberPwd").value,
    };

    let members = localStorage.getItem("members");

    if (members !== null) {
        let arr = JSON.parse(members);

        for (const m of arr) {
            let findMember = JSON.parse(m);

            // 아이디와 비밀번호가 같다면 로그인 성공 (쿠키 만료일 1일);
            if (member.id === findMember.id && member.password === findMember.password) {
                document.cookie = setCookie("id", member.id, 1);
                alert("로그인 성공!");
                window.location.href = "/";
                return;
            }
        }
        alert("아이디 혹은 비밀번호가 틀렸습니다!");
    }
});
