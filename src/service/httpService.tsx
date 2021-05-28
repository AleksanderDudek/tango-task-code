import axios from 'axios';

export const charactersApi= 'https://www.anapioficeandfire.com/api/characters';

export const housesApi = 'https://www.anapioficeandfire.com/api/houses';

const charactersQueries = {
    page: '?page=',
    pageSize: '&pageSize=',
    gender: '&gender=',
    culture: '&culture='
};

export function createCharactersApiCallUrl (pageIndex: number, resultsPerPage: number, 
    gender: string, culture: string) {

        const fetchUrl = charactersApi 
        + charactersQueries.page + pageIndex.toString()
        + charactersQueries.pageSize + resultsPerPage.toString()
        + charactersQueries.gender + gender
        + charactersQueries.culture + culture;

        return fetchUrl;
    }

//get all characters
export function getCharacters (pageIndex: number = 1, resultsPerPage: number = 25, 
    gender: string = '', culture: string = '') {
   
    const fetchUrl = createCharactersApiCallUrl(pageIndex, resultsPerPage, gender, culture);

    return axios.get(fetchUrl);
}


//get all houses
export function getHouses () {
   
    const fetchUrl = housesApi;

    return axios.get(fetchUrl);
    
}

export function getHouse (id: string) {
   
    const fetchUrl = housesApi + `/${id}`;
        

    return axios.get(fetchUrl);
    
}