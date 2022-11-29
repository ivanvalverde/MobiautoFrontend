//1

export const maskify = (word: string) => {
    const last4Digits = word.substring(word.length - 4, word.length);
    const hashWord = '#'.repeat(word.length - 4);
    return hashWord + last4Digits;
}

//2

export const updateData = (currentObject: {[key: string]: any}, newDataObject: {[key: string]: any}) => {
    const newObj: {[key: string]: any} = {};
    const keys = Object.keys(currentObject);
    keys.forEach((key) => {
        if(newDataObject.hasOwnProperty(`${key}`)) {
            newObj[key] = newDataObject[key];
        } else {
            newObj[key] = currentObject[key];
        }
    });
    return newObj;
}

//3

export const getRickAndMortyCharacters = async () => {
    try {
        const charactersData = await fetch('https://rickandmortyapi.com/api/character');
        const { results } = await charactersData.json();
        const characters = ['Rick Sanchez', 'Morty Smith', 'Summer Smith', 'Beth Smith', 'Jerry Smith'];
        const charactersInfo = characters.map((character) => {
            const characterData = results.filter((apiCharacter: {[key: string]: any}) => {
            return character === apiCharacter?.name;
            })[0];
            return {
            nome: characterData?.name,
            genero: characterData?.gender,
            avatar: characterData?.image,
            especie: characterData?.species,
            };
            })
        return charactersInfo;
    } catch {
        return {}
    }
  }

//4

export const checkIfTheFirstLetterIsUppercase = (word: string) => {
    return word[0] === word[0].toUpperCase();
}
