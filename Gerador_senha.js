const resultadoEl = document.getElementById('senhaGerada');
const comprimentoEl = document.getElementById('comprimento');
const maiusculasEl = document.getElementById('maiusculas');
const minusculasEl = document.getElementById('minusculas');
const numerosEl = document.getElementById('numeros');
const simbolosEl = document.getElementById('simbolos');
const btnGerarEl = document.getElementById('btnGerar');
const btnCopiarEl = document.getElementById('btnCopiar');

const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const letrasMinusculas = 'abcdefghijklmnopqrstuvwxyz';
const todosNumeros = '0123456789';
const todosSimbolos = '!@#$%^&*()_+[]{}|;:,.<>?';


btnGerarEl.addEventListener('click', function() {
    
    const comprimento = Number(comprimentoEl.value);
    
    if (comprimento < 4 || comprimento > 32) {
        alert('Por favor, escolha um comprimento entre 4 e 32.');
        return; 
    }

    let caracteresPermitidos = '';
    
    if (maiusculasEl.checked === true) {
        caracteresPermitidos = caracteresPermitidos + letrasMaiusculas;
    }
    if (minusculasEl.checked === true) {
        caracteresPermitidos = caracteresPermitidos + letrasMinusculas;
    }
    if (numerosEl.checked === true) {
        caracteresPermitidos = caracteresPermitidos + todosNumeros;
    }
    if (simbolosEl.checked === true) {
        caracteresPermitidos = caracteresPermitidos + todosSimbolos;
    }
    
    if (caracteresPermitidos === '') {
        alert('Por favor, selecione pelo menos um tipo de caractere.');
        return;
    }
    
    let senhaFinal = '';
    for (let i = 0; i < comprimento; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senhaFinal = senhaFinal + caracteresPermitidos[indiceAleatorio];
    }
    
    resultadoEl.value = senhaFinal;

});


btnCopiarEl.addEventListener('click', function() {
    const senha = resultadoEl.value;
    
    if (senha === '') {
        return;
    }
    
    resultadoEl.select();
    resultadoEl.setSelectionRange(0, 99999); 

    document.execCommand('copy');
    
    alert('Senha copiada para a área de transferência!');
});
