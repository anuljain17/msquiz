import {DefaultButton, Text, TextField} from "@fluentui/react"
function Question(context) {


    if(!context) {
        return;
    }

    let socket = context.sock;

    let submit = ()=>{
        let ans = document.getElementById("answer").value;
        socket.emit("answer", context.id, ans);
    }

    return (
        <div>
        <header className="App-header">
        <Text style={{"color":"white"}}>{context.description}</Text>
        <TextField id="answer" label="Submit" Text="Submit"></TextField>
        <DefaultButton onClick={submit}> Submit</DefaultButton>
        </header>
        </div>
    );
  }
  
  export default Question;
  