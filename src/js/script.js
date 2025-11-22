// Lista de elementos básicos (mostrados nos selects)
const elementos = [
    "fogo", "agua", "terra", "ar", "metal", "energia", "planta", "animal",
    "pedra", "calor", "frio", "eletricidade", "luz", "escuridao", "vento",
    "vida", "magia"
];

// Resultados aleatórios caso a fusão não exista
const resultadosAleatorios = [
    "poeira mágica",
    "energia instável",
    "fragmento desconhecido",
    "eco dimensional",
    "cristal estranho",
    "substância misteriosa"
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

// Busca fusão dentro do JSON (data.json)
async function buscarFusao(el1, el2) {
    try {
        const response = await fetch("./data.json");
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

// Resultado aleatório caso não exista fusão
function gerarResultadoAleatorio() {
    const i = Math.floor(Math.random() * resultadosAleatorios.length);
    return resultadosAleatorios[i];
}

// Evento principal
btnMisturar.addEventListener("click", async () => {
    const el1 = select1.value;
    const el2 = select2.value;

    // Verificações
    if (!el1 || !el2) {
        resultBox.textContent = "Selecione dois elementos!";
        return;
    }

    if (el1 === el2) {
        resultBox.textContent = "Você tentou combinar o mesmo elemento!";
        return;
    }

    // Procura no JSON
    const fusao = await buscarFusao(el1, el2);

    if (fusao) {
        resultBox.innerHTML = `
            <h2>✨ ${fusao.resultado}</h2>
            <p>${fusao.descricao}</p>
            <small><b>Tags:</b> ${fusao.tags.join(", ")}</small>
        `;
    } else {
        // Fusão aleatória
        const aleatorio = gerarResultadoAleatorio();
        resultBox.innerHTML = `
            <h2>🔮 Resultado inesperado</h2>
            <p>${aleatorio}</p>
        `;
    }
});

// Inicializa selects
carregarElementos();
