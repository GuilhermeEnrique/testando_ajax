
$(document).click(function () {
    $("#btnCadastrar").click(function () {
        var obj = {
            txtCEP: $("#txtCEP").val(),
            txtRua: $("#txtRua").val(),
            txtDDD: $("#txtDDD").val(),
            txtBairro: $("#txtBairro").val(),
            txtEstado: $("#txtEstado").val(),
            txtCidade: $("#txtCidade").val()
        };

        console.log(obj);

        $.ajax({
            url: "UserAction.php?req=1",
            type: "POST",
            dataType: "TEXT",
            data: obj,
            beforeSend: function () {
                $('#spResultado').html("Processando. . . ");
            },
            success: function (data) {
                console.log(data);
                if (data == "1") {
                    $('#spResultado').css("color", "green");
                    $('#spResultado').html("Cadastrado.");
                } else {
                    $('#spResultado').css("color", "red");
                    $('#spResultado').html("Houve um erro ao tentar cadastrar, tente mais tarde.");
                }
            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#btnConsultar").click(function () {
        $.ajax({
            url: "UserAction.php?req=2",
            type: "GET",
            dataType: "TEXT",
            data: {},
            success: function (data) {
                console.log(data);
                $("#bqResultado").html(data);

                var dt = data.split("|");
                $("#txtCEP").val(dt[0].split(":")[1]);
                $("#txtRua").val(dt[1].split(":")[1]);
                $("#txtLogradouro").val(dt[2].split(":")[1]);
                $("#txtBairro").val(dt[3].split(":")[1]);
                $("#txtEstado").val(dt[4].split(":")[1]);
                $("#txtCidade").val(dt[5].split(":")[1]);

            },
            error: function (error) {
                console.log(error);
            }
        });
    });

    $("#txtCEP").focusout(function () {
        if ($("#txtCEP").val().length >= 5) {
            var cep = $("#txtCEP").val().replace("-", "");

            var url = "https://viacep.com.br/ws/" + cep + "/json/";
            console.log(url);
            $.ajax({
                url: url,
                type: "GET",
                dataType: "JSONP",
                data: {},
                success: function (data) {
                    console.log(data);
                    if (data != null) {
                        $("#txtRua").val(data.logradouro);
                        $("#txtDDD").val(data.ddd);
                        $("#txtBairro").val(data.bairro);
                        $("#txtEstado").val(data.uf);
                        $("#txtCidade").val(data.localidade);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        }

    })
    
});