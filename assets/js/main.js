const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const detailsPokemon = document.getElementById('detailsPokemon')
const closeModal = document.getElementById('closeModal')
const openModal = document.getElementById('smallCard')  /* id="smallCard" */

const maxRecords = 151
const limit = 12
let offset = 0;

/* Function para converter os dados vindos da Api em um card reduzido de cada pokemon */
function convertPokemonToLi(pokemon) {
    return `
        <li id="smallCard" class="pokemon ${pokemon.type}"> 
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
};

/* abrir o Modal */
openModal.addEventListener('click', (event) => {

    detailsPokemon.innerHTML = JSON.stringify();
    detailsPokemon.style.display = 'block';
});

/* Fechar o Modal */
closeModal.addEventListener('click', () => {
    detailsPokemon.style.display = 'none';
});

/* Function para abrir um card com detalhes dos pokemons */
function convertCardDetails(pokemon) {
    return `
        <span id="detailsPokemon" class="cardPokemon">
            <div class="topCard ${pokemon.type}">
                <button id="closeModal" class="outButton">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAMJJREFUSEvdlcEJwlAMhr9e3EEEQXqoI3QLl9ANvLiBHaBreHQQL72JgnsogfdApcofaKD6znn/l/xJSEHwK4L1GQ1gBeyBpVBxB2yBo8WqFdyAmSCeQ85A6QHc008loZdY5YNp/x5gArTAJlkzaAVT4ADUjiF47v/XHpioiRvEMwQSYJ1sMXs8731QPlYQDrCsQy3KtoQ2OUNCx7SvwYPuwX8CrsDcsRwXYOHZVDs4DVAJkBOw8x4cQbc/RL0H4wU8ALeMKBlSozKnAAAAAElFTkSuQmCC" alt="out" />
                </button>
                <div class="NameNum">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                </div>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
            </div>
            <div class="botCard">
                <ol class="listCaracters">
                    <button class="caracters">${pokemon.pokeathlon-stat}</button>
                    <button class="caracters">${pokemon.characteristic}</button>
                    <button class="caracters">${pokemon.ability}</button>
                </ol>
            </div>
        </span>
    `
};

/* Funcao para fazer os details cards */
function detailsCard() {
    pokeApi.getPokemons().then((pokemons = []) => {
        const newHtml = pokemons.map(convertCardDetails).join('')
        detailsPokemon.innerHTML += newHtml
    })
} 

/* Funcao para fazer os smalls cards */
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

/* evento para o botao carregar mais pokemons ao ser clikado */
loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})