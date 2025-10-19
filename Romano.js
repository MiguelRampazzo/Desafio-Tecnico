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
        if (!mapaRomano[romano[i]]) {
            return { erro: `O símbolo '${romano[i]}' não é válido.` };
        }

        const valorAtual = mapaRomano[romano[i]];
        const valorProximo = mapaRomano[romano[i + 1]];

        if (valorProximo && valorAtual < valorProximo) {
            valorDecimal -= valorAtual;
        } else {
            valorDecimal += valorAtual;
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

    for (const par of mapaValores) {
        while (num >= par.valor) {
            resultadoRomano += par.simbolo;
            num -= par.valor;
        }
    }
    return { resultado: resultadoRomano };
}


let modoRomanoParaDecimal = true;

function atualizarInterface() {
    if (modoRomanoParaDecimal) {
        romanoInput.disabled = false;
        decimalInput.disabled = true;
        romanoInput.focus();
        labelRomano.style.fontWeight = 'bold';
        labelDecimal.style.fontWeight = 'normal';
    } else {
        romanoInput.disabled = true;
        decimalInput.disabled = false;
        decimalInput.focus();
        labelRomano.style.fontWeight = 'normal';
        labelDecimal.style.fontWeight = 'bold';
    }
    romanoInput.value = '';
    decimalInput.value = '';
    resultadoTexto.textContent = '';
}

btnInverter.addEventListener('click', () => {
    modoRomanoParaDecimal = !modoRomanoParaDecimal;
    atualizarInterface();
});

btnConverter.addEventListener('click', () => {
    resultadoTexto.textContent = '';
    resultadoTexto.classList.remove('erro');

    let resultado;
    if (modoRomanoParaDecimal) {
        if (!romanoInput.value) return;
        resultado = romanoParaDecimal(romanoInput.value);
        decimalInput.value = resultado.resultado || '';
    } else {
        if (!decimalInput.value) return;
        resultado = decimalParaRomano(parseInt(decimalInput.value, 10));
        romanoInput.value = resultado.resultado || '';
    }
    
    if (resultado.erro) {
        resultadoTexto.textContent = resultado.erro;
        resultadoTexto.classList.add('erro');
    } else {
        resultadoTexto.textContent = `Resultado: ${resultado.resultado}`;
    }
});

atualizarInterface();