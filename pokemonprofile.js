function PokemonProfile(pokedex){
    const zeroPad = (num, places) => String(num).padStart(places, '0')
    const abilityClasses = pokedex.profile.ability.map(skill => `${skill[0]}`);
    const typeClasses = pokedex.type.map(type => `${type}`);
    const hasbasestats = pokedex.base;



    const Profile = `<h1 class = "${pokedex.type.length > 1 ? `${pokedex.type[1]}`: `${pokedex.type[0]}`}"> ${pokedex.name.english}</h1>
    <div class="pokemonpagecontent">
    <div class="pokemonpageimage">
                <img src = "${pokedex.image.hires}" alt = "${pokedex.name.english}">
                </div>
                
                <div class="pokemonpagedetails">
                <table>
                <Tbody>
                <tr>
                <td class = "name">National №</td> <td class = "detailsdata"> ${zeroPad(pokedex.id,4)}</td>
                </tr>
                <tr>
                <td class = "name">Type</td> <td class = "detailsdata"> ${typeClasses.map(typeClass => `<span class="${typeClass}">${typeClass}</span>`).join('')}</td>
                </tr>
                <tr>
                <td class = "name">Species</td> <td class = "detailsdata"> ${pokedex.species}</td>
                </tr>
                <tr>
                <td class = "name">Height</td> <td class = "detailsdata"> ${pokedex.profile.height}</td>
                </tr>
                <tr>
                <td class = "name">Weight</td> <td class = "detailsdata"> ${pokedex.profile.weight}</td>
                </tr>
                <tr>
                <td class = "abilitiesname">Abilities </td> <td class = "detailsdata"> ${abilityClasses.map(abilityClasses => `<span class="${pokedex.type.length > 1 ? `${pokedex.type[1]}` : `${pokedex.type[0]}`}">${abilityClasses}</span>`).join('')}</td>
                </tr>
                </tbody>
                </table>
                </div>
                
                <div class="pokemonpagedescription">
                <p>${pokedex.description}</p>
                </div>
            
                <div class="pokemonpagestats">
                <h3>Base stats</h3>
                <table>
            
                <tbody>
                <tr>
                <td class = "name">HP</td>
                <td class = "hpvalue"><div>${hasbasestats?.HP || 0}</div></td>
                <td class ="bar"><div style = "width: ${hasbasestats?.HP || 1}px"></div></td>
                </tr>
                <tr>
                <td class = "name">Attack</td>
                <td class = "atkvalue"><div>${hasbasestats?.Attack || 0}</div></td>
                <td class ="bar"><div style = "width: ${hasbasestats?.Attack || 1}px"></div></td>
                </tr>
                <tr>
                <td class = "name">Defense</td>
                <td class = "Dfvalue"><div>${hasbasestats?.Defense|| 0}</div></td>
                <td class ="bar"><div style = "width: ${hasbasestats?.Defense || 1}px"></div></td>    
                </tr>
                <tr>
                <td class = "name">Sp. Attack</td>
                <td class = "SpAtkvalue"><div>${hasbasestats?.["Sp. Attack"] || 0}</div></td>
                <td class ="bar"><div style = "width: ${hasbasestats?.["Sp. Attack"] || 1}px"></div></td>
                </tr> 
                <tr>
                <td class = "name">Sp. Defense</td>
                <td class = "SpDefvalue"><div>${hasbasestats?.["Sp. Defense"] || 0}</div></td>
                <td class ="bar"><div style = "width: ${hasbasestats?.["Sp. Defense"] || 1}px"></div></td>
                </tr>
                <tr>
                <td class = "name">Speed</td>
                <td class ="Spdvalue"><div>,${hasbasestats?.Speed || 0}</div></td>
                <td class ="bar"><div style = "width: ${hasbasestats?.Speed || 1}px"></div></td>
                </tr>
                <tr>
                    <td class = "name">Total</td>
                    <td class = "Total"><div><b>${hasbasestats?.Attack+hasbasestats?.Defense+hasbasestats?.["Sp. Attack"] ?? 0 +hasbasestats?.["Sp. Defense"] ?? 0 + hasbasestats?.Speed}</b></div></td>
                    <td class ="bar"></td>
                    </tr>
                </tbody>
            
                </table>
                </div>
            </div>
            </div>
                 `;

    return Profile;
}

function leftbutton(pokedex){
  const zeroPad = (num, places) => String(num).padStart(places, '0');
  const previd = pokedex.id-1;
  const Lbutton = `
  ${previd >= 1 ? `<a href= "pokemonprofile.html?id=${previd}"> <button type = "button" class = "leftbutton">#${zeroPad(previd,4)}</button> 
  </a>` : ``}
  `  

  return Lbutton;
}

  function Rightbutton(pokedex){
    const zeroPad = (num, places) => String(num).padStart(places, '0');
    const nextid = pokedex.id+1;
    const Rbutton = `
    ${nextid <= 898 ? `<a href= "pokemonprofile.html?id=${nextid}"> <button type = "button" class = "rightbutton">#${zeroPad(nextid,4)}</button>` : ` 
    </a>`}
    `
    return Rbutton;
  }

  


function showPokemonProfile() {
  const urlParams = new URLSearchParams(window.location.search);
  const pokemonId = parseInt(urlParams.get('id'));

  fetch("pokedex.json")
  .then(response => response.json())
    .then(data => {
      const pokemon = data.find(p => p.id === pokemonId);
      if (pokemon) {
        const profileContent = PokemonProfile(pokemon);
        document.getElementById('pokemonpagemaincontainer').innerHTML = profileContent;
        
        const leftbuttonHTML = leftbutton(pokemon);
        const rightbuttonHTML = Rightbutton(pokemon);       
        document.getElementById('leftbutton').innerHTML = leftbuttonHTML;
        document.getElementById('rightbutton').innerHTML = rightbuttonHTML;
      } 
      else 
      { 
        console.error(`Pokemon with ID ${pokemonId} not found`);
      }
    });
}

showPokemonProfile();
  

