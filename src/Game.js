import {Stack} from "@fluentui/react"
import { useState, useEffect } from "react";
import Question from "./components/Question";


let index =0;
function Game(params) {

    const [context, setContext] = useState({questions: [], counter: 10, score: 0, GameOver: false});

    let socket = params.sock;

    socket.on('question', function(msg, id) {
        if(msg) {
            setContext({questions:[<Question id={id} description={msg} sock={socket}></Question>], counter: context.counter, score: context.score})
        }
      });

      socket.on('response', function(id, isCorrect, score) {
        if(isCorrect) {
            setContext({...context, score: score});
        }
      });

      socket.on('scorecard', function(scorecard) {
            setContext({...context, scorecard : scorecard, GameOver: true});
      });

   /* useEffect(() => {
     /*   context.counter >= 0 && setTimeout(() => {      
            setContext({...context, counter : context.counter - 1, score: context.score})         
        }, 1000)*/
      //}, [context]);

    return (
        <div>
        <header className="App-header">
            {context.GameOver?
            <div> 
            <h1>Score Card</h1>
            <div>{context.scorecard}</div></div>
            :<div>
            { context.questions.length === 0? <div>Waiting for the question from server</div>:
                <div>{/*<span> countdown : {context.counter}</span>*/}
                <div>Score : {context.score}</div><Stack>{context.questions}</Stack></div> 
            }</div>}
        </header>
        </div>
    );
  }
  
  export default Game;