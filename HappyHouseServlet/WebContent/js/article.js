// 쿠키 가져오는 함수
var getCookie = function (key) {
    var value = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
    return value ? value[2] : null;
};

/**
 * 게시글 저장 로직 시작
 */

let addArticle = function () {
    // 날짜 정보를 얻기 위한 Date 객체 및 변수들
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();

    // 저장할 게시글
    let article = {
        title: document.querySelector("#title").value,
        content: document.querySelector("#content").value,
        date: `${year}-${month}-${date}`,
        author: getCookie("id"),
    };

    // 게시글 DB
    let articles = localStorage.getItem("articles");

    // 만약 로컬 스토리지가 비어있으면
    if (articles === null) {
        let arr = [];
        arr.push(JSON.stringify(article));
        localStorage.setItem("articles", JSON.stringify(arr));
        window.location.href = "/getArticleList.html";
        // 로컬 스토리지가 비어있지 않으면
    } else {
        let arr = JSON.parse(articles);

        arr.push(JSON.stringify(article));
        localStorage.setItem("articles", JSON.stringify(arr));
        window.location.href = "/getArticleList.html";
    }
};
/**
 * 게시글 저장 로직 끝
 */
///////////////////////////////////////////
/**
 * 게시글 목록 불러오기 로직 시작
 */
let getArticleList = function () {
    // 게시글 DB
    let articles = localStorage.getItem("articles");

    if (articles !== null) {
        // JSON으로 되어있는 DB를 배열 형태로 변경
        let arr = JSON.parse(articles);

        // table DOM 불러오기
        let table = document.querySelector("#article-table-body");

        for (let i = 0; i < arr.length; i++) {
            let article = JSON.parse(arr[i]);

            // tr 태그 생성
            let tr = document.createElement("tr");
            // 글 번호를 저장할 td
            let tdNo = document.createElement("td");
            tdNo.appendChild(document.createTextNode(i));
            tr.appendChild(tdNo);
            // 글 제목을 저장할 td
            let tdTitle = document.createElement("td");
            let anchor = document.createElement("a");
            anchor.setAttribute("href", `getArticle.html?no=${i}`);
            anchor.appendChild(document.createTextNode(article.title));
            tdTitle.appendChild(anchor);
            tr.appendChild(tdTitle);
            // 글 작성 날짜를 저장할 td
            let tdDate = document.createElement("td");
            tdDate.appendChild(document.createTextNode(article.date));
            tr.appendChild(tdDate);
            // 글 작성자를 저장할 td
            let tdAuthor = document.createElement("td");
            tdAuthor.appendChild(document.createTextNode(article.author));
            tr.appendChild(tdAuthor);

            table.appendChild(tr);
        }
    }
};
/**
 * 게시글 목록 불러오기 로직 끝
 */
////////////////////////////////////////
/**
 * ~번쨰 게시글 불러오기 로직 시작
 */
let getArticle = function () {
    // 쿼리 파라미터(key : no)
    const params = new URLSearchParams(window.location.search);

    // 게시글 번호
    const no = params.get("no");

    // 게시글 DB
    let articles = localStorage.getItem("articles");

    if (articles !== null) {
        // JSON으로 되어있는 DB를 배열 형태로 변경
        let arr = JSON.parse(articles);

        let articleContainer = document.querySelector("#article-container");

        // no번째 글을 출력할거임
        let article = JSON.parse(arr[no]);

        // ~번째 글 div
        let noDiv = document.createElement("div");
        noDiv.className = "row justify-content-center";
        let noPhrase = document.createElement("p");
        noPhrase.className = "title-font";
        noPhrase.appendChild(document.createTextNode(`${no}번째 글`));
        noDiv.appendChild(noPhrase);
        articleContainer.appendChild(noDiv);

        // 제목 div
        let titleDiv = document.createElement("div");
        titleDiv.className = "row justify-content-center my-2";
        let titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title");
        titleLabel.appendChild(document.createElement("제목"));
        titleDiv.appendChild(titleLabel);
        let titleInput = document.createElement("input");
        titleInput.className = "form-control";
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("value", article.title);
        titleInput.readOnly = true;
        titleDiv.appendChild(titleInput);
        articleContainer.appendChild(titleDiv);

        // 내용 div
        let contentDiv = document.createElement("div");
        contentDiv.className = "row justify-content-center my-2";
        let contentlabel = document.createElement("label");
        contentlabel.setAttribute("for", "content");
        contentlabel.appendChild(document.createElement("내용"));
        contentDiv.appendChild(contentlabel);
        let contentTextarea = document.createElement("textarea");
        contentTextarea.className = "form-control";
        contentTextarea.setAttribute("type", "text");
        contentTextarea.setAttribute("rows", "10");
        contentTextarea.readOnly = true;
        contentTextarea.appendChild(document.createTextNode(article.content));
        contentDiv.appendChild(contentTextarea);
        articleContainer.appendChild(contentDiv);

        // btn div
        let btnDiv = document.createElement("div");
        btnDiv.className = "row justify-content-center";
        let btnAnchor1 = document.createElement("a");
        btnAnchor1.className = "btn btn-primary col-auto mx-2";
        btnAnchor1.setAttribute("href", `/updateArticle.html?no=${no}`);
        btnAnchor1.appendChild(document.createTextNode("수정"));
        btnDiv.appendChild(btnAnchor1);
        let btnAnchor2 = document.createElement("a");
        btnAnchor2.className = "btn btn-danger col-auto mx-2";
        btnAnchor2.setAttribute("href", `javascript:deleteArticle(${no})`);
        btnAnchor2.appendChild(document.createTextNode("삭제"));
        btnDiv.appendChild(btnAnchor2);
        articleContainer.appendChild(btnDiv);
    }
};
/**
 * ~번째 게시글 불러오기 로직 끝
 */
