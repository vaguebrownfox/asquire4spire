import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { Provider as LoginProvider } from "./context/LoginContext";

import home from "./pages/home";
import projects from "./pages/projects";
import task from "./pages/task";

import Navbar from "./components/Navbar";

import axios from "axios";

axios.defaults.baseURL =
	"https://us-central1-pnoi-dat-7.cloudfunctions.net/api/";

const theme = createMuiTheme({
	palette: {
		primary: {
			light: "#9cada4",
			main: "#fabea7",
			dark: "#767c77",
			contrastText: "#fff",
		},
		secondary: {
			light: "#f7f2e7",
			main: "#e0ece4",
			dark: "#797a7e",
			contrastText: "#fff",
		},
		typography: {
			useNextVariants: true,
		},
	},
});

function App() {
	return (
		<LoginProvider>
			<MuiThemeProvider theme={theme}>
				<div className="App">
					<Router>
						<div className="container">
							<Navbar button="Login" />
							<Switch>
								<Route exact path="/" component={home} />
								<Route
									exact
									path="/projects"
									component={projects}
								/>
								<Route exact path="/task" component={task} />
							</Switch>
						</div>
					</Router>
				</div>
			</MuiThemeProvider>
		</LoginProvider>
	);
}

export default App;
