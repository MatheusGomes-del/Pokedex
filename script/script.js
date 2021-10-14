const fetchPokemon = () =>{ // request de dados atraves do fetch da API
   const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}` // é feito uma requisição dinâmica para obter os 150 pokemons
   
   const pokemonPromises = []

   for(let i = 1; i <=150; i++){                    /*obtendo a resposta da promise em json */
       pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json())) 
       /* fazendo uma iteração onde eu subo os pokemons requisitados para o array pokemonPromises */
       
   }

   
   Promise.all(pokemonPromises)   // basicamente  aqui foi passado o array de pokemons para uma nova promise sem criar uma nova, e mostrando no console
     .then(pokemons =>{

         const lisPokemons = pokemons.reduce((accumulator/*parametro que vai gera a string a cada iteração*/, pokemon /*objeto que esta sendo iterado*/) =>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            
            accumulator += `
            <li class="card ${types[0]} ">
              <img class="card-image"  alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png" />
              <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
              <p class="card-subtitle">${types.join(' | ')}</p>
            </li>`
            return accumulator
         },'')
         
         const ul = document.querySelector('[data-js="pokedex"]')
         
         ul.innerHTML = lisPokemons
     })
}  

fetchPokemon()