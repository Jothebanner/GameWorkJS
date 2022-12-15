import GameObject from "./classes/GameObject.js"
import SquareRenderer from "./classes/SquareRenderer.js"
import Camera from "./classes/Camera.js";
import Vector3 from "./classes/Vector3.js";
import Vector2 from "./classes/Vector2.js";

console.log("beans");

let canvas = document.getElementById("canvas");

console.log(canvas);

function sizeWindow() {

    console.log(window.innerWidth);
    // this is just temporary. 16/9 aspect ratio
    canvas.width = window.innerWidth;
    canvas.height = window.innerWidth * (9 / 16);
}
sizeWindow();
window.addEventListener("resize", sizeWindow);

let mainObject = new GameObject();
let backgroundObject = new GameObject();

// give the camera something to output to
mainObject.addChild(new Camera(canvas.getContext("2d"), new Vector3(0, 0, -5)));
mainObject.addChild(backgroundObject);

//IDEA: this seems stupid, maybe the background should belong on the camera // it was a good idea my friend

let stars = 10000;
for (let i = 0; i < stars; i++) {
    let x = Math.random() * Math.pow(9, 4) * (Math.random() * 2 > 1 ? 1 : -1);

    let y = Math.random() * Math.pow(8, 4) * (Math.random() * 2 > 1 ? 1 : -1);

    let z = Math.random() * Math.pow(2, 4) * (Math.random() * 2 > 1 ? 1 : -1);

    let star = new SquareRenderer("white", new Vector3(x, y, z), 10 * Math.random(), 10 * Math.random());

    backgroundObject.addChild(star);
}