import * as React from "react"
import GameCanvas from "../components/GameCanvas.js";
import GameManager from "../classes/GameManager";
import GameObject from "../classes/GameObject";
import Sprite from "../classes/Sprite.js"
import SquareRenderer from "../classes/SquareRenderer"
import ShipMovement from "../gameScripts/ShipMovement.js";
const icon = require("../images/icon.png").default;

const pageStyles = {
  color: "#232129",
  fontFamily: "Roboto, sans-serif, serif",
  height: "100%",
  backgroundColor: "Gray"
}

const starBackgroundStyle = {
    backgroundColor: "#111",
}

const IndexPage = () => {
    const gameCanvasRef = React.useRef();
    let [gameManager, setGameManager] = React.useState(new GameObject());

    React.useEffect(() => {
        if (gameManager == null)
        {
            setGameManager(new GameObject());
        }
    }, []);

    React.useEffect(() => {
        gameManager.setGameContext(gameCanvasRef.current.getContext("2d"));
    });

    React.useEffect(() => {
        let newGO = new GameObject(0, 0);
        gameManager.addChild(newGO);

        let stars = 500;
        for (let i = 0; i < stars; i++)
        {
            let x = Math.random() * 1920;
            
            let y = Math.random() * 1080;

            let star = new SquareRenderer(x, y, "white", 1, 1);

            newGO.addChild(star);
        }

        console.log(newGO.components);

        let shipMovement = new ShipMovement();

        newGO.addChild(shipMovement);

        //let newImage = icon;
        //let newSprite = new Sprite(50, 50, newImage, 50, 50);
        //newGO.addComponent(newSprite);
    }, []);

  return (
    <main style={pageStyles}>
        <GameCanvas style={starBackgroundStyle} GameManager={gameManager} resolution={[1920,1080]} ref={gameCanvasRef}></GameCanvas>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
