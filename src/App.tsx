import './App.css';
import CharactersTable from './components/CharactersTable';
import HouseDetails from './components/HouseDetails';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Filters from './components/Filters/Filters';
import PaginationButtons from './components/PaginationButtons';
import { CircularProgress } from '@material-ui/core';
import { Offline, Online } from 'react-detect-offline';
import './App.css';
import useStateManagerSelector from './state/useStateManagerSelector';


function App(props: any) {

  const { isLoading, setPerPage, perPage, genderFilter, setGenderFilter, cultureFilter, setCultureFilter, cultureError, characters, setCharacters,
        linkHeaders, setLinkHeaders, housesCache, setHousesCache, currentPage, setCurrentPage } = useStateManagerSelector();
 
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
                <CharactersTable characters={characters} houses={housesCache}/>
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
