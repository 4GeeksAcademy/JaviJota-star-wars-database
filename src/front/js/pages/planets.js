import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Planets = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const index = parseInt(params.theid)
	const planets = JSON.parse(localStorage.getItem('planets'))
	const planet = planets[index]

	return (
		<div className="row bg-dark mt-5">
			<div className="col col-lg-6" >
				<img className="" style={{minWidth: '700px', width:'700px', minHeight:'525px', height:'525px'}} src={store.planetsImages[index]} alt={planet.name}></img>
			</div>
			<div className="col col-lg-6">
				<h1 className="text-white mb-4 mt-3">{planet.name}</h1>
				<ul>
					<li className="text-white list-group-item bg-transparent"><b>Diameter: </b> {planet.diameter}</li>
					<li className="text-white list-group-item bg-transparent"><b>Climate: </b> {planet.climate}</li>
					<li className="text-white list-group-item bg-transparent"><b>Terrain: </b>{planet.terrain}</li>
					<li className="text-white list-group-item bg-transparent"><b>Population: </b>{planet.population}</li>
				</ul>
			</div>
		</div>
	);
};

Planets.propTypes = {
	match: PropTypes.object
};
