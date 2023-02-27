import { DefaultButton, List, Stack } from "@fluentui/react";
import { useState } from "react";
import Game from "../Game";
import { DefaultPalette } from "@fluentui/react";
import { io } from "socket.io-client";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../authConfig.js";

const msalInstance = new PublicClientApplication(msalConfig);

const stackStyles = {
	root: {
		//background: DefaultPalette.themeTertiary,
	},
};

const horizontalGapStackTokens = {
	childrenGap: 10,
	padding: 10,
};

let socket = null;

function CreateRoom(props) {
	const [gamestarted, startgame] = useState(false);

	let roomid = Math.floor(1000 + Math.random() * 9000);

	// let socket = socketio.connect("http://localhost:9000?room=1&userName=User_B");
	if (socket == null) {
		socket = io(
			"http://localhost:9000/?room=" + roomid + "&userName=" + props.name
		);
	}
	// Styles definition
	socket.on("connected", function (msg) {
		if (msg) {
			console.log(msg);
			document.getElementById("status").innerText = msg;
		}
	});

	return (
		<header>
			{gamestarted ? (
				<Game sock={socket}></Game>
			) : (
				<div>
					<h1>Game Lobby</h1>
					<div>Use this id to invite friends: {roomid}</div>
					<br></br>
					<div>People in the Lobby : </div>
					<div id="status"></div>
					<Stack
						disableShrink
						styles={stackStyles}
						tokens={horizontalGapStackTokens}
					>
						<DefaultButton
							className="mybtn"
							onClick={() => {
								socket.emit("message", "REQUESTED SERVER TO START GAME ");
								socket.emit("startgame", "Please start Game for this room ");
								startgame(true);
							}}
						>
							Start Game
						</DefaultButton>
					</Stack>
				</div>
			)}
		</header>
	);
}

export default CreateRoom;
