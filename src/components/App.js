import React, { Component } from 'react';
import './App.css';
import Listpokemon from './Listpokemon';
import Details from './Details';
import Home from './Home';
import { Link, Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleText = this.handleText.bind(this);
    this.state = {
      pkStore: [], //Mi array de criaturas
      pkName: '' //Recojo el valor del filtro
    }
 }
      componentDidMount() {
        const URL = 'https://pokeapi.co/api/v2/pokemon/';
        for (let i=1; i <= 25; i++){
    			let URL2 = URL + i ;

    			fetch(URL2) //llamada a la api limitada a 2 pokemons
    				.then(response => response.json()) //transformamos a json
    				.then(json => {
    					let pokemon = this.state.pkStore;
    					pokemon.push(json);//Insertamos el objeto criaturas en el array
    					pokemon.sort((poka, pokb) => {
    						if (poka.id < pokb.id)
    							return -1;
    						else if (poka.id > pokb.id)
    							return 1;
    						else
    							return 0;
    					})
    					this.setState({
    						pkStore: pokemon
    					});
    				})
    		}
    	}

      //Recogemos el valor del input
    	handleText(event){
    		let inputText = event.target.value.toLowerCase();

    		this.setState({
    			pkName: inputText
    		})
    	}

    	showPokemons(){
    		let pokeMonster = this.state.pkStore;

    		//Realizamos el filtrado
    		pokeMonster = this.state.pkStore.filter(pokemon =>
    		pokemon.name.toLowerCase().includes(this.state.pkName));

    		return (
    			<div className="pk__card">{
    				pokeMonster.map( //recorro el array
    					(pokemon, i) =>
    						<Listpokemon key={i}
    										image={pokemon.sprites.front_default}
    										id={pokemon.id}
    										name={pokemon.name}
    										type={pokemon.types.map((t) => t.type.name)}
                        weight={pokemon.weight}
                         />
                         //recorro los tipos
    				)
    			}</div>
    		);
    	}

    	render() {
    		return (
    			<div className="box__container">
    				<div>
            <h2 className="pokemon__title">Pokémon</h2>
    				<input className="box__input" onChange={this.handleText} placeholder="Choose a Pokémon">
            </input>
            </div>
    				{this.showPokemons()}

          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/details'>Details</Link></li>
          </ul>

          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/details' component={ Details } />
          </Switch>
            </div>

    	);
    	}
    }

    export default App;
