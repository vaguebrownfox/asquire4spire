import React from "react";

const Home = () => {
	return (
		<div>
			<h4>About Pnoi-phone</h4>
			<p>TODO: Design and build this project home page</p>
			<hr />
			<h4 className="slides-head">BSSIP'19 Presentation slides</h4>
			<div className="slide-container">
				<iframe
					className="slides-iframe"
					src="https://docs.google.com/presentation/d/e/2PACX-1vRvSgs-YgMDltVMKd2WChnd_9IFaAv9q4VT14QMfcP_7eVN5sChfUAc7ceASYVTl1uE5GQj9eS-uuQE/embed?start=true&loop=false&delayms=3000"
					frameborder="0"
					title="slides"
				></iframe>
			</div>
		</div>
	);
};
export default Home;
