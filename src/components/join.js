import { TextField, DefaultButton } from "@fluentui/react";
import { io } from "socket.io-client";
import { useState } from "react";
import Game from "../Game";

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../authConfig.js";

let socket = null;

const msalInstance = new PublicClientApplication(msalConfig);

function Join(props) {
	// Styles definition
	const [context, setContext] = useState({});

	let joinAction = () => {
		if (socket == null) {
			let roomid = document.getElementById("roomid").value;
			socket = io(
				"http://localhost:9000/?room=" + roomid + "&userName=" + props.name
			);

			socket.on("connected", function (msg) {
				if (msg) {
					console.log(msg);
					setContext({ ...context, status: msg });
				}
			});

			socket.on("gamestarted", function (msg) {
				if (msg) {
					setContext({ ...context, gamestarted: msg });
				}
			});
		}
	};

	return (
		<div>
			{" "}
			{context.gamestarted ? (
				<Game sock={socket}></Game>
			) : context.status ? (
				<header>
					<div>
						<div>Waiting for Host to start the Game</div>
						<div> Other Players in the lobby : </div>
						<div id="status">{context.status}</div>
					</div>
				</header>
			) : (
				<header>
					<h1>Join a Room</h1>
					<TextField
						label="Enter Room Id"
						id="roomid"
						style={{ textColor: "white" }}
					></TextField>
					<br></br>
					<DefaultButton className="mybtn" onClick={joinAction}>
						Join
					</DefaultButton>
				</header>
			)}
		</div>
	);
}

export default Join;
