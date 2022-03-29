// 쿼리 파라미터(key : state, city, dong)
const params = new URLSearchParams(window.location.search);

// 각각 도(특별시, 광역시), 시(구), 동
const state = params.get("state");
const city = params.get("city");
const dong = params.get("dong");
const dongCode = params.get("code");

///////////////////////////////// 현재 사용 X //////////////////////////////////////////////////////////
let getCodeURL = function () {
    // 법정동 코드 가져오기
    endpoint = "http://apis.data.go.kr/1741000/StanReginCd/getStanReginCdList";
    key =
        "5sZNMm8ijUD2TRgnoZG61NWIVonlHpSpIpmPgBrHaJzUOlFcPZJEs5DhXy9rwiGe9eSxTwzFcbKPp%2BDgGxWoww%3D%3D";
    type = "json";
    locate = state + " " + city;

    return `${endpoint}?serviceKey=${key}&type=${type}&locatadd_nm=${locate}`;
};

// api를 불러와서 법정동 코드를 리턴 (미사용)
let getCode = function () {
    let url = getCodeURL();

    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((res) => res.json())
            .then((data) =>
                // 법정동 코드
                {
                    if (data) {
                        resolve(data.StanReginCd[1].row[0].region_cd);
                    }
                    reject(new Error("코드 불러오기 실패"));
                }
            );
    });
};
///////////////////////////////// 현재 사용 X //////////////////////////////////////////////////////

let getApartInfoURL = function (code) {
    // 아파트 정보 가져오기
    endpoint =
        "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev";
    key =
        "5sZNMm8ijUD2TRgnoZG61NWIVonlHpSpIpmPgBrHaJzUOlFcPZJEs5DhXy9rwiGe9eSxTwzFcbKPp%2BDgGxWoww%3D%3D";
    pageNo = "1";
    numOfRows = "1000";
    LAWD_CD = code.substr(0, 5);
    DEAL_YMD = "201512";

    return `${endpoint}?serviceKey=${key}&pageNo=${pageNo}&numOfRows=${numOfRows}&LAWD_CD=${LAWD_CD}&DEAL_YMD=${DEAL_YMD}`;
};

// api를 불러와서 아파트 실거래가 정보를 리턴
let getApartInfo = function (code) {
    let url = getApartInfoURL(code);

    return new Promise(function (resolve, reject) {
        fetch(url)
            .then((res) => res.text())
            .then((data) => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "application/xml");
                // 아파트 실거래가 정보 xml 문서
                if (xml) {
                    resolve(xml);
                }
                reject(new Error("아파트 데이터 불러오기 실패"));
            });
    });
};

