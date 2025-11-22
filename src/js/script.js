// Lista de elementos disponíveis
const elementos = [
    "Fogo",
    "Água",
    "Terra",
    "Ar",
    "Luz",
    "Sombras",
    "Metal",
    "Gelo",
    "Vida",
    "Caos",
    "Café",
];

// Resultados aleatórios caso a fusão não exista
const resultadosAleatorios = [
    "Gelatina Explosiva",
    "Pó Místico Sabor Picanha",
    "Cobra de Fumaça",
    "Lodo Interdimensional",
    "Névoa com Cheiro de Café",
    "Peixe Invisível",
    "Pedra Chorona",
    "Luz Emburrada",
    "Bolha Mutante",
    "Areia Viva (literalmente)"
];

// DOM
const select1 = document.getElementById("elemento1");
const select2 = document.getElementById("elemento2");
const resultBox = document.getElementById("resultado");
const btnMisturar = document.getElementById("btn-misturar");

// Preenche os selects com os elementos
function carregarElementos() {
    elementos.forEach(el => {
        const opt1 = document.createElement("option");
        opt1.value = el;
        opt1.textContent = el;

        const opt2 = opt1.cloneNode(true);

        select1.appendChild(opt1);
        select2.appendChild(opt2);
    });
}

// Busca fusão pré-definida no JSON
async function buscarFusao(el1, el2) {
    try {
        const response = await fetch("data.json");
        const fusoes = await response.json();

        return fusoes.find(f =>
            (f.a === el1 && f.b === el2) ||
            (f.a === el2 && f.b === el1)
        );

    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        return null;
    }
}

// Retorna um resultado aleatório
function gerarResultadoAleatorio() {
    const aleatorio = Math.floor(Math.random() * resultadosAleatorios.length);
    return resultadosAleatorios[aleatorio];
}

// Lógica principal
btnMisturar.addEventListener("click", async () => {
    const el1 = select1.value;
    const el2 = select2.value;

    if (!el1 || !el2) {
        resultBox.textContent = "Selecione dois elementos!";
        return;
    }

    if (el1 === el2) {
        resultBox.textContent = "Fusão cancelada: não pode misturar o mesmo elemento!";
        return;
    }

    // Procura fusão no JSON
    const fusao = await buscarFusao(el1, el2);

    if (fusao) {
        resultBox.textContent = `✨ ${fusao.result}`;
    } else {
        // Resultado aleatório
        const aleatorio = gerarResultadoAleatorio();
        resultBox.textContent = `🔮 Fusão inesperada: ${aleatorio}`;
    }
});

// Inicializa selects
carregarElementos();
