import React, { useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";

import { Context as LoginContext } from "../context/LoginContext";
import TaskCard from "../components/TaskCard";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";

import {
	Button as ButtonModal,
	Modal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	FormGroup,
	Input,
} from "reactstrap";

const Task = () => {
	const cookies = new Cookies();
	const {
		state,
		fetchTasks,
		updateTaskDescription,
		addTask,
		clearInfo,
	} = useContext(LoginContext);

	useEffect(() => {
		fetchTasks();
	}, []);

	const [modalState, setModalState] = useState(false);
	const [fileState, setFileState] = useState("");
	const [taskState, setTaskState] = useState({});

	const tasksTable = () => {
		if (state.tasks.length === 0) {
			return <p>Fetching...</p>;
		} else {
			return <TaskCard tasks={state.tasks} />;
		}
	};

	const toggle = () => {
		setModalState(!modalState);
	};

	const handleImageUpload = (eve) => {
		const image = eve.target.files[0];
		setFileState("file: " + image.name.slice(0, 16));

		const formData = new FormData();
		formData.append("image", image, image.name);

		let config = {
			headers: {
				Authorization: `Bearer ${cookies.get("mytoken")}`,
				"Content-Type": "multipart/form-data",
			},
		};
		// let config = {
		// 	headers: {
		// 		Authorization: `Bearer ${cookies.get("mytoken")}`,
		// 	},
		// };

		// const headers = {
		// 	"Content-Type": "multipart/form-data",
		// 	Authorization: `Bearer ${cookies.get("mytoken")}`,
		// };

		setTaskState({
			config,
			formData,
		});
	};

	const handleImgButton = () => {
		const fileInput = document.getElementById("imageUploadModal");
		clearInfo();
		fileInput.click();
	};

	return (
		<Grid container className="gridContainer">
			<Grid item sm></Grid>
			<Grid item sm>
				<Typography gutterBottom variant="h5" component="h2">
					{state.projectName || cookies.get("projectName")}
				</Typography>
				<ButtonModal id="taskaddbut" onClick={toggle}>
					Add Task
				</ButtonModal>
				{tasksTable()}

				<Modal
					isOpen={modalState}
					toggle={toggle}
					className="loginmodal"
					backdrop={true}
				>
					<ModalHeader toggle={toggle}>Add Task</ModalHeader>
					<ModalBody>
						<FormGroup>
							<Input
								type="text"
								name="description"
								id="description"
								placeholder="Enter task description"
								onChange={(e) => {
									updateTaskDescription(e.target.value);
								}}
							/>
						</FormGroup>

						<div
							className="imgUP"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
							>
								Browse and Upload Image
							</Typography>

							<input
								type="file"
								hidden="hidden"
								id="imageUploadModal"
								onChange={handleImageUpload}
							/>
							<IconButton
								onClick={handleImgButton}
								style={{
									margin: "auto 18px",
								}}
							>
								<ImageIcon />
							</IconButton>
						</div>
						<div
							className="imgUP"
							style={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Typography
								variant="body2"
								color="textSecondary"
								component="p"
							>
								{`${fileState}${
									fileState.length < 22 ? "" : " ..."
								}`}
							</Typography>
						</div>
					</ModalBody>
					<ModalFooter>
						{<h5 className="loggin">{state.uploadInfo}</h5>}
						{<h5 className="error">{state.error}</h5>}
						<ButtonModal
							color="inherited"
							onClick={() => {
								const postTask = {
									projectHandle: cookies.get("projectName"),
									description:
										state.taskDescription === ""
											? "-no description-"
											: state.taskDescription,
								};

								addTask({
									config: taskState.config,
									formData: taskState.formData,
									postTask,
								});
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

export default Task;
