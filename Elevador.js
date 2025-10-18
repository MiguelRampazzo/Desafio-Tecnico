document.addEventListener('DOMContentLoaded', () => {
    const elevadorEl = document.getElementById('elevador');
    const logEl = document.getElementById('log');
    const botoesPainel = document.querySelectorAll('.botoes-painel button');

    let andarAtual = 1;

    function adicionarLog(mensagem) {
        logEl.textContent = mensagem;
        console.log(mensagem);
    }

    function moverPara(andarDestino) {
        if (andarAtual === andarDestino) {
            adicionarLog(`Elevador já está no ${andarAtual}º andar.`);
            return;
        }

        adicionarLog(`Movendo do ${andarAtual}º para o ${andarDestino}º andar.`);

        const posicaoBottom = (andarDestino - 1) * 150;
        elevadorEl.style.bottom = `${posicaoBottom}px`;

        andarAtual = andarDestino;

        adicionarLog(`Elevador chegou ao ${andarAtual}º andar.`);
    }

    botoesPainel.forEach(botao => {
        botao.addEventListener('click', () => {
            const andarDesejado = parseInt(botao.dataset.andar);
            
            moverPara(andarDesejado);
        });
    });
});