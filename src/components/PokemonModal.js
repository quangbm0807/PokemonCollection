import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import clsx from 'clsx';
import { getTypeColor } from '../utils/pokemonUtils';

const PokemonModal = ({ selectedPokemon, setSelectedPokemon, darkMode }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [showStats, setShowStats] = useState(false);
    const [showContent, setShowContent] = useState(false);

    useEffect(() => {
        if (selectedPokemon) {
            // Reset states when modal opens
            setIsClosing(false);
            setShowContent(false);

            // Stagger animations
            setTimeout(() => setShowContent(true), 50);
            setTimeout(() => setShowStats(true), 500);
        }
    }, [selectedPokemon]);

    const handleClose = (event) => {
        if (event.type === 'click' || event.key === 'Escape') {
            setIsClosing(true);
            setShowStats(false);
            setShowContent(false);
            setSelectedPokemon(null);
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleClose);
        return () => window.removeEventListener('keydown', handleClose);
    }, []);

    if (!selectedPokemon) return null;

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleClose}
        >
            <div
                className={clsx(
                    'max-w-2xl w-full rounded-lg p-6',
                    'transform transition-all duration-300',
                    darkMode ? 'bg-gray-800 text-white' : 'bg-white',
                    isClosing ? 'scale-95 opacity-0 -translate-y-4' :
                        showContent ? 'scale-100 opacity-100 translate-y-0' :
                            'scale-95 opacity-0 translate-y-4'
                )}
                onClick={e => e.stopPropagation()}
            >
                <div className={clsx(
                    "flex justify-between items-start mb-4",
                    "transform transition-all duration-300 delay-100",
                    showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}>
                    <h2 className="text-2xl font-bold capitalize bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
                        {selectedPokemon.name}
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 
                        transition-colors duration-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={clsx(
                        "relative overflow-visible rounded-lg",
                        "transform transition-all duration-300 delay-200",
                        showContent ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                    )}>
                        <img
                            src={selectedPokemon.sprites.other['official-artwork'].front_default}
                            alt={selectedPokemon.name}
                            className={clsx(
                                "w-full object-contain transform transition-all duration-700 ease-in-out",
                                isClosing ? "scale-95 opacity-0" : "hover:scale-110"
                            )}
                        />
                    </div>

                    <div className={clsx(
                        "space-y-4 transform transition-all duration-300 delay-300",
                        showContent ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
                    )}>
                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Types</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedPokemon.types.map((type, index) => (
                                    <span
                                        key={type.type.name}
                                        className={clsx(
                                            'px-3 py-1 rounded-full text-sm',
                                            'transform transition-all duration-300',
                                            getTypeColor(type.type.name),
                                            showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        )}
                                        style={{ transitionDelay: `${index * 100 + 400}ms` }}
                                    >
                                        {type.type.name}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <h3 className="font-semibold mb-2">Stats</h3>
                            {selectedPokemon.stats.map((stat, index) => (
                                <div
                                    key={stat.stat.name}
                                    className={clsx(
                                        "mb-2 transform transition-all duration-300",
                                        showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                    )}
                                    style={{ transitionDelay: `${index * 100 + 500}ms` }}
                                >
                                    <div className="flex justify-between mb-1">
                                        <span className="capitalize">{stat.stat.name.replace('-', ' ')}</span>
                                        <span>{stat.base_stat}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 overflow-hidden">
                                        <div
                                            className={clsx(
                                                "bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full",
                                                "transform transition-transform duration-1000 ease-out"
                                            )}
                                            style={{
                                                width: `${(stat.base_stat / 255) * 100}%`,
                                                transform: showStats ? 'translateX(0)' : 'translateX(-100%)',
                                                transitionDelay: `${index * 100 + 600}ms`
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Abilities</h3>
                            <div className="flex flex-wrap gap-2">
                                {selectedPokemon.abilities.map((ability, index) => (
                                    <span
                                        key={ability.ability.name}
                                        className={clsx(
                                            "px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm",
                                            "transform transition-all duration-300",
                                            "hover:bg-purple-100 dark:hover:bg-gray-600",
                                            showContent ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                        )}
                                        style={{ transitionDelay: `${index * 100 + 700}ms` }}
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
    );
};

export default PokemonModal;