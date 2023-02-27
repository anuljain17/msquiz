/* eslint-disable jsx-a11y/alt-text */
import { StringUtils } from "@azure/msal-browser";
import {
	DefaultButton,
	Stack,
	StackItem,
	Text,
	TextField,
} from "@fluentui/react";
import { useState } from "react";

function Question(context) {
	// eslint-disable-next-line no-unused-vars
	let [disable, setDisabled] = useState(context.disable);

	if (!context) {
		return;
	}

	let socket = context.sock;

	let submit = () => {
		let ans = document.getElementById("answer").value;
		socket.emit("answer", context.id, ans);
	};

	let keyPress = (e) => {
		if (e.keyCode === 13) {
			console.log("value", e.target.value);
			if (!disable) {
				socket.emit("answer", context.id, e.target.value);
			}
			// put the login here
		}
	};

	return (
		<div>
			<header>
				<Stack spacing={2}>
					<StackItem>
						<Text
							style={{
								color: "white",
								fontfamily: "robotto",
								fontSize: "24px",
							}}
						>
							{context.id + ". " + context.title}
						</Text>
					</StackItem>
					<StackItem>
						<Text
							style={{
								color: "white",
								fontfamily: "robotto",
								fontSize: "14px",
							}}
						>
							{context.description}
						</Text>
					</StackItem>
					{context.imageurl &&
					!StringUtils.matchPattern("null", context.imageurl) ? (
						<StackItem>
							<img src={context.imageurl} style={{ maxHeight: "400px" }}></img>
							<div></div>
						</StackItem>
					) : (
						<></>
					)}
					<br></br>
					{console.log("@@ Questions status: " + disable)}
					<StackItem>
						<TextField
							disabled={disable}
							readOnly={disable}
							onKeyDown={keyPress}
							id="answer"
						></TextField>
					</StackItem>
					<br></br>
					<StackItem>
						<DefaultButton
							disabled={disable}
							className="mybtn"
							onClick={submit}
						>
							Submit
						</DefaultButton>
					</StackItem>
				</Stack>
			</header>
		</div>
	);
}

export default Question;
