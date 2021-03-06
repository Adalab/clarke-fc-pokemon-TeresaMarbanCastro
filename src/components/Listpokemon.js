import React from 'react';
// import { Route, Switch } from 'react-router-dom';

class Listpokemon extends React.Component {

  	render(){
  		return(
  			<div className="pk__box">
  				<span>#{this.props.id}</span>
  				<img className="pk__img" src={this.props.image} alt="pokemon"/>
  				<h3>{this.props.name} {this.props.weight}</h3>
  				<div className="pk__type">
  					{this.props.type.map((type, i) =>
  						<span key={i} className={`pk__type--box pk__type--${type}`}> {type} </span>)}
  				</div>
  			</div>
  		)
  	}
  }

export default Listpokemon;
