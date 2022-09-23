import { useEffect, useState } from 'react';
import './App.css';
import CreateRoom from './components/CreateRoom';
import Join from './components/join';
import {DefaultButton, Stack} from "@fluentui/react"
import logo from '../src/resources/logo.png';
import { AuthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./authConfig";


const verticalGapStackTokens = {
  childrenGap: 10,
  padding: 10,
  alignItems: "center"
};

/**
* Configuration object to be passed to MSAL instance on creation.
* For a full list of MSAL.js configuration parameters, visit:
* https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
*/

const msalInstance = new PublicClientApplication(msalConfig);

function App() {

  const [state, setState] = useState({choice: "", isAuthenticated: false});

  async function login() {
    try {
     const account = msalInstance.getActiveAccount();
      if(!account){
        // redirect anonymous user to login page 
        let response = await msalInstance.loginPopup({scopes:["User.Read"], prompt: "select_account"})
        if(response.account) {
           msalInstance.setActiveAccount(response.account);
        }
      }
      //let response = await msalInstance.loginPopup({scopes:["User.Read"], prompt: "select_account"})
      setState({...state, isAuthenticated : true});
    } catch(err) {
      console.log(err);
    }
  }

  const account = msalInstance.getActiveAccount();
  if(!state.isAuthenticated && account){
    if(account) {
      setState({...state, isAuthenticated : true});
    }
  }

  return (
    <div className="App">
      <Stack className="alignheader" horizontal tokens={verticalGapStackTokens}>
            <img src={logo} className="App-logo" alt="logo" />
            <h1>MS Quiz</h1>
      </Stack>
      {state.isAuthenticated?<span>Welcome {msalInstance.getActiveAccount().name}</span>:<></>}

      {state.choice === ""?
      <header className="App-header">
                  {state.isAuthenticated?
      <Stack tokens={verticalGapStackTokens}>
          <DefaultButton onClick={()=>setState({...state, choice: "1"})}>Create a new Room</DefaultButton>
          <DefaultButton onClick={()=>setState({...state, choice: "2"})}>Join a room</DefaultButton></Stack>:<DefaultButton onClick={()=>login()}>login</DefaultButton>
    }
      </header>: state.choice === "1" ? <CreateRoom></CreateRoom>: <Join></Join>}
    </div>
  );
}

export default App;
