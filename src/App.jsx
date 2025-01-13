import './App.css'
import { useState, useEffect} from 'react';
import axios from 'axios';


function App() {
    const [pokemon, setPokemon] = useState([]);

    async function fetchPokemon(pokemon) {
        try {
            const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
            setPokemon(response.data.results);
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
        <p>{pokecard.name}</p>
    </li>
    ))}
</ul>
    </>
  )
}

export default App
