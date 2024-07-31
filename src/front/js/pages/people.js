import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const People = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const index = parseInt(params.theid)
	const people = JSON.parse(localStorage.getItem('people'))
	const person = people[index]

	return (
		<div className="row bg-dark mt-5">
			<div className="col col-lg-6" >
				<img className="" style={{minWidth: '700px', width:'700px', minHeight:'525px', height:'525px'}} src={store.peopleImages[index]} alt={person.name}></img>
			</div>
			<div className="col col-lg-6">
				<h1 className="text-white mb-4 mt-3">{person.name}</h1>
				<ul>
					<li className="text-white list-group-item bg-transparent"><b>Birth Year: </b> {person.birth_year}</li>
					<li className="text-white list-group-item bg-transparent"><b>Species: </b> {person.species}</li>
					<li className="text-white list-group-item bg-transparent"><b>Height: </b>{person.height}</li>
					<li className="text-white list-group-item bg-transparent"><b>Mass: </b>{person.mass}</li>
					<li className="text-white list-group-item bg-transparent"><b>Gender: </b>{person.gender}</li>
					<li className="text-white list-group-item bg-transparent"><b>Hair color: </b>{person.hair_color}</li>
					<li className="text-white list-group-item bg-transparent"><b>Skin color: </b>{person.skin_color}</li>
					<li className="text-white list-group-item bg-transparent"><b>Planet: </b>{person.planets}</li>
				</ul>

			</div>
		</div>
	);
};

People.propTypes = {
	match: PropTypes.object
};
