import * as React from "react"
import GameCanvas from "../components/GameCanvas.js";
import GameObject from "../classes/GameObject";
import SquareRenderer from "../classes/SquareRenderer"
import ShipMovement from "../gameScripts/ShipMovement.js";

const pageStyles = {
  color: "#232129",
  fontFamily: "Roboto, sans-serif, serif",
  height: "100%",
  backgroundColor: "Gray"
}

const BackgroundStyle = {
    backgroundColor: "#111",
    zIndex: 0,
    position: "absolute",
}

const shipStyle = {
    zIndex: 2,
    position: "absolute",
}

const IndexPage = () => {
    let [resolution] = React.useState({"width":1920, "height": 1080})
    // parent GameObject for each GameCanvas
    const backgroundGameCanvasRef = React.useRef();
    const shipGameCanvasRef = React.useRef();
    // set up the GameObjects that will be manually tied to the GameCanvas react components
    let [backgroundManager] = React.useState(new GameObject(0,0));
    let [shipManager] = React.useState(new GameObject(resolution.width/2, resolution.height/2));

    React.useEffect(() => {
        backgroundManager.setGameContext(backgroundGameCanvasRef.current.getContext("2d"));
        shipManager.setGameContext(shipGameCanvasRef.current.getContext("2d"));
    }, []);

    React.useEffect(() => {
        let background = new SquareRenderer(0,0, "black", resolution.width, resolution.height);
        backgroundManager.addChild(background);

        let stars = 500;
        for (let i = 0; i < stars; i++)
        {
            let x = Math.random() * resolution.width;
            
            let y = Math.random() * resolution.height;

            let star = new SquareRenderer(x, y, "white", 2, 2);

            backgroundManager.addChild(star);
        }

        let shipMovement = new ShipMovement();
        shipManager.addChild(shipMovement);
        let ship2 = new SquareRenderer(0,0, "red", 20, 20);
        shipManager.addChild(ship2);
    }, []);

  return (
    <main style={pageStyles}>
        <GameCanvas style={BackgroundStyle} GameManager={backgroundManager} resolution={[resolution.width,resolution.height]} ref={backgroundGameCanvasRef}></GameCanvas>
        <GameCanvas style={shipStyle} GameManager={shipManager} resolution={[resolution.width,resolution.height]} ref={shipGameCanvasRef}></GameCanvas>
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
