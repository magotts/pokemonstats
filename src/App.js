import React, { useState } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defense: "",
    type: ""
  })
  const searchPokemon = () => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      console.log(response);
      setPokemon({
        name: pokemonName,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type: response.data.types,
        abilities: response.data.abilities
      })
      setPokemonChosen(true);
    })
  }

  return (
    <div className="App">
      <div className="title-section">
      <img alt="Pokemon" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" />
      <input type="text" placeholder="Type a Pokemon" onChange={(event) => {
        setPokemonName(event.target.value)}}></input>
      <button onClick={searchPokemon}>Search Pokemon</button>
      </div>
      <div className="display-section">
        {!pokemonChosen ? (<h1>Please choose a Pokemon</h1>) : 
        ( <> <h1>{pokemon.name}</h1>
        <img src={pokemon.img} alt="Pokemon"/> 
        <h3 style={{color: "steelblue"}}>[Type]</h3>{pokemon.type.map((types) => (
          <li className="types">{types.type.name}</li>
          ))}
          <h4 style={{color: "steelblue"}}>[Stats]</h4>
        <h4>HP: {pokemon.hp}</h4>
        <h4>Attack: {pokemon.attack}</h4>
        <h4>Defense: {pokemon.defense}</h4>
        <h4 style={{color: "steelblue"}}>[Abilities]</h4> {pokemon.abilities.map((ability) => (
         <li className="abilities">{ability.ability.name}</li>
          ))}
        </>)}
      </div>
    </div>
  );
}

export default App;
