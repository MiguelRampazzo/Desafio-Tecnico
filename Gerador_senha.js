const resultadoEl = document.getElementById('senhaGerada');
const comprimentoEl = document.getElementById('comprimento');
const maiusculasEl = document.getElementById('maiusculas');
const minusculasEl = document.getElementById('minusculas');
const numerosEl = document.getElementById('numeros');
const simbolosEl = document.getElementById('simbolos');
const btnGerarEl = document.getElementById('btnGerar');
const btnCopiarEl = document.getElementById('btnCopiar');

const caracteres = {
    maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    minusculas: 'abcdefghijklmnopqrstuvwxyz',
    numeros: '0123456789',
    simbolos: '!@#$%^&*()_+[]{}|;:,.<>?'
};

function gerarSenha() {
    const comprimento = +comprimentoEl.value;
    
    if (comprimento < 4 || comprimento > 32) {
        alert('Por favor, escolha um comprimento entre 4 e 32.');
        return '';
    }

    let caracteresPermitidos = '';
    
    if (maiusculasEl.checked) {
        caracteresPermitidos += caracteres.maiusculas;
    }
    if (minusculasEl.checked) {
        caracteresPermitidos += caracteres.minusculas;
    }
    if (numerosEl.checked) {
        caracteresPermitidos += caracteres.numeros;
    }
    if (simbolosEl.checked) {
        caracteresPermitidos += caracteres.simbolos;
    }
    
    if (caracteresPermitidos === '') {
        alert('Por favor, selecione pelo menos um tipo de caractere.');
        return '';
    }
    
    let senhaGerada = '';
    
    for (let i = 0; i < comprimento; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senhaGerada += caracteresPermitidos[indiceAleatorio];
    }
    
    return senhaGerada;
}


btnGerarEl.addEventListener('click', () => {
    const senha = gerarSenha();
    resultadoEl.value = senha;
});

btnCopiarEl.addEventListener('click', () => {
    const senha = resultadoEl.value;
    
    if (!senha) {
        return;
    }
    
    navigator.clipboard.writeText(senha)
        .then(() => {
            alert('Senha copiada para a área de transferência!');
        })
        .catch(err => {
            console.error('Falha ao copiar a senha: ', err);
        });
});