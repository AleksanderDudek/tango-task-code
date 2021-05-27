import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sagaActions } from "../state/sagaActions";

export default function() {
  const dispatch = useDispatch();
  const houses = useSelector(state => state.housesData.houses);
  const characters = useSelector(state => state.charactersData.characters);

  console.log(houses);
  console.log(characters);

  const renderList = () => {
    return houses.map( (house, index) => {
      return <p key={house.name+index}>{house.name}</p>;
    });
  };

  const renderCharacters = () => {
    return characters.map( (character, index) => {
      return <p key={character.name+character.aliases[0]+index}>{character.name+character.aliases[0]}</p>;
    });
  };

  return (
    <div>
      <button onClick={() => dispatch({ type: sagaActions.FETCH_HOUSES_DATA_SAGA })}>
        Getdata
      </button>
      <button onClick={() => dispatch({ type: sagaActions.FETCH_CHARACTERS_DATA_SAGA })}>
        Get characters
      </button>
      {renderList()}
      {renderCharacters()}
    </div>
  );
}
