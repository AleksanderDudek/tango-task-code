import Character, { HeaderLinks } from "../models/Character";
import { useEffect, useState } from 'react';
import House from "../models/House";
import { createCharactersApiCallUrl, getCharacters, getHouses } from "../service/httpService";
import { Gender } from "../service/constants";

import { useDispatch } from "react-redux";
import { sagaActions } from "../state/sagaActions";

function parseLinkHeaders(linkHeaders: string) {
  let arrData = linkHeaders.split("link:");
  linkHeaders = arrData.length == 2 ? arrData[1] : linkHeaders;
  let parsed_data: HeaderLinks = {};

  arrData = linkHeaders.split(",");

  for (const d of arrData) {
    const linkInfo = /<([^>]+)>;\s+rel="([^"]+)"/ig.exec(d);

    parsed_data[linkInfo[2]] = linkInfo[1];
  };

  if (!parsed_data["next"]) {
    parsed_data["next"] = parsed_data.first;
  };

  //we can 'learn' if previous exists, api behaves WEIRD
  if (!parsed_data["prev"]) {
    const url = new URL(parsed_data.next);
    const nextPageNumber = (Number)(url.searchParams.get("page"));

    //previous is last aka first page
    if (nextPageNumber == 2) {
      parsed_data["prev"] = parsed_data.last;
    } 
    else if (nextPageNumber == 1) {
      const newUrl = new URL(parsed_data.next);
      const searchParams = newUrl.searchParams;
      searchParams.set('page', '1')
      parsed_data["prev"] = newUrl;
    }
    else {
      const newUrl = new URL(parsed_data.next);
      const searchParams = newUrl.searchParams;
      searchParams.set('page', (nextPageNumber - 2).toString())
      parsed_data["prev"] = newUrl;
    }
  };



  //here we can calculate whether previous is last (on 1st page) or next page number - 2;
  return parsed_data;

};

const useStateManagerSelector = () => {

  const dispatch = useDispatch();
  // const apiCalls = useSelector((state: RootState) => state.successfullApiCallsData.successfullApiCalls);

  const [isLoading, setIsLoading] = useState(true);
  const [housesCache, setHousesCache] = useState<Array<House>>([]);
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [perPage, setPerPage] = useState(25);
  const [genderFilter, setGenderFilter] = useState(Gender.Unknown);

  const [currentPage, setCurrentPage] = useState(1);
  //set navigation calls
  const [linkHeaders, setLinkHeaders] = useState<HeaderLinks>();

  //only already existing scores
  const [cultureFilter, setCultureFilter] = useState('');
  const [cultureError, setCultureError] = useState(false);

  //get houses and characters initially
  useEffect(() => {
    Promise.all([
      getCharacters().then(response => {
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
      getHouses().then(response => {
        return response.data;
      }, rejection => {
        return housesCache;
      }).then(data => {
        setHousesCache(data);
      }),
    ]).then((concArray) => {
      setIsLoading(false);
    })
  }, []);

  //
  useEffect(() => {
    setCurrentPage(1);
  }, [perPage])

  //get characters when filters change or page number is changed
  useEffect(() => {
    setIsLoading(true);
    //check filters - does culture 'match' has to be strict? imo it should 
    //match some of the words 
    getCharacters(currentPage, perPage, genderFilter, cultureFilter)
      .then(
        response => {
          const links = parseLinkHeaders(response.headers.link);
          setLinkHeaders(links);
          //simplified error flow
          setCultureError(false);
          return response.data;
        },
        rejection => {
          //simplified error flow
          setCultureError(true);
          return characters;
        })
      .then(
        data => {

          //api behaves weird and sometimes responses with empty array
          if(data.length == 0) throw Error('empty response');

          setCharacters(data);

          //dispatch api call and successful response to redux store
          //*cache* could be used for quicker data serving + alongside we can 
          //have ongoing api call that will update store if there is new data

          const newApiCall = {
            apiCall: createCharactersApiCallUrl(currentPage, perPage, genderFilter, cultureFilter),
            characters: data
          };

          dispatch({ type: sagaActions.PUT_SUCCESSFULL_API_CALLS_SAGA, ...newApiCall });
        })
      .then((concArray) => {
        setIsLoading(false);
      })
      .catch(error => {
        //some error logger
        //simplified error flow
        console.log(error)
        setCultureError(true);
        setIsLoading(false);
      })
      .finally(() => {
      });

  }, [genderFilter, cultureFilter, currentPage, perPage]);

  return {
    isLoading, setIsLoading, genderFilter, setGenderFilter,
    cultureFilter, setCultureFilter, currentPage, setCurrentPage,
    perPage, setPerPage, cultureError, setCultureError,
    linkHeaders, setLinkHeaders, characters, setCharacters,
    housesCache, setHousesCache
  };
}

export default useStateManagerSelector;