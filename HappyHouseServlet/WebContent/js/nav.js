// 쿠키 가져오는 함수
var getCookie = function (key) {
    var value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

window.addEventListener("load", function () {
    const cookie = getCookie("id");

    if (cookie === null) {
        let join = document.querySelector("#anchor-join-link");
        let login = document.querySelector("#anchor-login-link");
        let find = document.querySelector("#anchor-find-link");

        join.style.display = "block";
        login.style.display = "block";
        find.style.display = "block";
    } else {
        let logout = document.querySelector("#anchor-logout-link");
        let member = document.querySelector("#anchor-member-link");

        logout.style.display = "block";
        member.style.display = "block";
    }
});
