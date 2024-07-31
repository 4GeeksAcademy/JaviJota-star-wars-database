import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const Starships = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	const index = parseInt(params.theid)
	const starships = JSON.parse(localStorage.getItem('starships'))
	const starship = starships[index]

	return (
		<div className="row bg-dark mt-5">
			<div className="col col-lg-6" >
				<img className="" style={{minWidth: '700px', width:'700px', minHeight:'525px', height:'525px'}} src={store.starshipsImages[index]} alt={starship.name}></img>
			</div>
			<div className="col col-lg-6">
				<h1 className="text-white mb-4 mt-3">{starship.name}</h1>
				<ul>
					<li className="text-white list-group-item bg-transparent"><b>Model: </b> {starship.model}</li>
					<li className="text-white list-group-item bg-transparent"><b>Manufacturer: </b> {starship.manufacturer}</li>
					<li className="text-white list-group-item bg-transparent"><b>Passengers: </b>{starship.passengers}</li>
				</ul>
			</div>
		</div>
	);
};

Starships.propTypes = {
	match: PropTypes.object
};
