import * as React from "react";
import { Stack, StackItem } from "@fluentui/react";

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
