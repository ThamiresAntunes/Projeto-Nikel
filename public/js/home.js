const modalCriarConta = new bootstrap.Modal("#modal-transacoes");
let usuarioLogado = sessionStorage.getItem("sessao-momento");
const usuarioSalvo = localStorage.getItem("sessao-salva");
let dado = {
    transacoes: []
};

checarSessaoLog();

document.getElementById("btn-sair").addEventListener("click", sair);
document.getElementById("btn-ver+").addEventListener("click", function(){
    window.location.href = "transacoes.html";
})

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

    getEntrada();
    getSaida();
    getTotal();

    alert("Lançamento adicionado com sucesso.");
});

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
    getEntrada();
    getSaida();
    getTotal();
}

function sair(){
    sessionStorage.removeItem("sessao-momento");
    localStorage.removeItem("sessao-salva");

    window.location.href = "index.html";
}

//salvar transacao
function salvarDado(dado){
    localStorage.setItem(dado.email, JSON.stringify(dado));
}

function getEntrada(){
    const transacoes = dado.transacoes;
    const entradas = transacoes.filter((item) => item.tipo === "1");

    if(entradas.length){ //se tiver valores de entrada
        let entradasHtml = ``;
        let limite = 0;

        if(entradas.length > 5){
            limite = 5;
        } else{
            limite = entradas.length;
        }

        for (let i = 0; i < limite; i++) {
            entradasHtml += `
                <div class="row mb-4">
                    <div class="col-12"> 
                        <h3 class="fs-2">R$ ${entradas[i].valor.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${entradas[i].descricao}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${entradas[i].data}
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            `; 
        }

        document.getElementById("lista-entradas").innerHTML = entradasHtml;
    }
}

function getSaida(){
    const transacoes = dado.transacoes;
    const saidas = transacoes.filter((item) => item.tipo === "2");

    if(saidas.length){ //se tiver valores de entrada
        let saidasHtml = ``;
        let limite = 0;

        if(saidas.length > 5){
            limite = 5;
        } else{
            limite = saidas.length;
        }

        for (let i = 0; i < limite; i++) {
            saidasHtml += `
                <div class="row mb-4">
                    <div class="col-12"> 
                        <h3 class="fs-2">R$ ${saidas[i].valor.toFixed(2)}</h3>
                        <div class="container p-0">
                            <div class="row">
                                <div class="col-12 col-md-8">
                                    <p>${saidas[i].descricao}</p>
                                </div>
                                <div class="col-12 col-md-3 d-flex justify-content-end">
                                    ${saidas[i].data}
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            `; 
        }

        document.getElementById("lista-saidas").innerHTML = saidasHtml;
    }
}

function getTotal(){
    const transacoes = dado.transacoes;
    let total = 0;
    transacoes.forEach( (item) => {
        //se for tipo 1 (entrada) soma o valor no total, se nao subtrai o valor do total
        if(item.tipo === "1"){
            total+= item.valor;
        } 
        else{
            total -= item.valor;
        }
    });

    document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
}
