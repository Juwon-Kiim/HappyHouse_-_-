let url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
let regcode = "*00000000";
// 전국 특별/광역시, 도

window.onload = function () {
    getPlaceList();

    $.ajax({
        url: url,
        type: "GET",
        data: {
            regcode_pattern: regcode,
        },
        dataType: "json",
        success: function (response) {
            let code = ``;
            $.each(response.regcodes, function (i, regcode) {
                code += `
            <option value="${regcode.code}">${regcode.name}</option>
            `;
            });
            $("#state").empty().append('<option value="">시도선택</option>').append(code);
        },
        error: function (xhr, status, msg) {
            console.log("상태값 : " + status + " Http에러메시지 : " + msg);
        },
    });

    $(document).on("change", "#state", function () {
        regcode = $(this).val().substr(0, 2) + "*00000";

        state_val = $(this).val();
        state_text = $("#state option:checked").text();

        $.ajax({
            url: url,
            type: "GET",
            data: {
                regcode_pattern: regcode,
                is_ignore_zero: true,
            },
            dataType: "json",
            success: function (response) {
                let code = ``;
                $.each(response.regcodes, function (i, regcode) {
                    code += `
            <option value="${regcode.code}">${regcode.name.split(" ")[1]}</option>
            `;
                });
                $("#city").empty().append('<option value="">구군선택</option>').append(code);
            },
            error: function (xhr, status, msg) {
                console.log("상태값 : " + status + " Http에러메시지 : " + msg);
            },
        });
    });

    $(document).on("change", "#city", function () {
        regcode = $(this).val().substr(0, 4) + "*";

        city_val = $(this).val();
        city_text = $("#city option:checked").text();

        $.ajax({
            url: url,
            type: "GET",
            data: {
                regcode_pattern: regcode,
                is_ignore_zero: true,
            },
            dataType: "json",
            success: function (response) {
                let code = ``;
                $.each(response.regcodes, function (i, regcode) {
                    code += `
            <option value="${regcode.code}">${regcode.name.split(" ")[2]}</option>
            `;
                });
                $("#dong").empty().append('<option value="">동선택</option>').append(code);
            },
            error: function (xhr, status, msg) {
                console.log("상태값 : " + status + " Http에러메시지 : " + msg);
            },
        });
    });
};
// 페이지 처음 들어왔을 때 view에 띄워주기
let getPlaceList = function () {
    // 관심지역 DB
    let places = localStorage.getItem("places");

    // 현재 로그인한 ID
    const loginId = getCookie("id");

    if (places !== null) {
        // JSON으로 되어있는 DB를 배열 형태로 변경
        let arr = JSON.parse(places);

        // place DOM 불러오기
        let table = document.querySelector("#place-table-body");

        for (let i = 0; i < arr.length; i++) {
            let place = JSON.parse(arr[i]);

            console.log(place.memberId);
            console.log(loginId);

            // DB에 저장된 지역의 멤버 ID와 현재 로그인한 ID가 같은 경우에만 출력
            if (place.memberId === loginId) {
                // tr 태그 생성
                let tr = document.createElement("tr");
                tr.className = "text-center";
                // 관심 지역 위치를 저장할 td
                let tdPlace = document.createElement("td");
                let placeLocation = `${place.state} ${place.city} ${place.dong}`;
                tdPlace.appendChild(document.createTextNode(placeLocation));
                tr.appendChild(tdPlace);
                // 삭제 버튼
                let tdDel = document.createElement("td");
                let anchorDel = document.createElement("a");
                anchorDel.className = "btn btn-sm btn-outline-danger";
                anchorDel.setAttribute("href", `javascript:deletePlace(${i})`);
                anchorDel.appendChild(document.createTextNode("삭제"));
                tdDel.appendChild(anchorDel);
                tr.appendChild(tdDel);

                table.appendChild(tr);
            }
        }
    }
};

// 쿠키 가져오는 함수)쿠키의 key
var getCookie = function (key) {
    var value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

let addFavoritePlace = function () {
    const loginId = getCookie("id");

    // 로그인 검증
    if (loginId === null) {
        alert("로그인 후 등록하실 수 있습니다!");
        location.href = "/login.html";
        return;
    }

    let favPlace = {
        memberId: loginId,
        state: $("#state option:checked").text(),
        city: $("#city option:checked").text(),
        dong: $("#dong option:checked").text(),
        code: $("#dong").val(),
    };

    // 입력값 검증
    if (
        favPlace.state === "시도선택" ||
        favPlace.city === "구군선택" ||
        favPlace.dong === "동선택"
    ) {
        alert("입력값이 비었습니다. 다시 확인해주세요!");
        return;
    }

    // 관심 지역 DB
    let places = localStorage.getItem("places");

    // 만약 로컬 스토리지가 비어있으면
    if (places === null) {
        let arr = [];
        arr.push(JSON.stringify(favPlace));
        localStorage.setItem("places", JSON.stringify(arr));
        location.href = "/addFavoritePlace.html";
        return;
        // 로컬 스토리지가 비어있지 않으면
    } else {
        let arr = JSON.parse(places);

        // 똑같은 정보가 있는지 검증
        for (const m of arr) {
            let findPlace = JSON.parse(m);

            if (
                favPlace.memberId === findPlace.memberId &&
                favPlace.state === findPlace.state &&
                favPlace.city === findPlace.city &&
                favPlace.dong === findPlace.dong &&
                favPlace.code === findPlace.code
            ) {
                alert("이미 저장된 지역입니다!");
                return;
            }
        }

        // 검증을 통과하면 위치 저장
        arr.push(JSON.stringify(favPlace));
        localStorage.setItem("places", JSON.stringify(arr));
        location.href = "/addFavoritePlace.html";
    }
};

let deletePlace = function (no) {
    // 관심 지역 DB
    let places = localStorage.getItem("places");

    let arr = JSON.parse(places);

    arr.splice(no, 1);

    localStorage.setItem("places", JSON.stringify(arr));

    location.href = "addFavoritePlace.html";
};
