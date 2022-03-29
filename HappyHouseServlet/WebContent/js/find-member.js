let findMember = function () {
    let loginId = getCookie("id");

    if (loginId !== null) {
        alert("비정상적인 접근입니다!");
        location.href = "/";
        return;
    }
    let name = document.querySelector("#name").value;
    let memberId = document.querySelector("#memberId").value;
    let tel = document.querySelector("#tel").value;

    console.log(name);
    console.log(memberId);
    console.log(tel);

    // 멤버 DB
    let members = localStorage.getItem("members");

    let arr = JSON.parse(members);

    for (let i = 0; i < arr.length; i++) {
        let member = JSON.parse(arr[i]);

        console.log(member);

        if (member.id === memberId && member.name === name && member.tel === tel) {
            let changedPassword = prompt("변경하실 비밀번호를 입력해주세요");

            if (changedPassword === null) {
                return;
            }

            member.password = changedPassword;

            arr[i] = JSON.stringify(member);

            localStorage.setItem("members", JSON.stringify(arr));

            alert("변경 완료!");
            location.href = "/";
            return;
        }
    }

    alert("정보가 틀렸습니다. 다시 입력해주세요");
};
