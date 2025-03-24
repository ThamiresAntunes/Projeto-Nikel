const modalCriarConta = new bootstrap.Modal("#modal-transacoes");
let usuarioLogado = sessionStorage.getItem("sessao-momento");
const usuarioSalvo = localStorage.getItem("sessao-salva");

let dado = {
    transacoes: []
};

document.getElementById("btn-sair").addEventListener("click", sair);

function sair(){
    sessionStorage.removeItem("sessao-momento");
    localStorage.removeItem("sessao-salva");

    window.location.href = "index.html";
}

checarSessaoLog();

//verificar se o usuario quer permanecer logado na conta
function checarSessaoLog(){
    if(usuarioSalvo){
        sessionStorage.setItem("sessao-momento", usuarioSalvo);
        usuarioLogado = usuarioSalvo;
    }
    //nao esta logado, manda de volta para a tela de login
    if(!usuarioLogado){
        window.location.href = "index.html";
        return;
    }
    const dadosUser = localStorage.getItem(usuarioLogado);
    if(dadosUser){
        dado = JSON.parse(dadosUser);
    }
    getTransacoes();
}

//Adicionar lançamento
document.getElementById("form-transacao").addEventListener("submit", function(evento) {
    evento.preventDefault();

    const valor = parseFloat(document.getElementById("inputValor").value);
    const descricao = document.getElementById("inputDescricao").value;
    const data = document.getElementById("inputData").value;
    const tipo = document.querySelector('input[name="tipoInput"]:checked').value;

    //adicionar sempre no inicio
    dado.transacoes.unshift({
        valor: valor, descricao: descricao, data: data, tipo: tipo
    });

    salvarDado(dado);
    evento.target.reset();
    modalCriarConta.hide();

    getTransacoes();

    alert("Lançamento adicionado com sucesso.");
});

//salvar transacao
function salvarDado(dado){
    localStorage.setItem(dado.email, JSON.stringify(dado));
}

function getTransacoes(){
    const transacoes = dado.transacoes;
    let transacoesHtml = ``;
    //se tiver transacoes
    if(transacoes.length){
        transacoes.forEach((item) => {
            let tipo = "Entrada";

            if(item.tipo === "2"){
                tipo = "Saída";
            }
            transacoesHtml += `
                <tr>
                    <th scope="row">${item.data}</th>
                    <td>${item.valor.toFixed(2)}</td>
                    <td>${tipo}</td>
                    <td>${item.descricao}</td>
                </tr>
            `
        })
    }
    document.getElementById("lista-transacoes").innerHTML = transacoesHtml;
}
