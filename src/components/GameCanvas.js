import * as React from "react";

const canvasStyle = {
    width: "100%",
    height: "100%",
};

const GameCanvas = React.forwardRef((props, ref) => {
    let [scaleMod, setScaleMod] = React.useState();

    React.useEffect(() => {
        // on GameCanvas load/start
        sizeWindow();
    }, []);

    function animationLoopRecursion()
    {
        props.GameManager.frameUpdateLoop();
        requestAnimationFrame(animationLoopRecursion);
    }
    requestAnimationFrame(animationLoopRecursion);

    setInterval(() => {
        props.GameManager.physicsUpdateLoop()
    }, 20);

    window.onresize = sizeWindow;

    React.useEffect(() => {
        sizeWindow();
    });

    function sizeWindow() {
        setScaleMod(window.innerWidth / props.resolution[0]);
        //TODO: update gameobjects with new scale
        // event?? update each one?? get some sort of scriptable object??
        // can the gameobjects check here for a variable

        // we're trying this way first because it's easiest, if it doesn't work we'll try something else
        props.GameManager.setXScale(scaleMod);
        props.GameManager.setYScale(scaleMod);

        // set width and height here because css just stretches it instead of scaling

        //TODO: why do I have two of them??
        ref.current.width = window.innerWidth;
        ref.current.height = window.innerWidth * 0.5625;
        const ctx = ref.current.getContext("2d");
        //ctx.width = window.innerWidth;
        //ctx.height = window.innerWidth * 0.5625;
    }

    return <canvas style={{canvasStyle, ...props.style}} ref={ref}></canvas>;
});

export default GameCanvas;
