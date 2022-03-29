let url = "https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes";
let regcode = "*00000000";
// 전국 특별/광역시, 도

window.onload = function () {
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

    $("#dong").change(function () {
        dong_val = $(this).val();
        dong_text = $("#dong option:checked").text();

        if (state_text != undefined && city_text != undefined && dong_text != undefined) {
            let endpoint = "getDongPrice.html";

            let url = `${endpoint}?state=${state_text}&city=${city_text}&dong=${dong_text}&code=${dong_val}`;

            location.href = url;
        } else {
            console.log(state_val);
            console.log(city_val);
            console.log(dong_val);

            alert("빈 칸이 있습니다!");
        }
    });
};