//////////////////////////////////////////////////
/**
 * ~번째 게시글 수정 폼 불러오기 로직
 */
let getUpdateArticleForm = function () {
    const loginId = getCookie("id");

    // 쿼리 파라미터(key : no)
    const params = new URLSearchParams(window.location.search);

    // 게시글 번호
    const no = params.get("no");

    // 게시글 DB
    let articles = localStorage.getItem("articles");

    if (articles !== null) {
        // JSON으로 되어있는 DB를 배열 형태로 변경
        let arr = JSON.parse(articles);

        let articleContainer = document.querySelector("#article-container");

        // no번째 글을 출력할거임
        let article = JSON.parse(arr[no]);

        // 만약 로그인된 아이디와 게시글의 주인이 다르면 리다이렉트
        if (loginId !== article.author) {
            alert("본인만 수정할 수 있습니다!");
            location.href = `/getArticle.html?no=${no}`;
            return;
        }

        // ~번째 글 div
        let noDiv = document.createElement("div");
        noDiv.className = "row justify-content-center";
        let noPhrase = document.createElement("p");
        noPhrase.className = "title-font";
        noPhrase.appendChild(document.createTextNode(`${no}번째 글`));
        noDiv.appendChild(noPhrase);
        articleContainer.appendChild(noDiv);

        // 제목 div
        let titleDiv = document.createElement("div");
        titleDiv.className = "row justify-content-center my-2";
        let titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title");
        titleLabel.appendChild(document.createElement("제목"));
        titleDiv.appendChild(titleLabel);
        let titleInput = document.createElement("input");
        titleInput.className = "form-control";
        titleInput.setAttribute("id", "title");
        titleInput.setAttribute("name", "title");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("value", article.title);
        titleDiv.appendChild(titleInput);
        articleContainer.appendChild(titleDiv);

        // 내용 div
        let contentDiv = document.createElement("div");
        contentDiv.className = "row justify-content-center my-2";
        let contentlabel = document.createElement("label");
        contentlabel.setAttribute("for", "content");
        contentlabel.appendChild(document.createElement("내용"));
        contentDiv.appendChild(contentlabel);
        let contentTextarea = document.createElement("textarea");
        contentTextarea.className = "form-control";
        contentTextarea.setAttribute("id", "content");
        contentTextarea.setAttribute("name", "content");
        contentTextarea.setAttribute("type", "text");
        contentTextarea.setAttribute("rows", "10");
        contentTextarea.appendChild(document.createTextNode(article.content));
        contentDiv.appendChild(contentTextarea);
        articleContainer.appendChild(contentDiv);

        // btn div
        let btnDiv = document.createElement("div");
        btnDiv.className = "row justify-content-center";
        let btnAnchor1 = document.createElement("a");
        btnAnchor1.className = "btn btn-primary col-auto mx-2";
        btnAnchor1.setAttribute("href", `javascript:updateArticle(${no})`);
        btnAnchor1.appendChild(document.createTextNode("수정완료"));
        btnDiv.appendChild(btnAnchor1);
        let btnAnchor2 = document.createElement("a");
        btnAnchor2.className = "btn btn-secondary col-auto mx-2";
        btnAnchor2.setAttribute("href", `/getArticle.html?no=${no}`);
        btnAnchor2.appendChild(document.createTextNode("돌아가기"));
        btnDiv.appendChild(btnAnchor2);
        articleContainer.appendChild(btnDiv);
    }
};
/**
 * ~번째 게시글 수정 폼 불러오기 로직 끝
 */

/**
 * ~번째 게시글 수정 로직
 */
let updateArticle = function (no) {
    // 게시글 DB
    let articles = localStorage.getItem("articles");

    let arr = JSON.parse(articles);

    // 저장할 게시글
    let article = {
        title: document.querySelector("#title").value,
        content: document.querySelector("#content").value,
        date: JSON.parse(arr[no]).date,
        author: JSON.parse(arr[no]).author,
    };

    arr[no] = JSON.stringify(article);

    localStorage.setItem("articles", JSON.stringify(arr));

    location.href = `/getArticle.html?no=${no}`;
};
/**
 * ~번째 게시글 수정 로직 끝
 */
/**
 * ~번째 게시글 삭제 로직
 */
let deleteArticle = function (no) {
    // 본인만 삭제할 수 있게 아이디 검증
    let loginId = getCookie("id");

    // 게시글 DB
    let articles = localStorage.getItem("articles");

    let arr = JSON.parse(articles);

    let article = JSON.parse(arr[no]);

    if (loginId !== article.author) {
        alert("본인만 삭제할 수 있습니다!");
        return;
    }

    if (confirm("정말 삭제하시겠습니까?")) {
        arr.splice(no, 1);

        localStorage.setItem("articles", JSON.stringify(arr));

        location.href = "/getArticleList.html";
    }
};
/**
 * ~번째 게시글 삭제 로직 끝
 */
