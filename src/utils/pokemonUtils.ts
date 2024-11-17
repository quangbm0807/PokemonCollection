export const getTypeColor = (type: string): string => {
    const colors: { [key: string]: string } = {
        normal: 'bg-pokemon-normal text-white',
        fire: 'bg-pokemon-fire text-white',
        water: 'bg-pokemon-water text-white',
        grass: 'bg-pokemon-grass text-white',
        electric: 'bg-pokemon-electric text-black',
        psychic: 'bg-pokemon-psychic text-white',
        rock: 'bg-pokemon-rock text-white',
        ground: 'bg-pokemon-ground text-white',
        poison: 'bg-pokemon-poison text-white',
        bug: 'bg-pokemon-bug text-white',
        flying: 'bg-pokemon-flying text-white',
    };
    return colors[type] || 'bg-gray-400 text-white';
};


export const getStatColor = (statName: string): string => {
    const statColors = {
        hp: 'from-green-500 to-green-600',
        attack: 'from-red-500 to-red-600',
        defense: 'from-blue-500 to-blue-600',
        'special-attack': 'from-purple-500 to-purple-600',
        'special-defense': 'from-teal-500 to-teal-600',
        speed: 'from-yellow-500 to-yellow-600',
    };

    return statColors[statName as keyof typeof statColors] || 'from-gray-500 to-gray-600';
};

export interface PokemonTypeColors {
    [key: string]: {
        light: string;
        dark: string;
    };
}

export const typeGradients: PokemonTypeColors = {
    normal: {
        light: 'from-gray-400 to-gray-500',
        dark: 'from-gray-600 to-gray-700',
    },
    fire: {
        light: 'from-orange-400 to-red-500',
        dark: 'from-orange-600 to-red-700',
    },
    water: {
        light: 'from-blue-400 to-blue-500',
        dark: 'from-blue-600 to-blue-700',
    },
    grass: {
        light: 'from-green-400 to-green-500',
        dark: 'from-green-600 to-green-700',
    },
    electric: {
        light: 'from-yellow-300 to-yellow-400',
        dark: 'from-yellow-500 to-yellow-600',
    },
    ice: {
        light: 'from-cyan-300 to-cyan-400',
        dark: 'from-cyan-500 to-cyan-600',
    },
    fighting: {
        light: 'from-red-400 to-red-500',
        dark: 'from-red-600 to-red-700',
    },
    poison: {
        light: 'from-purple-400 to-purple-500',
        dark: 'from-purple-600 to-purple-700',
    },
    ground: {
        light: 'from-amber-400 to-amber-500',
        dark: 'from-amber-600 to-amber-700',
    },
    flying: {
        light: 'from-sky-400 to-sky-500',
        dark: 'from-sky-600 to-sky-700',
    },
    psychic: {
        light: 'from-pink-400 to-pink-500',
        dark: 'from-pink-600 to-pink-700',
    },
    bug: {
        light: 'from-lime-400 to-lime-500',
        dark: 'from-lime-600 to-lime-700',
    },
    rock: {
        light: 'from-stone-400 to-stone-500',
        dark: 'from-stone-600 to-stone-700',
    },
    ghost: {
        light: 'from-indigo-400 to-indigo-500',
        dark: 'from-indigo-600 to-indigo-700',
    },
    dark: {
        light: 'from-neutral-400 to-neutral-500',
        dark: 'from-neutral-600 to-neutral-700',
    },
    dragon: {
        light: 'from-violet-400 to-violet-500',
        dark: 'from-violet-600 to-violet-700',
    },
    steel: {
        light: 'from-slate-400 to-slate-500',
        dark: 'from-slate-600 to-slate-700',
    },
    fairy: {
        light: 'from-rose-300 to-rose-400',
        dark: 'from-rose-500 to-rose-600',
    },
};