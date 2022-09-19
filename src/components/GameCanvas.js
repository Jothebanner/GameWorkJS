import * as React from "react";

const canvasStyle = {
    width: "100%",
    height: "100%",
};

const GameCanvas = React.forwardRef((props, ref) => {
    let [scaleMod, setScaleMod] = React.useState();
    let [onXScale, setOnXScale] = React.useState(new EventTarget());
    let [onYScale, setOnYScale] = React.useState(new EventTarget());

    // These don't work, gotta useState
    //const onXScale = new EventTarget();
    //const onYScale = new EventTarget();

    React.useEffect(() => {
        props.GameManager.setListeners(onXScale, onYScale)
    }, []);

    function animationLoopRecursion()
    {
        props.GameManager.frameUpdate();
        requestAnimationFrame(animationLoopRecursion);
    }
    requestAnimationFrame(animationLoopRecursion);

    setInterval(() => {
        props.GameManager.physicsUpdate()
    }, 20);

    window.onresize = sizeWindow;
    
    // this is the secret sauce. It make everything scale on load. 10/10 DON'T EVER CHANGE THIS!!!
    React.useEffect(() => {
        // on GameCanvas load/start
        sizeWindow();
    })

    function sizeWindow() {
        setScaleMod(window.innerWidth / props.resolution[0]);
        //TODO: update gameobjects with new scale
        // event?? update each one?? get some sort of scriptable object??
        // can the gameobjects check here for a variable

        // we're trying this way first because it's easiest, if it doesn't work we'll try something else
        //props.GameManager.setXScale(scaleMod);
        //props.GameManager.setYScale(scaleMod);

        // didn't work, let's do it the right way
        onXScale.dispatchEvent(new CustomEvent('updateXScale', {'detail': scaleMod}));
        onYScale.dispatchEvent(new CustomEvent('updateYScale', {'detail': scaleMod}));

        // set width and height here because css just stretches it instead of scaling

        //TODO: why do I have two of them??
        ref.current.width = window.innerWidth;
        ref.current.height = window.innerWidth * 0.5625;
        //const ctx = ref.current.getContext("2d");
        //ctx.width = window.innerWidth;
        //ctx.height = window.innerWidth * 0.5625;
    }

    return <canvas style={{canvasStyle, ...props.style}} ref={ref}></canvas>;
});

export default GameCanvas;
