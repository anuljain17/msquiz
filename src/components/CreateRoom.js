import { DefaultButton, List, Stack } from "@fluentui/react";
import { useState } from "react";
import Game from "../Game";
import { DefaultPalette } from "@fluentui/react";

const stackStyles = {
  root: {
    //background: DefaultPalette.themeTertiary,
  },
};

const horizontalGapStackTokens = {
  childrenGap: 10,
  padding: 10,
};

function CreateRoom() {
  const [gamestarted, startgame] = useState(false);
  var itemlist = [{ name: "Foo" }, { name: "Bar" }];

  // Styles definition

  return (
    <header className="App-header">
      {gamestarted ? (
        <Game></Game>
      ) : (
        <div>
          <h1>Create a room</h1>
          <span>Use this id to invite friends: xyz</span>
          <Stack
            disableShrink
            styles={stackStyles}
            tokens={horizontalGapStackTokens}
          >
            <DefaultButton onClick={() => startgame(true)}>
              {" "}
              Start Game !!
            </DefaultButton>
            <span>
              {" "}
              <label>Active Users :</label>
              <List items={itemlist}></List>
            </span>
          </Stack>
        </div>
      )}
    </header>
  );
}

export default CreateRoom;
