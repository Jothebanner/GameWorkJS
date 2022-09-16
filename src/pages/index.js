import * as React from "react"
import GameCanvas from "../components/GameCanvas.js";
import GameManager from "../classes/GameManager";
import GameObject from "../classes/GameObject";
import Sprite from "../classes/Sprite.js"
import SquareRenderer from "../classes/SquareRenderer"
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
    let [gameManager, setGameManager] = React.useState(new GameManager());

    React.useEffect(() => {
        if (gameManager == null)
        {
            setGameManager(new GameManager());
        }
    }, []);

    React.useEffect(() => {
        gameManager.setGameContext(gameCanvasRef.current.getContext("2d"));
    });

    React.useEffect(() => {
        let newGO = new GameObject(50, 50);
        gameManager.addGameObject(newGO);

        let stars = 201;
        for (let i = 0; i < stars; i++)
        {
            let x = Math.random() * gameCanvasRef.current.offsetWidth;
            
            let y = Math.random() * gameCanvasRef.current.offsetHeight;

            let star = new SquareRenderer(x, y, "white");

            newGO.addComponent(star);
        }

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
