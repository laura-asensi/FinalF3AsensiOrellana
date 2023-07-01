import { useEffect, useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "../utils/global.context";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const DetailCard = () => {
	const [dentist, setDentist] = useState([]);
	const { theme, isDarkMode } = useContext(GlobalContext);
	const params = useParams();
	const idParam = parseInt(params.id);
	const navigate = useNavigate();


	const getDentistById = async () => {
		try {
			const response = await fetch(
				`https://jsonplaceholder.typicode.com/users/${idParam}`
			);
			const data = await response.json();
			setDentist(data);
		} catch (error) {
			console.error(error);
		}
	};


	// Alternative way to get the dentist card without re-calling the API
	// *Note before uncommenting the code below: it is neccesary to import {dentists} from GlobalContext on line 9
	// const getDentist = () => {
	// 	let dentistFiltered = dentists.filter((dentist) => dentist.id === idParam);
	// 	setDentist(dentistFiltered[0]);
	// 	return dentistFiltered;
	// };

	useEffect(() => {
		getDentistById();
	}, [params]);

	return (
		<>
			{dentist && (
				<section>
					<div className="d-flex flex-column align-items-center m-3">
						<h1 className="mb-5 text-center mt-4">
							Details about Dentist {dentist.name}
						</h1>
						<section
							className={`card col-sm-12 col-lg-6 container ${
								isDarkMode ? "border-light" : "border-dark"
							}`}
							style={theme}
						>
							<div className={`card-body row `}>
								<div className={`col-sm-12 col-lg-6`}>
									<img
										className="card-img-top"
										src="/images/doctor.jpg"
										alt="doctor placeholder"
									/>
								</div>
								<div className={`col-sm-12 col-lg-6 `}>
									<ul className={`list-group`}>
										<li className={`list-group-item ${isDarkMode? "border-light" : "border-secondary"}`} style={theme}>
											<u><i>Name</i></u>: {dentist.name}
										</li>
										<li className={`list-group-item ${isDarkMode? "border-light" : "border-secondary"}`} style={theme}>
											<u><i>Email</i></u>: {dentist.email}
										</li>
										<li className={`list-group-item ${isDarkMode? "border-light" : "border-secondary"}`} style={theme}>
											<u><i>Phone</i></u>: {dentist.phone}
										</li>
										<li className={`list-group-item ${isDarkMode? "border-light" : "border-secondary"}`} style={theme}>
											<u><i>Website</i></u>: {dentist.website}
										</li>
									</ul>
									<div className="text-center">
										<Link to="/contact">
											<Button className="mt-4 mb-3">Schedule Consult</Button>
										</Link>
									</div>
								</div>
							</div>
						</section>
						<Button className="w-50 mt-4" onClick={() => navigate("/home")}>
							Back to home
						</Button>
					</div>
				</section>
			)}
		</>
	);
};

export default DetailCard;