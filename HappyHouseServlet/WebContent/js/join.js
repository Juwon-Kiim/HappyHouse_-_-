let btn = document.querySelector("#join-btn");

// 원래는 db에 회원 정보를 저장하는 로직이지만 db 연결이 안되어있으므로 파일로 저장
btn.addEventListener("click", function () {
    //
    let member = {
        name: document.querySelector("#name").value,
        id: document.querySelector("#memberId").value,
        password: document.querySelector("#memberPwd").value,
        address: document.querySelector("#address").value,
        tel: document.querySelector("#tel").value,
    };

    let members = localStorage.getItem("members");

    // 만약 로컬 스토리지가 비어있으면
    if (members === null) {
        let arr = [];
        arr.push(JSON.stringify(member));
        localStorage.setItem("members", JSON.stringify(arr));
        alert("회원 가입 성공!");
        window.location.href = "/";
        // 로컬 스토리지가 비어있지 않으면
    } else {
        let arr = JSON.parse(members);

        // 아이디 중복 검증
        for (const m of arr) {
            let findMember = JSON.parse(m);

            if (member.id === findMember.id) {
                alert("이미 저장된 아이디입니다!");
                return;
            }
        }

        // 검증을 통과하면 아이디 저장
        arr.push(JSON.stringify(member));
        localStorage.setItem("members", JSON.stringify(arr));
        alert("회원 가입 성공!");
        window.location.href = "/";
    }
});
