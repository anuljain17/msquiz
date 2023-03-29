import { Stack, StackItem } from "@fluentui/react";
import axios from "axios";
import { useState } from "react";
import Question from "./components/Question";

function Game(params) {
	const [context, setContext] = useState({
		question: null,
		counter: 10,
		score: 0,
		GameOver: false,
		scorecard: {},
		disable: false,
	});

	let socket = params.sock;

	socket.on("question", function (msg, id) {
		if (msg) {
			let jsonPayload = JSON.parse(msg);
			axios
				.get(
					"https://timepassquizserver.azurewebsites.net/getImageurl/" +
						jsonPayload.imageurl
				)
				.then((res) => {
					console.log("@@@", res);
					setContext({
						question: { ...jsonPayload, socket, res },
						counter: context.counter,
						score: context.score,
						scorecard: context.scorecard,
						disable: false,
					});
				});
		}
	});

	socket.on("finalscore", function (scorecard) {
		setContext({
			...context,
			scorecard: JSON.parse(scorecard),
			GameOver: true,
		});
	});

	socket.on("scorecard", function (scorecard) {
		setContext({
			...context,
			scorecard: JSON.parse(scorecard),
			GameOver: false,
		});
	});

	socket.on("response", function (id, isCorrect, score) {
		if (isCorrect) {
			setContext({ ...context, disable: true });
		}
	});

	/* useEffect(() => {
     /*   context.counter >= 0 && setTimeout(() => {      
            setContext({...context, counter : context.counter - 1, score: context.score})         
        }, 1000)*/
	//}, [context]);

	return (
		<>
			{context.GameOver ? (
				<>
					<div className="App-header-Question">
						<h1>Score Card</h1>
						{context.scorecard != null &&
						Object.entries(context.scorecard).length > 0 ? (
							Object.entries(context.scorecard).map((k, v) => (
								<Scorecard key={k[0]} label={k[0]} score={k[1]}></Scorecard>
							))
						) : (
							<Scorecard
								label="No One Scored Any Points :p"
								score=""
							></Scorecard>
						)}
					</div>
				</>
			) : (
				<>
					<div className="App-header-Question">
						<Stack horizontal tokens={{ childrenGap: 10 }}>
							{context.scorecard != null &&
							Object.entries(context.scorecard).length > 0 ? (
								Object.entries(context.scorecard).map((k, v) => (
									<StackItem>
										<div className="ingamescorecard">{k[0] + ":" + k[1]}</div>
									</StackItem>
								))
							) : (
								<></>
							)}
						</Stack>
						{context.question == null ? (
							<div>Waiting for the question from server</div>
						) : (
							<div>
								{/*<span> countdown : {context.counter}</span>*/}
								<Stack>
									{context.question != null ? (
										<Question
											key={context.question.id}
											id={context.question.id}
											title={context.question.title}
											description={context.question.description}
											imageurl={context.question.res.data}
											sock={context.question.socket}
											disable={context.disable}
										></Question>
									) : (
										<></>
									)}
								</Stack>
							</div>
						)}
					</div>
				</>
			)}
		</>
	);
}

const Scorecard = (props) => {
	return (
		<>
			<div className="scorecard">
				<div className="label">{props.label}</div>
				<div className="score">{props.score}</div>
			</div>
			<br></br>
		</>
	);
};

export default Game;
