import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Cookies from "universal-cookie";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Context as LoginContext } from "../context/LoginContext";

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		alignSelf: "center",
		margin: "20px",
		minWidth: "248px",
	},
	media: {
		height: 140,
	},
});

const ProjectCard = ({ project }) => {
	const cookies = new Cookies();
	const classes = useStyles();
	const history = useHistory();
	const { projectTask } = useContext(LoginContext);

	dayjs.extend(relativeTime);

	return (
		<Card className={classes.root}>
			<CardActionArea>
				<CardContent>
					<Typography gutterBottom variant="h5" component="h2">
						{project.projectName}
					</Typography>
					<Typography
						variant="body2"
						color="textSecondary"
						component="p"
					>
						{`Created ${dayjs(project.createdOn).fromNow()}`}
					</Typography>
				</CardContent>
			</CardActionArea>
			<CardActions>
				<Button
					size="small"
					color="primary"
					onClick={() => {
						cookies.set("projectName", project.projectName, {
							path: "/",
						});
						projectTask({
							projectName: project.projectName,
							history,
						});
					}}
				>
					Edit
				</Button>
			</CardActions>
		</Card>
	);
};

export default ProjectCard;
