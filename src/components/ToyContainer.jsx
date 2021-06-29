import React from 'react';
import ToyCard from './ToyCard'

const ToyContainer = (props) => {
  return(
    <div id="toy-collection">
      {props.toys.map(toy => <ToyCard key={toy.name} toy={toy} handleLikeToy={props.handleLikeToy} handleDeleteToy={props.handleDeleteToy}/>)}

    </div>
  );
}

export default ToyContainer;
