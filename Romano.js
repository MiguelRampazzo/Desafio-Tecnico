const romanoInput = document.getElementById('romanoInput');
const decimalInput = document.getElementById('decimalInput');
const btnConverter = document.getElementById('btnConverter');
const btnInverter = document.getElementById('btnInverter');
const resultadoTexto = document.getElementById('resultadoTexto');
const labelRomano = document.getElementById('label-romano');
const labelDecimal = document.getElementById('label-decimal');


function romanoParaDecimal(numeroRomano) {
    const mapaRomano = { 'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000 };
    const romano = numeroRomano.toUpperCase();
    let valorDecimal = 0;
    
    for (let i = 0; i < romano.length; i++) {
        const valorAtual = mapaRomano[romano[i]];
        const valorProximo = mapaRomano[romano[i + 1]]; // Pega o próximo valor

        // Se o próximo valor existir e for maior, subtraímos (ex: IV, IX, XL)
        if (valorProximo !== undefined && valorAtual < valorProximo) {
            valorDecimal = valorDecimal - valorAtual;
        } else {
            valorDecimal = valorDecimal + valorAtual;
        }
    }
    return { resultado: valorDecimal };
}

function decimalParaRomano(numeroDecimal) {
    if (numeroDecimal <= 0 || numeroDecimal >= 4000) {
        return { erro: "O número deve estar entre 1 e 3999." };
    }

    const mapaValores = [
        { valor: 1000, simbolo: "M" }, { valor: 900, simbolo: "CM" },
        { valor: 500, simbolo: "D" }, { valor: 400, simbolo: "CD" },
        { valor: 100, simbolo: "C" }, { valor: 90, simbolo: "XC" },
        { valor: 50, simbolo: "L" }, { valor: 40, simbolo: "XL" },
        { valor: 10, simbolo: "X" }, { valor: 9, simbolo: "IX" },
        { valor: 5, simbolo: "V" }, { valor: 4, simbolo: "IV" },
        { valor: 1, simbolo: "I" }
    ];

    let resultadoRomano = '';
    let num = numeroDecimal;

    for (let i = 0; i < mapaValores.length; i++) {
        const par = mapaValores[i];
        while (num >= par.valor) {
            resultadoRomano = resultadoRomano + par.simbolo;
            num = num - par.valor;
        }
    }
    return { resultado: resultadoRomano };
}


let modoRomanoParaDecimal = true;

function definirEstadoInicial() {
    romanoInput.disabled = false;
    decimalInput.disabled = true;
    labelRomano.style.fontWeight = 'bold';
    labelDecimal.style.fontWeight = 'normal';
    romanoInput.value = '';
    decimalInput.value = '';
    resultadoTexto.textContent = '';
}

btnInverter.addEventListener('click', function() {
    if (modoRomanoParaDecimal === true) {
        modoRomanoParaDecimal = false;
    } else {
        modoRomanoParaDecimal = true;
    }

    if (modoRomanoParaDecimal) {
        romanoInput.disabled = false;
        decimalInput.disabled = true;
        labelRomano.style.fontWeight = 'bold';
        labelDecimal.style.fontWeight = 'normal';
    } else {
        // Mudar para o modo Decimal -> Romano
        romanoInput.disabled = true;
        decimalInput.disabled = false;
        labelRomano.style.fontWeight = 'normal';
        labelDecimal.style.fontWeight = 'bold';
    }

    romanoInput.value = '';
    decimalInput.value = '';
    resultadoTexto.textContent = '';
});

btnConverter.addEventListener('click', function() {
    
    resultadoTexto.classList.remove('erro');

    if (modoRomanoParaDecimal === true) {
        const valorRomano = romanoInput.value;

        if (valorRomano === '') {
            resultadoTexto.textContent = 'Por favor, insira um número romano.';
            resultadoTexto.classList.add('erro');
            return;
        }

        const resultado = romanoParaDecimal(valorRomano);

        if (resultado.erro) {
            resultadoTexto.textContent = resultado.erro;
            resultadoTexto.classList.add('erro');
            decimalInput.value = '';
        } else {
            decimalInput.value = resultado.resultado;
            resultadoTexto.textContent = 'Resultado: ' + resultado.resultado;
        }

    } else {
        const valorDecimal = decimalInput.value;

        if (valorDecimal === '') {
            resultadoTexto.textContent = 'Por favor, insira um número decimal.';
            resultadoTexto.classList.add('erro');
            return;
        }

        const numeroParaConverter = parseInt(valorDecimal, 10);
        const resultado = decimalParaRomano(numeroParaConverter);

        if (resultado.erro) {
            resultadoTexto.textContent = resultado.erro;
            resultadoTexto.classList.add('erro');
            romanoInput.value = '';
        } else {
            romanoInput.value = resultado.resultado;
            resultadoTexto.textContent = 'Resultado: ' + resultado.resultado;
        }
    }
});

definirEstadoInicial();
