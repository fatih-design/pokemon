import './App.css'
import {useState, useEffect} from 'react';
import axios from 'axios';


function App() {
    const [pokemon, setPokemon] = useState([]);
    const [error, setError] = useState(null);
    const [page,setPage] = useState(0);

    const pageItems = 20;

    async function fetchPokemon(currentPage) {
        try {
            const offset = currentPage * pageItems
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${pageItems}`);
            const results = response.data.results;

            const detailPokemon = results.map(async (pokemonCard) => {
                const pokemonDetail = await axios.get(pokemonCard.url);
                return {
                    name: pokemonDetail.data.name || 'onbekend',
                    image: pokemonDetail.data.sprites.front_default || 'geen plaatje',
                    moves: pokemonDetail.data.moves.length || 'onbekend',
                    weight: pokemonDetail.data.weight || 'onbekend',
                    abilities: pokemonDetail.data.abilities.map((ability) => ability.ability.name)

                };
            });
            const pokemonList = await Promise.all(detailPokemon);
            setPokemon(pokemonList);
        } catch (error) {
            console.error(error);
            setError("Er is een fout opgetreden bij ophalen  Pokémon-data.");
        }
    }

    useEffect(() => {
        fetchPokemon(page);
    }, [page]);

    const goToNextPage = () =>{
        setPage(page + 1);
    };
    const goToPreviousPage = () =>{
        if(page > 0 ){
            setPage(page -1);
        }
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (pokemon.length === 0) {
        return <p>Loading Pokémon...</p>;
    }
    return (
        <>
            <h1>Gotta catch em all!</h1>
            <ul>
                {pokemon.map((pokecard) => (
                    <li key={pokecard.name}>
                        <h2>{pokecard.name}</h2>
                        <img src={pokecard.image} alt={pokecard.name}/>
                        <p>Moves: {pokecard.moves}</p>
                        <p>Weight: {pokecard.weight}</p>
                        <p>Abilities:</p>
                        <ul>
                            {pokecard.abilities.map((ability) => (
                                <li key={ability}>{ability}</li>
                            ))}
                        </ul>
                    </li>
                ))}

            </ul>
            <div className="pagination">
                <button onClick={goToPreviousPage} disabled={page === 0}>
                    Vorige
                </button>
                <button onClick={goToNextPage}>
                    Volgende
                </button>
            </div>
        </>
    )
}

export default App
