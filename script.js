let registros = [];

function adicionarPerguntaResposta() {
    const nome = document.getElementById('nome').value;
    const perguntasRespostas = [];

    // Adiciona perguntas e respostas
    let continuar = true;
    while (continuar) {
        const pergunta = prompt("Digite a pergunta (ou clique em Cancelar para parar):");
        if (pergunta === null) {
            continuar = false;
            break;
        }
        const resposta = prompt("Digite a resposta:");
        perguntasRespostas.push({ pergunta, resposta });
    }

    // Verifica se foram adicionadas perguntas
    if (perguntasRespostas.length === 0) {
        alert("Por favor, adicione pelo menos uma pergunta.");
        return;
    }

    // Adiciona o registro à lista de registros
    registros.push({ nome, perguntasRespostas });

    // Exibe o registro na página
    exibirRegistro(registros.length - 1);
}

function terminar() {
    // Aqui você poderia enviar os dados para o backend ou armazená-los em um banco de dados.
    // Por enquanto, vou apenas exibir os dados na página.
    exibirRegistros();
}

function exibirRegistro(index) {
    const registro = registros[index];
    const container = document.getElementById('container');
    container.innerHTML = ''; // Limpa o conteúdo do container

    // Criar o card para o registro atual
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    const nomeTitulo = document.createElement('h2');
    nomeTitulo.textContent = registro.nome;
    cardHeader.appendChild(nomeTitulo);

    // Botão para exibir perguntas e respostas
    const btnPerguntasRespostas = document.createElement('button');
    btnPerguntasRespostas.textContent = 'Perguntas/Respostas';
    btnPerguntasRespostas.addEventListener('click', function() {
        exibirPerguntasRespostas(cardContent, registro);
    });
    cardHeader.appendChild(btnPerguntasRespostas);

    card.appendChild(cardHeader);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.style.display = 'none';
    card.appendChild(cardContent);

    container.appendChild(card);
}

function exibirRegistro(index) {
    const registro = registros[index];
    const container = document.getElementById('container');

    // Criar o card para o registro atual
    const card = document.createElement('div');
    card.classList.add('card');

    const cardHeader = document.createElement('div');
    cardHeader.classList.add('card-header');
    const nomeTitulo = document.createElement('h2');
    nomeTitulo.textContent = registro.nome;
    cardHeader.appendChild(nomeTitulo);

    // Botão para exibir perguntas e respostas
    const btnPerguntasRespostas = document.createElement('button');
    btnPerguntasRespostas.textContent = 'Perguntas/Respostas';
    btnPerguntasRespostas.addEventListener('click', function() {
        exibirPerguntasRespostas(cardContent, registro);
    });
    cardHeader.appendChild(btnPerguntasRespostas);

    card.appendChild(cardHeader);

    const cardContent = document.createElement('div');
    cardContent.classList.add('card-content');
    cardContent.style.display = 'none';
    card.appendChild(cardContent);

    container.appendChild(card);
}

// Evento de clique para o botão "Salvar Nome"
const btnSalvarNome = document.getElementById('btn-salvar-nome');
btnSalvarNome.addEventListener('click', function() {
    const nome = document.getElementById('input-nome').value;
    if (nome.trim() !== '') {
        const novoRegistro = { nome: nome, perguntasRespostas: [] };
        registros.push(novoRegistro);
        exibirRegistro(registros.length - 1); // Exibir o novo registro
    }
});


function exibirPerguntasRespostas(cardContent, registro) {
    // Limpa o conteúdo do card
    cardContent.innerHTML = '';

    // Exibir a primeira pergunta e o botão para mostrar a resposta
    let indexPerguntaAtual = 0;
    let indexRespostaAtual = 0;

    const primeiraPergunta = registro.perguntasRespostas[indexPerguntaAtual];
    const perguntaElement = document.createElement('p');
    perguntaElement.textContent = `Pergunta: ${primeiraPergunta.pergunta}`;
    cardContent.appendChild(perguntaElement);

    const btnMostrarResposta = document.createElement('button');
    btnMostrarResposta.textContent = 'Mostrar Resposta';
    btnMostrarResposta.addEventListener('click', function() {
        mostrarResposta(registro, indexRespostaAtual, cardContent);
    });
    cardContent.appendChild(btnMostrarResposta);

    // Botão para avançar para a próxima pergunta e resposta
    const btnProximaPergunta = document.createElement('button');
    btnProximaPergunta.textContent = 'Próxima Pergunta';
    btnProximaPergunta.addEventListener('click', function() {
        indexPerguntaAtual++;
        if (indexPerguntaAtual < registro.perguntasRespostas.length) {
            indexRespostaAtual++; // Avança para a próxima resposta
            const pergunta = registro.perguntasRespostas[indexPerguntaAtual];
            perguntaElement.textContent = `Pergunta: ${pergunta.pergunta}`;
            btnMostrarResposta.textContent = 'Mostrar Resposta';
        } else {
            // Se não houver mais perguntas, ocultar o conteúdo do card
            cardContent.style.display = 'none';
        }
    });
    cardContent.appendChild(btnProximaPergunta);

    // Exibir o conteúdo do card
    cardContent.style.display = 'block';
}


function mostrarResposta(registro, index, cardContent) {
    const pergunta = registro.perguntasRespostas[index];
    const resposta = pergunta.resposta;

    // Remove qualquer resposta anterior
    const respostaAtual = cardContent.querySelector('.resposta');
    if (respostaAtual) {
        respostaAtual.textContent = `Resposta: ${resposta}`;
    } else {
        const respostaElement = document.createElement('p');
        respostaElement.classList.add('resposta');
        respostaElement.textContent = `Resposta: ${resposta}`;
        cardContent.appendChild(respostaElement);
    }
}


