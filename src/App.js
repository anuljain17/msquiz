import { useEffect, useState } from "react";
import "./App.css";
import CreateRoom from "./components/CreateRoom";
import Join from "./components/join";
import Leaderboard from "./components/Leaderboard";
import { DefaultButton, Stack } from "@fluentui/react";
import Admin from "./components/Admin";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

const verticalGapStackTokens = {
	childrenGap: 10,
	padding: 5,
	alignItems: "center",
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */

const msalInstance = new PublicClientApplication(msalConfig);

function App() {
	const [state, setState] = useState({ choice: "", isAuthenticated: false });

	async function login() {
		try {
			const account = msalInstance.getActiveAccount();
			if (!account) {
				// redirect anonymous user to login page
				let response = await msalInstance.loginPopup({
					scopes: ["User.Read"],
					prompt: "select_account",
				});
				if (response.account) {
					msalInstance.setActiveAccount(response.account);
				}
			}
			//let response = await msalInstance.loginPopup({scopes:["User.Read"], prompt: "select_account"})
			setState({
				...state,
				isAuthenticated: true,
				name: msalInstance.getActiveAccount().name,
			});
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		const account = msalInstance.getActiveAccount();
		if (!state.isAuthenticated && account) {
			if (account) {
				setState({
					...state,
					isAuthenticated: true,
					name: msalInstance.getActiveAccount().name,
				});
			}
		}
	}, [state]);

	return (
		<GoogleOAuthProvider clientId="120355859402-nn43p6brc163ilv654kphci1gkmlqs0k.apps.googleusercontent.com">
			<div className="App">
				<Stack className="alignheader" tokens={verticalGapStackTokens}>
					<h1>TIMEPASSQUIZ</h1>
					{state.isAuthenticated ? <span>Welcome {state.name}</span> : <></>}
				</Stack>
				<br></br>
				{state.choice === "" ? (
					<>
						{state.isAuthenticated ? (
							<Stack tokens={verticalGapStackTokens}>
								<DefaultButton
									className="mybtn"
									onClick={() => setState({ ...state, choice: "1" })}
								>
									Create a new Room
								</DefaultButton>
								<DefaultButton
									className="mybtn"
									onClick={() => setState({ ...state, choice: "2" })}
								>
									Join a room
								</DefaultButton>
								<DefaultButton
									className="mybtn"
									onClick={() => setState({ ...state, choice: "3" })}
								>
									Leaderboard
								</DefaultButton>
							</Stack>
						) : (
							<>
								<DefaultButton className="mybtn" onClick={() => login()}>
									login via microsoft account
								</DefaultButton>
								<br></br>
								<GoogleLogin
									isSignedIn={true}
									onSuccess={(credentialResponse) => {
										console.log(credentialResponse);
										const responsePayload = parseJwt(
											credentialResponse.credential
										);

										console.log("ID: " + responsePayload.sub);
										console.log("Full Name: " + responsePayload.name);
										console.log("Given Name: " + responsePayload.given_name);
										console.log("Family Name: " + responsePayload.family_name);
										console.log("Image URL: " + responsePayload.picture);
										console.log("Email: " + responsePayload.email);
										setState({
											...state,
											isAuthenticated: true,
											name: responsePayload.name,
										});
									}}
									onError={() => {
										console.log("Login Failed");
									}}
								/>
								<br></br>
								<DefaultButton
									className="mybtn"
									onClick={() => {
										setState({
											...state,
											choice: "4",
										});
									}}
								>
									Submit a Question
								</DefaultButton>
							</>
						)}
					</>
				) : state.choice === "1" ? (
					<CreateRoom name={state.name}></CreateRoom>
				) : state.choice === "2" ? (
					<Join name={state.name}></Join>
				) : state.choice === "4" ? (
					<Admin></Admin>
				) : (
					<Leaderboard></Leaderboard>
				)}
			</div>
			<div className="footer" />
		</GoogleOAuthProvider>
	);
}

function parseJwt(token) {
	var base64Url = token.split(".")[1];
	var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	var jsonPayload = decodeURIComponent(
		window
			.atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	return JSON.parse(jsonPayload);
}

export default App;
