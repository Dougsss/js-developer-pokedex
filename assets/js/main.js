const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 12
let offset = 0;

/* Function para converter os dados vindos da Api em um card reduzido de cada pokemon */
function convertPokemonToLi(pokemon) {
    return `
        <container id="cardBut" class="card ${pokemon.type}">
            <li class="pokemon"> 
                <span class="number">#${pokemon.number}</span>
                <img  
                    src="${pokemon.photo}"
                    alt="${pokemon.name}"
                >
                <span class="name">${pokemon.name}</span>

            </li>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <p> Some caracteristcs here!</p>
            </div>
            <div class="arrow">
                <span>&#8673;</span>
            </div>
        </container>
    `
};


/* Funcao para fazer os cards */
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