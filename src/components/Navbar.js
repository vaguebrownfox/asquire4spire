import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { Context as LoginContext } from "../context/LoginContext";

// UI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import {
	Button as ButtonModal,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Input,
} from "reactstrap";

const Navbar = () => {
	const { state, login, toggle, updateInput, logout } = useContext(
		LoginContext
	);
	const history = useHistory();

	return (
		<div>
			<Modal
				isOpen={state.loginModal}
				toggle={toggle}
				className="loginmodal"
				backdrop={true}
			>
				<ModalHeader toggle={toggle}>Login</ModalHeader>
				<ModalBody>
					<FormGroup>
						<Input
							type="email"
							name="email"
							id="email"
							placeholder="Email"
							value={state.input.email}
							onChange={(e) => {
								updateInput({
									...state.input,
									email: e.target.value,
								});
							}}
						/>
					</FormGroup>
					<FormGroup>
						<Input
							type="password"
							name="password"
							id="password"
							placeholder="Password"
							value={state.input.password}
							onChange={(p) => {
								updateInput({
									...state.input,
									password: p.target.value,
								});
							}}
						/>
					</FormGroup>
				</ModalBody>
				<ModalFooter>
					{state.loading && <h5 className="loggin">Logging in...</h5>}
					{state.error && (
						<h5 className="error">
							{state.error.error || "Error occured"}
						</h5>
					)}
					<ButtonModal
						color="inherited"
						onClick={() => login({ input: state.input, history })}
					>
						Next
					</ButtonModal>
				</ModalFooter>
			</Modal>

			<AppBar>
				<Toolbar className="nav-container">
					<h4 className="title">Asquire</h4>
					<div className="nav-button">
						<Button
							color="inherit"
							onClick={
								state.token !== ""
									? () => logout({ history })
									: toggle
							}
						>
							{state.token !== "" ? "Logout" : "Login"}
						</Button>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;
