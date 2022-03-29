// 쿠키 가져오는 함수)쿠키의 key
var getCookie = function (key) {
    var value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

let printPlace = function () {
    console.log(1);
    // 관심지역 정보 div 태그
    let placeList = document.querySelector("#place-info-list");

    // 로그인 ID
    let loginId = getCookie("id");

    // 관심지역 db
    let places = localStorage.getItem("places");

    // JSON을 배열로 파싱
    let arr = JSON.parse(places);

    for (let i = 0; i < arr.length; i++) {
        console.log(2);
        let place = JSON.parse(arr[i]);

        // place의 멤버 ID와 현재 로그인한 ID가 같은 경우에만 DOM에 삽입
        if (place.memberId === loginId) {
            console.log(3);
            // div .place-address
            let addressDiv = document.createElement("div");
            addressDiv.className = "place-address";
            // div .place-state
            let stateDiv = document.createElement("div");
            stateDiv.className = "place-state";
            stateDiv.appendChild(document.createTextNode(place.state));
            addressDiv.appendChild(stateDiv);
            // span .place-city
            let citySpan = document.createElement("span");
            citySpan.className = "place-city";
            citySpan.appendChild(document.createTextNode(place.city));
            addressDiv.appendChild(citySpan);
            // span .place-dong
            let dongSpan = document.createElement("span");
            dongSpan.className = "place-dong";
            dongSpan.appendChild(document.createTextNode(place.dong));
            addressDiv.appendChild(dongSpan);
            placeList.appendChild(addressDiv);

            // div 지도 보기 버튼
            let div = document.createElement("div");
            div.className = "mt-3";
            let anchor = document.createElement("a");
            anchor.className = "btn btn-primary";
            anchor.setAttribute(
                "href",
                `javascript:moveMap('${place.state}', '${place.city}', '${place.dong}')`
            );
            anchor.appendChild(document.createTextNode("지도 보기"));
            div.appendChild(anchor);
            placeList.appendChild(div);

            placeList.appendChild(document.createElement("hr"));
        }
    }
};
