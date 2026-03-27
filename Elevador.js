const elevadorEl = document.getElementById('elevador');
const logEl = document.getElementById('log');
const botoesPainel = document.querySelectorAll('.botoes-painel button');

let andarAtual = 1;

for (let i = 0; i < botoesPainel.length; i++) {
    const botao = botoesPainel[i];

    botao.addEventListener('click', function() {
        const andarDesejado = parseInt(botao.dataset.andar);

        if (andarAtual === andarDesejado) {
            const mensagem = 'Elevador já está no ' + andarAtual + 'º andar.';
            
            logEl.textContent = mensagem;
            console.log(mensagem);
            
            return;
        }

        const mensagemMovendo = 'Movendo do ' + andarAtual + 'º para o ' + andarDesejado + 'º andar.';
        logEl.textContent = mensagemMovendo;
        console.log(mensagemMovendo);

        const posicaoBottom = (andarDesejado - 1) * 150;

        elevadorEl.style.bottom = posicaoBottom + 'px';

        andarAtual = andarDesejado;

        const mensagemChegou = 'Elevador chegou ao ' + andarAtual + 'º andar.';
        logEl.textContent = mensagemChegou;
        console.log(mensagemChegou);
        
    });
}
