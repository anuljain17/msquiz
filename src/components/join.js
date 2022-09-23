import { TextField } from "@fluentui/react";
import {io} from "socket.io-client";
import { useState } from "react";
import Game from "../Game"

import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "../authConfig.js";

let socket = null;

const msalInstance = new PublicClientApplication(msalConfig);

function Join() {

  // Styles definition
  const [context, setContext] = useState({});

    let joinAction = ()=>{
        if(socket == null) {
            let roomid = document.getElementById("roomid").value;
            socket = io("https://msquizserver.azurewebsites.net/?room="+roomid+"&userName="+msalInstance.getActiveAccount().name);
        
            socket.on('connected', function(msg) {
                if(msg) {
                  console.log(msg);
                  setContext({...context, status: msg})
                }
              });

              socket.on('gamestarted', function(msg) {
                if(msg) {
                  setContext({...context, gamestarted: msg})
                }
              });
        }
    }

    return (
        <div> {context.gamestarted ? 
            <Game sock={socket}></Game>
          :
                  context.status?     <header className="App-header"> <div> <div>Waiting for Host to start the Game</div><div> Other Players in the lobby : </div><div id="status">{context.status}</div></div></header>
 :
        <header className="App-header"><h1>Join a room</h1>
        <TextField id="roomid" label="enter room id" style={{"textColor":"white"}}/>
        <button onClick={joinAction}>Join</button>
        </header>}
        </div>

    );
  }
  
  export default Join;
  