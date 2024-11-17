import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, ChevronLeft, ChevronRight } from 'lucide-react';
import { Pokemon } from './types';
import clsx from 'clsx';
import { getTypeColor } from '../utils/pokemonUtils';
import Pagination from './Pagination';

export const PokemonCollection: React.FC = () => {
    const [pokemon, setPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [selectedType, setSelectedType] = useState<string>('all');
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

    const pokemonPerPage = 12;
    const types = ['all', 'fire', 'water', 'grass', 'electric', 'psychic', 'rock', 'ground', 'poison', 'bug', 'flying', 'normal'];

    useEffect(() => {
        fetchPokemon();
    }, []);
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedType]);

    const fetchPokemon = async (): Promise<void> => {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=11000');
            const data = await response.json();

            const pokemonDetails: Pokemon[] = await Promise.all(
                data.results.map(async (pokemon: { url: string }) => {
                    const res = await fetch(pokemon.url);
                    return res.json();
                })
            );

            setPokemon(pokemonDetails);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pokemon:', error);
            setLoading(false);
        }
    };

    const filteredPokemon = pokemon.filter((p) => {
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'all' || p.types.some(t => t.type.name === selectedType);
        return matchesSearch && matchesType;
    });

    const indexOfLastPokemon = currentPage * pokemonPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
    const currentPokemon = filteredPokemon.slice(indexOfFirstPokemon, indexOfLastPokemon);
    const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);

    const handlePokemonClick = async (pokemon: Pokemon): Promise<void> => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`);
        const data = await response.json();
        setSelectedPokemon(data);
    };

    return (
        <div className={clsx(
            'min-h-screen transition-colors duration-500',
            darkMode
                ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'
                : 'bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400'
        )}>
            <div className="container mx-auto px-4 py-8">
                {/* Enhanced Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className={clsx(
                        'text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r',
                        darkMode
                            ? 'from-blue-400 via-purple-400 to-pink-400'
                            : 'from-purple-600 via-pink-600 to-purple-600',
                        'animate-text-gradient'
                    )}>
                        Pokémon Collection
                    </h1>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={clsx(
                            'p-3 rounded-full transition-all duration-300 transform',
                            'hover:scale-110 hover:rotate-12',
                            darkMode
                                ? 'bg-gray-800 hover:bg-gray-700'
                                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm'
                        )}
                    >
                        {darkMode ?
                            <Sun className="text-yellow-300" /> :
                            <Moon className="text-purple-800" />
                        }
                    </button>
                </div>

                {/* Enhanced Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-8 animate-float">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search Pokémon..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={clsx(
                                'w-full pl-10 pr-4 py-2 rounded-lg border',
                                'bg-white/80 dark:bg-gray-800/80',
                                'dark:text-white dark:border-gray-700',
                                'backdrop-blur-sm transition-all duration-300',
                                'focus:ring-2 focus:ring-purple-400 focus:outline-none',
                                'hover:bg-white/90 dark:hover:bg-gray-800/90'
                            )}
                        />
                    </div>
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className={clsx(
                            'p-2 rounded-lg border',
                            'bg-white/80 dark:bg-gray-800/80',
                            'dark:text-white dark:border-gray-700',
                            'backdrop-blur-sm transition-all duration-300',
                            'focus:ring-2 focus:ring-purple-400 focus:outline-none',
                            'hover:bg-white/90 dark:hover:bg-gray-800/90'
                        )}
                    >
                        {types.map((type) => (
                            <option key={type} value={type}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Pokemon Grid with enhanced animations */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent" />
                    </div>
                ) : (
                    // Pokemon Grid
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {currentPokemon.map((pokemon, index) => (
                            <div
                                key={pokemon.id}
                                onClick={() => handlePokemonClick(pokemon)}
                                className={clsx(
                                    'group p-4 rounded-lg backdrop-blur-sm transition-all duration-300 cursor-pointer',
                                    'hover:scale-105 hover:-translate-y-2',
                                    'animate-fade-in',
                                    darkMode
                                        ? 'bg-gray-800/80 text-white hover:bg-gray-700/80'
                                        : 'bg-white/80 hover:bg-white/90',
                                    'shadow-lg hover:shadow-2xl',
                                    'border border-transparent hover:border-purple-300',
                                    { 'animation-delay': `${index * 100}ms` }
                                )}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        src={pokemon.sprites.other['official-artwork'].front_default}
                                        alt={pokemon.name}
                                        className="w-full h-48 object-contain transition-transform duration-300
                             group-hover:scale-110 group-hover:rotate-3"
                                    />
                                </div>
                                <h3 className="text-xl font-semibold mt-4 capitalize">{pokemon.name}</h3>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {pokemon.types.map((type) => (
                                        <span
                                            key={type.type.name}
                                            className={clsx(
                                                'px-3 py-1 rounded-full text-sm font-medium',
                                                'transition-all duration-300',
                                                'transform hover:scale-105',
                                                getTypeColor(type.type.name)
                                            )}
                                        >
                                            {type.type.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Enhanced Pagination */}
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                    darkMode={darkMode}
                    showFirstLast={true}
                    showPageNumbers={true}
                    maxPageNumbers={5}
                />

                {/* Enhanced Pokemon Detail Modal */}
                {selectedPokemon && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50
                        animate-modal-fade-in">
                        <div className={clsx(
                            'max-w-2xl w-full rounded-lg p-6',
                            'transform transition-all duration-300',
                            'animate-modal-slide-up',
                            darkMode ? 'bg-gray-800 text-white' : 'bg-white'
                        )}>
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold capitalize bg-gradient-to-r from-purple-400 to-pink-600 
                             bg-clip-text text-transparent">
                                    {selectedPokemon.name}
                                </h2>
                                <button
                                    onClick={() => setSelectedPokemon(null)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200
                           transition-colors duration-300"
                                >
                                    ×
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        src={selectedPokemon.sprites.other['official-artwork'].front_default}
                                        alt={selectedPokemon.name}
                                        className="w-full object-contain transform transition-transform duration-500 hover:scale-110"
                                    />
                                </div>
                                <div>
                                    <div className="mb-4">
                                        <h3 className="font-semibold mb-2">Types</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPokemon.types.map((type) => (
                                                <span
                                                    key={type.type.name}
                                                    className={clsx(
                                                        'px-3 py-1 rounded-full text-sm',
                                                        'transform transition-all duration-300 hover:scale-105',
                                                        getTypeColor(type.type.name)
                                                    )}
                                                >
                                                    {type.type.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="font-semibold mb-2">Stats</h3>
                                        {selectedPokemon.stats.map((stat) => (
                                            <div key={stat.stat.name} className="mb-2">
                                                <div className="flex justify-between mb-1">
                                                    <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                                                    <span>{stat.base_stat}</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                                    <div
                                                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full
                                     transition-all duration-1000 ease-out"
                                                        style={{
                                                            width: `${(stat.base_stat / 255) * 100}%`,
                                                            animation: 'statsGrow 1s ease-out'
                                                        }}
                                                    ></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-2">Abilities</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedPokemon.abilities.map((ability) => (
                                                <span
                                                    key={ability.ability.name}
                                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm
                                   transform transition-all duration-300 hover:scale-105
                                   hover:bg-purple-100 dark:hover:bg-gray-600"
                                                >
                                                    {ability.ability.name.replace('-', ' ')}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};