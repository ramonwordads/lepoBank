import ehUmCPF from "./valida-cpf.js";
import maiorDeIdade from "./valida-idade.js";
const camposDoFormulario = document.querySelectorAll("[required]");
const formulario = document.querySelector("[data-formulario]");

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const listaRespostas = {
        "nome": e.target.elements["nome"].value,
        "email": e.target.elements["email"].value,
        "cpf": e.target.elements["cpf"].value,
        "nascimento": e.target.elements["nascimento"].value,
        "cep": e.target.elements["cep"].value,
        "bairro": e.target.elements["bairro"].value,
        "logradouro": e.target.elements["logradouro"].value,
        "cidade": e.target.elements["cidade"].value,
        "estado": e.target.elements["estado"].value
    }

    localStorage.setItem("cadastro", JSON.stringify(listaRespostas));
    window.location.href = './abrir-conta2.html';
})

async function buscaEndereco(cep){
    var mensagemDeErro = document.getElementById('erro');
    mensagemDeErro = '';
    try{
    const consultaCEP = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const consultaCEPConvertida = await consultaCEP.json();
    if(consultaCEPConvertida.erro){
        throw Error('CEP inexistente!')
    }

    var bairro = document.getElementById('bairro')
    var logradouro = document.getElementById('logradouro')
    var cidade = document.getElementById('cidade')
    var estado = document.getElementById('estado')

    bairro.value = consultaCEPConvertida.bairro
    logradouro.value = consultaCEPConvertida.logradouro
    cidade.value = consultaCEPConvertida.localidade
    estado.value = consultaCEPConvertida.uf

    console.log(consultaCEPConvertida)
    return consultaCEPConvertida
}catch(erro){
    mensagemDeErro.innerHTML = `<p>CEP Inválido </p>`
    console.log(erro)
}

}
var cep = document.getElementById('cep');
cep.addEventListener("focusout", () => buscaEndereco(cep.value))





camposDoFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo))
    campo.addEventListener("invalid", evento => evento.preventDefault())
    
})

function verificaCampo(campo){
    let mensagem = ""
    campo.setCustomValidity('')

    if(campo.name == "cpf" && campo.value.length >= 11){
        ehUmCPF(campo)
    }

    if(campo.name == "nascimento" && campo.value != ""){
        maiorDeIdade(campo)
    }

    


    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro]
            console.log(mensagem)
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')
    const validadorDeInput = campo.checkValidity()

    if(!validadorDeInput){
        mensagemErro.textContent = mensagem
        campo.classList.remove('mensagem-erro-valida')
    }else {
        mensagemErro.textContent = "";
        campo.classList.add('mensagem-erro-valida')
    }
}


const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo esta vazio, preencha com seu nome completo!",
        patternMismatch: "Por favor, preencha com um nome valido.",
        tooShort: "Nome muito curto, preencha com no minimo 2 caracteres."
    },

    email: {
        valueMissing: "O campo esta vazio, preencha com seu E-mail completo!",
        patternMismatch: "Por favor, preencha com um E-mail valido.",
        tooShort: "E-mail muito curto, preencha com no minimo 2 caracteres."
    },

    cpf: {
        valueMissing: "O campo esta vazio, preencha com seu CPF completo!",
        patternMismatch: "Por favor, preencha com um CPF valido.",
        customError: "Este CPF Não é valido, preencha novamente!",
        tooShort: "Nome muito curto, preencha com no minimo 2 caracteres."
    },

    nascimento: {
        valueMissing: "O campo esta vazio, preencha com sua data de nascimento!",
        patternMismatch: "Por favor, preencha com uma data valida.",
        customError: "É necessário ser maior de 18 anos para realizar o cadastro",
        tooShort: "Da muito curta, preencha com no minimo 2 caracteres."
    },

    cep: {
        valueMissing: "O campo esta vazio, digite seu endereço de CEP",
        patternMismatch: "Por favor, preencha com  CEP valido",
        tooShort: "CEP muito curto, preencha novamente um CEP valido.",
        customError: "Não foi possível localizar o Endereço de CEP"
    },

    bairro: {
        valueMissing: "O campo esta vazio, preencha com seu bairro correto",
        patternMismatch: "Por favor, preencha com um bairro valido.",
        tooShort: "bairro muito curto, preencha com no minimo 2 caracteres."
    },

    logradouro: {
        valueMissing: "O campo esta vazio, preencha com seu endereço de logradouro",
        patternMismatch: "Por favor, preencha com um endereço valido.",
        tooShort: "endereço muito curto, preencha com no minimo 2 caracteres."
    },

    cidade: {
        valueMissing: "O campo esta vazio, preencha com sua cidade",
        patternMismatch: "Por favor, preencha com uma cidade valida",
        tooShort: "cidade muito curta, preencha com no minimo 2 caracteres."
    },

    estado: {
        valueMissing: "O campo esta vazio, preencha com seu estado correto",
        patternMismatch: "Por favor, preencha com um estado valido.",
        tooShort: "estado muito curto, preencha com no minimo 2 caracteres."
    }
}