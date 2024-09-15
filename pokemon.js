function DisplayPokemon(pokedex){
    const card = `
    <div class = "card"> 
    <img src = "${pokedex.image.hire} alt = "${pokedex.name.english}">
    <ul type = "none">
     <li class="pokemonid">${pokedex.id}</li>
             <li class="pokemonname"><a href="#">${pokedex.name.english}</a></li>
             <li>
                  <span class="${pokedex.type[0]}">${pokedex.type[0]}</span> 
                  ${pokedex.type.length > 1 ? `<span class="${pokedex.type[1]}">${pokedex.type[1]}</span>` : ''}
             </li>
    </ul> 
    `;

    return card;
}

fetch('pokedex.json')
  .then(response => response.json())
  .then(data => {
    // Process the JSON data here
    data.forEach(pokemon => {
        const card = DisplayPokemon(pokemon);
        const pokemonContainer = document.getElementById('pokemoncontainer');
        pokemonContainer.innerHTML += card;
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
    
           