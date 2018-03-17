import React, { Component } from 'react';
import Listpokemon from './Listpokemon.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pokeArray: [],
      pokeFilter: '',
      //requestFailed: false,
    }
  }

  componentDidMount(){
    const URL = 'https://pokeapi.co/api/v2/pokemon/';
    for (let i=1; i <= 25; i++){
      let URL2 = URL + i ;

      fetch(URL2)
      .then(response => response.json())
      // .then(response => {
      //   if (!response.ok){
      //     throw Error("Network Request Failed")
      //     return response
      //   }
      // })
      .then(json =>{
        let pokemon = this.state.pokeArray;
        pokemon.push(json);
        pokemon.sort((pokA, pokB) => {
          if (pokA.id < pokB.id)
          return -1;
          else if (pokA.id > pokB.id)
          return 1;
          else
          return 0;
        })
        this.setState({
          pokeFilter: pokemon
        });
      })
    }
  }

  handleChange(event){
    let inputText = event.currentTarget.value.toLowerCase();
    this.setState({
      pokeFilter: inputText
    })
  }

  showPokemon(){
    let pokemonsInArray = this.state.pokeArray;
    pokemonsInArray = this.state.pokeArray.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.pokeFilter))

    return (
      <div className="pokemon__card">{
        pokemonsInArray.map(
          (pokemon, i) =>
          <Listpokemon key={i}
            image={pokemon.sprites.front_default}
            id={pokemon.id}
            name={pokemon.name}
            type={pokemon.types.map((t) => t.type.name)}
            weight={pokemon.weight}
          />
        )
      }</div>
    );
  }
  render() {
    return (
      <div className="main-container" >
        <div className="header">
          <h1 className="main-title">Pokémon</h1>
          <input className="search-box" onChange={this.handleChange} placeholder="Choose a pokémon"></input>
        </div>
        {this.showPokemon}
      </div>
    );
  }
}

export default App;
