import React from "react";
import { Link } from "react-router-dom";
import "../../styles/cards.css";


const Card = ({type, id, name, image}) => {
    return (
		<div className="mb-3 ms-5 me-2 card-container" style={{ display: 'inline-block'}}>
			<div className="card border-0 mx-auto bg-dark" style={{width: "100%", cursor: 'pointer', overflow:'hidden'}}>
				<img src={image} className="card-img-top" style={{height: '20vh'}} alt={name}/>
				<div className="card-body">
					<h5 className="card-title text-white mt-2">{name}</h5>
					<div className="overlay">
					<Link to={`/${type}/${id}`}>
						<button type="button" className="btn btn-warning mt-2 read-more">Read more!</button>
					</Link>
					</div>
  				</div>
			</div>
		</div>
	)
}

export default Card