import {Stack} from "@fluentui/react"
import { useState, useEffect } from "react";
import Question from "./components/Question";


let index =0;
function Game() {
    const [context, setContext] = useState({questions: [<Question description={"Question Start"}></Question>], counter: 5, score: 0});

    var arr = [];
    for(var i=0;i<10;i++){
        arr.push(<Question description={i+ ". Question"}></Question>);
    }

    useEffect(() => {
        context.counter >= 0 && index<arr.length && setTimeout(() => {      
            if(context.counter <= 0) {
                //move to next question and reset the timer
                setContext({...context, questions:[arr[index]], counter : 5})
                index++;
            } else {
                setContext({...context, counter : context.counter - 1})
            }         
        }, 1000)
        
      }, [context]);

    return (
        <div>
        <header className="App-header">
            <span> countdown : {context.counter}</span>
            <span>Score : {context.score}</span>
            <Stack>{context.questions}</Stack>
        </header>
        </div>
    );
  }
  
  export default Game;