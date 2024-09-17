function DisplayPokemon(pokedex) {
  
  const typeClasses = pokedex.type.map(type => `${type}`); 
  const zeroPad = (num, places) => String(num).padStart(places, '0')

  const card = `
    <div class="card">
      <img src="${pokedex.image.hires}" alt="${pokedex.name.english}">
      <ul type="none">
        <li class="pokemonid">#${zeroPad(pokedex.id,4)}</li>
        <li class="pokemonname">
          <a href="pokemonprofile.html?id=${pokedex.id}" onclick="return showPokemonProfile(${pokedex.id})">
            ${pokedex.name.english}
          </a>
        </li>
        <li>
          ${typeClasses.map(typeClass => `<span class="${typeClass}">${typeClass}</span>`).join('')}
        </li>
      </ul>
    </div>
  `;

  return card;
}

fetch('pokedex.json')
  .then(response => response.json())
  .then(data => {
    const pokemonContainer = document.getElementById('pokemoncontainer');
    const fragment = document.createDocumentFragment();

    data.forEach(pokemon => {
      const card = DisplayPokemon(pokemon);
      const cardElement = document.createElement('div');
      cardElement.innerHTML = card;
      fragment.appendChild(cardElement);
    });

    pokemonContainer.appendChild(fragment); // Append fragment to container (once)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