// 아파트 실거래가 정보를 가지고 dom에 띄워주기
let printXML = function (xml) {
    // 아파트 정보 div
    let list = document.querySelector("#house-info-list");

    let items = xml.getElementsByTagName("item");

    for (const item of items) {
        // 쿼리 파라미터로 받은 동네 이름과 같다면)
        if (dong === item.getElementsByTagName("법정동")[0].childNodes[0].nodeValue.substr(1)) {
            // div .house-info
            let houseInfo = document.createElement("div");
            houseInfo.className = "house-info";

            // div .house-name -> 아파트 이름
            let houseName = document.createElement("div");
            houseName.className = "house-name";
            houseName.appendChild(
                document.createTextNode(
                    item.getElementsByTagName("아파트")[0].childNodes[0].nodeValue
                )
            );
            houseInfo.appendChild(houseName);

            // div .house-address -> 아파트 주소
            let houseAddress = document.createElement("div");
            houseAddress.className = "house-address";
            // .house-address 하위 span 태그
            let span = document.createElement("span");
            span.appendChild(document.createTextNode(state));
            houseAddress.appendChild(span);
            span = document.createElement("span");
            span.appendChild(document.createTextNode(city));
            houseAddress.appendChild(span);
            span = document.createElement("span");
            span.appendChild(
                document.createTextNode(
                    item.getElementsByTagName("도로명")[0].childNodes[0].nodeValue
                )
            );
            houseAddress.appendChild(span);
            span = document.createElement("span");
            span.appendChild(
                document.createTextNode(
                    item
                        .getElementsByTagName("도로명건물본번호코드")[0]
                        .childNodes[0].nodeValue.replace(/(^0+)/, "")
                )
            );
            houseAddress.appendChild(span);
            houseInfo.appendChild(houseAddress);

            // div .house-price -> 아파트 가격
            let housePrice = document.createElement("div");
            housePrice.className = "house-price";
            // .house-address의 하위 div 태그 (실거래가 정보와 거래 일자 정보)
            let div = document.createElement("div");
            // span .price-label -> 실거래가 정보
            let priceLabel = document.createElement("span");
            priceLabel.className = "price-label";
            priceLabel.appendChild(document.createTextNode("실거래가"));
            div.appendChild(priceLabel);
            // span. house-deal-date -> 거래 일자 정보
            let houseDealDate = document.createElement("span");
            houseDealDate.className = "house-deal-date";
            houseDealDate.appendChild(
                document.createTextNode(
                    item.getElementsByTagName("년")[0].childNodes[0].nodeValue +
                        "." +
                        item.getElementsByTagName("월")[0].childNodes[0].nodeValue +
                        "." +
                        item.getElementsByTagName("일")[0].childNodes[0].nodeValue
                )
            );
            div.appendChild(houseDealDate);
            housePrice.appendChild(div);
            // .house-address의 하위 div 태그 (가격 정보와 단위)
            div = document.createElement("div");
            // span .house-deal-price -> 가격 정보
            houseDealPrice = document.createElement("span");
            houseDealPrice.className = "house-deal-price";
            houseDealPrice.appendChild(
                document.createTextNode(
                    item.getElementsByTagName("거래금액")[0].childNodes[0].nodeValue
                )
            );
            div.appendChild(houseDealPrice);
            // span .house-deal-price-unit -> 가격 단위
            houseDealPriceUnit = document.createElement("span");
            houseDealPriceUnit.className = "house-deal-price-unit";
            houseDealPriceUnit.appendChild(document.createTextNode("만원"));
            div.appendChild(houseDealPriceUnit);
            housePrice.appendChild(div);
            houseInfo.appendChild(housePrice);

            // div .house-area -> 아파트 면적
            let houseArea = document.createElement("div");
            houseArea.className = "house-area";
            // div .area-label -> 라벨
            let areaLabel = document.createElement("div");
            areaLabel.className = "area-label";
            areaLabel.appendChild(document.createTextNode("면적"));
            houseArea.appendChild(areaLabel);
            // .house-area의 하위 div 태그(면적 정보와 단위)
            div = document.createElement("div");
            // span .house-area-value -> 면적 정보
            let houseAreaValue = document.createElement("span");
            houseAreaValue.className = "house-area-value";
            houseAreaValue.appendChild(
                document.createTextNode(
                    item.getElementsByTagName("전용면적")[0].childNodes[0].nodeValue
                )
            );
            div.appendChild(houseAreaValue);
            // span .house-area-unit -> 면적 단위
            let houseAreaUnit = document.createElement("span");
            houseAreaUnit.className = "house-area-unit";
            span = document.createElement("span");
            span.appendChild(document.createTextNode("m"));
            houseAreaUnit.appendChild(span);
            let sup = document.createElement("sup");
            sup.appendChild(document.createTextNode("2"));
            houseAreaUnit.appendChild(sup);
            div.appendChild(houseAreaUnit);
            houseArea.appendChild(div);
            houseInfo.appendChild(houseArea);

            // div .btn-detail -> 나중에 지도 자세히 보기 버튼 만들 예정
            let btnDetail = document.createElement("div");
            btnDetail.className = "btn-detail";
            // 버튼
            let btn = document.createElement("a");
            btn.setAttribute(
                "href",
                `javascript:getLocationByAddress('${state}', '${city}', '${
                    item.getElementsByTagName("도로명")[0].childNodes[0].nodeValue
                }', '${item
                    .getElementsByTagName("도로명건물본번호코드")[0]
                    .childNodes[0].nodeValue.replace(/(^0+)/, "")}')`
            );
            btn.className = "btn btn-outline-warning";
            btn.appendChild(document.createTextNode("지도 보기"));
            btnDetail.appendChild(btn);
            houseInfo.appendChild(btnDetail);

            // hr 구분선
            let hr = document.createElement("hr");
            houseInfo.appendChild(hr);

            list.appendChild(houseInfo);
        }
    }
};

let printInfoToPage = async () => {
    let xml = await getApartInfo(dongCode);
    printXML(xml);
};

printInfoToPage();
