import {Text, TextField} from "@fluentui/react"
function Question(context) {
    return (
        <div>
        <header className="App-header">
        <Text style={{"color":"white"}}>{context.description}</Text>
        <TextField></TextField>
        </header>
        </div>
    );
  }
  
  export default Question;
  