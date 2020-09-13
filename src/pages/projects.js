import React, { useContext, useEffect, useState } from "react";

import { Context as LoginContext } from "../context/LoginContext";
// MUI stuff
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import ProjectCard from "../components/ProjectCard";
import Cookies from "universal-cookie";
import {
	Button as ButtonModal,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Input,
} from "reactstrap";
const Projects = () => {
	const cookies = new Cookies();

	const { state, updateProjectList, addProject, clearInfo } = useContext(
		LoginContext
	);
	const [modalState, setModalState] = useState(false);
	const [addProjectNameState, setAddProjectNameState] = useState(false);

	const toggle = () => {
		setModalState(!modalState);
	};
	useEffect(() => {
		let config = {
			headers: {
				Authorization: `Bearer ${cookies.get("mytoken")}`,
			},
		};

		updateProjectList(config);
	}, []);

	const projectCards = () => {
		if (state.projects.length === 0) {
			return <p>Fetching...</p>;
		} else {
			return state.projects.map((p, index) => (
				<ProjectCard key={index} project={p} />
			));
		}
	};

	return (
		<Grid container className="gridContainer">
			<Grid item sm></Grid>
			<Grid item sm>
				<Typography gutterBottom variant="h5" component="h2">
					Projects
				</Typography>
				<ButtonModal id="taskaddbut" onClick={toggle}>
					Add Project
				</ButtonModal>
				{projectCards()}

				<Modal
					isOpen={modalState}
					toggle={toggle}
					className="loginmodal"
					backdrop={true}
				>
					<ModalHeader toggle={toggle}>Add Project</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Input
								type="text"
								name="description"
								id="description"
								placeholder="Enter project name (Alphabets only)"
								onChange={(e) => {
									setAddProjectNameState(e.target.value);
								}}
							/>
						</FormGroup>
					</ModalBody>
					<ModalFooter>
						{<h5 className="loggin">{state.info}</h5>}
						{<h5 className="error">{state.error}</h5>}
						<ButtonModal
							color="inherited"
							onClick={() => {
								const projectData = {
									projectHandle: addProjectNameState,
									user: cookies.get("myemail"),
								};
								addProject({ projectData });
							}}
						>
							Add
						</ButtonModal>
					</ModalFooter>
				</Modal>
			</Grid>
			<Grid item sm></Grid>
		</Grid>
	);
};

export default Projects;
