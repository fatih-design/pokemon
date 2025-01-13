import './App.css'
import { useState, useEffect} from 'react';
import axios from 'axios';


function App() {
    const [pokemon, setPokemon] = useState([]);

    async function fetchPokemon(pokemon) {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
            const results=response.data.results;

            const detailPokemon = results.map(async (pokemonCard) =>{
                const pokemonDetail = await axios.get(pokemonCard.url);
                return {
                    name: pokemonDetail.name || 'onbekend',
                    image:pokemonDetail.data.sprites.front_default || 'geen plaatje',
                    moves: pokemonDetail.data.moves.length || 'onbekend',
                    weight: pokemonDetail.data.weight || 'onbekend',

                };
            });
            const pokemonList = await Promise.all(detailPokemon);
            setPokemon(pokemonList);
        }catch(error){
            console.error(error);
    }
}
useEffect(() =>
    {
        fetchPokemon();
    },[]);
  return (
    <>
      <h1>Gotta catch em all!</h1>
<ul>
    {pokemon.map((pokecard)=>(
    <li key={pokecard.name}>
        <h2>{pokecard.name}</h2>
        <img src={pokecard.image} alt={pokecard.name} />
        <p>Moves: {pokecard.moves}</p>
        <p>Weight: {pokecard.weight}</p>
    </li>
    ))}
</ul>
    </>
  )
}

export default App
