import React from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../utils/global.context";
import { useContext } from "react";
import "./DentistCard.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faXmark } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";

const DentistCard = ({ dentist }) => {
	const {
		favsState,
		addFavoriteDentist,
		removeFavoriteDentist,
		theme,
		isDarkMode,
	} = useContext(GlobalContext);

	const isFavorite = favsState.favoriteDentists.some(
		(favorite) => favorite.id === dentist.id
	);

	const toggleFav = () => {
		isFavorite ? removeFavoriteDentist(dentist) : addFavoriteDentist(dentist);
	};

	return (
		<div key={dentist.id} className="cardContainer">
			<ToastContainer />
			<Link to={`/dentist/${dentist.id}`} className="link">
				<Card style={theme} border={`${isDarkMode ? "light" : "dark"}`}>
					<Card.Title className="cardTitle p-4 text-center" style={theme}>
						{dentist.name}
					</Card.Title>
					<Card.Img
						variant="top"
						src="/images/doctor.jpg"
						alt="doctor placeholder"
					/>
					<Card.Body className="cardBody">
						<Card.Text className="cardText cardTextId" style={theme}>
							ID: {dentist.id}
						</Card.Text>
						<Card.Text className="cardText" style={theme}>
							Name: {dentist.name}
						</Card.Text>
						<Card.Text className="cardText" style={theme}>
							Username: {dentist.username}
						</Card.Text>
					</Card.Body>
				</Card>
			</Link>
			<Button onClick={toggleFav} variant="primary" className="mt-4">
				{isFavorite ? (
					<div>
						<FontAwesomeIcon
							icon={faXmark}
							rotation={90}
							size="lg"
							style={{ color: "#FF6347" }}
						/>
						<span> Remove</span>
					</div>
				) : (
					<div>
						<FontAwesomeIcon
							icon={faStar}
							rotation={90}
							style={{ color: "#FFD700" }}
						/>
						<span> Add to favs</span>
					</div>
				)}
			</Button>
		</div>
	);
};

export default DentistCard;