const fetchData = async (id) => {
    try {
      console.log(id);
  
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await res.json();
  
      const pokemon = {
        id: id,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
        imgJuego: data.sprites.front_default,
        imgCvg: data.sprites.other.dream_world.front_default,
        nombre: data.name,
        experiencia: data.base_experience,
        hp: data.stats[0].base_stat,
        ataque: data.stats[1].base_stat,
        defensa: data.stats[2].base_stat,
        especial: data.stats[3].base_stat,
      };
  
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  };
  
  const pintarCards = async () => {
    let html = "";
    let pokemons = [];
    for (let i = 1; i < 25; i++) {
      pokemons.push(await fetchData(i));
    }
  
    pokemons.forEach((pokemon) => {
      html += `
          <div class="col-4 mb-4">
          <div class="card " >
         
          <img src=" ${
            pokemon.img != ""
              ? pokemon.img
              : pokemon.imgJuego != ""
              ? pokemon.imgJuego
              : pokemon.imgCvg
          }   " class="card-img-top" alt="${pokemon.nombre}">
    <div class="card-body">
      <h2 class="card-title text-uppercase">${pokemon.nombre}</h2>
      <p class="card-text">Experiencia: ${pokemon.experiencia}</p>
      <div class="d-flex justify-content-between ">
      <h4>Vida: ${pokemon.hp}</h4>
      <h4>Ataque: ${pokemon.ataque}</h4>
      <h4>Defensa: ${pokemon.defensa}</h4>
      </div>
    </ul>
     
    </div>
             
              
          </div>
          </div>
      `;
    });
  
    const contenedorApp = document.querySelector("#app");
    contenedorApp.innerHTML = html;
  };
  
  pintarCards();
  