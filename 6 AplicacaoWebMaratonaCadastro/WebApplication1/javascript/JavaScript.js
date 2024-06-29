$(document).ready(function () {    
    $("#dataHora").css("background-color", "cyan");
    $(".itemMenu").css("background-color", "lightcyan");
    $("#dataHora").html(new Date().toString());
    $("#imagem").attr("src", "http://via.placeholder.com/300x50");
    $("#imagem").attr("alt", "Uma imagem com texto 300x50");

    function atualizarRelogio() {
        const options = {
            year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
            hour12: false
        };
        const now = new Date();
        const formattedDate = now.toLocaleString('pt-BR', options);
        $("#dataHora").html(formattedDate);
    }
    setInterval(atualizarRelogio, 1000);
    atualizarRelogio();


    $("#imagem").click(function () {
        $.get("ASP_get.asp", function (data, status) {
            alert("Dados:" + data + "\n" + "Status" + status);
        });
    });
    $("#fotoDestaque").click(function () {
        $.post("ASP_post.asp",
            {
                Nome: "Luiz Felipe T Carvalho",
                Cidade: "Mogi das Cruzes"
            },
            function (data, status) {
                alert("Dados:" + data + "\n" + "Status:" + status);
            });
    });
    $("#importarCep").hide(); // Certifique-se de que o formulário está oculto no início

    $("#btnImportarCep").click(function () {
        $("#importarCep").toggle();

        if ($("#importarCep").is(":visible")) {
            $(this).text("Esconder Formulário CEP"); // Altera o texto do botão quando o formulário é exibido
        } else {
            $(this).text("Mostrar Formulário CEP"); // Altera o texto do botão quando o formulário é escondido
        }
    });
    
});



function consultarDadosPeloCEP() {
    var conteudoCEP = document.getElementById("cep").value;
    var url = "https://viacep.com.br/ws/" + conteudoCEP + "/json/";

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var objetoResposta = JSON.parse(this.responseText);
                if (!objetoResposta.erro) {
                    document.getElementById("uf").value = objetoResposta.uf;
                    document.getElementById("cidade").value = objetoResposta.localidade;
                    document.getElementById("bairro").value = objetoResposta.bairro;
                    document.getElementById("logradouro").value = objetoResposta.logradouro;
                } else {
                    alert("CEP não encontrado.");
                }
            } else {
                alert("Erro ao consultar o CEP.");
            }

            document.getElementById("carregando").style.display = "none";
        }
    };

    xhttp.open("GET", url, true);
    xhttp.send();
    document.getElementById("carregando").style.display = "inline-table";
}