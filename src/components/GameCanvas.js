import * as React from "react";

const canvasStyle = {
    width: "100%",
    height: "100%",
}

//TODO: depreciate this component
const GameCanvas = React.forwardRef((props, ref) => {

    // I think we only need this on the camera // I was right!
    React.useEffect(() => {
        window.addEventListener("resize", sizeWindow);
        //requestAnimationFrame(animationLoopRecursion);
    }, []);
    // this is the secret sauce. It make everything scale on load. 10/10 DON'T EVER CHANGE THIS!!!
    React.useEffect(() => {
        // on GameCanvas load/start
        sizeWindow();
    });

    function sizeWindow() {
        
        // this is just temporary. 16/9 aspect ratio
        ref.current.width = window.innerWidth;
        ref.current.height = window.innerWidth * (9/16);
    }

    return <canvas style={{canvasStyle, ...props.style}} ref={ref}></canvas>;
});

export default GameCanvas;
