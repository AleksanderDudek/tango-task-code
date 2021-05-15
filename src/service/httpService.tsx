const charactersApi= 'https://www.anapioficeandfire.com/api/characters';

const housesApi = 'https://www.anapioficeandfire.com/api/houses';

const charactersQueries = {
    page: '?page=',
    pageSize: '&pageSize='
};

//get all characters
export function getCharacters (pageIndex: number = 1, resultsPerPage: number = 60) {
   
    const fetchUrl = charactersApi 
        + charactersQueries.page + pageIndex.toString()
        + charactersQueries.pageSize + resultsPerPage.toString();

    console.log('fetch url: ', fetchUrl);
    return fetch(fetchUrl);
    
}

//get all houses
export function getHouses () {
   
    const fetchUrl = housesApi;
        

    return fetch(fetchUrl);
    
}

export function getHouse (id: string) {
   
    const fetchUrl = housesApi + `/${id}`;
        

    return fetch(fetchUrl);
    
}