import * as React from "react";
import {
	DefaultButton,
	Image,
	Stack,
	StackItem,
	Text,
	TextField,
} from "@fluentui/react";

function Leaderboard(props) {
	// Populate with items for demos.
	let _allItems = [];
	for (let i = 0; i < 200; i++) {
		_allItems.push({
			key: i,
			name: "Item " + i,
			value: i,
		});
	}

	let _columns = [
		{
			key: "column1",
			name: "Name",
			fieldName: "name",
			minWidth: 100,
			maxWidth: 200,
			isResizable: true,
		},
		{
			key: "column2",
			name: "Value",
			fieldName: "value",
			minWidth: 100,
			maxWidth: 200,
			isResizable: true,
		},
	];

	return (
		<div>
			<h1>Leaderboard</h1>
			<Stack horizontal tokens={{ childrenGap: 10 }}>
				<StackItem>
					<div className="leaderboard">
						<div className="label">rank</div>
						<div className="label">name</div>
						<div className="score">score</div>
					</div>
				</StackItem>
				<StackItem>
					<div className="leaderboard">
						<div className="label">rank</div>
						<div className="label">name</div>
						<div className="score">score</div>
					</div>
				</StackItem>
			</Stack>
		</div>
	);
}

export default Leaderboard;
