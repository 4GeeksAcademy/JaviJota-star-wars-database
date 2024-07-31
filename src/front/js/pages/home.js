import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import "../../styles/cards.css";
import Card from "../component/card.jsx"

export const Home = () => {
	const { store, actions } = useContext(Context);
	const localPeople =  JSON.parse(localStorage.getItem('people'))
	const localPlanets =  JSON.parse(localStorage.getItem('planets'))
	const localStarships =  JSON.parse(localStorage.getItem('starships'))

	return (
		<div className="mt-5">
			<h1 className="text-white ms-5 mb-3">People</h1>
			<div className="row posts mb-5">
				{store.people && store.people.length > 0 ? (
						store.people.map((person, index) => (
							<Card type={'people'} id={index} key={index} name={person.name} image={store.peopleImages ? store.peopleImages[index] : null} />
						))
					) : (
						localPeople?.map((person, index) => (
							<Card type={'people'} id={index} key={index} name={person.name} image={store.peopleImages ? store.peopleImages[index] : null} />
						))
					)
				}
			</div>
			<h1 className="text-white ms-5 mb-3">Planets</h1>
			<div className="row posts mb-5">
				{store.planets && store.planets.length > 0 ? (
						store.planets.map((planet, index) => (
							<Card type={'planets'} id={index} key={index} name={planet.name} image={store.planetsImages ? store.planetsImages[index] : null} />
						))
					) : (
						localPlanets?.map((planet, index) => (
							<Card type={'planets'} id={index} key={index} name={planet.name} image={store.planetsImages ? store.planetsImages[index] : null} />
						))
					)
				}
			</div>
			<h1 className="text-white ms-5 mb-3">Starships</h1>
			<div className="row posts">
				{store.starships && store.starships.length > 0 ? (
						store.starships.map((starship, index) => (
							<Card type={'starships'} id={index} key={index} name={starship.name} image={store.starshipsImages ? store.starshipsImages[index] : null} />
						))
					) : (
						localStarships?.map((starship, index) => (
							<Card type={'starships'} id={index} key={index} name={starship.name} image={store.starshipsImages ? store.starshipsImages[index] : null} />
						))
					)
				}
			</div>
		</div>
	);
};
