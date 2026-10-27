
const readlineSync = require('readline-sync');
const { cadastrarVeiculos, exibirFechamento } = require('./operacoes');


let placas = [];
let horas = [];
let tipos = [];

let opcao = '';

while (opcao !== '3') {
    console.log('\n===== ESTACIONAMENTO =====');
    console.log('1 - Registrar veículos');
    console.log('2 - Exibir fechamento');
    console.log('3 - Encerrar');

    opcao = readlineSync.question('Escolha uma Opcao: ').trim();

    switch (opcao) {
        case '1':
            cadastrarVeiculos(placas, horas, tipos);
            break;

        case '2':
            
            if (placas.length === 0) {
                console.log('\nAinda não há veículos registrados. Use a opção 1 primeiro.');
            } else {
                exibirFechamento(placas, horas, tipos);
            }
            break;

        case '3':
            console.log('\nPrograma encerrado. Bom descanso!');
            break;

        default:
            console.log('\nOpção inexistente. Escolha 1, 2 ou 3.');
    }
}
