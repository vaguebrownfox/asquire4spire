import createContext from "./createContext";
import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
	loginState: false,
	loginModal: false,
	input: { email: "", password: "" },
	loading: false,
	error: "",
	token: cookies.get("mytoken") || "",
	projects: [],
	projectName: "",
	tasks: [],
	taskDescription: "",
};

const loginReducer = (state, action) => {
	switch (action.type) {
		case "TOGGLE":
			return {
				...state,
				loginModal: !state.loginModal,
			};

		case "UPDATE_INPUT":
			return { ...state, input: action.payload };

		case "LOGIN":
			return {
				...state,
				loginModal: false,
				loginState: true,
				token: action.payload,
				loading: false,
				error: "",
			};

		case "LOADING":
			return {
				...state,
				error: "",
				loading: action.payload,
			};

		case "ERROR":
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case "LOGOUT":
			return {
				...initialState,
				token: "",
			};

		case "UPDATE_PROJECT":
			return {
				...state,
				projects: action.payload,
			};

		case "ADD_PROJECT":
			return {
				...state,
				info: action.payload,
			};

		case "TASK":
			return {
				...state,
				projectName: action.payload,
			};

		case "FETCH_TASKS":
			return {
				...state,
				tasks: action.payload,
				error: "",
			};

		case "TASK_DESCRIPTION":
			return {
				...state,
				taskDescription: action.payload,
			};

		case "ADD_TASK":
			return {
				...state,
				error: action.payload,
				taskDescription: "",
				info: "Done",
			};

		case "UPLOAD_TASK":
			return {
				...state,
				uploadInfo: action.payload.info,
				error: action.payload.error || "",
			};

		case "CLEAR_INFO":
			return {
				...state,
				uploadInfo: "",
				error: "",
			};
		default:
			return state;
	}
};

const clearInfo = (dispatch) => {
	return () => {
		dispatch({ type: "CLEAR_INFO" });
	};
};

const login = (dispatch) => {
	return ({ input, history }) => {
		//login

		dispatch({ type: "LOADING", payload: true });
		const loginBody = {
			user: input.email,
			password: input.password,
		};

		axios
			.post("/login", loginBody)
			.then((res) => {
				let token = res.data.token;

				cookies.set("mytoken", token, { path: "/" });
				cookies.set("myemail", input.email, { path: "/" });

				dispatch({ type: "LOGIN", payload: token });
				history.push("/projects");
			})
			.catch((e) => {
				dispatch({ type: "ERROR", payload: e.response.data });
			});
	};
};

const logout = (dispatch) => {
	return ({ history }) => {
		cookies.remove("mytoken", { path: "/" });
		dispatch({ type: "LOGOUT" });

		history.push("/");
	};
};

const toggle = (dispatch) => {
	return () => {
		dispatch({ type: "TOGGLE" });
	};
};

const updateInput = (dispatch) => {
	return (input) => {
		dispatch({ type: "UPDATE_INPUT", payload: input });
	};
};

const updateProjectList = (dispatch) => {
	return (config) => {
		axios
			.get("/projects", config)
			.then((res) => {
				return res.data;
			})
			.then((data) => {
				dispatch({ type: "UPDATE_PROJECT", payload: data });
			})
			.catch((e) => {});
	};
};

const addProject = (dispatch) => {
	return ({ projectData }) => {
		dispatch({ type: "LOADING", payload: true });
		dispatch({ type: "ADD_PROJECT", payload: "Adding..." });
		//TODO: axios post with auth
		let config = {
			headers: {
				Authorization: `Bearer ${cookies.get("mytoken")}`,
			},
		};
		axios
			.post("/add-project", projectData, config)
			.then((res) => {
				dispatch({ type: "LOADING", payload: false });
				dispatch({ type: "ADD_PROJECT", payload: "Done" });
			})
			.catch((e) => {
				dispatch({ type: "ERROR", payload: e.response.data.handle });
			});
	};
};

const projectTask = (dispatch) => {
	return ({ projectName, history }) => {
		dispatch({ type: "TASK", payload: projectName });

		history.push("/task");
	};
};

const handleTaskFetch = (dispatch) => {
	const projectName = cookies.get("projectName");
	axios
		.get("/tasks")
		.then((res) => {
			return res.data;
		})
		.then((data) => {
			let projTasks = data.filter((t) => t.projectHandle === projectName);
			dispatch({ type: "FETCH_TASKS", payload: projTasks });
		})
		.catch((e) => {});
};

const fetchTasks = (dispatch) => {
	return () => {
		handleTaskFetch(dispatch);
	};
};

const updateTaskDescription = (dispatch) => {
	return (text) => {
		dispatch({ type: "TASK_DESCRIPTION", payload: text });
	};
};

// {
//     "projectHandle": "newpnoi",
//     "description": "cough slowly"
//     "imageURL": "//:fdsfsd//"
// }
const addTask = (dispatch) => {
	return ({ config, postTask, formData }) => {
		dispatch({ type: "UPLOAD_TASK", payload: { info: "Uploading..." } });
		axios
			.post("/tasks/image", formData, config)
			.then((res) => {
				dispatch({
					type: "UPLOAD_TASK",
					payload: { info: "Image uploaded." },
				});
				return res.data.message;
			})
			.then((url) => {
				config = {
					headers: {
						Authorization: `Bearer ${cookies.get("mytoken")}`,
					},
				};
				postTask.imageURL = url;

				axios
					.post("/tasks", postTask, config)
					.then((res) => {
						dispatch({
							type: "UPLOAD_TASK",
							payload: { info: "Task added" },
						});
					})
					.catch((e) => {
						dispatch({
							type: "UPLOAD_TASK",
							payload: {
								info: "Upload failed",
								error: "Error occured, re-login",
							},
						});
					});
			})
			.catch((e) => {
				dispatch({
					type: "UPLOAD_TASK",
					payload: {
						info: "Upload failed",
						error: "Error occured, re-login",
					},
				});
			});
	};
};

export const { Context, Provider } = createContext(
	loginReducer,
	{
		login,
		toggle,
		updateInput,
		logout,
		updateProjectList,
		projectTask,
		addProject,
		fetchTasks,
		updateTaskDescription,
		addTask,
		clearInfo,
	},
	initialState
);
