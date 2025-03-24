
const modalCriarConta = new bootstrap.Modal("#modal-criar-conta");
let usuarioLogado = sessionStorage.getItem("sessao-momento");
const usuarioSalvo = localStorage.getItem("sessao-salva");

checarSessaoLog();

//Logar no sistema (formulario de login)
document.getElementById("form-login").addEventListener("submit", function (evento) {
    evento.preventDefault(); //para não ir para outra pagina
    const email = document.getElementById("input-Email").value;
    const senha = document.getElementById("input-Senha").value;
    const checkLogado = document.getElementById("inputCheckbox").checked;

    const conta = pegarConta(email);

    if(!conta){
        alert("Usuario não encontrado! Verifique se o email e a senha estão corretos");
        return;
    }
    if(conta){
        if(conta.senha !== senha){
            alert("Usuario não encontrado! Verifique se o email e a senha estão corretos");
            return;
        }

        salvarSessao(email, checkLogado);
        //caso encontre a conta irá ser direcionado para a janela do home.html
        window.location.href = "home.html";
    }

})

//Criar Conta (modal com formulario para criar conta)
document.getElementById("form-criar-conta").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const email = document.getElementById("inputEmail").value;
    const senha = document.getElementById("inputSenha").value;

    if(email.length < 5){
        alert("Preencha o campo com email válido.");
        return;
    }
    if(senha.length < 4){
        alert("A senha deve ter no minímo 4 digitos.");
        return;
    }

    let novoUsuario = {
        email: email,
        senha: senha,
        transacoes: []
    }
    salvarConta(novoUsuario);
    
    modalCriarConta.hide();
    alert("Conta criada com sucesso!");
});

function salvarConta(usuario){
    localStorage.setItem(usuario.email, JSON.stringify(usuario));
}

function pegarConta(keyConta){
    const conta = localStorage.getItem(keyConta);

    if(conta){
       //transformando a string recuperado no localStorage para um objeto
       return JSON.parse(conta); 
    }
    return "";
}

function salvarSessao(login, statusCheck){
    if(statusCheck){
        localStorage.setItem("sessao-salva", login); //mantem salvo os dados de login (permanecer logado)
    }

    sessionStorage.setItem("sessao-momento", login); //salva somente enquanto o navegador esta aberto (nao permanecer logado)
}

//verificar se o usuario quer permanecer logado na conta
function checarSessaoLog(){
    if(usuarioSalvo){
        sessionStorage.setItem("logged", usuarioSalvo);
        usuarioLogado = usuarioSalvo;
    }

    if(usuarioLogado){
        salvarSessao(usuarioLogado, usuarioSalvo);
        window.location.href = "home.html";
    }
}