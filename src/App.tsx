import './App.css';
import CharactersTable from './components/CharactersTable';
import HouseDetails from './components/HouseDetails';
import House from './models/House'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { useEffect, useState } from 'react';
import Character from './models/Character';
import { getCharacters, getHouses } from './service/httpService';
import { Gender } from './service/constants';

function App() {

  const [isLoading, setIsLoading] = useState(true); 
  const [housesCache, setHousesCache] = useState<Array<House>>([]);
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [perPage, setPerPage] = useState(10);
  const [genderFilter, setGenderFilter] = useState(Gender.All);

  //only already existing scores
  const [cultureFilter, setCultureFilter] = useState('');

  //get houses and characters initially
  useEffect(() => {


    Promise.all([
      getCharacters().then( response => response.json()).then(data => {
        console.log(data);
        setCharacters(data);
      }),
      getHouses().then( response => response.json()).then(data => {
        console.log(data) 
        setHousesCache(data);
      }),
    ]).then((concArray) => {
      setIsLoading(false);
    })
    }, []);

  //get characters when filters change
  useEffect(() => {
    
  }, [genderFilter, cultureFilter]);
  //

  return (
    <div>
        {/* logo */} GAME OF THRONES API - TANGO TASK
      <Router>
          <Switch>
            {/* house display */}
            <Route exact path="/house/:apiUrl" 
            component={HouseDetails} />
            {/* table */}
            <Route path="/">
              {
                isLoading ? <> 'Loading...' </> : <CharactersTable characters={characters} houses={housesCache} />
              }
            </Route>
          </Switch>
      </Router>
    </div>

  );
}

export default App;
