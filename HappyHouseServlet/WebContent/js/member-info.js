// 쿠키 가져오는 함수
var getCookie = function (key) {
    var value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

window.onload = function () {
    let members = localStorage.getItem("members");

    let loginId = getCookie("id");

    // db에 멤버 정보가 있으면
    if (members !== null) {
        let arr = JSON.parse(members);

        for (const m of arr) {
            let findMember = JSON.parse(m);

            // 로그인을 한 상태로 페이지에 들어오면 정보를 읽는다.
            if (loginId === findMember.id) {
                let name = document.querySelector("#name");
                let memberId = document.querySelector("#memberId");
                let memberPwd = document.querySelector("#memberPwd");
                let address = document.querySelector("#address");
                let tel = document.querySelector("#tel");

                name.setAttribute("value", findMember.name);
                memberId.setAttribute("value", findMember.id);
                memberPwd.setAttribute("value", findMember.password);
                address.setAttribute("value", findMember.address);
                tel.setAttribute("value", findMember.tel);
            }
        }
    }
};

let memberInfoBtn = document.querySelector("#update-member-info-btn");

memberInfoBtn.addEventListener("click", function () {
    let member = {
        name: document.querySelector("#name").value,
        id: document.querySelector("#memberId").value,
        password: document.querySelector("#memberPwd").value,
        address: document.querySelector("#address").value,
        tel: document.querySelector("#tel").value,
    };

    // 로컬 스토리지에서 멤버 목록 가져오기
    let members = localStorage.getItem("members");

    // JSON을 배열로 파싱
    let arr = JSON.parse(members);

    for (let i = 0; i < arr.length; i++) {
        // json 멤버 정보를 객체 정보로 파싱
        let findMember = JSON.parse(arr[i]);

        if (member.id === findMember.id) {
            alert("수정 완료!");
            arr[i] = JSON.stringify(member);
            localStorage.setItem("members", JSON.stringify(arr));
            window.location.href = "/getMember.html";
            return;
        }
    }
});
