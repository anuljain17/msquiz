import { TextField } from "@fluentui/react";

function Join() {
    return (
        <div>
        <header className="App-header"><h1>Join a room</h1>
        <TextField label="enter room id" style={{"textColor":"white"}}/>
        <button>Join</button>
        </header>
        </div>
    );
  }
  
  export default Join;
  