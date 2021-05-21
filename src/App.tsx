import './App.css';
import CharactersTable from './components/CharactersTable';
import HouseDetails from './components/HouseDetails';
import House from './models/House'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect

} from "react-router-dom";
import { useEffect, useState } from 'react';
import Character, { HeaderLinks } from './models/Character';
import { getCharacters, getHouses } from './service/httpService';
import { Gender } from './service/constants';
import Filters from './components/Filters/Filters';
import PaginationButtons from './components/PaginationButtons';
import { CircularProgress } from '@material-ui/core';
import { Offline, Online } from 'react-detect-offline';
import './App.css';


function parseLinkHeaders (linkHeaders: string) {
  let arrData = linkHeaders.split("link:");
  linkHeaders = arrData.length == 2? arrData[1]: linkHeaders;
  let parsed_data: HeaderLinks = {};

  arrData = linkHeaders.split(",");

  for (const d of arrData) {
      const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(d);

      parsed_data[linkInfo[2]]=linkInfo[1];
    };

  //we can 'learn' if previous exists, api behaves WEIRD
  if(!parsed_data["prev"]) {
    const url = new URL(parsed_data.next);
    const nextPageNumber = (Number)(url.searchParams.get("page"));

    //previous is last aka first page
    if(nextPageNumber == 2) {
      parsed_data["prev"] = parsed_data.last;
    } else {
      const newUrl = new URL(parsed_data.next);
      const searchParams =  newUrl.searchParams;
      searchParams.set('page', (nextPageNumber-2).toString() )
      parsed_data["prev"] = newUrl;
    }
  };

  if(!parsed_data["next"]) {
    parsed_data["next"] = parsed_data.first;
  };

  //here we can calculate whether previous is last (on 1st page) or next page number - 2;
  return parsed_data;

};

function App(props: any) {

  const [isLoading, setIsLoading] = useState(true); 
  const [housesCache, setHousesCache] = useState<Array<House>>([]);
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [perPage, setPerPage] = useState(10);
  const [genderFilter, setGenderFilter] = useState(Gender.Unknown);

  const[currentPage, setCurrentPage] = useState(1);
  //set navigation calls
  const [linkHeaders, setLinkHeaders] = useState<HeaderLinks>();

  //only already existing scores
  const [cultureFilter, setCultureFilter] = useState('');
  const [cultureError, setCultureError] = useState(false);

  //get houses and characters initially
  useEffect(() => {
    Promise.all([
      getCharacters().then( response => {
        const links = parseLinkHeaders(response.headers.link);
        setLinkHeaders(links);

        //simplified error flow
        setCultureError(false);
        return response.data;
      }, rejection => {

        //simplified error flow
        setCultureError(true);
        return characters;
      }).then(data => {
        setCharacters(data);
      }),
      getHouses().then( response => { return response.data;
      }, rejection => {
        return housesCache;
      }).then(data => {
        setHousesCache(data);
      }),
    ]).then((concArray) => {
      setIsLoading(false);
    })
    }, []);

  //get characters when filters change or page number is changed
  useEffect(() => {
    setIsLoading(true);
    //check filters - does culture 'match' has to be strict? imo it should 
    //match some of the words 
    getCharacters(currentPage, perPage, genderFilter, cultureFilter).then( response => {
      const links = parseLinkHeaders(response.headers.link);
       //simplified error flow
       setCultureError(false);
      setLinkHeaders(links);
      return response.data;
    }, rejection => {

       //simplified error flow
       setCultureError(true);
      return characters;
    }).then(data => {
      setCharacters(data);
    }).then((concArray) => {
    setIsLoading(false);
  }).catch(error => { 
    //some error logger
    //simplified error flow
    setCultureError(true);

    setIsLoading(false);
  })
    //create correct api 'shot'
    //set new data

  }, [genderFilter, cultureFilter, perPage, currentPage]);
  //

  return (
    <div>
        {/* logo */}
      <div style={{fontFamily: 'GameOfThrones', fontSize: 20, textAlign: 'center'}}>
        <span>Game of Thrones - Tango task</span>
      </div>
      <Online>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            {/* house display */}
            <Route path={"/house/:apiUrl"} 
            component={HouseDetails} />
            {/* table */}
            <Route path={"/"}>
              <div>
              {
                isLoading ? 
                <div className='progressContainer' id='progressSpinnerApp'>
                  <CircularProgress />
                </div>
                : 
                <>
                <Filters setPerPage={setPerPage} perPage={perPage} genderFilter={genderFilter} setGenderFilter={setGenderFilter} 
                culture={cultureFilter} setCulture={setCultureFilter} cultureError={cultureError} />
                <CharactersTable characters={characters} houses={housesCache} />
                <PaginationButtons linkHeaders={linkHeaders} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                </>
              }
              </div>
            </Route>
          </Switch>
      </Router>
    </Online>
    <Offline>
      Pardon mua, but you are offline. Please do check your internet connection before procceeding.
    </Offline>
      
    </div>

  );
}

export default App;
