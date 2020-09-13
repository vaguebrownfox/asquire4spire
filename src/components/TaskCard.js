import React from "react";

// Mui stuff
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
	table: {
		margin: "10px auto 10px auto",
		width: "100%",
	},
});

const TaskCard = ({ tasks }) => {
	const classes = useStyles();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.table} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>
							<b>Description</b>
						</TableCell>
						<TableCell align="center">
							<b>Image URL</b>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{tasks.map((task, index) => (
						<TableRow key={task.imageUrl}>
							<TableCell component="th" scope="row">
								{`${index + 1}. ${task.description}`}
							</TableCell>
							<TableCell align="center">
								<a
									href={task.imageUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									View
								</a>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TaskCard;
