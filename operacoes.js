// operacoes.js
// Aqui ficam as duas "tarefas" do programa: cadastrar os veículos e fechar o turno.

const readlineSync = require('readline-sync');

// Quantos veículos saíram durante o turno
const QUANTIDADE_VEICULOS = 4;

// Formata um número como dinheiro, do jeito que a gente fala: R$ 28,00
function formatarDinheiro(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',');
}

// -------------------------------------------------------------------
// CADASTRO
// Pergunta os dados dos 4 veículos e guarda nos três arrays.
// Se já existia um cadastro, ele é apagado: o novo lote substitui o antigo.
// -------------------------------------------------------------------
function cadastrarVeiculos(placas, horas, tipos) {
    // Esvazia os arrays (mantendo as mesmas referências do index.js)
    placas.length = 0;
    horas.length = 0;
    tipos.length = 0;

    console.log('\n=== Registro de saída de veículos ===');

    for (let i = 0; i < QUANTIDADE_VEICULOS; i++) {
        console.log(`\n--- Veículo ${i + 1} de ${QUANTIDADE_VEICULOS} ---`);

        // Placa: não pode ficar em branco
        let placa = readlineSync.question('Placa: ').trim();
        while (placa === '') {
            console.log('A placa não pode ficar vazia. Tente de novo.');
            placa = readlineSync.question('Placa: ').trim();
        }

        // Horas: precisa ser um número inteiro maior que zero
        let textoHoras = readlineSync.question('Horas estacionado: ').trim();
        let qtdHoras = Number(textoHoras);
        while (textoHoras === '' || !Number.isInteger(qtdHoras) || qtdHoras <= 0) {
            console.log('Digite um número inteiro maior que zero (exemplo: 3).');
            textoHoras = readlineSync.question('Horas estacionado: ').trim();
            qtdHoras = Number(textoHoras);
        }

        // Tipo: só vale 1, 2 ou 3
        console.log('Tipo do veículo: 1 - Moto | 2 - Carro | 3 - Utilitário');
        let textoTipo = readlineSync.question('Tipo: ').trim();
        let tipo = Number(textoTipo);
        while (textoTipo === '' || !Number.isInteger(tipo) || tipo < 1 || tipo > 3) {
            console.log('Tipo inválido. Escolha 1 (Moto), 2 (Carro) ou 3 (Utilitário).');
            textoTipo = readlineSync.question('Tipo: ').trim();
            tipo = Number(textoTipo);
        }

        // Tudo certo: guarda os três dados na mesma posição dos arrays
        placas.push(placa);
        horas.push(qtdHoras);
        tipos.push(tipo);
    }

    console.log('\nPronto! Os 4 veículos foram registrados.');
}

// -------------------------------------------------------------------
// FECHAMENTO
// Calcula quanto cada veículo deve pagar e mostra o resumo do turno.
// Tudo é calculado na hora, com os dados que estão cadastrados agora.
// -------------------------------------------------------------------
function exibirFechamento(placas, horas, tipos) {
    let totalArrecadado = 0;
    let quantidadeMaisDe4Horas = 0;
    let placaMaiorValor = '';
    let maiorValor = 0;

    console.log('\n=== Fechamento do turno ===');

    for (let i = 0; i < placas.length; i++) {
        // Descobre o nome do tipo e o valor cobrado por hora
        let nomeTipo = '';
        let valorPorHora = 0;

        if (tipos[i] === 1) {
            nomeTipo = 'Moto';
            valorPorHora = 3;
        } else if (tipos[i] === 2) {
            nomeTipo = 'Carro';
            valorPorHora = 5;
        } else {
            nomeTipo = 'Utilitário';
            valorPorHora = 8;
        }

        // Valor base: horas x preço da hora
        let valorFinal = horas[i] * valorPorHora;

        // Passou de 4 horas? Ganha R$ 2,00 de desconto (uma vez só)
        if (horas[i] > 4) {
            valorFinal = valorFinal - 2;
            quantidadeMaisDe4Horas++;
        }

        totalArrecadado += valorFinal;

        // O ">" (e não ">=") garante que, em caso de empate,
        // fica o primeiro veículo cadastrado.
        if (i === 0 || valorFinal > maiorValor) {
            maiorValor = valorFinal;
            placaMaiorValor = placas[i];
        }

        console.log(
            `Placa: ${placas[i]} | Horas: ${horas[i]} | Tipo: ${nomeTipo} | A pagar: ${formatarDinheiro(valorFinal)}`
        );
    }

    console.log('\n--- Resumo ---');
    console.log(`Total arrecadado: ${formatarDinheiro(totalArrecadado)}`);
    console.log(`Veículos que ficaram mais de 4 horas: ${quantidadeMaisDe4Horas}`);
    console.log(`Maior valor final: ${formatarDinheiro(maiorValor)} (placa ${placaMaiorValor})`);
}

module.exports = {
    cadastrarVeiculos,
    exibirFechamento
};
