// ========================
// Dados
// ========================
const ELEMENTOS = [
    "🔥 fogo", "💧 agua", "🪨 terra", "💨 ar", "⚙️ metal", "⚡ energia",
    "🌿 planta", "🐾 animal", "🗿 pedra", "♨️ calor", "❄️ frio",
    "🔌 eletricidade", "✨ luz", "🌑 escuridao", "🌬️ vento",
    "❤️ vida", "🔮 magia",
];

const RESULTADOS_ALEATORIOS = [
    "poeira mágica",
    "energia instável",
    "fragmento desconhecido",
    "eco dimensional",
    "cristal estranho",
    "substância misteriosa"
];

// ========================
// DOM
// ========================
const select1 = document.getElementById("elemento1");
const select2 = document.getElementById("elemento2");
const resultBox = document.getElementById("resultado");
const btnMisturar = document.getElementById("btn-misturar");

// ========================
// Funções
// ========================

// Preenche selects com elementos
function carregarElementos() {
    ELEMENTOS.forEach(el => {
        const option = new Option(el, el);
        select1.add(option.cloneNode(true));
        select2.add(option.cloneNode(true));
    });
}

// Busca fusão no JSON
async function buscarFusao(el1, el2) {
    try {
        const response = await fetch("./data.json");
        const fusoes = await response.json();

        return fusoes.find(f =>
            (f.a === el1 && f.b === el2) ||
            (f.a === el2 && f.b === el1)
        ) || null;
    } catch (error) {
        console.error("Erro ao carregar JSON:", error);
        return null;
    }
}

// Retorna resultado aleatório
function gerarResultadoAleatorio() {
    return RESULTADOS_ALEATORIOS[Math.floor(Math.random() * RESULTADOS_ALEATORIOS.length)];
}

// Exibe resultado no DOM
function exibirResultado(fusao) {
    if (fusao) {
        resultBox.innerHTML = `
            <h2>✨ ${fusao.resultado}</h2>
            <p>${fusao.descricao}</p>
            <small><b>Tags:</b> ${fusao.tags.join(", ")}</small>
        `;
    } else {
        resultBox.innerHTML = `
            <h2>🔮 Resultado inesperado</h2>
            <p>${gerarResultadoAleatorio()}</p>
        `;
    }
}

// Valida seleção de elementos
function validarSelecao(el1, el2) {
    if (!el1 || !el2) {
        resultBox.textContent = "Selecione dois elementos!";
        return false;
    }

    if (el1 === el2) {
        resultBox.textContent = "Você tentou combinar o mesmo elemento!";
        return false;
    }

    return true;
}

// ========================
// Eventos
// ========================
btnMisturar.addEventListener("click", async () => {
    const el1 = select1.value;
    const el2 = select2.value;

    if (!validarSelecao(el1, el2)) return;

    const fusao = await buscarFusao(el1, el2);
    exibirResultado(fusao);
});

// Inicializa selects
carregarElementos();
